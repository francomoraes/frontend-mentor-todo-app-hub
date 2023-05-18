import { useState } from 'react';
import './TaskItem.styles.scss';
import { ReactComponent as CheckIcon } from '/public/assets/icon-check.svg';
import { ReactComponent as CrossIcon } from '/public/assets/icon-cross.svg';
import { useTaskList } from '../../context/TaskListContext';

interface Props {
    task: {
        id: number;
        task: string;
        completed: boolean;
    };
}

const crossIconStyle = {
    marginRight: '15px',
    width: '30px',
    cursor: 'pointer',
    zIndex: 1
};

const TaskItem: React.FC<Props> = ({ task }) => {
    const { id, completed } = task;
    const [checked, setChecked] = useState(completed);

    const { taskList, setTaskList }: any = useTaskList();

    const handleToggle = () => {
        setChecked(!checked);
        const updatedTaskList = taskList.map((task: any) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        });
        setTaskList(updatedTaskList);
    };

    const handleDelete = () => {
        const updatedTaskList = taskList.filter((task: any) => task.id !== id);
        setTaskList(updatedTaskList);
    };

    return (
        <div className="task-item-container">
            <span id={String(id)} onClick={handleToggle}>
                <button
                    className={checked ? 'checkButton checked' : 'checkButton'}
                >
                    {checked && <CheckIcon style={{ width: '100%' }} />}
                </button>
                {checked ? <s>{task.task}</s> : <span>{task.task}</span>}
            </span>
            <CrossIcon style={crossIconStyle} onClick={handleDelete} />
        </div>
    );
};

export default TaskItem;
