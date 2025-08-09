import React from 'react';
import {LoginScreen, RegisterScreen, TodosList, TodosLists} from '../../screens';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DrawerNavigator} from "./DrawerNavigation";
import {MainParamList} from "../../shared";
import {CreateTodo} from "../../screens/todos/CreateTodo";

type Props = {
    isAuth: boolean;
};

const Stack = createNativeStackNavigator<MainParamList>();

export function MainNavigator({ isAuth }: Props) {
    return (
        <Stack.Navigator>
            {isAuth ? (
                <>
                    <Stack.Screen
                        name="DrawerRoot"
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TodosLists"
                        component={TodosLists}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="TodosList"
                        component={TodosList}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="CreateTodo"
                        component={CreateTodo}
                        options={{ headerShown: true }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}
