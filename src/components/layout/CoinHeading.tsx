import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useCoin } from "../../context/CoinContext"
import { getCoinMarketData } from "../../utils/api"



export default function CoinHeading() {
    const { state, dispatch } = useCoin()
    const { coinId, currency, selectedCoin } = state
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(false)
                const data = await getCoinMarketData({ coinId, currency })
                if (data?.name) dispatch({ type: "SET_SELECTED_COIN", payload: data })
            } catch (err) {
                console.error("Failed to fetch coin data", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // const interval = setInterval(fetchData, 10000)
        // return () => clearInterval(interval)
    }, [coinId, currency, dispatch])

    if (loading) {
        return (
            <div className="flex flex-col gap-3 animate-pulse">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-text-tertiary rounded-full" />
                    <div className="w-32 h-6 bg-text-tertiary rounded" />
                </div>
                <div className="flex flex-col gap-2 pl-1">
                    <div className="w-48 h-10 bg-text-tertiary rounded" />
                    <div className="w-16 h-4 bg-text-tertiary rounded" />
                </div>
            </div>
        )
    }

    if (error || !selectedCoin) {
        return (
            <div className="text-sm text-red-500">
                Failed to load coin data. Please try again later.
            </div>
        )
    }

    const change = selectedCoin.price_change_percentage_24h
    const changeClass = change >= 0 ? "text-success" : "text-error"

    return (
        <motion.div
            className="flex flex-col gap-3 text-text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex items-center space-x-3">
                <img
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    className="w-8 h-8 rounded-full border-2 border-text-tertiary"
                />
                <span className="text-2xl font-semibold text-text-primary">
                    {selectedCoin.name}{" "}
                    <span className="text-sm text-text-secondary">({selectedCoin.symbol.toUpperCase()})</span>
                </span>
            </div>

            <div className="flex flex-col gap-1.5 pl-1">
                <div className="flex space-x-1">
                    <h1 className="text-4xl font-medium">
                        {selectedCoin.current_price.toLocaleString()}
                    </h1>
                    <p className="text-sm font-semibold text-text-secondary pt-1.5">USD</p>
                </div>
                <p className={`text-[0.875rem] ${changeClass}`}>
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(2)}%
                </p>
            </div>
        </motion.div>
    )
}
