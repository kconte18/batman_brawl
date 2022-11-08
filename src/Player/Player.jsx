import React from 'react';
import './Player.css';
import batmanStand1 from '../images/sprites/batman/stand/batman-stand1.gif';

function Player() {

    // This handles what is pressed and how to manage it
    const handleKeyDown = (event) => {
        console.log(event.keyCode);
        let player = document.getElementsByClassName("player-sprite");
        if(event.keyCode === 68) {
            console.log("move right");
            player.item(0).style.left += 5;
        }
    };

    // This adds and removes the keydown events
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        // cleanup this component
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);



    return(
        // <div className='player-container'>
            <img className="player-sprite" src={batmanStand1} alt="player-sprite" onKeyUp={handleKeyDown}></img>
        // {/* </div> */}
    );
}

export default Player;