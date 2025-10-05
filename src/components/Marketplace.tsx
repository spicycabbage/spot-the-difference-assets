import React from "react";

type MarketplaceProps = {
  onClose: () => void;
  onPurchase: (powerupType: 'timeBoosts' | 'hints' | 'skips', quantity: number) => void;
  currentPowerups: {
    timeBoosts: number;
    hints: number;
    skips: number;
  };
};

const Marketplace: React.FC<MarketplaceProps> = ({ onClose, onPurchase, currentPowerups }) => {
  const powerupItems = [
    {
      id: 'timeBoosts' as const,
      name: 'Extra Time',
      icon: '⏰',
      description: 'Add 15 seconds to your timer',
      price: 100,
      current: currentPowerups.timeBoosts
    },
    {
      id: 'hints' as const,
      name: 'Hint',
      icon: '💡',
      description: 'Automatically find one difference',
      price: 200,
      current: currentPowerups.hints
    },
    {
      id: 'skips' as const,
      name: 'Skip Level',
      icon: '⏭️',
      description: 'Skip to the next level',
      price: 300,
      current: currentPowerups.skips
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🛒 Powerup Shop</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {powerupItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-blue-600 text-sm">You have: {item.current}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">${item.price}</div>
                  <button
                    onClick={() => onPurchase(item.id, 1)}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Buy 1
                  </button>
                  <button
                    onClick={() => onPurchase(item.id, 5)}
                    className="mt-1 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-xs transition-colors block w-full"
                  >
                    Buy 5 Pack
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">💰 How to earn coins:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Complete levels: +50 coins</li>
            <li>• Find differences quickly: +10 bonus</li>
            <li>• Complete without hints: +25 bonus</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-green-600">💰 Coins: 999</div>
          <p className="text-xs text-gray-500 mt-1">*Demo mode - unlimited coins</p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace; 