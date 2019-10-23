import React, { Component } from 'react'
import { Context } from '../../Context';
import axios from 'axios';
export default class Search extends Component {
    static contextType = Context;
   
    state = {
        track_name:''
    }
    no_more_lyrics = false;
     page_size = 10;
     is_request_success = true;
    
    searchHandler(e){
        e.preventDefault();
        this.page_size = 10;
       if(this.state.track_name !== ''){
            this.searchResultEmmit(this.page_size, false);
            this.no_more_lyrics = false
       }
    }

    componentDidMount(){
        window.addEventListener('scroll',(e)=>{
            let docHeigth = parseInt(document.documentElement.scrollHeight, 10);
            const scrollBottom = Math.round(window.innerHeight + window.scrollY);
            const difference = docHeigth - scrollBottom;
            // check if scroll track possion is completely bottom of the browser window screen 
            if(difference === 0 || difference < 3){
                if(this.is_request_success){
                    this.is_request_success = false;
                    this.page_size += 10;
                    this.searchResultEmmit(this.page_size, true);
                }
                
            }
        });
    }

    searchResultEmmit(size, is_scrolled){


        let track_name = this.state.track_name;
    
        const search_url = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
            track_name
        }&page_size=${size}&page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY
        }`;

            if(!is_scrolled){
                this.context.dispatch({
                    type : 'SEARCH_TRACKS',
                    payload:[],
                    new_heading: this.context.state.heading
                })
            }else if(is_scrolled){
                if(!this.no_more_lyrics){
                    this.context.dispatch({
                        type : "FOR_SCROLLED",
                        is_scrolled_load: true
                   })
                }
            }


        axios.get(search_url).then((res)=>{
            const track_list = res.data.message.body.track_list;
            const header = res.data.message.header;
            
            if(track_list.length === this.context.state.track_list.length && header.available !== 0 ){
               
                this.context.dispatch({
                    type : 'IS_LOAD_MORE_LYRICS_FINISHED',
                    is_load_more_lyrics : true,
                    is_scrolled_load: false
                });

                this.no_more_lyrics = true;

            }else{
                this.context.dispatch({
                    type : 'SEARCH_TRACKS',
                    payload:track_list,
                    new_heading: 'About ' + header.available + ' tracks searched for "' + track_name + '" among ('+ (header.execute_time).toFixed(3) +' seconds) ',
                    availablity: header.available,
                    search_q : track_name,
                    is_scrolled_load:false
                });
            }
         

            this.is_request_success = true;
           
        });

        this.setState({
            track_name : '',
        })

        
    }

    inputHanlder(e){
        this.setState({
            track_name:e.target.value
        })
    }


    render() {
        return (
            <div className="card card-body mb-4 p-4">
                <h1 className="display-4 text-center">
                    <i className="fas fa-music"></i> Search For A Song
                </h1>
                <p className="text-center lead">Get the lyrics for any song</p>
                <form>
                    <div className="form-group col-md-10 col-sm-12 mx-auto">
                        <input onChange={this.inputHanlder.bind(this)} className="form-control form-control-lg rounded"  placeholder="Song Title" />
                    </div>
                    <div className="form-group col-md-5 col-sm-7 mx-auto">
                        <button  onClick={this.searchHandler.bind(this)} className="btn btn-info btn-lg btn-block">Get Track Lyrics</button>
                    </div>
                </form>
            </div>
        )
    }
}
