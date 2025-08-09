import {createUserWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import {auth, db, USER_TOKEN_KEY, USER_EMAIL_KEY, USER_PASSWORD_KEY} from "../../../../shared";
import * as SecureStore from 'expo-secure-store';

export async function register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await userCredential.user.getIdToken();
    await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_EMAIL_KEY, email);
    await SecureStore.setItemAsync(USER_PASSWORD_KEY, password);

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
    });

    return user;
}
