import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Users, Clock, Shield, ArrowRight, Copy, ExternalLink } from 'lucide-react';

function App() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState(2); // Phase 2 is current (Phase 1 is 100% sold)
  const [selectedPayment, setSelectedPayment] = useState('USDT');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30 * 24 * 60 * 60); // 30 days in seconds

  const phases = [
    { phase: 1, price: 0.10, completed: 100, status: 'completed' },
    { phase: 2, price: 0.20, completed: 35, status: 'active' },
    { phase: 3, price: 0.40, completed: 0, status: 'upcoming' },
    { phase: 4, price: 0.60, completed: 0, status: 'upcoming' },
    { phase: 5, price: 0.80, completed: 0, status: 'upcoming' },
    { phase: 6, price: 1.00, completed: 0, status: 'upcoming' },
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const mins = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;
    return { days, hours, mins, secs };
  };

  const { days, hours, mins, secs } = formatTime(timeLeft);

  const connectWallet = (walletType: string) => {
    // Mock wallet connection
    setConnectedWallet(walletType);
  };

  const calculateTokens = (amount: string) => {
    const usdAmount = parseFloat(amount) || 0;
    const currentPrice = phases.find(p => p.status === 'active')?.price || 0.20;
    return (usdAmount / currentPrice).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CNC Token</h1>
                <p className="text-xs text-blue-200">BNB Chain Network</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#sale" className="text-white hover:text-orange-300 transition-colors">Token Sale</a>
              <a href="#tokenomics" className="text-white hover:text-orange-300 transition-colors">Tokenomics</a>
              <a href="#distribution" className="text-white hover:text-orange-300 transition-colors">Distribution</a>
              <a href="#contact" className="text-white hover:text-orange-300 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            CNC Token
            <span className="block text-3xl md:text-4xl text-orange-400 mt-2">Private Sale</span>
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Join the exclusive private sale of CNC Token on BNB Chain. 
            Limited time opportunity with progressive pricing and instant token distribution.
          </p>
          
          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Private Sale Ends In</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Days', value: days },
                { label: 'Hours', value: hours },
                { label: 'Minutes', value: mins },
                { label: 'Seconds', value: secs }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{item.value.toString().padStart(2, '0')}</div>
                  <div className="text-blue-200 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-400">8,000,000</div>
              <div className="text-white">Total Supply</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-400">4,000,000</div>
              <div className="text-white">Private Sale Tokens</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-orange-400">$0.20</div>
              <div className="text-white">Current Price</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Phases */}
      <section id="sale" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Token Sale Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <div 
                key={phase.phase}
                className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all duration-300 ${
                  phase.status === 'active' ? 'ring-2 ring-orange-400 scale-105' : ''
                } ${phase.status === 'completed' ? 'bg-green-500/20 border-green-400/50' : ''}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Phase {phase.phase}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    phase.status === 'completed' ? 'bg-green-500 text-white' :
                    phase.status === 'active' ? 'bg-orange-400 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {phase.status === 'completed' ? 'Completed' : 
                     phase.status === 'active' ? 'Active' : 'Upcoming'}
                  </div>
                </div>
                <div className="text-2xl font-bold text-orange-400 mb-2">${phase.price.toFixed(2)}</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      phase.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'
                    }`}
                    style={{ width: `${phase.completed}%` }}
                  ></div>
                </div>
                <div className="text-blue-200 text-sm">{phase.completed}% Complete</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Purchase CNC Tokens</h2>
            
            {/* Wallet Connection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Connect Your Wallet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => connectWallet('MetaMask')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    connectedWallet === 'MetaMask' 
                      ? 'bg-orange-400 border-orange-400 text-white' 
                      : 'bg-white/5 border-white/20 text-white hover:border-orange-400'
                  }`}
                >
                  <Wallet className="w-6 h-6 mx-auto mb-2" />
                  MetaMask
                </button>
                <button
                  onClick={() => connectWallet('OKX')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    connectedWallet === 'OKX' 
                      ? 'bg-orange-400 border-orange-400 text-white' 
                      : 'bg-white/5 border-white/20 text-white hover:border-orange-400'
                  }`}
                >
                  <Wallet className="w-6 h-6 mx-auto mb-2" />
                  OKX Web3 Wallet
                </button>
              </div>
            </div>

            {connectedWallet && (
              <div className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['USDT', 'BNB'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setSelectedPayment(method)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          selectedPayment === method
                            ? 'bg-orange-400 border-orange-400 text-white'
                            : 'bg-white/5 border-white/20 text-white hover:border-orange-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Purchase Amount */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Purchase Amount</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="number"
                        value={purchaseAmount}
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                        placeholder="Enter amount in USD"
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-orange-400"
                        min="100"
                        max="2000"
                      />
                      <div className="text-blue-200 text-sm mt-1">Min: $100 | Max: $2,000</div>
                    </div>
                    
                    {purchaseAmount && (
                      <div className="bg-blue-900/50 rounded-xl p-4">
                        <div className="text-white">You will receive: <span className="font-bold text-orange-400">{calculateTokens(purchaseAmount)} CNC</span></div>
                        <div className="text-blue-200 text-sm mt-1">Tokens will be distributed instantly after confirmation</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Referral Code (Optional)</h3>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Enter referral code to get 15% bonus tokens"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-orange-400"
                  />
                </div>

                {/* Purchase Button */}
                <button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-500 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Purchase CNC Tokens</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Token Information */}
      <section id="tokenomics" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Token Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Network</h3>
              <p className="text-blue-200">BNB Chain</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Referral Bonus</h3>
              <p className="text-blue-200">15% Token Reward</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sale Duration</h3>
              <p className="text-blue-200">30 Days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Airdrop Rewards</h3>
              <p className="text-blue-200">1,000,000 CNC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Distribution */}
      <section id="distribution" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Token Distribution</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Vesting Schedule</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-400/50">
                    <span className="text-white">At Listing</span>
                    <span className="text-green-400 font-bold">50% Unlocked</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-xl border border-blue-400/50">
                    <span className="text-white">Month 1</span>
                    <span className="text-blue-400 font-bold">25% Unlocked</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-xl border border-blue-400/50">
                    <span className="text-white">Month 2</span>
                    <span className="text-blue-400 font-bold">25% Unlocked</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Investment Limits</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/20">
                    <div className="text-orange-400 font-bold text-2xl">$100</div>
                    <div className="text-blue-200">Minimum Investment</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/20">
                    <div className="text-orange-400 font-bold text-2xl">$2,000</div>
                    <div className="text-blue-200">Maximum Investment</div>
                  </div>
                  <div className="bg-blue-900/50 rounded-xl p-4">
                    <div className="text-white text-sm">
                      <strong>Note:</strong> Tokens are distributed instantly after transaction confirmation on the blockchain.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black/30 backdrop-blur-md border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">CNC Token</h3>
                <p className="text-blue-200">Building the Future on BNB Chain</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span>Telegram</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span>Official Website</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span>Discord</span>
            </a>
          </div>

          <div className="text-center text-blue-200 text-sm">
            <p>&copy; 2025 CNC Token. All rights reserved. | Private Sale on BNB Chain Network</p>
            <p className="mt-2">
              <strong>Disclaimer:</strong> This is a private token sale. Please ensure you understand the risks before investing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;