import {InputHTMLAttributes} from "react";
import styled from "styled-components";

export default function InputText({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <InputContainer {...props} />
  )
}

const InputContainer = styled.input`
    padding: 0.875rem 1rem;
    font-size: 1rem;
    border-radius: 12px;
    border: 1px solid var(--lobby-accent-softer);
    background: var(--lobby-black-30);
    color: var(--primary-text-color);
    outline: none;
    transition: all 0.3s;
    min-width: 0;

    &::placeholder {
        color: var(--lobby-white-30);
    }

    &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 20px var(--lobby-accent-softer);
    }
`;