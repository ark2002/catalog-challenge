import { motion } from "framer-motion";

export default function Tabs({
    activeTabIndex,
    setActiveTabIndex,
    tabs,
    type = "outlined" // Default type is "outlined"
}: {
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
    tabs: { label: string; value: number | string }[];
    type?: "outlined" | "contained"; // Tab type (outlined or contained)
}) {
    return (
        <div className="text-xs font-medium text-center text-text-secondary relative">
            <ul className={`flex justify-start ${type === "outlined" ? "gap-4" : "gap-0"}`}>
                {tabs.map((tab, index) => (
                    <li key={tab.label} className="relative">
                        <button
                            onClick={() => setActiveTabIndex(index)}
                            className={`
                py-1.5 cursor-pointer font-medium transition-colors duration-200
                ${type === "outlined" ? (
                                    activeTabIndex === index
                                        ? "text-text-primary"
                                        : "text-text-secondary hover:text-text-primary"
                                ) : (
                                    activeTabIndex === index
                                        ? "bg-primary text-background"
                                        : "bg-transparent text-text-secondary hover:bg-text-tertiary hover:text-background"
                                )}
                ${type === "contained" ? "rounded-md px-4 py-2" : ""}
              `}
                        >
                            {tab.label}
                            {type === "outlined" && activeTabIndex === index && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-[5px] h-0.5 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
