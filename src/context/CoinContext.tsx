import { createContext, useContext, useReducer, ReactNode } from 'react'

export type CoinData = {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi: null
    last_updated: string
}

type State = {
    coinId: string
    currency: string,
    selectedCoin: CoinData | null
}


const initialState: State = {
    coinId: 'bitcoin',
    currency: 'usd',
    selectedCoin: null,
}

type Action =
    | { type: 'SET_COIN'; payload: string }
    | { type: 'SET_CURRENCY'; payload: string }
    | { type: 'SET_SELECTED_COIN'; payload: CoinData }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_COIN':
            return { ...state, coinId: action.payload }
        case 'SET_CURRENCY':
            return { ...state, currency: action.payload }
        case 'SET_SELECTED_COIN':
            return { ...state, selectedCoin: action.payload }
        default:
            return state
    }
}

const CoinContext = createContext<{
    state: State
    dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

export function CoinProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <CoinContext.Provider value={{ state, dispatch }}>{children}</CoinContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCoin() {
    return useContext(CoinContext)
}
