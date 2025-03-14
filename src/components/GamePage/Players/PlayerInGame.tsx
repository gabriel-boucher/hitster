import styled from "styled-components";

interface PlayerProps {isActivePlayer: boolean}

export default function PlayerInGame({isActivePlayer}: PlayerProps) {

    return (
      <Player>
        <div className="token-container" style={{backgroundImage: `url(src/assets/avatar.webp)`, border: isActivePlayer ? "2px solid yellow" : "none"}}>
        </div>
      </Player>
    )
  }

const Player = styled.div`
    aspect-ratio: 1/1;
    height: 100%;
    width: auto;
    
    flex-shrink: 1;
    min-width: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    .token-container {
        aspect-ratio: 1/1;
        width: 80%;

        display: flex;
        justify-content: center;
        align-content: center;

        position: relative;

        border-radius: 50%;

        background-repeat: no-repeat;
        background-size: cover;

        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        transition: width 0.3s ease;
        cursor: pointer;
    }

    &:hover {
    }

`
  