import { createContext, useState, useContext } from 'react';

interface Props {
    children: React.ReactNode;
}

export const TaskListContext: any = createContext(null);

const TaskListContextProvider: React.FC<Props> = ({ children }) => {
    const tasks = localStorage.getItem('taskList')
        ? JSON.parse(localStorage.getItem('taskList')!)
        : [];

    const [taskList, setTaskList] = useState<
        { id: number; task: string; completed: boolean; isDragging: boolean }[]
    >([...tasks]);

    return (
        <TaskListContext.Provider value={{ taskList, setTaskList }}>
            {children}
        </TaskListContext.Provider>
    );
};

const useTaskList = () => {
    const context = useContext(TaskListContext);

    if (!context) {
        throw new Error(
            'useTheme must be used within a TaskListContextProvider'
        );
    }

    return context;
};

export { TaskListContextProvider, useTaskList };
