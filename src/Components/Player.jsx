import React from "react";
import ReactPlayer from "react-player";
import './Player.css'

const Player = (props) => {
    return (
        <div className='player'>
            <ReactPlayer 
            url="https://www.youtube.com/watch?v=DYCEXg4_lCM&ab_channel=AdultSwim"
            className="react-player"
            playing={true}
            width={props.width}
            height={props.height}
            muted={true}
            controls={true}
            

            />
        </div>
    )
}

export default Player