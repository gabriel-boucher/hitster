// src/context/CardContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface CardContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: "Card 1", description: "Description 1", imageUrl: "url1" },
    { id: 2, title: "Card 2", description: "Description 2", imageUrl: "url2" },
  ]);

  return <CardContext.Provider value={{ cards, setCards }}>{children}</CardContext.Provider>;
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCards must be used within a CardProvider");
  return context;
};
