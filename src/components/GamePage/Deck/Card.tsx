import styled from "styled-components";
import { CardInterface } from "../../../Interfaces";

export default function Card({card}: {card: CardInterface}) {
    if (!card.inHand) {
        return (
            <ContainerInPlay className="card-in-play" style={{backgroundImage: `url(src/assets/hitster_logo_square.webp)`}}>
            </ContainerInPlay>
          )
        } else {
            return (
                <ContainerInHand>
                    <div className="card-container" style={{backgroundImage: `url(${card.albumCover})`}}>
                        <div className="details">
                            <div className="date">{card.date}</div>
                            <div className="song">{card.song}</div>
                            <div className="artist">{card.artist}</div>
                        </div>
                    </div>
                </ContainerInHand>
            );
        }

}

const ContainerInPlay = styled.div`
    height: 8rem;
    width: 8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    border-radius: 5%;

    background-repeat: no-repeat;
    background-size: cover;

    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    background-color: black;
    cursor: pointer;
`

const ContainerInHand = styled.div`
    aspect-ratio: 1/1;
    height: 100%;
    width: auto;
    
    flex-shrink: 1;
    min-width: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    .card-container {
        aspect-ratio: 1/1;
        width: 80%;

        display: flex;
        justify-content: center;
        align-content: center;

        position: relative;

        border-radius: 5%;

        background-repeat: no-repeat;
        background-size: cover;

        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        transition: width 0.3s ease;
        cursor: pointer;
    }

    .details {
        width: 70%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;

        flex-shrink: 1;
        min-width: 0;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: hsla(0, 0%, 100%, 90%);
        border-radius: inherit;
        padding: 0px 4px 4px 4px;
        
        .date {
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 1;
            
        }
        .song,
        .artist {
            display: none;
            width: 100%;
            
        }
    }

    &:hover {
        .card-container {
            width: 90%;

        }
        
        .details {
            width: 80%;
            align-items: flex-start;
            
        }
        .date {
            display: none;
        }
        .song,
        .artist {
            font-size: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
                    line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
        .song {
            font-weight: bold;
        }
    }
`;