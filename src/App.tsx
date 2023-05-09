import './App.css';
import CreateTask from './components/CreateTask/CreateTask';
import Header from './components/Header/Header';
import { useTheme } from './context/ThemeContext';

function App() {
    const { theme }: any = useTheme();

    return (
        <div className="App" id={theme}>
            <div className="background" />
            <div className="container">
                <Header />
                <CreateTask />
            </div>
            <div className="desktop-picture" />
        </div>
    );
}

export default App;
