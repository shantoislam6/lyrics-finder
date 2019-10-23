import React, { Component } from 'react'
import axios from 'axios';
import Spinner from './Spinner';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

 class Lyrics extends Component {
    _isMoundted = false;
    state = {
        track : {},
        lyrics: {},
        status:200,
    }
    componentDidMount(){

        this._isMoundted = true;
        const id = this.props.match.params.id;
       
        let url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${
                process.env.REACT_APP_MM_KEY
            }`;

          axios.get(url).then(res => {

            this.setState({
                track:res.data.message.body.track
            })
           
             url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${
                 process.env.REACT_APP_MM_KEY
              }`;
                return axios.get(url);
            })
         .then(res=>{
            this.setState({
                lyrics: res.data.message.body.lyrics,
                status:res.data.message.header.status_code
            });
            // set default title for this component
            document.title = this.state.track.track_name;
         }).catch(err=> console.log(err))
       
    }
    
    componentWillUnmount() {
        this._isMoundted = false;
    }
  
    
    render() {

        const { lyrics, track, status } = this.state;

       
            if( (track === undefined || 
                lyrics === undefined || 
                Object.keys(track).length === 0 ||
                 Object.keys(lyrics).length === 0) &&  status === 200){
                 return <Spinner  mt={200} />
              }else{
                 return (
                    <React.Fragment>
                    <Link to="/" className="btn btn-dark mb-4 btn-sm">Go Back</Link>
                    <div className="card">
                        <h5 className="card-header">
                        {track.track_name} By 
                            <span className="text-secondary">  { track.artist_name }</span>
                        </h5>
                        <div className="card-body">
                        <pre className="card-text" style={{ fontSize: '20px', fontWeight: 'bold'}}>{  status === 404 ? ':( This track lyrics not found for while!!. Server responsed 404' : lyrics.lyrics_body }</pre>
                        </div>
                    </div>
                     <ul className="list-group mt-3 mb-5">
                             <li className="list-group-item ">
                                <strong>Album ID</strong> : { track.album_id }
                            </li>
                            <li className="list-group-item ">
                                <strong>Album Name</strong> : { track.album_name }
                            </li>
                            <li className="list-group-item ">
                                {  track.primary_genres.music_genre_list[0] !== undefined ? (
                                    <React.Fragment>
                                        <strong>Music Genre</strong> : { track.primary_genres.music_genre_list[0].music_genre.music_genre_name }
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <strong>Music Genre</strong> : Unknown
                                    </React.Fragment>
                                )}
                            
                            </li>
    
                            <li className="list-group-item">
                                <strong>Explicit Words</strong> : { track.explicit === 0 ? 'No' : 'Yes' }
                            </li>
    
                            <li className="list-group-item">
                                <strong>Release Date </strong> : <Moment format="LLLL">{ track.updated_time }</Moment>
                            </li>
                    </ul>
                    
                    </React.Fragment>
                )
        }
    }
}
export default Lyrics;
