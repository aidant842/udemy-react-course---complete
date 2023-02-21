import styled from "styled-components";

const Button = ({ buttonText, onClick }) => {
    return <StyledButton onClick={onClick}>{buttonText}</StyledButton>;
};

const StyledButton = styled.button`
    width: auto;
    color: white;
    background-color: purple;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
`;

export default Button;
