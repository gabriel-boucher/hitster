import styled from "styled-components";
import { BsGear } from "react-icons/bs";
import { useStateProvider } from "../../../utils/StateProvider";
import { reducerCases } from "../../../utils/Constants";

export default function Menu() {
  const [{socketId, players, playerCards, playersTurn}, dispatch] = useStateProvider();
  
  function handleClick() {
    dispatch({type: reducerCases.SET_PLAYERS_TURN, playersTurn: playersTurn + 1})
    const newPlayerCards = [...playerCards];
    newPlayerCards.forEach(card => {
      card.hidden = false
    })
    dispatch({type: reducerCases.SET_PLAYER_CARDS, playerCards: newPlayerCards})
  }

  function handleDisabled() {
    const index = playersTurn % players.size
    return Array.from(players.keys())[index] === socketId ? false : true
  }

  return (
    <Container>
        <button>Back</button>
        <button
          onClick={handleClick}
          disabled={handleDisabled()}
        >
          Next Turn
        </button>
        <BsGear color="white" size="2.4rem"/>
    </Container>
  )
}

const Container = styled.div`
    height: 10vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
`