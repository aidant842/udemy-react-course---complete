import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";
import AuthContext from "../../store/auth-context";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
    switch (action.type) {
        case "USER_INPUT":
            return { value: action.val, isValid: action.val.includes("@") };
        case "INPUT_BLUR":
            return { value: state.value, isValid: state.value.includes("@") };
        default:
    }
    return {
        value: "",
        isValid: false,
    };
};

const passwordReducer = (state, action) => {
    switch (action.type) {
        case "USER_INPUT":
            return { value: action.val, isValid: action.val.trim().length > 6 };
        case "INPUT_BLUR":
            return {
                value: state.value,
                isValid: state.value.trim().length > 6,
            };
        default:
    }
    return {
        value: "",
        isValid: false,
    };
};

const Login = (props) => {
    /*    const [enteredEmail, setEnteredEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(); */
    /* const [enteredPassword, setEnteredPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(); */
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: null,
    });

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        console.log("EFFECT RUNNING");

        return () => {
            console.log("EFFECT CLEANUP");
        };
    }, []);

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("Checking form validaty");
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);
        return () => {
            console.log("Cleanup");
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });

        /* setFormIsValid(
            event.target.value.includes("@") && passwordState.isValid
        ); */
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
        /* setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        ); */
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    ref={emailInputRef}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    ref={passwordInputRef}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
