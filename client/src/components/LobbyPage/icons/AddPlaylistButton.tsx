import styled from "styled-components";

export default function AddPlaylistButton({ ...props }) {
    return (
        <AddButton viewBox="0 0 24 24" { ...props }>
            <path
                d="M12.0002 4.875C12.6216 4.875 13.1252 5.37868 13.1252 6V10.8752H18.0007C18.622 10.8752 19.1257 11.3789 19.1257 12.0002C19.1257 12.6216 18.622 13.1252 18.0007 13.1252H13.1252V18.0007C13.1252 18.622 12.6216 19.1257 12.0002 19.1257C11.3789 19.1257 10.8752 18.622 10.8752 18.0007V13.1252H6C5.37868 13.1252 4.875 12.6216 4.875 12.0002C4.875 11.3789 5.37868 10.8752 6 10.8752H10.8752V6C10.8752 5.37868 11.3789 4.875 12.0002 4.875Z"
                fill="currentColor"
            />
        </AddButton>
    );
}


const AddButton = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: var(--secondary-spotify-text-color);
  opacity: 0.9;

  &:hover {
    opacity: 1;
    color: green;
  }
`;