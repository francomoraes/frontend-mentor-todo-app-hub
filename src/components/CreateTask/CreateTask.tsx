import { useState } from 'react';
import './styles.css';
import { ReactComponent as CheckIcon } from '/public/assets/icon-check.svg';

const CreateTask = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="createTask-container">
            <button
                onClick={() => setChecked(!checked)}
                className={checked ? 'checkButton checked' : 'checkButton'}
            >
                {checked && <CheckIcon style={{ width: '100%' }} />}
            </button>
            <input type="text" placeholder="Create a new todo..." />
        </div>
    );
};

export default CreateTask;
