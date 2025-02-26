import styled from "styled-components";
import { CardInterface } from "../../../utils/Interfaces";
import { useEffect, useState } from "react";
import { cardElements } from "../../../utils/Constants";

interface CardProps {
  card: CardInterface;
  cardState: string;
}

export default function Card({ card, cardState }: CardProps) {
  const [details, setDetails] = useState(<div></div>);

  useEffect(() => {
    setDetails(
      card.hidden ? (
        <div></div>
      ) : (
        <div className={"details"}>
          <div className="date">{card.date}</div>
          <div className="song">{card.song}</div>
          <div className="artist">{card.artist}</div>
        </div>
      )
    );
  }, [card.hidden]);

  return (
    <Container id={card.id} className={cardState + " no-drag"}>
      <div
        className={cardElements.CARD_CONTAINER}
        style={{
          backgroundImage: card.hidden
            ? `url(src/assets/hitster_logo_square.webp)`
            : `url(${card.albumCover})`,
        }}
      >
        {details}
      </div>
    </Container>
  );
}

const Container = styled.div`
`;
