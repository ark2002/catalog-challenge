import axios from "axios"

const coinGekoUrl = 'https://api.coingecko.com/api/v3/coins/'

export const getCoinMarketData = async ({ coinId = "bitcoin", currency = "usd" }: { coinId: string, currency: string }) => {
    try {
        const res = await axios.get(`${coinGekoUrl}markets`, {
            params: {
                vs_currency: currency,
                ids: coinId,
                sparkline: false,
            },
        });

        return res.data[0];
    } catch (error) {
        console.error(`Failed to fetch data for ${coinId}:`, error);
        throw error;
    }
};


export const getCoinChartData = async ({
    coinId = "bitcoin",
    currency = "usd",
    days = 7,
}: {
    coinId: string;
    currency: string;
    days: number;
}) => {
    try {
        const res = await axios.get(`${coinGekoUrl}${coinId}/market_chart`, {
            params: {
                vs_currency: currency,
                days: days,
            },
        });

        return res.data;
    } catch (error) {
        console.error(`Error fetching chart data for ${coinId}:`, error);
        throw error;
    }
};


export async function fetchCoinList({ currency = "usd" }: { currency: string }) {
    try {
        const res = await axios.get(`${coinGekoUrl}markets?vs_currency=${currency}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching coin list:', error);
        return null;
    }
}