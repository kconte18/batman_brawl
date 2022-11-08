import './BattleArena.css';
import Player from '../Player/Player';

function BattleArena() {
    return(
        <div className="arena-container">
            <div className='arena'>
                <Player></Player>
            </div>
        </div>
    );
}

export default BattleArena;