'use client';

import { useNetworkConfigStore } from '@/core-ui/stores';
import { isEvmTypeNetwork } from '@/networks/evm';
import { createThirdwebClient } from 'thirdweb';
import { ConnectButton } from 'thirdweb/react';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export function ThirdwebButtons() {
  const network = useNetworkConfigStore((s) => s.network);
  const walletAddress = useNetworkConfigStore((s) => s.walletAddress);

  if (network?.name && !isEvmTypeNetwork(network?.name)) return null;

  return (
    <div className="flex items-center m-2">
      <ConnectButton
        client={client}
        // TODO: There is a bug in the x402 for smart wallets atm, revise later
        // accountAbstraction={{
        //   chain: avalancheFuji, // the chain where your smart accounts will be or is deployed
        //   sponsorGas: true, // enable or disable sponsored transactions
        // }}
      />
    </div>
  );
}
