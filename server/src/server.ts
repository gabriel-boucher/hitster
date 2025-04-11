import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

interface PlayerInterface {
  socketId: string;
  name: string;
}

interface CardInterface {
  id: string;
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  playerId: string | null;
}

interface TokenInterface {
  id: string;
  active: boolean;
  activePlayerId: string | null;
  playerId: string;
}

interface GameStateInterface {
  players: PlayerInterface[];
  items: (CardInterface | TokenInterface)[];
  activePlayer: PlayerInterface | null;
  activeCard: CardInterface | null;
}

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

let gameState: GameStateInterface = {
  players: [],
  items: [],
  activePlayer: null,
  activeCard: null,
};

const cardsFetched = [
  {
    song: "Starlight",
    artist: "Muse",
    date: "2006",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
  },
  {
    song: "Supermassive Black Hole",
    artist: "Muse",
    date: "2006",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
  },
  {
    song: "What's My Age Again?",
    artist: "blink-182",
    date: "1999",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b2736da502e35a7a3e48de2b0f74",
  },
  {
    song: "When I Come Around",
    artist: "Green Day",
    date: "1994",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273db89b08034de626ebee6823d",
  },
  {
    song: "Dreams - 2004 Remaster",
    artist: "Fleetwood Mac",
    date: "1977",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273e52a59a28efa4773dd2bfe1b",
  },
  {
    song: "Chemical",
    artist: "Post Malone",
    date: "2023",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27371cae34ad5a39bdab78af13e",
  },
  {
    song: "Kids",
    artist: "MGMT",
    date: "2007",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b2738b32b139981e79f2ebe005eb",
  },
  {
    song: "You Know I'm No Good",
    artist: "Amy Winehouse",
    date: "2006",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27376ffb5b5ab045d22c81235c1",
  },
  {
    song: "Comfortably Numb",
    artist: "Pink Floyd",
    date: "1979",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf",
  },
  {
    song: "Homecoming",
    artist: "Kanye West, Chris Martin",
    date: "2007",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a",
  },
];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const newPlayer = { socketId: socket.id, name: socket.id };
  gameState.players.push(newPlayer);

  io.emit("updateGameState", gameState);

  socket.on("createRoom", () => {
    const cards: CardInterface[] = cardsFetched.map((card) => ({
      ...card,
      id: uuidv4(),
      playerId: null,
    }));

    gameState.players.forEach((player, index) => {
      cards[cards.length - 1 - index].playerId = player.socketId;
    });

    const tokens: TokenInterface[] = [];
    gameState.players.forEach((player) => {
      tokens.push({
        id: uuidv4(),
        active: false,
        activePlayerId: null,
        playerId: player.socketId,
      });
      tokens.push({
        id: uuidv4(),
        active: false,
        activePlayerId: null,
        playerId: player.socketId,
      });
    });

    const items = [...tokens, ...cards];

    const activeCard = cards.filter((card) => card.playerId === null).at(-1)!;

    gameState = {
      players: gameState.players,
      items,
      activePlayer: null,
      activeCard,
    };

    io.emit("updateGameState", gameState);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    gameState.players = gameState.players.filter(
      (p) => p.socketId !== socket.id
    );
    gameState.items = gameState.items.filter((i) => i.playerId !== socket.id);
    io.emit("updateGameState", gameState);
  });
});
