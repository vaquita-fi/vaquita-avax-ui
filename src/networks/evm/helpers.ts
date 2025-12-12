import { isBaseNetwork, isBaseSepoliaTestnetNetwork } from '@/networks/base';

export const isEvmTypeNetwork = (networkName: string) => {
  return isBaseSepoliaTestnetNetwork(networkName) || isBaseNetwork(networkName);
};
