import styled from "styled-components";

export default function HomePage() {


  return (
    <Container>
        <img src='src/assets/hitster_title_logo.png'/>
        <div className='entries'>
            <select>
                <option>
                    <img src='src/assets/dog.jpg'/>
                </option>
            </select>
            <input className='nickname' placeholder='Nickname'></input>
            <button className='create-room'>Create a room</button>
        </div>
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3%;

    img {
        height: 20%;
        aspect-ratio: 401/112;
        margin-bottom: 50px;
    }

    .entries {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 8%;
        width: 50%;

        .nickname {
            width: 80%;
            font-size: 2rem;
            padding: 0px 0px 0px 10px;
            border-radius: 10px 0px 0px 10px;
            border: 5px solid rgb(255, 0, 98);
        }

        .create-room {
            width: 20%;
            background-color: rgb(255, 0, 98);
            border: 5px solid rgb(255, 0, 98);
            border-radius: 0px 10px 10px 0px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
        }

        hr {
            border: 2px solid;
        }
    }

    /*
    input {
        height: 8%;
        width: 42.5%;
        border: 5px solid rgb(255, 0, 98);;
        border-radius: 10px;
        font-size: 35px;
        padding: 0px 0px 0px 10px;
    }

    button {
        height: 8%;
        width: 15%;
        background-color: rgb(255, 0, 98);
        border: 5px solid rgb(255, 0, 98);;
        border-radius: 10px;
        font-size: 35px;
        cursor: pointer;
    }*/
`