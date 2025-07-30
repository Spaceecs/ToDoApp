import {Text, StyleSheet} from "react-native";
import {ReactNode} from "react";

type LabelProps = {
    children: ReactNode;
};

export function Label({children}: LabelProps) {
    return(
        <Text style={styles.text}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: "400",
        fontSize: 24,
        color: "#000000"
    }
})