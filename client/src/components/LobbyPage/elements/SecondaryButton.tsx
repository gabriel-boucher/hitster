import {ButtonHTMLAttributes, ReactNode} from "react";
import styled from "styled-components";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function SecondaryButton({ children, ...props }: PrimaryButtonProps) {
    return (
        <SecondaryButtonContainer {...props}>
            {children}
        </SecondaryButtonContainer>
    )
}

const SecondaryButtonContainer = styled.button`
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    color: var(--primary-color);
    background: var(--lobby-accent-subtle);
    border: 1px solid var(--lobby-accent-softer);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background: var(--lobby-accent-softer);
    }
`;