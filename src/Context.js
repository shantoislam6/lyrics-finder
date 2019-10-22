import React, { Component, createContext } from 'react';
import axios from 'axios';

const Context = createContext();

class Provider extends Component {

    state = {
        track_list : [],
        heading : "Top 10 Tracks"
    }
    
    componentDidMount() {
        const url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=bd&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`;
        axios.get(url)
           .then(res => {
                this.setState({
                track_list: res.data.message.body.track_list
                });
           })
           .catch(err=> console.log(err))
    }

    render() {
        return (
           <Context.Provider value={{
               state: this.state,
               scope: this
           }}>
               {this.props.children}
           </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer;

export { Provider, Context, Consumer };


