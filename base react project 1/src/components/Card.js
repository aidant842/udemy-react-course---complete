import styled from "styled-components";

const Card = ({ children, className }) => {
    return <StyledCard className={className}>{children}</StyledCard>;
};

const StyledCard = styled.div`
    border-radius: 20px;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
`;

export default Card;
