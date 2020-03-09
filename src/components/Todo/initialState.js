import { v4 as uuidv4 } from "uuid";

export const initialState = [
  { id: uuidv4(), task: "Learn ReactJS", completed: false },
  { id: uuidv4(), task: "Learn GraphQL", completed: false },
  { id: uuidv4(), task: "Learn Rust", completed: false }
];
