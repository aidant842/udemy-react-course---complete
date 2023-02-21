import { useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
//Components
import Card from "./Card";
import Button from "./Button";
import ErrorModal from "./ErrorModal";
import Wrapper from "./Helpers/Wrapper";

const UserForm = ({ setUsers, errorState, setErrorState }) => {
    //Refs
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    //Event Handlers
    const onSubmitHandler = (e) => {
        e.preventDefault();
        //Storing Reg values
        const enteredName = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        //Checking for error state
        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
            setErrorState({
                title: "Invalid Input",
                message: "Please enter a valid name and age (non-empty values)",
                bool: true,
            });
            return;
        }

        if (enteredAge < 1) {
            setErrorState({
                title: "Invalid Age",
                message: "Please enter a valid age (> 0)",
                bool: true,
            });
            return;
        }

        //Setting UserData
        const userData = {
            id: uuidv4(),
            name: enteredName,
            age: +enteredAge,
        };

        //Setting User State
        setUsers((prevState) => {
            return [...prevState, userData];
        });

        //Clearing input Values on submit
        nameInputRef.current.value = "";
        ageInputRef.current.value = "";
    };
    return (
        <Wrapper>
            {errorState.bool && (
                <ErrorModal
                    title={errorState.title}
                    message={errorState.message}
                    errorState={errorState}
                    setErrorState={setErrorState}
                />
            )}
            <Card>
                <StyledUserForm onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref={nameInputRef} />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" ref={ageInputRef} />
                    </div>
                    <Button type="submit" buttonText="Add User" />
                </StyledUserForm>
            </Card>
        </Wrapper>
    );
};

export default UserForm;

const StyledUserForm = styled.form`
    margin: 0.5rem 0;
    div {
        margin: 0.5rem 0;
    }
    div input,
    select,
    textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }
    div label {
        display: inline-block;
        margin: 0.5rem 0;
    }
`;
