import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export type DrawerParamList = {
    Home: undefined;
};

export type MainParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    DrawerRoot: NavigatorScreenParams<DrawerParamList>;
    TodosLists: undefined;
    TodosList: { todoListId: string, todoListName: string };
    CreateTodo: { todoListId: string};
};

export type TodosListsNavigationProp = NativeStackNavigationProp<MainParamList, "TodosLists">;
export type TodosNavigationProp = NativeStackNavigationProp<MainParamList, "TodosList">;

export type DrawerNavigationProps = DrawerNavigationProp<DrawerParamList>;
