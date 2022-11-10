import React from "react";
import "./Player.css";
import batmanStand1 from "../images/sprites/batman/stand/batman-stand1.gif";

function Player() {
  let hCounter = 5;
  let vCounter = 10;
  let jumpPressed = false;

  // This handles what is pressed and how to manage it
  const handleKeyDown = (event) => {
    // console.log(event.keyCode);
    let player = document.getElementsByClassName("player-sprite");
    // moving to the right
    if (event.keyCode === 68 && hCounter < 80) {
      hCounter += 2;
      let hMove = hCounter + "%";
      player.item(0).style.left = hMove;
    }
    // moving to the left
    if (event.keyCode === 65 && hCounter > 4) {
      hCounter -= 2;
      let hMove = hCounter + "%";
      player.item(0).style.left = hMove;
    }
    // jumping pressed
    if (event.keyCode === 87 && !jumpPressed) {
      jumpPressed = true;
      let vDirection = "up";
      const jumpInterval = setInterval(function () {
        if (vDirection === "down" && vCounter === 10) {
          clearInterval(jumpInterval);
          jumpPressed = false;
        } else if (vDirection === "up" && vCounter === 50) {
          vDirection = "down";
        } else if (vDirection === "up" && vCounter !== 50) {
          vCounter += 1;
          let vMove = vCounter + "%";
          player.item(0).style.bottom = vMove;
        } else if (vDirection === "down" && vCounter !== 10) {
          vCounter -= 1;
          let vMove = vCounter + "%";
          player.item(0).style.bottom = vMove;
        }
      }, 10);
    }
  };

  // This adds and removes the keydown events
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    // <div className='player-container'>
    <img
      className="player-sprite"
      src={batmanStand1}
      alt="player-sprite"
      onKeyUp={handleKeyDown}
    ></img>
    // {/* </div> */}
  );
}

export default Player;
