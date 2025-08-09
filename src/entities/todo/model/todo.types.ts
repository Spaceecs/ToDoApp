export type TodoProps = {
    id: string;
    title: string
    text: string;
    completed: boolean;
    todoListId: string;
}

export type TodoListProps = {
    id: string;
    name: string;
    creatorId: string;
}
