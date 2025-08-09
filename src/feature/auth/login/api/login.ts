import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, USER_TOKEN_KEY, USER_EMAIL_KEY, USER_PASSWORD_KEY} from "../../../../shared";
import * as SecureStore from 'expo-secure-store';

export async function login(email: string, password: string) {
    console.log("Login Start")
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_EMAIL_KEY, email);
    await SecureStore.setItemAsync(USER_PASSWORD_KEY, password);
    console.log("Login End")
    return userCredential.user;
}
