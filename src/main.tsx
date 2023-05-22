import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeContextProvider } from './context/ThemeContext.tsx';
import { TaskListContextProvider } from './context/TaskListContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeContextProvider>
        <TaskListContextProvider>
            <App />
        </TaskListContextProvider>
    </ThemeContextProvider>
);
