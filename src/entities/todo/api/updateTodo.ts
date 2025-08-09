import { updateDoc, doc } from "firebase/firestore";
import {TodoProps} from "../model/todo.types";
import {db} from "../../../shared";

export async function updateTodo(id: string, data: Partial<Omit<TodoProps, "id" | "todoListId">>): Promise<void> {
    await updateDoc(doc(db, "todos", id), data);
}
