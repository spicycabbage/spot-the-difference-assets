import React, { useState, useEffect } from 'react';
import timeBoostIcon from '../assets/icons/time-boost.png';
import hintIcon from '../assets/icons/hint.png';
import skipIcon from '../assets/icons/skip.png';
import PaymentForm from './PaymentForm';

type Package = {
  id: string;
  name: string;
  description: string;
  powerups: {
    time: number;
    hints: number;
    skips: number;
  };
  price: number; // Price in cents for Stripe
  priceDisplay: string; // Display price like "$1.99"
};

type PackageSelectorProps = {
  onClose: () => void;
  onPurchaseComplete: (powerups: { time: number; hints: number; skips: number }) => void;
  currentPowerups: {
    time: number;
    hints: number;
    skips: number;
  };
};

const PackageSelector: React.FC<PackageSelectorProps> = ({ 
  onClose, 
  onPurchaseComplete, 
  currentPowerups 
}) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper for responsive checks
  const isMobile = windowSize.width <= 768;

  // Currency formatting function - defaults to USD
  const formatPrice = (price: string) => {
    // For now, just return USD format. In the future, this could detect user's location
    // and convert to their local currency using an API like exchangerate-api.com
    const userCountry: string = 'US'; // Default to US, could be detected from navigator.language or IP
    
    switch (userCountry) {
      case 'US':
      case 'CA':
        return price; // Already in USD format
      default:
        return price; // Default to USD format
      // Future currency conversions could be added here:
      // case 'GB': return convertUSDtoGBP(price);
      // case 'EU': return convertUSDtoEUR(price);
    }
  };

  // Define the 3 available packages
  const packages: Package[] = [
    {
      id: 'casual',
      name: 'Casual Fan',
      description: 'Perfect for casual gaming',
      powerups: { time: 5, hints: 2, skips: 0 },
      price: 99, // $0.99 in cents
      priceDisplay: '$0.99'
    },
    {
      id: 'super',
      name: 'Super Fan',
      description: 'For dedicated players',
      powerups: { time: 25, hints: 15, skips: 1 },
      price: 499, // $4.99 in cents
      priceDisplay: '$4.99'
    },
    {
      id: 'leader',
      name: 'Fan Club Leader',
      description: 'Ultimate gaming experience',
      powerups: { time: 100, hints: 80, skips: 7 },
      price: 1999, // $19.99 in cents
      priceDisplay: '$19.99'
    }
  ];

  // Live Stripe Payment Links
  const stripePaymentLinks: { [key: string]: string } = {
    casual: 'https://buy.stripe.com/dRmfZi4xYbo03ta77t6sw02',   // $0.99 Casual Fan
    super: 'https://buy.stripe.com/8x214o2pQgIk4xe2Rd6sw01',     // $4.99 Super Fan
    leader: 'https://buy.stripe.com/00w9AU5C22Ru6FmgI36sw00'     // $19.99 Fan Club Leader
  };

  const handlePackageClick = (packageId: string) => {
    console.log('Package clicked:', packageId);
    const paymentLink = stripePaymentLinks[packageId];
    if (paymentLink) {
      // Open Stripe Payment Link in new tab
      window.open(paymentLink, '_blank');
      // Close the modal
      onClose();
    }
  };

  const handlePaymentSuccess = (powerups: any) => {
    console.log('Payment success!', powerups);
    if (selectedPackage) {
      onPurchaseComplete(powerups);
      setShowPayment(false);
      setSelectedPackage(null);
      onClose();
    }
  };

  const handlePaymentCancel = () => {
    console.log('Payment canceled');
    setShowPayment(false);
    setSelectedPackage(null);
  };

  const handleConfirmPurchase = () => {
    if (selectedPackage) {
      onPurchaseComplete(selectedPackage.powerups);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedPackage(null);
    setShowConfirmation(false);
  };

  // Show payment form if a package is selected
  if (showPayment && selectedPackage) {
    console.log('Rendering PaymentForm for package:', selectedPackage);
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <PaymentForm
          selectedPackage={{
            id: selectedPackage.id,
            name: selectedPackage.name,
            description: selectedPackage.description,
            price: selectedPackage.price,
            powerups: selectedPackage.powerups
          }}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    );
  }

  if (showConfirmation && selectedPackage) {
    return (
      <div 
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ 
          zIndex: 10000,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
          position: 'fixed',
          inset: 0,
          padding: window.innerWidth <= 768 ? '20px' : '16px'
        }}
      >
        <div 
          className="bg-white rounded-lg w-full"
          style={{
            padding: window.innerWidth <= 768 ? '20px' : '24px',
            maxWidth: window.innerWidth <= 768 ? '100%' : '400px',
            margin: window.innerWidth <= 768 ? '0' : 'auto'
          }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Confirm Purchase</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-center mb-2">{selectedPackage.name}</h3>
            <p className="text-gray-600 text-center mb-3">{selectedPackage.description}</p>
            <div className="text-center text-2xl font-bold text-green-600 mb-3">
              {selectedPackage.price}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>⏰ Time Powerups:</span>
                <span className="font-semibold">+{selectedPackage.powerups.time}</span>
              </div>
              <div className="flex justify-between">
                <span>💡 Hints:</span>
                <span className="font-semibold">+{selectedPackage.powerups.hints}</span>
              </div>
                              {selectedPackage.powerups.skips > 0 && (
                  <div className="flex justify-between">
                    <span>⏭️ Skips:</span>
                    <span className="font-semibold">+{selectedPackage.powerups.skips}</span>
                  </div>
                )}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white rounded font-semibold transition-colors"
              style={{
                padding: window.innerWidth <= 768 ? '16px 20px' : '8px 16px', // Larger on mobile
                minHeight: window.innerWidth <= 768 ? '48px' : '40px',
                fontSize: window.innerWidth <= 768 ? '16px' : '14px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors"
              style={{
                padding: window.innerWidth <= 768 ? '16px 20px' : '8px 16px',
                minHeight: window.innerWidth <= 768 ? '48px' : '40px',
                fontSize: window.innerWidth <= 768 ? '16px' : '14px'
              }}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed flex items-center justify-center"
      style={{ 
        zIndex: 10000,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div 
        className="bg-white rounded-lg" 
        style={{ 
          width: isMobile ? 'calc(100vw - 20px)' : 'min(80vw, 1000px)',
          maxWidth: isMobile ? 'none' : '1000px',
          minWidth: isMobile ? '320px' : 'min(800px, 70vw)',
          height: 'auto',
          maxHeight: isMobile ? 'calc(100vh - 40px)' : 'min(75vh, 600px)',
          position: 'relative',
          padding: isMobile ? '12px' : '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          margin: 'auto',
          marginLeft: isMobile ? 'auto' : 'calc(50% + 16px)',
          marginTop: isMobile ? 'auto' : '180px',
          transform: isMobile ? 'none' : 'translateX(-50%)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Beautiful Gaming Shop */}
        <div 
          className="relative" 
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: isMobile ? '20px 15px' : '25px 20px',
            color: 'white'
          }}
        >
          {/* Header */}
          <div className="mb-4">
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                width: '100%'
              }}
            >
              <h1 
                className="font-bold"
                style={{
                  fontSize: isMobile ? '20px' : '28px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                  margin: 0,
                  flex: '1'
                }}
              >
                ⚡ Power-Up Store ⚡
              </h1>
              {/* Close button */}
              <button 
                onClick={onClose}
                className="font-bold transition-colors"
                style={{ 
                  fontSize: isMobile ? '20px' : '24px', 
                  lineHeight: '1',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  transition: 'all 0.2s',
                  background: 'white !important',
                  backgroundColor: 'white',
                  color: 'black !important',
                  border: '1px solid rgba(0,0,0,0.2)',
                  flexShrink: 0,
                  minWidth: isMobile ? '36px' : '40px',
                  height: isMobile ? '36px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#dc2626';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.color = 'black';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <span style={{ color: 'black' }}>✕</span>
              </button>
            </div>
            <p 
              className="opacity-90 text-center"
              style={{
                fontSize: isMobile ? '10px' : '14px',
                margin: 0
              }}
            >
              Upgrade your gameplay with premium power-ups!
            </p>
          </div>

          {/* Packages */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row', // Always horizontal, even on mobile
              gap: isMobile ? '2%' : '15px',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              width: '100%'
            }}
          >
            {packages.map((pkg, index) => {
              const colors = {
                casual: { bg: '#FF6B6B', accent: '#FF8E8E', shadow: 'rgba(255, 107, 107, 0.3)' },
                super: { bg: '#4ECDC4', accent: '#6ED5CE', shadow: 'rgba(78, 205, 196, 0.3)' },
                leader: { bg: '#45B7D1', accent: '#6BC5DB', shadow: 'rgba(69, 183, 209, 0.3)' }
              };
              const color = colors[pkg.id as keyof typeof colors];
              
              return (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageClick(pkg.id)}
                  className="relative cursor-pointer transition-all duration-300"
                  style={{
                    background: `linear-gradient(145deg, ${color.bg}, ${color.accent})`,
                    borderRadius: isMobile ? '8px' : '12px',
                    padding: isMobile ? '10px' : '20px',
                    width: 'calc((100% - 30px) / 3)',
                    minWidth: isMobile ? '100px' : '200px',
                    maxWidth: 'none',
                    flex: '1',
                    height: isMobile ? '180px' : '350px',
                    boxShadow: `0 6px 24px ${color.shadow}`,
                    border: '2px solid rgba(255,255,255,0.2)',
                    transform: 'scale(1)',
                    transformOrigin: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 12px 40px ${color.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0px)';
                    e.currentTarget.style.boxShadow = `0 8px 32px ${color.shadow}`;
                  }}
                >


                  {/* Content Container */}
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Icon & Title */}
                  <div className="text-center mb-3">
                    <div 
                      style={{
                        fontSize: window.innerWidth <= 768 ? '16px' : '36px',
                        marginBottom: window.innerWidth <= 768 ? '2px' : '4px',
                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      {pkg.id === 'casual' && '🎯'}
                      {pkg.id === 'super' && '🚀'}
                      {pkg.id === 'leader' && '👑'}
                    </div>
                    <h3 
                      className="font-bold"
                      style={{
                        fontSize: window.innerWidth <= 768 ? '11px' : '16px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        margin: 0,
                        lineHeight: '1.2'
                      }}
                    >
                      {pkg.name}
                    </h3>
                    {window.innerWidth > 768 && (
                      <p 
                        className="opacity-90"
                        style={{
                          fontSize: '12px',
                          margin: '2px 0 0 0'
                        }}
                      >
                        {pkg.description}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-center mb-3">
                    <div 
                      className="font-bold"
                      style={{
                        fontSize: window.innerWidth <= 768 ? '14px' : '28px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        marginBottom: window.innerWidth <= 768 ? '1px' : '2px'
                      }}
                    >
                      {formatPrice(pkg.priceDisplay)}
                    </div>
                    {window.innerWidth > 768 && (
                      <div 
                        className="opacity-80"
                        style={{
                          fontSize: '10px'
                        }}
                      >
                        One-time purchase
                      </div>
                    )}
                  </div>

                  {/* Power-ups */}
                  <div style={{ marginBottom: window.innerWidth <= 768 ? '8px' : '16px' }}>
                    <div className="flex items-center gap-1" style={{ marginBottom: window.innerWidth <= 768 ? '2px' : '4px' }}>
                      <img 
                        src={timeBoostIcon} 
                        alt="Time" 
                        style={{ 
                          width: window.innerWidth <= 768 ? '12px' : '16px', 
                          height: window.innerWidth <= 768 ? '12px' : '16px' 
                        }} 
                      />
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '9px' : '12px', 
                        color: '#ffffff' 
                      }}>
                        {window.innerWidth <= 768 ? 'Time' : 'Time Boosts'}
                      </span>
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '10px' : '14px', 
                        color: '#ffffff', 
                        fontWeight: 'bold', 
                        marginLeft: 'auto' 
                      }}>
                        +{pkg.powerups.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1" style={{ marginBottom: window.innerWidth <= 768 ? '2px' : '4px' }}>
                      <img 
                        src={hintIcon} 
                        alt="Hints" 
                        style={{ 
                          width: window.innerWidth <= 768 ? '12px' : '16px', 
                          height: window.innerWidth <= 768 ? '12px' : '16px' 
                        }} 
                      />
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '9px' : '12px', 
                        color: '#ffffff' 
                      }}>
                        {window.innerWidth <= 768 ? 'Hints' : 'Hints'}
                      </span>
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '10px' : '14px', 
                        color: '#ffffff', 
                        fontWeight: 'bold', 
                        marginLeft: 'auto' 
                      }}>
                        +{pkg.powerups.hints}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <img 
                        src={skipIcon} 
                        alt="Skip" 
                        style={{ 
                          width: window.innerWidth <= 768 ? '12px' : '16px', 
                          height: window.innerWidth <= 768 ? '12px' : '16px' 
                        }} 
                      />
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '9px' : '12px', 
                        color: '#ffffff' 
                      }}>
                        {window.innerWidth <= 768 ? 'Skips' : 'Level Skips'}
                      </span>
                      <span style={{ 
                        fontSize: window.innerWidth <= 768 ? '10px' : '14px', 
                        color: '#ffffff', 
                        fontWeight: 'bold', 
                        marginLeft: 'auto' 
                      }}>
                        +{pkg.powerups.skips}
                      </span>
                    </div>
                  </div>
                  
                  {/* Spacer to push button to bottom */}
                  <div style={{ flex: '1' }}></div>
                  
                  {/* Buy Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageClick(pkg.id);
                    }}
                    className="w-full font-bold py-3 px-4 rounded transition-all duration-300"
                    style={{
                      background: '#22c55e',
                      backgroundColor: '#22c55e',
                      border: 'none',
                      color: 'white',
                      fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                      borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#16a34a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#22c55e';
                    }}
                  >
                    BUY NOW
                  </button>
                  
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelector;