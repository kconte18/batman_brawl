import React, { useEffect, useRef } from "react";
import "./Player.css";
import batman_stand from "../images/sprites/batman/batman-stand.gif";
import batman_running from "../images/sprites/batman/batman-running.gif";
import batman_running_reverse from "../images/sprites/batman/batman-running-reverse.gif";
import batman_stand_reverse from "../images/sprites/batman/batman-stand-reverse.gif";

export default function Player() {
  let hCounter = useRef(4);
  let vCounter = useRef(10);
  let jumpPressed = useRef(false);
  let idleTime = useRef(0);

  useEffect(() => {});

  // This adds and removes the keydown events
  React.useEffect(() => {
    // This handles what is pressed and how to manage it
    const handleKeyDown = (event) => {
      // moving to the right
      if (event.keyCode === 68 && hCounter.current < 86) {
        let player = document.getElementsByClassName("player-sprite");
        let currentRun = 0;
        if (!player.item(0).src.includes(batman_running)) {
          player.item(0).src = batman_running;
          // console.log("source",player.item(0).src, typeof(player.item(0).src));
          // console.log("image",batman_running, typeof(batman_running));
        }
        const rightInterval = setInterval(function () {
          if (currentRun === 2 || hCounter.current > 86) {
            clearInterval(rightInterval);
            // setTimeout(function () {
            //   player.item(0).src = batman_stand;
            // }, 1000);
          } else {
            hCounter.current += 0.25;
            currentRun += 0.25;
            let hMove = hCounter.current + "%";
            player.item(0).style.left = hMove;
          }
        }, 10);
      }

      // moving to the left
      if (event.keyCode === 65 && hCounter.current > 4) {
        let player = document.getElementsByClassName("player-sprite");
        let currentRun = 0;
        if (!player.item(0).src.includes(batman_running_reverse)) {
          player.item(0).src = batman_running_reverse;
          // console.log("source",player.item(0).src, typeof(player.item(0).src));
          // console.log("image",batman_running, typeof(batman_running));
        }
        const leftInterval = setInterval(function () {
          if (currentRun === -2 || hCounter.current < 4) {
            clearInterval(leftInterval);
            // setTimeout(function () {
            //   player.item(0).src = batman_stand_reverse;
            // }, 1000);
          } else {
            hCounter.current -= 0.25;
            currentRun -= 0.25;
            let hMove = hCounter.current + "%";
            player.item(0).style.left = hMove;
          }
        }, 10);
      }

      // jumping pressed
      if (event.keyCode === 87 && !jumpPressed.current) {
        jumpPressed.current = true;
        let player = document.getElementsByClassName("player-sprite");
        let vDirection = "up";
        const jumpInterval = setInterval(function () {
          if (vDirection === "down" && vCounter.current === 10) {
            clearInterval(jumpInterval);
            jumpPressed.current = false;
          } else if (vDirection === "up" && vCounter.current === 40) {
            vDirection = "down";
          } else if (vDirection === "up" && vCounter.current !== 40) {
            vCounter.current += 1;
            let vMove = vCounter.current + "%";
            player.item(0).style.bottom = vMove;
          } else if (vDirection === "down" && vCounter.current !== 10) {
            vCounter.current -= 1;
            let vMove = vCounter.current + "%";
            player.item(0).style.bottom = vMove;
          }
        }, 12);
      }
    };
    // adds the keydown listener
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="player-sprite-container">
      <img
        src={batman_stand}
        className="player-sprite"
        alt="Batman Not Found"
      ></img>
    </div>
  );
}
