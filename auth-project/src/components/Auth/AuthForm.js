import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        //Optional add Valdation

        setIsLoading(true);
        let url;
        if (isLogin) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB-2v5k32vQWiXHGr7R2N-oUBXIJCgsCA";
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB-2v5k32vQWiXHGr7R2N-oUBXIJCgsCA";
        }
        let postAuthRequest = async () => {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setIsLoading(false);
                if (!response.ok) {
                    let error = await response.json();
                    let errorMessage = error.error.message;
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                const experationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login(data.idToken, experationTime.toISOString());
                history.replace("/");
            } catch (err) {
                alert(err.message);
            }
        };
        postAuthRequest();
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        required
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordInputRef}
                        required
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}
                    {isLoading && <p>Loading.....</p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
