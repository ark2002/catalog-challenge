import ThemeToggle from "./layout/Theme/ThemeToggle";
import { useState } from "react";
import { contentTabs } from "../utils/consts";
import TabContent from "./layout/TabContent";
import Tabs from "./ui/Tabs";
import CoinHeading from "./layout/CoinHeading";

function PricePage() {

    const [activeTabIndex, setActiveTabIndex] = useState(0)

    return (
        <div className="min-h-screen w-full bg-background text-text-primary transition-colors duration-200 relative">
            <div className=" absolute top-7.5 right-7.5">
                <ThemeToggle />
            </div>
            <div className="p-7.5 pb-0">
                <CoinHeading />
                <div className="mt-5">
                    <Tabs activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} tabs={contentTabs} type="outlined" />
                </div>
            </div>
            <TabContent tabs={contentTabs} activeTabIndex={activeTabIndex} />
        </div>
    )
}

export default PricePage;
