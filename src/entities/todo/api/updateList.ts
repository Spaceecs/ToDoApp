import { updateDoc, doc } from "firebase/firestore";
import {db} from "../../../shared";

export async function updateTodoList(id: string, name: string): Promise<void> {
    await updateDoc(doc(db, "todoLists", id), { name });
}
