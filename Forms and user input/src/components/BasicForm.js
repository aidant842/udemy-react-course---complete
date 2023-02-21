//Custom Hook
import useForm from "../hooks/use-form";

const BasicForm = (props) => {
    //Helper functions
    const isNotEmpty = (input) => input.trim().length !== 0;
    const isEmail = (input) => input.includes("@");
    const resetInputs = () => {
        resetNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    //input management
    const {
        enteredValue: enteredName,
        valueIsValid: enteredNameIsValid,
        hasError: nameInputHaserror,
        inputClasses: nameInputClasses,
        inputChangeHandler: nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
    } = useForm(isNotEmpty);

    const {
        enteredValue: enteredLastName,
        valueIsValid: enteredLastNameIsValid,
        hasError: lastNameInputHaserror,
        inputClasses: lastNameInputClasses,
        inputChangeHandler: lastNameInputChangeHandler,
        inputBlurHandler: lastNameInputBlurHandler,
        reset: resetLastNameInput,
    } = useForm(isNotEmpty);

    const {
        enteredValue: enteredEmail,
        valueIsValid: enteredEmailIsValid,
        hasError: emailInputHaserror,
        inputClasses: emailInputClasses,
        inputChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
    } = useForm(isEmail);

    let formIsValid = false;

    if (enteredNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    //Submit Handler
    const onFormSubmitHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }
        console.log(enteredName, enteredLastName, enteredEmail);
        resetInputs();
    };

    return (
        <form onSubmit={onFormSubmitHandler}>
            <div className="control-group">
                <div className={nameInputClasses}>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={nameInputChangeHandler}
                        value={enteredName}
                        onBlur={nameInputBlurHandler}
                    />
                    {nameInputHaserror && (
                        <p className="error-text">Please enter a valid name.</p>
                    )}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={lastNameInputChangeHandler}
                        value={enteredLastName}
                        onBlur={lastNameInputBlurHandler}
                    />
                    {lastNameInputHaserror && (
                        <p className="error-text">Please enter a valid name.</p>
                    )}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="name">E-Mail Address</label>
                <input
                    type="text"
                    id="name"
                    onChange={emailInputChangeHandler}
                    value={enteredEmail}
                    onBlur={emailInputBlurHandler}
                />
                {emailInputHaserror && (
                    <p className="error-text">Please enter a valid name.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
