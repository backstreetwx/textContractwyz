import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../constants/address";
import { error } from "console";

const Home: NextPage = () => {
  const address = useAddress();
  const {
    contract
  } = useContract(CONTRACT_ADDRESS);

  const {
    data: counter,
    isLoading: isCounterLoading,
  }= useContractRead(contract, "getCounter")

  const {
    data: owner
  } = useContractRead(contract, "owner")


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet />
        <h1>Counter Dapp</h1>
        <div className={styles.counterContainer}>
          {isCounterLoading ? (
            <p 
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
            }}
            >0</p>
          ) : (
            <p
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
            }}
            >{counter}</p>
          )}
          {address && (
            <div className={styles.buttonContainer}>
              <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => contract.call(
                "decrement"
              )}
              onError={(error) => alert(error)}
              >-</Web3Button>
              <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => contract.call(
                "increment"
              )}
              onSuccess={() => alert("Counter incremented!")}
              >+</Web3Button>
            </div>
          )}
          {address == owner ? (
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) => contract.call(
                "reset"
              )}
              >Reset</Web3Button>
          ) : address ? (
            <p>You are not the owner of this contract.</p>
          ) : (
            <p>Connect your wallet to interact with the counter!</p>
          )}
        </div>

      </div>
    </main>
  );
};

export default Home;
