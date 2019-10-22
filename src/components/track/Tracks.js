import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Spinner from './Spinner';
import Track from './Track'

export default class Tracks extends Component {
    render() {
        return (
            <div >
                <Consumer>
                    {(context)=>{
                        const tracks_list = context.state.track_list;
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
                                </React.Fragment>
                            );
                        }
                    }}
                </Consumer>

                
            </div>
        )
    }
}
