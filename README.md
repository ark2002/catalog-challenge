# Catalog Challenge

🔗 **[Live Demo](https://catalog-challenge.netlify.app/)**

This project is a cryptocurrency dashboard built with **React**, **TypeScript**, and **Vite**. It provides real-time data visualization and analysis for cryptocurrencies using the CoinGecko API. The application is styled with **TailwindCSS** and includes features like theme toggling, interactive charts, and detailed coin statistics.

## Features

- **Real-Time Data**: Fetches live cryptocurrency data, including prices, market cap, and volume.
- **Interactive Charts**: Displays price and volume trends with zoom and pan capabilities.
- **Analysis Tools**: Provides insights like market trends, volatility, and risk levels.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Dark Mode**: Supports light and dark themes with a toggle button.
- **Tab Navigation**: Organized content with tabs for Summary, Chart, Statistics, Analysis, and Settings.

## Project Structure

The project is organized as follows:

```
src/
├── components/       # UI components
│   ├── layout/       # Layout-specific components (e.g., charts, summaries)
│   ├── ui/           # Reusable UI components (e.g., buttons, tabs)
├── context/          # React context for global state management
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and constants
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/catalog-challenge.git
   cd catalog-challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

### Build for Production

To create a production build, run:
```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

### Linting

To lint the codebase, run:
```bash
npm run lint
# or
yarn lint
```

## API Integration

The application uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data. The following endpoints are utilized:

- `/coins/markets`: Fetch market data for a specific coin.
- `/coins/{id}/market_chart`: Fetch historical price and volume data.

## Key Components

### `PricePage`

The main page of the application, which includes:
- A theme toggle button.
- A coin heading displaying the selected coin's name, symbol, and price.
- Tab navigation for switching between different sections.

### `ChartContainer`

Displays an interactive chart for price and volume trends using the **lightweight-charts** library.

### `SummaryContainer`

Shows key metrics like market cap, 24-hour volume, and supply details.

### `AnalysisContainer`

Provides insights into market trends, volatility, and risk levels.

### `ThemeToggle`

Allows users to switch between light and dark themes. The theme preference is saved in `localStorage`.

## Customization

### TailwindCSS

The project uses TailwindCSS for styling. You can customize the theme by editing the `src/index.css` file.

### ESLint

The project includes a pre-configured ESLint setup for TypeScript and React. To enable type-aware linting, update the `eslint.config.js` file as described in the comments.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data.
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts/) for interactive charting.
- [TailwindCSS](https://tailwindcss.com/) for styling.
