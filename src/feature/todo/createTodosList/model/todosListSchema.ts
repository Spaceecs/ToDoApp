import * as Yup from "yup";

export const TodoListSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too small').required('Required'),
});