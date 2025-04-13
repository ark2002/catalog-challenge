import { useCoin } from "../../../context/CoinContext";
import { SummaryField } from "./SummaryField";

const SkeletonField = () => (
    <div className="space-y-1 p-4 border border-text-tertiary rounded-lg shadow-sm">
        <div className="h-4 w-24 bg-text-tertiary animate-pulse rounded-md" />
        <div className="h-5 w-64 bg-text-tertiary animate-pulse rounded-md" />
    </div>
);

export default function SummaryContainer() {
    const { state } = useCoin();
    const { selectedCoin } = state;

    const loading = !selectedCoin;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-text-primary mt-6">
            {/* First Column */}
            <div className="space-y-6">
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="Market Cap"
                        value={`${selectedCoin.market_cap.toLocaleString()}`}
                        tooltipKey="marketCap"
                        needCurrencySymbol
                    />
                )}
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="24h Volume"
                        value={`${selectedCoin.total_volume.toLocaleString()}`}
                        tooltipKey="volume24h"
                        needCurrencySymbol
                    />
                )}
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="Circulating Supply"
                        value={`${selectedCoin.circulating_supply.toLocaleString()} ${selectedCoin.symbol.toUpperCase()}`}
                        tooltipKey="circulatingSupply"
                    />
                )}
            </div>

            {/* Second Column */}
            <div className="space-y-6">
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="Total Supply"
                        value={selectedCoin.total_supply ? selectedCoin.total_supply.toLocaleString() : ""}
                        tooltipKey="totalSupply"
                    />
                )}
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="Max Supply"
                        value={selectedCoin.max_supply ? selectedCoin.max_supply.toLocaleString() : "∞"}
                        tooltipKey="maxSupply"
                    />
                )}
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="Market Cap Rank"
                        value={`#${selectedCoin.market_cap_rank}`}
                        tooltipKey="marketCapRank"
                    />
                )}
            </div>

            {/* Third Column */}
            <div className="space-y-6">
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="All-Time High"
                        value={`${selectedCoin.ath.toLocaleString()}`}
                        needCurrencySymbol
                        valueClass="text-success"
                        tooltipKey="ath"
                        additionalInfo={`On ${selectedCoin.ath_date ? new Date(selectedCoin.ath_date).toLocaleDateString() : "N/A"}`}
                    />
                )}
                {loading ? <SkeletonField /> : (
                    <SummaryField
                        label="All-Time Low"
                        value={`${selectedCoin.atl.toLocaleString()}`}
                        needCurrencySymbol
                        valueClass="text-error"
                        tooltipKey="atl"
                        additionalInfo={`On ${selectedCoin.atl_date ? new Date(selectedCoin.atl_date).toLocaleDateString() : "N/A"}`}
                    />
                )}
            </div>
        </div>
    );
}
