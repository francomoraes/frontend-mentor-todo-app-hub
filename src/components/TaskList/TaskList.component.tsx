import React, { useEffect, useRef } from 'react';
import './TaskList.styles.scss';
import TaskItem from '../TaskItem/TaskItem.component';
import { useTaskList } from '../../context/TaskListContext';

const TaskList = () => {
    const { taskList, setTaskList }: any = useTaskList();
    const [currentActiveButton, setCurrentActiveButton] =
        React.useState('btn-all');

    const [finalTaskList, setFinalTaskList] = React.useState([]);

    const activeTaskList = taskList.filter(
        (task: any) => task.completed === false
    );

    const handleActiveClass = (buttonId: string) => {
        document.getElementById(buttonId)?.classList.add('active');
        document.querySelectorAll('button').forEach((button) => {
            if (button.id !== buttonId) {
                button.classList.remove('active');
            }
        });
        setCurrentActiveButton(buttonId);
    };

    const handleShowCompleted = () => {
        const updatedTaskList = taskList.filter(
            (task: any) => task.completed === true
        );
        setFinalTaskList(updatedTaskList);
        handleActiveClass('btn-completed');
    };

    const handleShowActive = () => {
        const updatedTaskList = taskList.filter(
            (task: any) => task.completed === false
        );
        setFinalTaskList(updatedTaskList);
        handleActiveClass('btn-active');
    };

    const handleShowAll = () => {
        setFinalTaskList(taskList);
        handleActiveClass('btn-all');
    };

    const handleClearCompleted = () => {
        const updatedTaskList = taskList.filter(
            (task: any) => task.completed === false
        );
        setTaskList(updatedTaskList);
        setFinalTaskList(updatedTaskList);
    };

    useEffect(() => {
        setFinalTaskList(taskList);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        document.getElementById(currentActiveButton)?.click();
    }, [taskList]);

    useEffect(() => {
        handleActiveClass('btn-all');
    }, []);

    //drag and drop - start
    const dragOrigin = useRef<number | null>();
    const dragTarget = useRef<number | null>();

    function onDragStart(index: number) {
        dragOrigin.current = index;
    }

    function onDragEnter(index: number) {
        dragTarget.current = index;

        const tempList = [...taskList];

        const newList = tempList.map((item) => {
            return {
                id: item.id,
                task: item.task,
                completed: item.completed,
                isDragging: false
            };
        });

        newList[index].isDragging = true;

        setTaskList(newList);
    }

    function onDragEnd() {
        const tempList = [...taskList];

        const itemDragging = tempList[dragOrigin.current!];

        tempList.splice(dragOrigin.current!, 1);
        tempList.splice(dragTarget.current!, 0, itemDragging);

        dragOrigin.current = null;
        dragTarget.current = null;

        const newList = tempList.map((item) => {
            return {
                id: item.id,
                task: item.task,
                completed: item.completed,
                isDragging: false
            };
        });

        setTaskList(newList);
    }
    //drag and drop - end

    return (
        <div>
            <ul draggable>
                {[...finalTaskList].map((task: any, index: number) => (
                    <>
                        {task.isDragging &&
                            dragOrigin.current! > dragTarget.current! && (
                                <li className="placeholder">Drop here</li>
                            )}
                        <li
                            key={task.id}
                            className="draggable"
                            draggable
                            onDragStart={() => onDragStart(index)}
                            onDragEnter={() => onDragEnter(index)}
                            onDragEnd={() => onDragEnd()}
                        >
                            <TaskItem task={task} />
                        </li>
                        {task.isDragging &&
                            dragOrigin.current! < dragTarget.current! && (
                                <li className="placeholder">Drop here</li>
                            )}
                    </>
                ))}
            </ul>
            <footer className="task-list-footer">
                <p className="items-left">{activeTaskList.length} items left</p>
                <button id="btn-all" onClick={handleShowAll}>
                    All
                </button>
                <button id="btn-active" onClick={handleShowActive}>
                    Active
                </button>
                <button id="btn-completed" onClick={handleShowCompleted}>
                    Completed
                </button>
                <button
                    className="clear-completed"
                    onClick={handleClearCompleted}
                >
                    Clear Completed
                </button>
            </footer>
        </div>
    );
};

export default TaskList;
