// Primirives: number, string, boolean
// more complex types: arrays, objects
// function types, parameters

//Primitives

let age: number = 12;

let userName: string = "user123";

let isInstructor: boolean = true;

//more complex types

//Array of strings
let hobbies: string[] = ["Sports", "Cooking"];

let person: {
    name: string;
    age: number;
};

person = {
    name: "Max",
    age: 32,
};

// Causes error because doesn't match object pattern above
/* person = {
    isEmployee: true,
}; */

// Array of objects with this pattern
let people: {
    name: string;
    age: number;
}[];

// Type inference

let course = "React - The Complete Guide";

// Error because type string was inferred when initializing the variable
// This method should be preffered
/* course = 12345; */

// Union types

let union: string | number = "This is a union type";

// Doesn't error because union is allowed to be string or number
union = 1234;

// Type Aliases

type Human = {
    name: string;
    age: number;
};

let human: Human;

// Functions and types

function addNumbers(a: number, b: number) {
    return a + b;
}

function printOutput(value: any) {
    console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// Without the use of Generics (<T> or any identifier) this would only throw and error at runtime
// However, with Generics, this will throw an error in the IDE, as split cannot be used on type number

/* updatedArray[0].split(""); */
