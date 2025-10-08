import {
    acala, ancient8, ancient8Sepolia, anvil, apexTestnet, arbitrum, arbitrumGoerli, arbitrumNova, astar, astarZkEVM, astarZkyoto, arbitrumSepolia, areonNetwork, areonNetworkTestnet, aurora, auroraTestnet, auroria, avalanche, avalancheFuji, bahamut, base, baseGoerli, baseSepolia, beam, beamTestnet, bearNetworkChainMainnet, bearNetworkChainTestnet, berachainTestnet, berachainTestnetbArtio, bevmMainnet, bitkub, bitkubTestnet, bitTorrent, bitTorrentTestnet, blast, blastSepolia, bob, boba, bronos, bronosTestnet, bsc, bscTestnet, bscGreenfield, btr, btrTestnet, bxn, bxnTestnet, canto, celo, celoAlfajores, chiliz, classic, confluxESpace, confluxESpaceTestnet, coreDao, cronos, cronosTestnet, crossbell, cyber, cyberTestnet, darwinia, dchain, dchainTestnet, defichainEvm, defichainEvmTestnet, degen, dfk, dodochainTestnet, dogechain, dreyerxMainnet, edgeless, edgelessTestnet, edgeware, edgewareTestnet, eon, eos, eosTestnet, etherlink, etherlinkTestnet, evmos, evmosTestnet, ekta, ektaTestnet, fantom, fantomSonicTestnet, fantomTestnet, fibo, filecoin, filecoinCalibration, filecoinHyperspace, flare, flareTestnet, flowPreviewnet, flowMainnet, flowTestnet, foundry, fraxtal, fraxtalTestnet, funkiSepolia, fuse, fuseSparknet, iotex, iotexTestnet, jbc, jbcTestnet, karura, gobi, goerli, gnosis, gnosisChiado, ham, hardhat, harmonyOne, haqqMainnet, haqqTestedge2, hedera, hederaTestnet, hederaPreviewnet, holesky, immutableZkEvm, immutableZkEvmTestnet, inEVM, kakarotSepolia, kava, kavaTestnet, kcc, klaytn, klaytnBaobab, kroma, kromaSepolia, l3x, l3xTestnet, lightlinkPegasus, lightlinkPhoenix, linea, lineaGoerli, lineaSepolia, lineaTestnet, lisk, liskSepolia, localhost, lukso, luksoTestnet, lycan, lyra, mainnet, mandala, manta, mantaSepoliaTestnet, mantaTestnet, mantle, mantleSepoliaTestnet, mantleTestnet, merlin, metachain, metachainIstanbul, metalL2, meter, meterTestnet, metis, metisGoerli, mev, mevTestnet, mintSepoliaTestnet, mode, modeTestnet, moonbaseAlpha, moonbeam, moonbeamDev, moonriver, morphHolesky, morphSepolia, nautilus, neonDevnet, neonMainnet, nexi, nexilix, oasys, oasisTestnet, okc, optimism, optimismGoerli, optimismSepolia, opBNB, opBNBTestnet, oortMainnetDev, otimDevnet, palm, palmTestnet, playfiAlbireo, pgn, pgnTestnet, phoenix, plinga, plumeTestnet, polygon, polygonAmoy, polygonMumbai, polygonZkEvm, polygonZkEvmCardona, polygonZkEvmTestnet, pulsechain, pulsechainV4, qMainnet, qTestnet, real, redbellyTestnet, redstone, reyaNetwork, rollux, rolluxTestnet, ronin, rootstock, rootstockTestnet, rss3, rss3Sepolia, saigon, sapphire, sapphireTestnet, satoshiVM, satoshiVMTestnet, scroll, scrollSepolia, sei, seiDevnet, seiTestnet, sepolia, shimmer, shimmerTestnet, skaleBlockBrawlers, skaleCalypso, skaleCalypsoTestnet, skaleCryptoBlades, skaleCryptoColosseum, skaleEuropa, skaleEuropaTestnet, skaleExorde, skaleHumanProtocol, skaleNebula, skaleNebulaTestnet, skaleRazor, skaleTitan, skaleTitanTestnet, songbird, songbirdTestnet, spicy, shardeumSphinx, shibarium, shibariumTestnet, stratis, syscoin, syscoinTestnet, taraxa, taiko, taikoHekla, taikoJolnir, taikoKatla, taikoTestnetSepolia, taraxaTestnet, telcoinTestnet, telos, telosTestnet, tenet, thaiChain, thunderTestnet, unreal, vechain, wanchain, wanchainTestnet, wemix, wemixTestnet, xLayerTestnet, x1Testnet, xLayer, xai, xaiTestnet, xdc, xdcTestnet, xrSepolia, yooldoVerse, yooldoVerseTestnet, zetachain, zetachainAthensTestnet, zhejiang, zilliqa, zilliqaTestnet, zkFair, zkFairTestnet, zkSync, zkSyncInMemoryNode, zkSyncLocalNode, zkSyncSepoliaTestnet, zkSyncTestnet, zora, zoraSepolia, zoraTestnet, zircuitTestnet
} from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { PrepareTransactionRequestParameters } from "viem";
import { SignTypedDataParameters } from "viem/accounts";
import { SafeSignerRequest } from "..";

export const chains: Chain[] = [acala, ancient8, ancient8Sepolia, anvil, apexTestnet, arbitrum, arbitrumGoerli, arbitrumNova, astar, astarZkEVM, astarZkyoto, arbitrumSepolia, areonNetwork, areonNetworkTestnet, aurora, auroraTestnet, auroria, avalanche, avalancheFuji, bahamut, base, baseGoerli, baseSepolia, beam, beamTestnet, bearNetworkChainMainnet, bearNetworkChainTestnet, berachainTestnet, berachainTestnetbArtio, bevmMainnet, bitkub, bitkubTestnet, bitTorrent, bitTorrentTestnet, blast, blastSepolia, bob, boba, bronos, bronosTestnet, bsc, bscTestnet, bscGreenfield, btr, btrTestnet, bxn, bxnTestnet, canto, celo, celoAlfajores, chiliz, classic, confluxESpace, confluxESpaceTestnet, coreDao, cronos, cronosTestnet, crossbell, cyber, cyberTestnet, darwinia, dchain, dchainTestnet, defichainEvm, defichainEvmTestnet, degen, dfk, dodochainTestnet, dogechain, dreyerxMainnet, edgeless, edgelessTestnet, edgeware, edgewareTestnet, eon, eos, eosTestnet, etherlink, etherlinkTestnet, evmos, evmosTestnet, ekta, ektaTestnet, fantom, fantomSonicTestnet, fantomTestnet, fibo, filecoin, filecoinCalibration, filecoinHyperspace, flare, flareTestnet, flowPreviewnet, flowMainnet, flowTestnet, foundry, fraxtal, fraxtalTestnet, funkiSepolia, fuse, fuseSparknet, iotex, iotexTestnet, jbc, jbcTestnet, karura, gobi, goerli, gnosis, gnosisChiado, ham, hardhat, harmonyOne, haqqMainnet, haqqTestedge2, hedera, hederaTestnet, hederaPreviewnet, holesky, immutableZkEvm, immutableZkEvmTestnet, inEVM, kakarotSepolia, kava, kavaTestnet, kcc, klaytn, klaytnBaobab, kroma, kromaSepolia, l3x, l3xTestnet, lightlinkPegasus, lightlinkPhoenix, linea, lineaGoerli, lineaSepolia, lineaTestnet, lisk, liskSepolia, localhost, lukso, luksoTestnet, lycan, lyra, mainnet, mandala, manta, mantaSepoliaTestnet, mantaTestnet, mantle, mantleSepoliaTestnet, mantleTestnet, merlin, metachain, metachainIstanbul, metalL2, meter, meterTestnet, metis, metisGoerli, mev, mevTestnet, mintSepoliaTestnet, mode, modeTestnet, moonbaseAlpha, moonbeam, moonbeamDev, moonriver, morphHolesky, morphSepolia, nautilus, neonDevnet, neonMainnet, nexi, nexilix, oasys, oasisTestnet, okc, optimism, optimismGoerli, optimismSepolia, opBNB, opBNBTestnet, oortMainnetDev, otimDevnet, palm, palmTestnet, playfiAlbireo, pgn, pgnTestnet, phoenix, plinga, plumeTestnet, polygon, polygonAmoy, polygonMumbai, polygonZkEvm, polygonZkEvmCardona, polygonZkEvmTestnet, pulsechain, pulsechainV4, qMainnet, qTestnet, real, redbellyTestnet, redstone, reyaNetwork, rollux, rolluxTestnet, ronin, rootstock, rootstockTestnet, rss3, rss3Sepolia, saigon, sapphire, sapphireTestnet, satoshiVM, satoshiVMTestnet, scroll, scrollSepolia, sei, seiDevnet, seiTestnet, sepolia, shimmer, shimmerTestnet, skaleBlockBrawlers, skaleCalypso, skaleCalypsoTestnet, skaleCryptoBlades, skaleCryptoColosseum, skaleEuropa, skaleEuropaTestnet, skaleExorde, skaleHumanProtocol, skaleNebula, skaleNebulaTestnet, skaleRazor, skaleTitan, skaleTitanTestnet, songbird, songbirdTestnet, spicy, shardeumSphinx, shibarium, shibariumTestnet, stratis, syscoin, syscoinTestnet, taraxa, taiko, taikoHekla, taikoJolnir, taikoKatla, taikoTestnetSepolia, taraxaTestnet, telcoinTestnet, telos, telosTestnet, tenet, thaiChain, thunderTestnet, unreal, vechain, wanchain, wanchainTestnet, wemix, wemixTestnet, xLayerTestnet, x1Testnet, xLayer, xai, xaiTestnet, xdc, xdcTestnet, xrSepolia, yooldoVerse, yooldoVerseTestnet, zetachain, zetachainAthensTestnet, zhejiang, zilliqa, zilliqaTestnet, zkFair, zkFairTestnet, zkSync, zkSyncInMemoryNode, zkSyncLocalNode, zkSyncSepoliaTestnet, zkSyncTestnet, zora, zoraSepolia, zoraTestnet, zircuitTestnet];

export function getChainById(chainId: number) {
    return chains.find(chain => chain.id === chainId);
}

export function getChainByName(chainName: string) {
    // Set up some aliases
    switch (chainName.toLowerCase()) {
        case 'mainnet': chainName = 'ethereum'; break;
    }
    return chains.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
}

export function compareChains(chain1: string | number, chain2: string | number) {
    const chain1Id = getChain(chain1)?.id;
    const chain2Id = getChain(chain2)?.id;
    return chain1Id === chain2Id;
}

export function getChain(chain: string | number | Chain) {
    if (typeof chain === 'object') {
        chain = chain.id || chain.name;
    }
    return isNaN(parseInt(String(chain))) ? getChainByName(String(chain)) : getChainById(Number(chain));
}

// Extract chain ID from request - always returns a number or null
export const extractChainIdFromRequest = (req: SafeSignerRequest): number | null => {
    // For SignTypedDataParameters, get chainId from domain
    const typedDataChainId = (req as unknown as SignTypedDataParameters)?.domain?.chainId;
    if (typedDataChainId !== undefined) {
        return Number(typedDataChainId);
    }
    
    // For PrepareTransactionRequestParameters, get chain and convert to ID
    if ((req as PrepareTransactionRequestParameters)?.chain) {
        const chain = (req as PrepareTransactionRequestParameters).chain;
        
        // If it's already a number, return it
        if (typeof chain === 'number') {
            return chain;
        }
        
        // If it's a Chain object, return its ID
        if (typeof chain === 'object' && chain && 'id' in chain) {
            return chain.id;
        }
        
        // If it's a string, try to find the chain by name and return its ID
        if (typeof chain === 'string') {
            const foundChain = getChainByName(chain);
            return foundChain ? foundChain.id : null;
        }
    }
    
    return null;
}

/**
 * Checks if the current chain ID matches the chain required by a SafeSignerRequest
 * @param currentChainId - The current chain ID
 * @param request - The SafeSignerRequest object to check
 * @returns true if on the correct chain, false otherwise
 */
export function getIsCorrectChain(currentChainId: number, request: SafeSignerRequest | null): boolean {
    if (!request) return true;

    const requestedChainId = extractChainIdFromRequest(request);
    
    console.log("Chain id from request", requestedChainId);
    // If no chain is specified in the request, assume any chain is correct
    if (requestedChainId === null) {
        return true;
    }
    
    return currentChainId === requestedChainId;
}
