import { useCallback, useEffect, useState } from "react";
import { CirclePlus, Maximize2, X, RefreshCcw } from "lucide-react";
import Button from "../../ui/Button";
import { timeFrameTabs } from "../../../utils/consts";
import Tabs from "../../ui/Tabs";
import { motion, AnimatePresence } from "framer-motion";
import { TradingChart } from "./TardingChart";
import { useCoin } from "../../../context/CoinContext";
import { getCoinChartData } from "../../../utils/api";

export interface ChartPoint {
    time: number;
    value: number;
}

export default function ChartContainer() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { state } = useCoin()
    const { coinId, currency, selectedCoin } = state

    const [data, setData] = useState<{ priceData: ChartPoint[]; volumeData: ChartPoint[] }>({
        priceData: [],
        volumeData: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const result = await getCoinChartData({
                coinId,
                currency,
                days: timeFrameTabs[activeTabIndex].value,
            });

            if (!result) throw new Error("No data");

            const prices = result.prices;
            const volumes = result.total_volumes;

            // Prepare price data and remove duplicates (keep the last one if there are duplicates)
            const pricePoints: ChartPoint[] = prices
                .map(([timestamp, price]: [number, number]) => ({
                    time: Math.floor(timestamp / 1000),
                    value: parseFloat(price.toFixed(2)),
                }))
                .sort((a: ChartPoint, b: ChartPoint) => a.time - b.time)
                .filter((value: ChartPoint, index: number, self: ChartPoint[]) =>
                    index === self.findIndex((t) => t.time === value.time)
                );

            // Prepare volume data and remove duplicates
            const volumePoints: ChartPoint[] = volumes
                .map(([timestamp, price]: [number, number]) => ({
                    time: Math.floor(timestamp / 1000),
                    value: parseFloat(price.toFixed(2)),
                }))
                .sort((a: ChartPoint, b: ChartPoint) => a.time - b.time)
                .filter((value: ChartPoint, index: number, self: ChartPoint[]) =>
                    index === self.findIndex((t) => t.time === value.time)
                );

            setData({ priceData: pricePoints, volumeData: volumePoints });
        } catch (err) {
            console.error("Failed to fetch chart data", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [coinId, currency, activeTabIndex]);


    useEffect(() => {
        fetchData();
    }, [coinId, currency, activeTabIndex, fetchData]);

    const toggleFullScreen = () => {
        setIsFullScreen(prev => !prev);
    };

    const change = selectedCoin?.price_change_percentage_24h || 0
    const changeClass = change >= 0 ? "text-success" : "text-error"

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isFullScreen ? "fullscreen" : "normal"}
                initial={{ opacity: 0, scale: isFullScreen ? 1.1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: isFullScreen ? 0.95 : 1.1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`flex flex-col ${isFullScreen
                    ? "fixed inset-0 bg-background z-50"
                    : "w-full h-full"
                    }`}
            >
                <div className={`relative w-full ${isFullScreen ? "flex-1 p-7.5" : "h-[300px] p-0"}`}>
                    {isFullScreen && (
                        <button
                            onClick={toggleFullScreen}
                            className="absolute top-2 right-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}

                    <div className="flex items-center gap-3.75 w-full">
                        {isFullScreen ? (
                            <div className="flex items-center space-x-3">
                                <img
                                    src={selectedCoin?.image}
                                    alt={selectedCoin?.name}
                                    className="w-6 h-6 rounded-full border-2 border-text-tertiary"
                                />
                                <span className="text-md font-semibold text-text-primary">
                                    {selectedCoin?.name} <span className="text-sm text-text-secondary">({selectedCoin?.symbol?.toUpperCase()})</span>
                                </span>
                                <span className={`text-sm font-semibold ${changeClass}`}>
                                    {change.toFixed(2)}%
                                </span>
                            </div>
                        ) : (
                            <Button label="Fullscreen" icon={Maximize2} onClick={toggleFullScreen} />
                        )}
                        <Button label="Compare" icon={CirclePlus} />
                        <div className="ml-auto mr-8">
                            <Tabs
                                tabs={timeFrameTabs}
                                activeTabIndex={activeTabIndex}
                                setActiveTabIndex={(value) => setActiveTabIndex(value)}
                                type="contained"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="w-full h-[400px] mt-6 bg-text-tertiary rounded-xl animate-pulse" />
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-red-500 mt-6">
                            <p>Failed to load chart data.</p>
                            <Button
                                icon={RefreshCcw}
                                label="Retry"
                                onClick={fetchData}
                                className="mt-4"
                            />
                        </div>
                    ) : (
                        <TradingChart priceData={data.priceData} volumeData={data.volumeData} />
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
