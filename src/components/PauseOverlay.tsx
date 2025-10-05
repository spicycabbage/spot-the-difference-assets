import React from "react";

type PauseOverlayProps = {
  onResume: () => void;
};

const PauseOverlay: React.FC<PauseOverlayProps> = ({ onResume }) => {
  return (
    <div 
      onClick={onResume}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'pointer'
      }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: window.innerWidth <= 768 ? '20px 32px' : '32px 48px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center',
        maxWidth: window.innerWidth <= 768 ? '90%' : 'auto',
        margin: window.innerWidth <= 768 ? '20px' : '0'
      }}>
        <h2 style={{
          fontSize: window.innerWidth <= 768 ? '20px' : '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>
          Paused
        </h2>
        <p style={{
          fontSize: window.innerWidth <= 768 ? '14px' : '16px',
          color: '#6b7280',
          margin: '0'
        }}>
          {window.innerWidth <= 768 ? 'Tap to resume' : 'Click to resume'}
        </p>
      </div>
    </div>
  );
};

export default PauseOverlay;
