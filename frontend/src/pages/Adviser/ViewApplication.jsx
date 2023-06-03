import React from 'react';

export default function ViewApplication(props){
    return (props.trigger)?(
        <div>
            <div>
                <button>CLOSE</button>
                {props.children}
            </div>
        </div>
    ) : "";
}