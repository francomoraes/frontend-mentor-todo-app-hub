import { useState } from 'react';
import './CreateTask.styles.scss';
import { ReactComponent as CheckIcon } from '/public/assets/icon-check.svg';
import { useTaskList } from '../../context/TaskListContext';

const CreateTask = () => {
    const [checked, setChecked] = useState(false);
    const { taskList, setTaskList }: any = useTaskList();

    const [inputText, setInputText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleClick = () => {
        if (inputText === '') return;
        setChecked(!checked);
        setTaskList([
            ...taskList,
            {
                id: taskList.length + 1,
                task: inputText,
                completed: false
            }
        ]);
        setInputText('');
        setTimeout(() => {
            setChecked(false);
        }, 500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className="createTask-container">
            <button
                onClick={handleClick}
                className={checked ? 'checkButton checked' : 'checkButton'}
            >
                {checked && <CheckIcon style={{ width: '100%' }} />}
            </button>
            <input
                type="text"
                placeholder="Create a new todo..."
                onChange={handleChange}
                value={inputText}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default CreateTask;
