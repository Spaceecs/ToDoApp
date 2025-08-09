import {StyleSheet, View, FlatList} from "react-native";
import React, {useCallback, useEffect, useState} from 'react';
import {auth, Label} from "../../shared";
import {deleteTodoList, getTodoLists, TodoListProps, TodosListCard} from "../../entities";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {TodosListsNavigationProp} from "../../shared";
import {CreateTodosListForm} from "../../feature";

export function TodosLists() {
    const navigation = useNavigation<TodosListsNavigationProp>();
    const [todoLists, setTodoLists] = useState<TodoListProps[]>([]);

    const refreshTodoLists = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        const response = await getTodoLists(currentUser.uid);
        setTodoLists(response);
    };

    useEffect(() => {
        refreshTodoLists();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={todoLists}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TodosListCard
                        list={item}
                        onOpen={() => navigation.navigate("TodosList", { todoListId: item.id, todoListName: item.name })}
                        onDelete={async () => {
                            await deleteTodoList(item.id);
                            refreshTodoLists();
                        }}
                    />
                )}
                ListHeaderComponent={<Label>Todos Lists</Label>}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
            <View style={styles.fixedButton}>
                <CreateTodosListForm onSuccess={refreshTodoLists}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    fixedButton: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    }
})
