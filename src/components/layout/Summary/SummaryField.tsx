import { useCoin } from "../../../context/CoinContext";
import { currencySymbols } from "../../../utils/consts";

const fieldDescriptions = {
    marketCap: "The total value of all coins currently in circulation, calculated by multiplying the price by the circulating supply.",
    volume24h: "The total amount of the coin traded in the last 24 hours.",
    circulatingSupply: "The number of coins that are currently available for trading in the market.",
    totalSupply: "The total number of coins in existence, including coins that are locked, reserved, or otherwise unavailable for trading.",
    maxSupply: "The maximum number of coins that can ever exist for a particular cryptocurrency.",
    marketCapRank: "The rank of the coin based on its market capitalization compared to other cryptocurrencies.",
    ath: "The highest price ever reached by the coin.",
    atl: "The lowest price ever reached by the coin.",
};


type SummaryFieldProps = {
    label: string;
    value: string | number;
    additionalInfo?: string;
    valueClass?: string;
    needCurrencySymbol?: boolean;
    tooltipKey: keyof typeof fieldDescriptions;
};

export const SummaryField = ({ label, value, additionalInfo, valueClass, needCurrencySymbol, tooltipKey, }: SummaryFieldProps) => {
    const { state: { currency } } = useCoin() as { state: { currency: keyof typeof currencySymbols } };
    return (
        <div className="relative p-4 bg-background border border-text-tertiary rounded-lg shadow-sm hover:shadow-md transition-all group">
            <p className="text-text-secondary font-medium text-base">{label}</p>
            <p className={`text-3xl font-semibold ${valueClass}`}>{needCurrencySymbol ? currencySymbols[currency] : ""}{value}</p>
            {additionalInfo && <p className="text-sm text-muted">{additionalInfo}</p>}
            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background border border-text-tertiary rounded-md shadow-md text-xs text-text-secondary">
                {fieldDescriptions[tooltipKey]}
            </div>
        </div>
    );
};

