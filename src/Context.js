import React, { Component, createContext } from 'react';
import axios from 'axios';

const Context = createContext();

const reducer = (action) => {
    switch (action.type) {
        case 'SEARCH_TRACKS':
            return {
                track_list: action.payload,
                heading : action.new_heading,
                availablity: action.availablity,
                search_q : action.search_q,
                is_scrolled_load: action.is_scrolled_load
            }
        case 'FOR_SCROLLED':
            return {
                is_scrolled_load: action.is_scrolled_load
            }
        case 'IS_LOAD_MORE_LYRICS_FINISHED':
            return {
                is_load_more_lyrics: action.is_load_more_lyrics,
                is_scrolled_load: action.is_scrolled_load
            }  
        default:
            return {}
    }
}
class Provider extends Component {

    state = {
        track_list : [],
        heading : "Top 10 Tracks",
        availablity: 10,
        search_q:0,
        is_scrolled_load:false,
        is_load_more_lyrics:false
        
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
               scope: this,
               dispatch : action => this.setState(()=> reducer(action)),
               infinitScroll: this.shouldScrollLoadMoreLyrics
           }}>
               {this.props.children}
           </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer;

export { Provider, Context, Consumer };


