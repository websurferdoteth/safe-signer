interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredAddress: string;
}

function AddressModal({ isOpen, onClose, requiredAddress }: AddressModalProps) {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        maxWidth: '28rem',
        width: '100%',
        margin: '0 1rem'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            Wrong Address Connected
          </h2>
          <p style={{ color: '#4B5563', marginBottom: '1rem' }}>
            You must connect with a specific address to continue.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
            Required address: <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#111827' }}>{requiredAddress}</span>
          </p>
          <p style={{ color: '#4B5563', marginBottom: '1rem' }}>
            Make sure you&apos;ve switched to this address in your wallet before trying again.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleClose}
              style={{
                backgroundColor: '#2563EB',
                color: 'white',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1D4ED8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563EB';
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;
