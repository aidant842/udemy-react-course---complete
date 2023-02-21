import styled from "styled-components";
//Components
import Card from "./Card";
import Button from "./Button";
const ModalOverlay = ({ title, message, onCloseHandler }) => {
    return (
        <StyledModal>
            <header>
                <h2>{title}</h2>
            </header>
            <div className="content">
                <p>{message}</p>
            </div>
            <footer>
                <Button onClick={onCloseHandler} buttonText="Okay" />
            </footer>
        </StyledModal>
    );
};

const StyledModal = styled(Card)`
    position: fixed;
    top: 30vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    overflow: hidden;

    @media (min-width: 768px) {
        left: calc(50% - 20rem);
        width: 40rem;
    }

    header {
        background: #4f005f;
        padding: 1rem;
    }

    header h2 {
        margin: 0;
        color: white;
    }

    div.content {
        padding: 1rem;
    }

    footer {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
    }
`;

export default ModalOverlay;
