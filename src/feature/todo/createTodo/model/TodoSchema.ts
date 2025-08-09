import * as Yup from 'yup';

export const todoSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    text: Yup.string().required('Text is required'),
    completed: Yup.boolean(),
});
