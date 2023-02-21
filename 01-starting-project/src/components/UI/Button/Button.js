/* import styled from "styled-components"; */

import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={styles.button}
        >
            {props.children}
        </button>
    );
};

/* const Button = styled.button`
    width: auto;
    font: inherit;
    padding: 0.5rem 1.5rem;
    border: 1px solid #8b005d;
    color: white;
    background: #8b005d;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
    cursor: pointer;

    @media (min-width: 768px) {
        width: 100%;
    }

    &:focus {
        outline: none;
    }

    &:hover,
    &:active {
        background: #ac0e77;
        border-color: #ac0e77;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
    }
`; */

export default Button;
