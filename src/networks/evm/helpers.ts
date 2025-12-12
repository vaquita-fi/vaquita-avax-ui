import { isAvalancheNetwork } from '../avalanche/helpers';

export const isEvmTypeNetwork = (networkName: string) => {
  return isAvalancheNetwork(networkName);
};
