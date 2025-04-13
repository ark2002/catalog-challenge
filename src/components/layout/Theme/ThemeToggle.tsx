import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.documentElement.classList.add(savedTheme);
        } else {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setIsDarkMode(systemTheme === 'dark');
            document.documentElement.classList.add(systemTheme);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        const newTheme = isDarkMode ? 'light' : 'dark';
        html.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-background dark:bg-background text-text-primary dark:text-text-primary shadow-md hover:shadow-xl dark:shadow-white/20 transition-all duration-300 cursor-pointer hover:scale-105 border-2 border-text-primary dark:border-text-secondary"
        >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );

};

export default ThemeToggle;
