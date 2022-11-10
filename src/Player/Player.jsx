import React from "react";
import "./Player.css";
import batmanStand1 from "../images/sprites/batman/stand/batman-stand1.gif";

function Player() {
  let hCounter = 4;
  let vCounter = 10;
  let jumpPressed = false;

  // This handles what is pressed and how to manage it
  const handleKeyDown = (event) => {
    // console.log(event.keyCode);
    let player = document.getElementsByClassName("player-sprite");
    // moving to the right
    if (event.keyCode === 68 && hCounter < 84) {
      let currentRun = 0;
      const rightInterval = setInterval(function () {
        if (currentRun === 2 || hCounter > 84) {
          clearInterval(rightInterval);
        } else {
          hCounter += 0.25;
          currentRun += 0.25;
          let hMove = hCounter + "%";
          player.item(0).style.left = hMove;
        }
      }, 10);
    }
    // moving to the left
    if (event.keyCode === 65 && hCounter > 4) {
      let currentRun = 0;
      const leftInterval = setInterval(function () {
        if (currentRun === -2 || hCounter < 4) {
          clearInterval(leftInterval);
        } else {
          hCounter -= 0.25;
          currentRun -= 0.25;
          let hMove = hCounter + "%";
          player.item(0).style.left = hMove;
        }
      }, 10);
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
