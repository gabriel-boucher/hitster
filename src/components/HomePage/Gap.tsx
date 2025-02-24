import React from "react";

interface GapProps {
  index: number;
  hoveredCard: number | null;
  hoveredGap: number | null;
  onHover: (id: number | null) => void;
  addCardBetween: (index: number) => void;
}

const Gap: React.FC<GapProps> = ({ index, hoveredCard, hoveredGap, onHover, addCardBetween }) => {
  return (
    <div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => addCardBetween(index)}
      style={{
        height: "inherit",
        width: (hoveredCard === index) || (hoveredGap === index) ? "80px" : "0px",
        cursor: "pointer",
        backgroundColor: "rgb(255, 0, 98)",
        transition: "width 0.3s ease",
      }}
    />
  );
};

export default Gap;
