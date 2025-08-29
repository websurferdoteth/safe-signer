import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { SocketIOContext } from './SocketIOContext';
import AddressModal from './AddressModal';

export function RequireAddress() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { options } = useContext(SocketIOContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasDisconnected, setHasDisconnected] = useState(false);

  const requiredAddress = options?.address?.toLowerCase();

  useEffect(() => {
    if (!hasDisconnected && openConnectModal) {
      disconnect();
      setHasDisconnected(true);
      openConnectModal();
    }
  }, [hasDisconnected, openConnectModal, disconnect]);

  useEffect(() => {
    if (!isConnected || !address || !requiredAddress) return;

    const currentAddress = address.toLowerCase();
    
    if (currentAddress !== requiredAddress) {
      setIsModalOpen(true);
      disconnect();
    }
  }, [isConnected, address, requiredAddress, disconnect]);

  return (
    <AddressModal 
      isOpen={isModalOpen} 
      requiredAddress={requiredAddress || ''}
      onClose={() => {
        setIsModalOpen(false);
        openConnectModal?.();
      }} 
    />
  );
} 