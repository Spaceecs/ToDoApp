import {TodoProps} from "../model/todo.types";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../../shared";

export async function getTodos(todoListId: string): Promise<TodoProps[]> {
    const q = query(collection(db, "todos"), where("todoListId", "==", todoListId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<TodoProps, "id">) }));
}
