import styled from "styled-components";
import { BsGear } from "react-icons/bs";

export default function Menu() {


  return (
    <Container>
        <button>Back</button>
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