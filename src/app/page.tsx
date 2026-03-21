'use client';

import { useState, useEffect } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  chain: string;
  provider: string;
  type: 'equity' | 'etf' | 'commodity';
}

const stocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.52, change24h: 1.2, marketCap: '$2.8T', volume24h: '$45M', chain: 'Ethereum', provider: 'Backed', type: 'equity' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.30, change24h: -2.1, marketCap: '$780B', volume24h: '$32M', chain: 'Polygon', provider: 'Swarm', type: 'equity' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 892.40, change24h: 3.5, marketCap: '$2.2T', volume24h: '$78M', chain: 'Base', provider: 'Ondo', type: 'equity' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.20, change24h: 0.8, marketCap: '$3.1T', volume24h: '$28M', chain: 'Ethereum', provider: 'Backed', type: 'equity' },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 512.80, change24h: 0.5, marketCap: '$480B', volume24h: '$120M', chain: 'Arbitrum', provider: 'Ondo', type: 'etf' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: 438.60, change24h: 1.1, marketCap: '$205B', volume24h: '$65M', chain: 'Base', provider: 'Ondo', type: 'etf' },
  { symbol: 'GLD', name: 'Gold ETF', price: 185.40, change24h: -0.3, marketCap: '$58B', volume24h: '$15M', chain: 'Polygon', provider: 'Paxos', type: 'commodity' },
  { symbol: 'USO', name: 'Oil ETF', price: 78.20, change24h: 2.8, marketCap: '$3.2B', volume24h: '$8M', chain: 'Ethereum', provider: 'Swarm', type: 'commodity' },
];

const providers = [
  { name: 'Backed', description: 'Swiss-regulated tokenized securities', chains: ['Ethereum', 'Polygon'], assets: 15 },
  { name: 'Ondo', description: 'Institutional-grade tokenized assets', chains: ['Ethereum', 'Base', 'Arbitrum'], assets: 8 },
  { name: 'Swarm', description: 'German BaFin-licensed tokenization', chains: ['Ethereum', 'Polygon'], assets: 12 },
  { name: 'Paxos', description: 'NY-regulated gold and asset tokens', chains: ['Ethereum'], assets: 3 },
];

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'equity' | 'etf' | 'commodity'>('all');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [stocksData, setStocksData] = useState(stocks);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocksData(prev => prev.map(stock => ({
        ...stock,
        price: stock.price * (0.998 + Math.random() * 0.004),
        change24h: stock.change24h + (Math.random() - 0.5) * 0.1,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredStocks = filter === 'all' 
    ? stocksData 
    : stocksData.filter(s => s.type === filter);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-green-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Tokenized Stocks Explorer</h1>
          <p className="text-gray-400 mt-2">Traditional assets on-chain — trade 24/7, settle instantly</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Market Overview */}
        <section className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <div className="text-sm text-gray-400">Total Market Cap</div>
            <div className="text-2xl font-black text-green-400">$9.8T</div>
            <div className="text-xs text-green-400">+1.2% today</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <div className="text-sm text-gray-400">24h Volume</div>
            <div className="text-2xl font-black">$391M</div>
            <div className="text-xs text-gray-400">Across all chains</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <div className="text-sm text-gray-400">Active Tokens</div>
            <div className="text-2xl font-black">{stocks.length}</div>
            <div className="text-xs text-gray-400">Tradable now</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <div className="text-sm text-gray-400">Settlement Time</div>
            <div className="text-2xl font-black text-purple-400">~12s</div>
            <div className="text-xs text-gray-400">vs T+2 traditional</div>
          </div>
        </section>

        {/* Filters */}
        <section className="flex flex-wrap gap-2">
          {(['all', 'equity', 'etf', 'commodity'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-bold border-4 transition-all ${
                filter === f
                  ? 'bg-green-400 text-black border-green-400'
                  : 'bg-gray-800 text-white border-gray-600 hover:border-gray-500'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </section>

        {/* Stock Table */}
        <section className="bg-gray-900 border-4 border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b-2 border-gray-700">
                <tr>
                  <th className="text-left p-4 text-sm font-bold text-gray-400">Symbol</th>
                  <th className="text-left p-4 text-sm font-bold text-gray-400">Name</th>
                  <th className="text-right p-4 text-sm font-bold text-gray-400">Price</th>
                  <th className="text-right p-4 text-sm font-bold text-gray-400">24h</th>
                  <th className="text-right p-4 text-sm font-bold text-gray-400">Market Cap</th>
                  <th className="text-left p-4 text-sm font-bold text-gray-400">Chain</th>
                  <th className="text-left p-4 text-sm font-bold text-gray-400">Provider</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr 
                    key={stock.symbol}
                    onClick={() => setSelectedStock(stock)}
                    className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-all"
                  >
                    <td className="p-4">
                      <span className="font-bold text-green-400">{stock.symbol}</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                        stock.type === 'equity' ? 'bg-blue-900 text-blue-300' :
                        stock.type === 'etf' ? 'bg-purple-900 text-purple-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {stock.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{stock.name}</td>
                    <td className="p-4 text-right font-mono">${stock.price.toFixed(2)}</td>
                    <td className={`p-4 text-right font-bold ${
                      stock.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stock.change24h >= 0 ? '+' : ''}{stock.change24h.toFixed(2)}%
                    </td>
                    <td className="p-4 text-right text-gray-400">{stock.marketCap}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-700 text-xs rounded">{stock.chain}</span>
                    </td>
                    <td className="p-4 text-gray-400">{stock.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Selected Stock Detail */}
        {selectedStock && (
          <section className="bg-gray-900 border-4 border-green-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-black text-green-400">{selectedStock.symbol}</h2>
                <p className="text-gray-400">{selectedStock.name}</p>
              </div>
              <button
                onClick={() => setSelectedStock(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-xs text-gray-400">Current Price</div>
                <div className="text-xl font-bold">${selectedStock.price.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-xs text-gray-400">24h Change</div>
                <div className={`text-xl font-bold ${selectedStock.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedStock.change24h >= 0 ? '+' : ''}{selectedStock.change24h.toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-xs text-gray-400">Chain</div>
                <div className="text-xl font-bold">{selectedStock.chain}</div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-xs text-gray-400">Provider</div>
                <div className="text-xl font-bold">{selectedStock.provider}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button className="flex-1 py-3 bg-green-500 text-white font-bold border-4 border-green-400 hover:bg-green-400">
                Buy {selectedStock.symbol}
              </button>
              <button className="flex-1 py-3 bg-red-600 text-white font-bold border-4 border-red-500 hover:bg-red-500">
                Sell {selectedStock.symbol}
              </button>
            </div>
          </section>
        )}

        {/* Providers */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">TOKENIZATION PROVIDERS</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div key={provider.name} className="p-4 bg-gray-800 border-2 border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-green-400">{provider.name}</h3>
                  <span className="text-xs text-gray-400">{provider.assets} assets</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{provider.description}</p>
                <div className="flex gap-2">
                  {provider.chains.map((chain) => (
                    <span key={chain} className="px-2 py-1 bg-gray-700 text-xs rounded">{chain}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Tokenized */}
        <section className="bg-gray-900 border-4 border-green-400 p-6">
          <h2 className="text-xl font-black text-green-400 mb-4">Why Tokenized Stocks?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-white mb-2">⏰ 24/7 Trading</h3>
              <p className="text-sm text-gray-400">
                No market hours. Trade Apple at 3am Sunday. Global access, always on.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">⚡ Instant Settlement</h3>
              <p className="text-sm text-gray-400">
                T+0 instead of T+2. Funds available immediately after trade execution.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">🔗 DeFi Composability</h3>
              <p className="text-sm text-gray-400">
                Use tokenized stocks as collateral, in LPs, or yield strategies.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">📊 Fractional Ownership</h3>
              <p className="text-sm text-gray-400">
                Own $10 of NVDA instead of needing $900 for a full share.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">🌍 Global Access</h3>
              <p className="text-sm text-gray-400">
                No brokerage requirements. Anyone with a wallet can participate.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">📋 On-Chain Dividends</h3>
              <p className="text-sm text-gray-400">
                Automated dividend distribution to token holders via smart contracts.
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Status */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">REGULATORY LANDSCAPE</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-800 border-l-4 border-green-400">
              <h3 className="font-bold text-green-400">Switzerland (FINMA)</h3>
              <p className="text-gray-400">Backed operates under Swiss DLT law. Full regulatory coverage for EU/EEA investors.</p>
            </div>
            <div className="p-3 bg-gray-800 border-l-4 border-blue-400">
              <h3 className="font-bold text-blue-400">Germany (BaFin)</h3>
              <p className="text-gray-400">Swarm licensed for securities trading. Compliant tokenized assets for German market.</p>
            </div>
            <div className="p-3 bg-gray-800 border-l-4 border-purple-400">
              <h3 className="font-bold text-purple-400">USA (SEC)</h3>
              <p className="text-gray-400">New March 2026 guidance opens path for blockchain-based trading. Ondo positioning for compliance.</p>
            </div>
            <div className="p-3 bg-gray-800 border-l-4 border-yellow-400">
              <h3 className="font-bold text-yellow-400">New York (NYDFS)</h3>
              <p className="text-gray-400">Paxos Trust licensed. Gold and asset-backed tokens with full reserves.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-green-400 hover:underline">@samdevrel</a>
            {' • '}
            Prices are simulated for demo purposes
          </p>
        </footer>
      </div>
    </main>
  );
}
