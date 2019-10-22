import React from 'react';
import spinner from './spinner.gif';
export default (props)=>{
    return (
        <div>
            <img alt="Loading..."
                 src={spinner}  
                 style={{ width: "40px", margin: props.mt+"px auto", display: "block" }}/>
        </div>
    )
}