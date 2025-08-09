
import { collection, query, where, getDocs } from "firebase/firestore";
import {TodoListProps} from "../model/todo.types";
import {db} from "../../../shared";

export async function getTodoLists(userId: string): Promise<TodoListProps[]> {
    const q = query(collection(db, "todoLists"), where("creatorId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<TodoListProps, "id">) }));
}
