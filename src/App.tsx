import './App.scss';
import CreateTask from './components/CreateTask/CreateTask.component';
import Header from './components/Header/Header.component';
import TaskList from './components/TaskList/TaskList.component';
import { useTheme } from './context/ThemeContext';

function App() {
    const { theme }: any = useTheme();

    return (
        <div className="App" id={theme}>
            <div className="background" />
            <div className="max-width">
                <div className="container">
                    <Header />
                    <CreateTask />
                    <div className="tasks">
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
