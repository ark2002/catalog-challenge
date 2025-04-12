import ThemeToggle from "./layout/ThemeToggle";

function Main() {
    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative">
            <div className="p-4 absolute top-1 right-1">
                <ThemeToggle />
            </div>
        </div>
    );
}

export default Main;
