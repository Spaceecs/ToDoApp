import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {TodoProps} from "../model/todo.types";

type CardProps = {
    todo: TodoProps;
    onToggleComplete?: () => void;
    onDelete?: () => void;
};

export function TodoCard({ todo, onToggleComplete, onDelete }: CardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={[styles.title, todo.completed && styles.completed]}>{todo.title}</Text>
                <Text>{todo.text}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onToggleComplete}>
                    <Text>{todo.completed ? "✅ Done" : "⬜ Incomplete"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={{ color: "red" }}>🗑 Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        backgroundColor: "#ffffff",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    completed: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    }
});
