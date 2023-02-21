import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import "./Search.css";

const Search = React.memo((props) => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState("");
    const inputRef = useRef();
    const { isLoading, data, error, sendRequest, clear } = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query =
                    enteredFilter.length === 0
                        ? ""
                        : `?orderBy="title"&equalTo="${enteredFilter}"`;
                const url =
                    "https://react-http-25b7f-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json" +
                    query;

                sendRequest(url, "GET");
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, sendRequest]);

    useEffect(() => {
        if (!isLoading && !error && data) {
            const loadedIngredients = [];

            for (const key in data) {
                loadedIngredients.push({
                    id: key,
                    title: data[key].title,
                    amount: data[key].amount,
                });
            }

            onLoadIngredients(loadedIngredients);
        }
    }, [data, isLoading, error, onLoadIngredients]);

    return (
        <section className="search">
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    {isLoading && <LoadingIndicator />}
                    <input
                        ref={inputRef}
                        type="text"
                        value={enteredFilter}
                        onChange={(event) =>
                            setEnteredFilter(event.target.value)
                        }
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
