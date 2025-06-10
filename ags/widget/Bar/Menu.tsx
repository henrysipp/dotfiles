import Network from "gi://AstalNetwork";
import Bluetooth from "gi://AstalBluetooth";
import { bind } from "astal";

function WifiButton() {
  const net = Network.get_default();

  const wifiClasses = bind(net, "state").as((state) =>
    state == Network.State.CONNECTED_GLOBAL
      ? ["menu__wifi-btn", "menu__wifi-btn--connected"]
      : ["menu__wifi-btn", "menu__wifi-btn--disconnected"]
  );

  return (
    <button
      cssClasses={wifiClasses}
      onClicked={() => {
        net.wifi.set_enabled(!net.wifi.get_enabled());
      }}
    >
      Wifi
    </button>
  );
}

function BluetoothButton() {
  const bluetooth = Bluetooth.get_default();

  const bluetoothClasses = bind(bluetooth, "isPowered").as((powered) =>
    powered
      ? ["menu__bluetooth-btn", "menu__bluetooth-btn--enabled"]
      : ["menu__bluetooth-btn", "menu__bluetooth-btn--disabled"]
  );

  return (
    <button
      cssClasses={bluetoothClasses}
      onClicked={() => {
        bluetooth.toggle();
      }}
    >
      Bluetooth
    </button>
  );
}

export function Menu() {
  return (
    <menubutton cssClasses={["menu"]}>
      <label>{"󰣇"}</label>
      <popover cssClasses={["menu__popover"]}>
        <box widthRequest={400} orientation={1} cssClasses={["menu__popover-container"]}>
          <label>okie</label>
          <box>
            <WifiButton />
            <BluetoothButton />
            <button cssClasses={["menu__nightmode-btn"]}>Night Mode</button>
          </box>
          <box orientation={1}>
            <label>Display</label>
            <slider
              widthRequest={100}
              onNotifyValue={(self) => print("new value", self.value)}
            />
          </box>
          <box orientation={1}>
            <label>Sound</label>
            <slider
              widthRequest={100}
              onNotifyValue={(self) => print("new value", self.value)}
            />
          </box>
        </box>
      </popover>
    </menubutton>
  );
}
