import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../../../shared";

export async function deleteTodo(id: string): Promise<void> {
    await deleteDoc(doc(db, "todos", id));
}
