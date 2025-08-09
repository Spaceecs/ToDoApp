import {auth, USER_EMAIL_KEY, USER_PASSWORD_KEY, USER_TOKEN_KEY} from '../../../../shared';
import { signOut } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

export async function logout() {
    await signOut(auth);
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_EMAIL_KEY);
    await SecureStore.deleteItemAsync(USER_PASSWORD_KEY);
}
