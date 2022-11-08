import './Player.css';
import batmanStand1 from '../images/sprites/batman/stand/batman-stand1.gif';

function Player() {

    return(
        // <div className='player-container'>
            <img className="player-sprite" src={batmanStand1} alt="byebye"></img>
        // {/* </div> */}
    );
}

export default Player;