import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import ChartContainer from "./Chart/ChartContainer";
import SummaryContainer from "./Summary/SummaryContainer";
import StatisticsContainer from "./Statistics/StatsContainer";
import AnalysisContainer from "./Analysis/AnalysisContainer";

type TabComponentProps = {
    tabs: { label: string; value: string }[];
    activeTabIndex: number;
}

export default function TabContent({ tabs, activeTabIndex }: TabComponentProps) {
    const previousIndex = useRef(activeTabIndex)
    const [hasMounted, setHasMounted] = useState(false)

    const direction = activeTabIndex > previousIndex.current ? 1 : -1

    useEffect(() => {
        if (!hasMounted) {
            setHasMounted(true)
        }
        previousIndex.current = activeTabIndex
    }, [activeTabIndex, hasMounted])

    return (
        <motion.div className="flex flex-col mt-1 p-7.5 gap-3 text-text-primary overflow-hidden border-t border-t-text-tertiary">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={tabs[activeTabIndex].value}
                    initial={!hasMounted ? { opacity: 0 } : { opacity: 0, x: 40 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 * direction }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    {tabs[activeTabIndex].value === "summary" && <SummaryContainer />}
                    {tabs[activeTabIndex].value === "chart" && <ChartContainer />}
                    {tabs[activeTabIndex].value === "statistics" && <StatisticsContainer />}
                    {tabs[activeTabIndex].value === "analysis" && <AnalysisContainer />}
                    {tabs[activeTabIndex].value === "settings" && <>settings</>}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
}
