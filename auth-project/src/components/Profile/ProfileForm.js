import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        //Add Validation

        let postResetPassword = async () => {
            try {
                const response = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB-2v5k32vQWiXHGr7R2N-oUBXIJCgsCA",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            idToken: authCtx.token,
                            password: enteredNewPassword,
                            returnSecureToken: false,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    let error = await response.json();
                    let errorMessage = error.error.message;
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                console.log(data);
                history.replace("/");
            } catch (err) {
                alert(err.message);
            }
        };
        postResetPassword();
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    minLength="7"
                    ref={newPasswordInputRef}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
