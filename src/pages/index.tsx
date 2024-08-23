import { useConnectModal, ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useWalletClient } from "wagmi";
import { useEffect } from "react";
import WalletContext from "../components/WalletContext";

const Home: NextPage = () => {
  const { data: walletClient } = useWalletClient();
  const { openConnectModal } = useConnectModal();
  useEffect(() => {
    if (walletClient) {
    } else if (openConnectModal) {
      openConnectModal();
    }
  }, [walletClient, openConnectModal]);

  return (
    <div className={styles.container}>
      <Head>
        <title>SafeSigner</title>
        <meta
          content="Sign transactions and messages from the CLI without needing to copy your private key from your mobile or browser wallet"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ConnectButton />
      <WalletContext />
    </div>
  );
};

export default Home;
