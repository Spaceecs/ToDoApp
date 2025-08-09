import {StyleSheet, View} from "react-native";
import {useCallback, useState} from "react";
import {deleteTodo, getTodos, TodoCard, TodoProps} from "../../entities";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {Button, Label, TodosNavigationProp} from "../../shared";
import {toggleComplete} from "../../entities/todo/api/toggleComplete";

export function TodosList() {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const route = useRoute();
    const navigation = useNavigation<TodosNavigationProp>()
    const { todoListId, todoListName } = route.params as { todoListId: string, todoListName: string };

    const refreshTodos = async () => {
        const response = await getTodos(todoListId);
        setTodos(response);
    };

    useFocusEffect(
        useCallback(() => {
            refreshTodos();
        }, [todoListId])
    );


    return (
        <View style={styles.container}>
            <Label>{todoListName}</Label>
            {todos.map((todo) => (
                <TodoCard
                    key={todo.id}
                    todo={todo}
                    onDelete={
                        async () => {
                            await deleteTodo(todo.id);
                            refreshTodos()
                        }
                    }
                    onToggleComplete={
                        async () => {
                            await toggleComplete(todo.id)
                            refreshTodos()
                    }}
                />
            ))}
            <Button onPress={() => navigation.navigate("CreateTodo", { todoListId })} disabled={false}>
                Create new todo
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        alignItems: "center",

    }
})