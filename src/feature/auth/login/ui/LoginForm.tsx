import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { loginSchema } from '../model/LoginSchema';
import { login } from '../api/login';
import {Button, Label, TodosListsNavigationProp} from '../../../../shared';

export const LoginForm = () => {
    const navigation = useNavigation<TodosListsNavigationProp>();

    return (
        <View style={styles.container}>
            <Label>Login</Label>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                         await login(
                            values.email,
                            values.password
                        );

                    } catch (error: any) {
                        setErrors({
                            password: error.message || "Login Error",
                        });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <>
                        <View style={styles.form}>
                            <View>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Enter Email"
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.error}>{errors.email}</Text>
                                )}
                            </View>

                            <View>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                    placeholder="Enter password"
                                />
                                {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                )}
                            </View>

                            <Button onPress={handleSubmit} disabled={isSubmitting}>
                                <Text style={styles.buttonText}>Sing In</Text>
                            </Button>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>No Account</Text>
                            <Button onPress={() => navigation.navigate('RegisterScreen')} disabled={isSubmitting}>
                                <Text style={styles.link}>Register</Text>
                            </Button>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        gap: 20,
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#555',
    },
    link: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
});
