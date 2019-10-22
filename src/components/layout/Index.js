import React from 'react'
import Tracks from '../track/Tracks.js';
import Search from '../track/Search'

const Index = () => {
    return (
        <React.Fragment>
            <Search/>
            <Tracks/>
        </React.Fragment>
    );
}

export default Index;
