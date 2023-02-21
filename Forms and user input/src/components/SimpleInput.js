//Custom hooks
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== "");

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => value.includes("@"));

    let formIsValid = false;

    if (enteredNameIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        resetNameInput();
        resetEmailInput();
        console.log(enteredEmail);
        console.log(enteredName);

        /* nameInputRef.current.value = ""; NOT IDEAL SOLUTION, ALWAYS TRY NOT TO DIRECTLY MANIPULATE THE DOM, USED IF USING useRef */
    };

    const nameInputClasses = nameInputHasError
        ? "form-control invalid"
        : "form-control";
    const emailInputClasses = emailInputHasError
        ? "form-control invalid"
        : "form-control";

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameChangedHandler}
                    value={enteredName}
                    onBlur={nameBlurHandler}
                />
                {nameInputHasError && (
                    <p className="error-text">Name must not be empty.</p>
                )}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    onChange={emailChangeHandler}
                    value={enteredEmail}
                    onBlur={emailBlurHandler}
                />
                {emailInputHasError && (
                    <p className="error-text">Email is invalid.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
