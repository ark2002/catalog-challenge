import { useCoin } from "../../../context/CoinContext"
import StatCard from "./StatsCard"

export default function StatisticsChangeCards() {
    const { state } = useCoin()
    const coin = state.selectedCoin
    if (!coin) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatCard
                label="Price Change (24h)"
                value={coin.current_price}
                from={coin.current_price - coin.price_change_24h}
                isPositive={coin.price_change_24h >= 0}
            />

            <StatCard
                label="Market Cap Change (24h)"
                value={coin.market_cap}
                from={coin.market_cap - coin.market_cap_change_24h}
                isPositive={coin.market_cap_change_24h >= 0}
            />

            <StatCard
                label="Since All-Time High"
                value={coin.current_price}
                from={coin.ath}
                isPositive={coin.ath_change_percentage > 0}
            />

            <StatCard
                label="Since All-Time Low"
                value={coin.current_price}
                from={coin.atl}
                isPositive={coin.atl_change_percentage > 0}
            />
        </div>
    )
}
