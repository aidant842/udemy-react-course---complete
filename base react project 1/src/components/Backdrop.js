import styled from "styled-components";
const Backdrop = ({ setErrorState }) => {
    return <StyledBackdrop onClick={() => setErrorState(false)} />;
};

const StyledBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.75);
`;

export default Backdrop;
