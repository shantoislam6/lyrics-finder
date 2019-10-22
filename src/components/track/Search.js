import React, { Component } from 'react'
import { Context } from '../../Context';
import axios from 'axios';
export default class Search extends Component {
    static contextType = Context;
    // componentDidUpdate(){
    //     console.log(this.context);
    // }
    
    searchHandler(e){

        e.preventDefault();
        const track_name = this.track_name.value;

        const search_url = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${track_name}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`;

        this.context.scope.setState({
            track_list : []
        })   

        axios.get(search_url).then((res)=>{
            const track_list = res.data.message.body.track_list;
            this.context.scope.setState({
                track_list : track_list,
                heading : 'Search Results'
            });
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
                        <input ref={(input) => this.track_name = input } className="form-control form-control-lg rounded"  placeholder="Song Title" />
                    </div>
                    <div className="form-group col-md-5 col-sm-7 mx-auto">
                        <button ref={(input)=> this.searchBtn = input } onClick={this.searchHandler.bind(this)} className="btn btn-info btn-lg btn-block">Get Track Lyrics</button>
                    </div>
                </form>
            </div>
        )
    }
}
