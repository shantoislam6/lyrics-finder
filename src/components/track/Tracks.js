import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Spinner from './Spinner';
import Track from './Track'

export default class Tracks extends Component {

    componentDidMount() {

        // set default title
        document.title = 'Lyrics Finder';
    }
    
    render() {
        return (
            <div >
                <Consumer>
                    {(context)=>{
                        const tracks_list = context.state.track_list;
                        if( context.state.availablity === 0 ){
                            return (
                                <React.Fragment>
                                    <h3 style={{fontSize: '25px' }} className="display-4 text-center"> :( Did Not Found any Tracks!!!, For '<b>{context.state.search_q}</b>'</h3>
                                </React.Fragment>
                            )
                        }else{
                            if(tracks_list.length === 0 || tracks_list === undefined ){
                                 return <Spinner mt={50} />
                            }else{
                                return (
                                    <React.Fragment>
                                        <h3 className="text-center mb-4 mt-2">{context.state.heading}</h3>
                                        <div className="row">
                                            {tracks_list.map((track_list)=>(
                                                <Track track={track_list.track} key={track_list.track.track_id}/>
                                            ))}
                                        </div>
                                        <div>
                                            {
                                                context.state.is_scrolled_load ? (
                                                    <Spinner mt={0} />
                                                ) : context.state.is_load_more_lyrics ? (
                                                    <div className="p-2 text-center">
                                                        <p className="lead">No More Lyrics</p>
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    </React.Fragment>
                                );
                            }
                        }
                    }}
                </Consumer>

                
            </div>
        )
    }
}
