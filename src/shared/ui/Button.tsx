import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onPress: () => void;
    disabled: boolean;
};

export function Button({ children, onPress, disabled = false }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled}>
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
