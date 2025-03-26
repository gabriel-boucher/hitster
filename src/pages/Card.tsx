import styled from "styled-components";
import { CardInterface } from "../utils/Interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useStateProvider } from "../utils/StateProvider";

interface Props {
  card: CardInterface;
}

export default function Card({ card }: Props) {
  const [{ activeCard }] = useStateProvider();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
    disabled: card.id !== activeCard.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Container
        ref={setNodeRef}
        style={style}
        $card={card}
        $isDragging={isDragging}
      >
        <div className="card-container">
          <div className="details">
            <div className="date">{card.date}</div>
            <div className="song">{card.song}</div>
            <div className="artist">{card.artist}</div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      $card={card}
      $isDragging={isDragging}
    >
      <div className="card-container">
        {!!card.hidden && (
          <div className="details">
            <div className="date">{card.date}</div>
            <div className="song">{card.song}</div>
            <div className="artist">{card.artist}</div>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div<{
  $card: CardInterface;
  $isDragging: boolean;
}>`
  height: 100%;
  min-width: 0;
  aspect-ratio: 1/1;

  flex-shrink: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */

  position: relative;
  user-select: none;

  .card-container {
    aspect-ratio: 1/1;
    width: 80%;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    border-radius: 5%;

    background-image: ${(props) =>
      `url(${
        !props.$card.hidden
          ? "src/assets/hitster_logo_square.webp"
          : props.$card.albumCover
      })`};
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

    user-select: none;

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

  .hidden {
    display: none;
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
