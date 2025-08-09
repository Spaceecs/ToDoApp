import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import {useNavigation} from '@react-navigation/native';
import {createTodo} from "../api/createTodo";
import {todoSchema} from "../model/TodoSchema";
import {Button} from "../../../../shared";

type FormValues = {
    title: string;
    text: string;
    completed: boolean;
    todoListId: string;
};

type Props = {
    todoListId: string;
};

export const CreateTodoForm: React.FC<Props> = ({ todoListId }) => {
    const navigation = useNavigation();

    const initialValues: FormValues = {
        title: '',
        text: '',
        completed: false,
        todoListId: todoListId,
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            await createTodo(values);
            navigation.goBack();
            console.log("Hello")
        } catch (error) {
            console.error("Failed to create todo", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={todoSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.container}>
                    <TextInput
                        placeholder="Title"
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        style={styles.input}
                    />
                    {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

                    <TextInput
                        placeholder="Text"
                        value={values.text}
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        style={styles.input}
                    />
                    {touched.text && errors.text && <Text style={styles.error}>{errors.text}</Text>}

                    <Button
                        onPress={() => setFieldValue("completed", !values.completed)}
                        disabled={false}
                    >
                        {values.completed ? "Mark as Incomplete" : "Mark as Complete"}
                    </Button>

                    <Button onPress={() => handleSubmit()} disabled={false} >
                        Create Todo
                    </Button>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        borderRadius: 6,
    },
    error: {
        color: 'red',
    },
});
