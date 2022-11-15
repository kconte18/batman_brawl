import React, { useEffect, useRef } from "react";
import "./Player.css";
import Spritesheet from "react-responsive-spritesheet";
import batman_sheet from "../images/sprites/batman/batman.gif";

export default function Player() {
  let hCounter = useRef(6);
  let vCounter = useRef(20);
  let jumpPressed = useRef(false);

  useEffect(() => {});

  // This adds and removes the keydown events
  React.useEffect(() => {
    // This handles what is pressed and how to manage it
    const handleKeyDown = (event) => {
      // moving to the right
      if (event.keyCode === 68 && hCounter.current < 84) {
        let player = document.getElementsByClassName("player-sprite");
        let currentRun = 0;
        const rightInterval = setInterval(function () {
          if (currentRun === 2 || hCounter.current > 84) {
            clearInterval(rightInterval);
          } else {
            hCounter.current += 0.25;
            currentRun += 0.25;
            let hMove = hCounter.current + "%";
            player.item(0).style.left = hMove;
          }
        }, 10);
      }
      // moving to the left
      if (event.keyCode === 65 && hCounter.current > 6) {
        let player = document.getElementsByClassName("player-sprite");
        let currentRun = 0;
        const leftInterval = setInterval(function () {
          if (currentRun === -2 || hCounter.current < 6) {
            clearInterval(leftInterval);
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
          if (vDirection === "down" && vCounter.current === 20) {
            clearInterval(jumpInterval);
            jumpPressed.current = false;
          } else if (vDirection === "up" && vCounter.current === 60) {
            vDirection = "down";
          } else if (vDirection === "up" && vCounter.current !== 60) {
            vCounter.current += 1;
            let vMove = vCounter.current + "%";
            player.item(0).style.bottom = vMove;
          } else if (vDirection === "down" && vCounter.current !== 20) {
            vCounter.current -= 1;
            let vMove = vCounter.current + "%";
            player.item(0).style.bottom = vMove;
          }
        }, 10);
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
      <div className="player-sprite">
        {/* Creates animation */}
        <Spritesheet
          image={batman_sheet}
          widthFrame={40}
          heightFrame={56}
          steps={3}
          fps={8}
          loop={true}
          isResponsive={true}
        />
      </div>
    </div>
  );
}
