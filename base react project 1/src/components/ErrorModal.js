import { createPortal } from "react-dom";
//Components
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

//Component being created inside another component file, as it will only be used for this component,
//and not any other components, like side drawers etc.

const ErrorModal = ({ title, message, errorState, setErrorState }) => {
    //Event Handler
    const onCloseHandler = () => {
        setErrorState(false);
    };
    return (
        <>
            {createPortal(
                <Backdrop onClick={() => setErrorState(false)} />,
                document.getElementById("backdrop-root")
            )}
            {createPortal(
                <ModalOverlay
                    title={title}
                    message={message}
                    onCloseHandler={onCloseHandler}
                />,
                document.getElementById("overlay-root")
            )}
        </>
    );
};

export default ErrorModal;
