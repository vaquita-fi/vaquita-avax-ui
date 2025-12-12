'use client';

import { ConnectButton, WalletButton } from '@/core-ui/components';
import { useNetworkConfigStore } from '@/core-ui/stores';
import { isEvmTypeNetwork } from '@/networks/evm';
import { useLinkAccount, useLogin, usePrivy, useWallets } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';

export default function PrivyAuthButtons() {
  const network = useNetworkConfigStore((s) => s.network);
  const walletAddress = useNetworkConfigStore((s) => s.walletAddress);

  const { login } = useLogin();
  const { linkWallet } = useLinkAccount();
  const { logout, authenticated, ready } = usePrivy(); // ready evita parpadeos al montar
  const { wallets } = useWallets();

  const account = useAccount();
  const linkedWalletAddress =
    walletAddress || account.address || wallets.find((wallet) => Boolean(wallet.address))?.address || '';
  const isWalletConnected = authenticated && Boolean(linkedWalletAddress);

  if (!ready && network?.name) {
    return (
      <div className="flex items-center gap-2 text-sm rounded-md h-10 bg-primary border border-black border-b-3 text-black px-4">
        <svg
          className="animate-spin h-4 w-4 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Loading wallet...
      </div>
    );
  }

  if (network?.name && !isEvmTypeNetwork(network?.name)) return null;

  const handleConnect = () => {
    if (!ready) return;
    if (authenticated) {
      linkWallet();
      return;
    }
    login();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center m-2">
      {isWalletConnected ? (
        <WalletButton handleLogout={handleLogout} startContentSrc="/chains/evm.png" startContentAlt="EVM" />
      ) : (
        <ConnectButton onPress={handleConnect} startContentSrc="/chains/evm.png" startContentAlt="EVM" />
      )}
      {/* TODO: its necessary to add styles to the button to make it look like the other buttons */}
      {/* <Button
        as={Link}
        href="/profile"
        variant="flat"
        onPress={handleProfile}
        className="rounded-lg border border-black border-b-3 text-black"
      >
        <FaRegUser className="h-4 w-4 p-0" />
      </Button> */}
    </div>
  );
}
