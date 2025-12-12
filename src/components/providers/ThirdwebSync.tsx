import { useNetworkConfigStore } from '@/core-ui/stores';
import { useEffect } from 'react';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';

export const ThirdwebSync = () => {
  const wallet = useActiveWallet();
  const account = useActiveAccount();

  const setWalletAddress = useNetworkConfigStore((store) => store.setWalletAddress);

  useEffect(() => {
    setWalletAddress(account?.address || '');
  }, [account?.address, setWalletAddress]);

  return null;
};
