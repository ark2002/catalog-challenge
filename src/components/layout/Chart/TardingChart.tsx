import { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries, HistogramSeries, Time } from 'lightweight-charts';
import { ChartPoint } from './ChartContainer';

export const TradingChart = ({ priceData, volumeData }: { priceData: ChartPoint[], volumeData: ChartPoint[] }) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (!chartContainerRef.current || !priceData || !volumeData) return;

        const getThemeStyles = () => {
            const styles = getComputedStyle(document.documentElement);
            return {
                background: styles.getPropertyValue('--color-background').trim(),
                lineColor: styles.getPropertyValue('--color-primary').trim(),
                topColor: `${styles.getPropertyValue('--color-primary').trim()}AA`,
                textColor: styles.getPropertyValue('--color-text-secondary').trim(),
                barColor: styles.getPropertyValue('--color-text-tertiary').trim(),
            };
        };

        const { background, lineColor, topColor, textColor, barColor } = getThemeStyles();

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                background: { type: ColorType.Solid, color: background },
                textColor,
            },
            timeScale: {
                borderVisible: false,
                timeVisible: true,
                fixLeftEdge: true,
                fixRightEdge: true,
                secondsVisible: false,
            },
            rightPriceScale: {
                borderVisible: false,
                scaleMargins: {
                    top: 0.2,
                    bottom: 0.3,
                },
            },
            leftPriceScale: {
                borderVisible: false,
            },
        });

        chart.timeScale().fitContent();

        const areaSeries = chart.addSeries(AreaSeries, {
            lineColor,
            topColor,
            bottomColor: background,
            priceScaleId: 'right',
            lineWidth: 1,
        });

        areaSeries.setData(priceData.map(point => ({ ...point, time: point.time as Time })));

        const volumeSeries = chart.addSeries(HistogramSeries, {
            color: barColor,
            priceLineVisible: false,
            priceScaleId: '',
        });

        volumeSeries.applyOptions({
            lastValueVisible: false,
            base: 0,
        });

        chart.priceScale('').applyOptions({
            ticksVisible: false,
            scaleMargins: {
                top: 0.9,
                bottom: 0,
            },
        });

        volumeSeries.setData(volumeData.map(point => ({ ...point, time: point.time as Time })));

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current!.clientWidth,
                height: chartContainerRef.current!.clientHeight,
            });
        };

        const handleThemeChange = () => {
            const {
                background: newBg,
                lineColor: newLine,
                topColor: newTop,
                textColor: newText,
                barColor: newBar,
            } = getThemeStyles();

            chart.applyOptions({
                layout: {
                    background: { type: ColorType.Solid, color: newBg },
                    textColor: newText,
                },
            });

            areaSeries.applyOptions({
                lineColor: newLine,
                topColor: newTop,
                bottomColor: newBg,
            });

            volumeSeries.applyOptions({
                color: newBar,
            });
        };

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [priceData, volumeData]);
    // Re-run effect when data changes

    return <div ref={chartContainerRef} className="w-full h-full" />;
};
