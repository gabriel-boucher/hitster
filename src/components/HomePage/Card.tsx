import React, { useRef } from "react";

interface CardProps {
  index: number;
  title: string;
  onHover: (id: number | null) => void;
}

const Card: React.FC<CardProps> = ({ index, title, onHover }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  function getSideToAddCard(e: React.MouseEvent) {
    const cardRefCurrent = cardRef.current;

    if (cardRefCurrent) {
        const midPoint = cardRefCurrent.offsetLeft + cardRefCurrent.offsetWidth / 2;
    
        if (e.clientX < midPoint) {
          return "left";
        } else {
          return "right";
        }
    }
  }

  function lol(e: React.MouseEvent) {
    const side = getSideToAddCard(e);

    if (side === "left") {
      onHover(index - 1);
    } else if (side === "right") {
      onHover(index);
    }
  }

  return (
    <div
      onMouseMove={(e) => lol(e)}
      onMouseLeave={() => onHover(null)}
      ref={cardRef}
      style={{
        padding: "20px",
        border: "1px solid black",
        backgroundColor: "white",
      }}
    >
      {title}
    </div>
  );
};

export default Card;
