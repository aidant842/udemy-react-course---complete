import React, { useState } from "react";
import styled from "styled-components";
//Components
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";
/* import ErrorModal from "./components/ErrorModal"; */
function App() {
    //State
    const [users, setUsers] = useState([]);
    const [errorState, setErrorState] = useState(false);
    return (
        <>
            <MainDiv>
                <Container>
                    <UserForm
                        users={users}
                        setUsers={setUsers}
                        errorState={errorState}
                        setErrorState={setErrorState}
                    />
                    {users.length > 0 && (
                        <UsersList users={users} setUsers={setUsers} />
                    )}
                </Container>
            </MainDiv>
        </>
    );
}

const MainDiv = styled.div`
    background: #3b3b3b;
    height: 100vh;
`;

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 2rem 0;
`;

export default App;
