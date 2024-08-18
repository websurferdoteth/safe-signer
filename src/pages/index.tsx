import { useConnectModal } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useWalletClient } from "wagmi";
import { useEffect } from "react";
import SocketContext from "../components/SocketContext";

const Home: NextPage = () => {
  const { data: walletClient } = useWalletClient();
  const { openConnectModal } = useConnectModal();
  useEffect(() => {
    if (walletClient) {
    } else if (openConnectModal) {
      openConnectModal();
    }
  }, [walletClient]);

  return (
    <div className={styles.container}>
      <Head>
        <title>SafeSign App</title>
        <meta
          content="Sign messages and transaction without exposing your private key"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {walletClient && <SocketContext walletClient={walletClient} />}
    </div>
  );
};

export default Home;
