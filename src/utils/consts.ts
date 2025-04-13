import { ChartPoint } from "../components/layout/Chart/ChartContainer";

export const contentTabs = [
    { label: "Summary", value: "summary" },
    { label: "Chart", value: "chart" },
    { label: "Statistics", value: "statistics" },
    { label: "Analysis", value: "analysis" },
    { label: "Settings", value: "settings" },
]

export const timeFrameTabs = [
    { label: "1d", value: 1 },
    { label: "3d", value: 3 },
    { label: "7d", value: 7 },
    { label: "1m", value: 30 },
    { label: "6m", value: 180 },
    { label: "1y", value: 365 },
    { label: "max", value: 365 },
]

export const currencySymbols = {
    "usd": "$",
    "eur": "€",
    "gbp": "£",
    "jpy": "¥",
    "inr": "₹",
}

export interface AnalysisResult {
    trend: 'uptrend' | 'downtrend' | 'sideways';
    movingAverages: {
        ma7: number;
        ma30: number;
    };
    volatility: number;
    whaleActivity: boolean;
    drawdown: number;
    riskLevel: 'low' | 'medium' | 'high';
}

export function analyzeCoinData(priceData: ChartPoint[], volumeData: ChartPoint[]): AnalysisResult {
    const prices = priceData.map(p => p.value);
    const volumes = volumeData.map(v => v.value);

    const getAverage = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const ma7 = getAverage(prices.slice(-7));
    const ma30 = getAverage(prices.slice(-30));

    const first = prices[0];
    const last = prices[prices.length - 1];

    let trend: AnalysisResult['trend'] = 'sideways';
    if (last > first * 1.05) trend = 'uptrend';
    else if (last < first * 0.95) trend = 'downtrend';

    const mean = getAverage(prices);
    const variance = getAverage(prices.map(p => (p - mean) ** 2));
    const volatility = Math.sqrt(variance);

    const avgVolume = getAverage(volumes.slice(-7));
    const recentVolume = volumes[volumes.length - 1];
    const whaleActivity = recentVolume > avgVolume * 1.5;

    const max = Math.max(...prices);
    const drawdown = ((max - last) / max) * 100;

    let riskLevel: AnalysisResult['riskLevel'] = 'medium';
    if (volatility > 10 || drawdown > 50) riskLevel = 'high';
    else if (volatility < 3 && drawdown < 20) riskLevel = 'low';

    return {
        trend,
        movingAverages: {
            ma7: parseFloat(ma7.toFixed(2)),
            ma30: parseFloat(ma30.toFixed(2)),
        },
        volatility: parseFloat(volatility.toFixed(2)),
        whaleActivity,
        drawdown: parseFloat(drawdown.toFixed(2)),
        riskLevel,
    };
}
