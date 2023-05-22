import React, { useEffect } from 'react';
import './TaskList.styles.scss';
import TaskItem from '../TaskItem/TaskItem.component';
import { useTaskList } from '../../context/TaskListContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

    function handleDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(finalTaskList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFinalTaskList(items);
        setTaskList(items);
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="task-list">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {[...finalTaskList].map(
                                (task: any, index: number) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <li
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <TaskItem task={task} />
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
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
