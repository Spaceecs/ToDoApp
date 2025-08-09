import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../../../shared";

export async function deleteTodoList(id: string): Promise<void> {
    await deleteDoc(doc(db, "todoLists", id));
}
