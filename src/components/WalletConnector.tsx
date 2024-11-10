import {
  TonConnectButton,
} from "@tonconnect/ui-react";
import {FC} from "react";

import "@hot-wallet/sdk/adapter/ton";

export const WalletConnector: FC = () => {
  return (
    <div className="view">
      <TonConnectButton/>
    </div>

  );
};