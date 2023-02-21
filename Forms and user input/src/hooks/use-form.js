import { useReducer } from "react";
const initialInputState = {
    value: "",
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === "BLUR") {
        return { isTouched: true, value: state.value };
    }
    if (action.type === "RESET") {
        return { isTouched: false, value: "" };
    }
    return inputStateReducer;
};

const useForm = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );
    //State Slices
    /* const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false); */

    //Validation
    const valueIsValid = validateValue(inputState.value);
    const hasError = inputState.value && inputState.isTouched;

    //Change Handler
    const inputChangeHandler = (e) => {
        dispatch({ type: "INPUT", value: e.target.value });
    };

    //Blur Handler
    const inputBlurHandler = (e) => {
        dispatch({ type: "BLUR" });
    };

    //Reset values after submit
    const reset = () => {
        dispatch({ type: "RESET" });
    };

    //Input Classes
    const inputClasses = hasError ? "form-control invalid" : "form-control";

    return {
        enteredValue: inputState.value,
        valueIsValid,
        hasError,
        inputClasses,
        inputChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useForm;
