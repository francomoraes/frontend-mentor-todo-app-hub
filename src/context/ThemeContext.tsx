import { createContext, useState, useContext } from 'react';

export const ThemeContext: any = createContext(null);

const ThemeContextProvider = ({ children }: any) => {
    const [theme, setTheme] = useState('dark');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeContextProvider');
    }

    return context;
};

export { ThemeContextProvider, useTheme };
