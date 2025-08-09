import { db } from "../../../../shared";
import { collection, addDoc } from "firebase/firestore";
import {TodoProps} from "../../../../entities";

type CreateTodoInput = Omit<TodoProps, 'id'>;

export async function createTodo(data: CreateTodoInput) {
    try {
        const docRef = await addDoc(collection(db, "todos"), data);
        console.log("Todo created with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
}
