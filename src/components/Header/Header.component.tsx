import { useTheme } from '../../context/ThemeContext';
import './Header.styles.css';

const Header = () => {
    const { theme, setTheme }: any = useTheme();
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return (
        <header>
            <h1>Todo</h1>
            <button onClick={toggleTheme} className="switch" />
        </header>
    );
};

export default Header;
