import styled from "styled-components";

const User = ({ user }) => {
    return (
        <StyledUser>
            <p>
                {user.name} ({user.age} years old)
            </p>
        </StyledUser>
    );
};

export default User;

const StyledUser = styled.div`
    border: 1px solid #ccc;
    margin: 0.5rem 0;
    p {
        font-weight: bolder;
        padding: 0 1rem;
    }
`;
