import { doc, getDoc, updateDoc } from "firebase/firestore";
import {db} from "../../../shared";

export async function toggleComplete(todoId: string) {
    try {
        const todoRef = doc(db, "todos", todoId);
        const todoSnap = await getDoc(todoRef);

        if (!todoSnap.exists()) {
            throw new Error("Todo not found");
        }

        const currentCompleted = todoSnap.data().completed;
        await updateDoc(todoRef, {
            completed: !currentCompleted,
        });

        console.log(`Todo completion toggled to ${!currentCompleted}`);
    } catch (error) {
        console.error("Error toggling todo completion:", error);
        throw error;
    }
}
