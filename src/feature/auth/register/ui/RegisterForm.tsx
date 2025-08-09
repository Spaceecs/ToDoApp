import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { register } from '../api/register';
import { registerSchema } from '../model/RegisterSchema';
import {Button, TodosListsNavigationProp} from '../../../../shared';

export function RegisterForm() {
    const navigation = useNavigation<TodosListsNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={registerSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await register(
                            values.email,
                            values.password,
                        );

                    } catch (error: any) {
                        setErrors({
                            email: error.message || 'Помилка реєстрації',
                        });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text>Email</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {touched.email && errors.email && (
                                <Text style={styles.error}>{errors.email}</Text>
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            {touched.password && errors.password && (
                                <Text style={styles.error}>{errors.password}</Text>
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text>Password confirmation</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text style={styles.error}>{errors.confirmPassword}</Text>
                            )}
                        </View>

                        <Button onPress={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Wait...' : 'Sign up'}
                        </Button>
                    </View>
                )}
            </Formik>

            <View style={styles.bottom}>
                <Text style={{ marginBottom: 8 }}>Already registered?</Text>
                <Button onPress={() => navigation.navigate('LoginScreen')} disabled={false}>
                    Увійти
                </Button>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        gap: 12,
    },
    inputGroup: {
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 8,
        padding: 10,
        marginTop: 4,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    bottom: {
        marginTop: 24,
        alignItems: 'center',
    },
});
