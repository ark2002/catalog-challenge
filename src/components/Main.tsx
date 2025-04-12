import ThemeToggle from "./layout/ThemeToggle";

function Main() {
    return (
        <div className="min-h-screen w-full bg-background text-text-primary transition-colors duration-300 relative">
            <div className="p-4 absolute top-1 right-1">
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Main;
