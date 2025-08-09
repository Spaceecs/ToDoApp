import {db} from "../../../../shared";
import { collection, addDoc } from 'firebase/firestore';

export async function createTodosList(name: string, creatorId: string) {
    try {
        const docRef = await addDoc(collection(db, 'todoLists'), {
            name,
            creatorId,
        });

        console.log('Todo list created with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error creating todo list: ', error);
        throw error;
    }
}