import {StyleSheet, View} from "react-native";
import {CreateTodoForm} from "../../feature";
import {Button, TodosNavigationProp} from "../../shared";
import {useNavigation, useRoute} from "@react-navigation/native";

export function CreateTodo() {

    const navigation = useNavigation<TodosNavigationProp>();

    const route = useRoute();
    const { todoListId } = route.params as { todoListId: string };

    return(
        <View style={styles.container}>
            <Button onPress={() => navigation.goBack()} disabled={false}>
                back
            </Button>
            <CreateTodoForm todoListId={todoListId}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    }
})