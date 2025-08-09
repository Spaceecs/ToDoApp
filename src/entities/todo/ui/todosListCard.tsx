import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {TodoListProps} from "../model/todo.types";

type ListCardProps = {
    list: TodoListProps;
    onOpen?: () => void;
    onDelete?: () => void;
};

export function TodosListCard({ list, onOpen, onDelete }: ListCardProps) {
    return (
        <TouchableOpacity onPress={onOpen} style={styles.card}>
            <Text style={styles.title}>{list.name}</Text>
            <TouchableOpacity onPress={onDelete}>
                <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
        padding: 14,
        marginVertical: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    delete: {
        color: "red",
        fontSize: 18,
    },
});
