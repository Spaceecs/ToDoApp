import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { TodoListSchema } from "../model/todosListSchema"
import {createTodosList} from "../api/createTodosList";
import {auth, Label} from "../../../../shared"

type CreateTodosListFormProps = {
    onSuccess?: () => void;
};

export function CreateTodosListForm({ onSuccess }: CreateTodosListFormProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Button title="Create List" onPress={() => setVisible(true)} />

            <Modal transparent animationType="fade" visible={visible}>
                <View style={styles.overlay}>
                    <View style={styles.modalView}>
                        <Label>New List</Label>

                        <Formik
                            initialValues={{ name: '' }}
                            validationSchema={TodoListSchema}
                            onSubmit={async (values) => {
                                const currentUser = auth.currentUser;
                                if (!currentUser) return;

                                await createTodosList(values.name, currentUser.uid);

                                setVisible(false);

                                if (onSuccess) {
                                    onSuccess();
                                }
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <TextInput
                                        placeholder="List name"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        style={styles.input}
                                    />
                                    {touched.name && errors.name && (
                                        <Text style={styles.errorText}>{errors.name}</Text>
                                    )}
                                    <Button title="Create" onPress={() => handleSubmit()} />
                                    <Button title="Cancel" onPress={() => setVisible(false)} />
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5
    },
    errorText: {
        color: 'red',
        marginBottom: 5
    },
});
