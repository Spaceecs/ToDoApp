import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onPress: () => void;
};

export function Button({ children, onPress }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
