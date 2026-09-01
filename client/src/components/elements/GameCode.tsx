import {ClipboardEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import styled from "styled-components";

export const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
export const LENGTH = 5;

interface GameCodeProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

const sanitize = (char: string) => char.toUpperCase().replace(/[^A-Z0-9]/g, "");
const isValidChar = (char: string) => CHARS.indexOf(char) !== -1;
const toChars = (value: string) => Array.from({ length: LENGTH }, (_, i) => value[i] ?? "");

export default function GameCode({ value, onChange, disabled, autoFocus }: GameCodeProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [chars, setChars] = useState<string[]>(() => toChars(value));

  // `value` only round-trips back through props after the parent re-renders, which can
  // lag behind fast typing. Keep local state authoritative and just resync it whenever
  // an external change (autofill, reset) makes it diverge from what we last emitted.
  useEffect(() => {
    setChars((prev) => (prev.join("") === value ? prev : toChars(value)));
  }, [value]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  const updateChars = (index: number, value: string) => {
    setChars((prev) => {
      const next = prev.slice();
      next[index] = value;
      onChange?.(next.join("").replace(/\s+$/, ""));
      return next;
    });
  };

  const handleChange = (index: number, value: string) => {
    const char = sanitize(value.slice(-1));

    if (char.length > 0 && !isValidChar(char)) return;

    updateChars(index, char);

    if (char.length > 0 && index < LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (chars[index]) {
        updateChars(index, "");
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        updateChars(index - 1, "");
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.select();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && index < LENGTH - 1) {
      inputRefs.current[index + 1]?.select();
      e.preventDefault();
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = sanitize(e.clipboardData.getData("text"))
      .split("")
      .filter(isValidChar);

    if (pasted.length === 0) return;

    let lastIndex = index;
    for (let i = 0; i < pasted.length && index + i < LENGTH; i++) {
      updateChars(index + i, pasted[i]);
      lastIndex = index + i;
    }

    e.preventDefault();
    inputRefs.current[Math.min(lastIndex + 1, LENGTH - 1)]?.focus();
  };

  return (
    <Container>
      {chars.map((char, index) => (
        <Box
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          value={char}
          disabled={disabled}
          inputMode="text"
          autoComplete="off"
          maxLength={1}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Box = styled.input`
  width: 3rem;
  height: 3.5rem;
  padding: 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  border-radius: 12px;
  border: 1px solid var(--lobby-accent-softer);
  background: var(--lobby-black-30);
  color: var(--primary-text-color);
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 20px var(--lobby-accent-softer);
  }

  &:disabled {
    opacity: 0.7;
  }
`;