import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConnectionStateProvider} from "./stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionInitialState} from "./stateProvider/connection/ConnectionInitialState.ts";
import {connectionReducer} from "./stateProvider/connection/ConnectionReducer.ts";
import {RoomStateProvider} from "./stateProvider/room/RoomStateProvider.tsx";
import {roomInitialState} from "./stateProvider/room/RoomInitialState.ts";
import {GameStateProvider} from "./stateProvider/game/GameStateProvider.tsx";
import {gameInitialState} from "./stateProvider/game/GameInitialState.ts";
import {gameReducer} from "./stateProvider/game/GameReducer.ts";
import {roomReducer} from "./stateProvider/room/RoomReducer.ts";
import {MovementStateProvider} from "./stateProvider/movement/MovementStateProvider.tsx";
import {movementInitialState} from "./stateProvider/movement/MovementInitialState.ts";
import {movementReducer} from "./stateProvider/movement/MovementReducer.ts";
import {SpotifyStateProvider} from "./stateProvider/spotify/SpotifyStateProvider.tsx";
import {spotifyInitialState} from "./stateProvider/spotify/SpotifyInitialState.ts";
import {spotifyReducer} from "./stateProvider/spotify/SpotifyReducer.ts";

createRoot(document.getElementById('root')!)
.render(
  // <StrictMode>
  <ConnectionStateProvider initialState={connectionInitialState} reducer={connectionReducer} >
    <RoomStateProvider initialState={roomInitialState} reducer={roomReducer} >
      <GameStateProvider initialState={gameInitialState} reducer={gameReducer} >
          <MovementStateProvider initialState={movementInitialState} reducer={movementReducer}>
              <SpotifyStateProvider initialState={spotifyInitialState} reducer={spotifyReducer}>
                  <App />
              </SpotifyStateProvider>
          </MovementStateProvider>
      </GameStateProvider>
    </RoomStateProvider>
  </ConnectionStateProvider>
  // </StrictMode>,
)
