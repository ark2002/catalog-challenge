import { useCallback, useEffect, useState } from "react";
import { useCoin } from "../../../context/CoinContext";
import { ChartPoint } from "../Chart/ChartContainer";
import { getCoinChartData } from "../../../utils/api";
import { AnalysisResult, analyzeCoinData } from "../../../utils/consts";

const defaultAnalysis: AnalysisResult = {
    trend: 'sideways',
    movingAverages: {
        ma7: 0,
        ma30: 0,
    },
    volatility: 0,
    whaleActivity: false,
    drawdown: 0,
    riskLevel: 'medium',
};


export default function AnalysisContainer() {
    const { state } = useCoin()
    const { coinId, currency } = state

    const [data, setData] = useState<AnalysisResult>(defaultAnalysis);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const result = await getCoinChartData({
                coinId,
                currency,
                days: 30,
            });

            if (!result) throw new Error("No data");

            const prices = result.prices;
            const volumes = result.total_volumes;

            const pricePoints: ChartPoint[] = prices
                .map(([timestamp, price]: [number, number]) => ({
                    time: Math.floor(timestamp / 1000),
                    value: parseFloat(price.toFixed(2)),
                }))
                .sort((a: ChartPoint, b: ChartPoint) => a.time - b.time)
                .filter((value: ChartPoint, index: number, self: ChartPoint[]) =>
                    index === self.findIndex((t) => t.time === value.time)
                );

            const volumePoints: ChartPoint[] = volumes
                .map(([timestamp, price]: [number, number]) => ({
                    time: Math.floor(timestamp / 1000),
                    value: parseFloat(price.toFixed(2)),
                }))
                .sort((a: ChartPoint, b: ChartPoint) => a.time - b.time)
                .filter((value: ChartPoint, index: number, self: ChartPoint[]) =>
                    index === self.findIndex((t) => t.time === value.time)
                );

            const analysis = analyzeCoinData(pricePoints, volumePoints);
            setData(analysis);
        } catch (err) {
            console.error("Failed to fetch chart data", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [coinId, currency]);

    useEffect(() => {
        fetchData();
    }, [coinId, currency, fetchData]);

    return (
        <div className="text-text-primary space-y-6">
            {loading ? (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-24 w-full rounded-2xl bg-text-tertiary/20 animate-pulse"
                        />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center text-error text-lg font-medium">
                    Failed to load analysis data.
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Row 1: Two columns - Trend & Risk */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Market Trend */}
                        <div className="p-5 rounded-2xl border border-text-tertiary bg-gradient-to-br from-primary/10 to-background shadow-md ring-1 ring-text-tertiary/30 space-y-2">
                            <p className="text-sm font-medium text-text-secondary">
                                Market Sentiment
                            </p>
                            <p className="text-base leading-relaxed">
                                The market is currently experiencing a{" "}
                                <span
                                    className={`font-semibold ${data.trend === "uptrend"
                                        ? "text-success"
                                        : data.trend === "downtrend"
                                            ? "text-error"
                                            : "text-text-secondary"
                                        }`}
                                >
                                    {data.trend === "uptrend"
                                        ? "strong uptrend"
                                        : data.trend === "downtrend"
                                            ? "downtrend"
                                            : "sideways movement"}
                                </span>
                                , suggesting{" "}
                                {data.trend === "sideways"
                                    ? "price consolidation or indecision."
                                    : data.trend === "uptrend"
                                        ? "positive investor sentiment."
                                        : "bearish behavior in the market."}
                            </p>
                        </div>

                        {/* Risk Level */}
                        <div className="p-5 rounded-2xl border border-text-tertiary bg-gradient-to-br from-primary/10 to-background shadow-md ring-1 ring-text-tertiary/30 space-y-2">
                            <p className="text-sm font-medium text-text-secondary">
                                Risk Level
                            </p>
                            <p className="text-base leading-relaxed">
                                The asset's risk level is{" "}
                                <span
                                    className={`font-semibold ${data.riskLevel === "low"
                                        ? "text-success"
                                        : data.riskLevel === "medium"
                                            ? "text-text-secondary"
                                            : "text-error"
                                        }`}
                                >
                                    {data.riskLevel}
                                </span>
                                , which indicates{" "}
                                {data.riskLevel === "low"
                                    ? "lower chances of major swings."
                                    : data.riskLevel === "medium"
                                        ? "a balanced opportunity-risk ratio."
                                        : "heightened risk and uncertainty."}
                            </p>
                        </div>
                    </div>

                    {/* Row 2: Full width - Volatility & Drawdown */}
                    <div className="p-5 rounded-2xl border border-text-tertiary bg-gradient-to-br from-primary/10 to-background shadow-md ring-1 ring-text-tertiary/30 space-y-2">
                        <p className="text-sm font-medium text-text-secondary">
                            Volatility & Drawdown
                        </p>
                        <p className="text-base leading-relaxed">
                            Current volatility is{" "}
                            <span className="font-semibold text-text-primary">
                                {data.volatility}%
                            </span>
                            , which means{" "}
                            {data.volatility > 50
                                ? "sharp and unpredictable price movements."
                                : data.volatility > 25
                                    ? "moderate swings in pricing."
                                    : "a relatively stable market condition."}
                        </p>
                        <p className="text-base leading-relaxed">
                            Drawdown stands at{" "}
                            <span className="font-semibold text-text-primary">
                                {data.drawdown}%
                            </span>
                            , showing the drop from the recent high to low within the period.
                        </p>
                    </div>

                    {/* Row 3: Full width - Moving Averages */}
                    <div className="p-5 rounded-2xl border border-text-tertiary bg-gradient-to-br from-primary/10 to-background shadow-md ring-1 ring-text-tertiary/30 space-y-2">
                        <p className="text-sm font-medium text-text-secondary">
                            Moving Averages
                        </p>
                        <p className="text-base leading-relaxed">
                            The 7-day moving average is{" "}
                            <span className="font-semibold text-text-primary">
                                {data.movingAverages.ma7}
                            </span>
                            , and the 30-day average is{" "}
                            <span className="font-semibold text-text-primary">
                                {data.movingAverages.ma30}
                            </span>
                            .
                        </p>
                        <p className="text-base leading-relaxed">
                            Comparing these helps track short- and long-term price trends for better entry/exit decisions.
                        </p>
                    </div>
                </div>
            )}
        </div>)



}
