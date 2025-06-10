import Network from "gi://AstalNetwork";
import Bluetooth from "gi://AstalBluetooth";
import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import Brightness from "./Brightness";

function WifiButton() {
  const net = Network.get_default();

  const wifiClasses = bind(net, "state").as((state) =>
    state == Network.State.CONNECTED_GLOBAL
      ? ["menu__wifi-btn", "menu__wifi-btn--connected"]
      : ["menu__wifi-btn", "menu__wifi-btn--disconnected"]
  );

  const wifiIcon = bind(net, "state").as((state) => {
    if (!net.wifi.get_enabled()) return "󰤮"; // WiFi disabled
    switch (state) {
      case Network.State.CONNECTED_GLOBAL:
        return "󰤨"; // WiFi connected
      case Network.State.CONNECTED_LOCAL:
      case Network.State.CONNECTED_SITE:
        return "󰤩"; // WiFi limited connectivity
      case Network.State.CONNECTING:
        return "󰤦"; // WiFi connecting
      default:
        return "󰤯"; // WiFi disconnected
    }
  });

  return (
    <box spacing={12} hexpand>
      <button
        cssClasses={wifiClasses}
        onClicked={() => {
          net.wifi.set_enabled(!net.wifi.get_enabled());
        }}
      >
        {wifiIcon}
        
      </button>
      <box vertical halign={Gtk.Align.START}>
        <label halign={Gtk.Align.START} cssClasses={["menu__label--primary"]}>Wifi</label>
        <label halign={Gtk.Align.START} cssClasses={["menu__label--secondary"]}>Sipp_Wifi</label>
      </box>
    </box>
  );
}

function BluetoothButton() {
  const bluetooth = Bluetooth.get_default();

  const bluetoothClasses = bind(bluetooth, "isPowered").as((powered) =>
    powered
      ? ["menu__bluetooth-btn", "menu__bluetooth-btn--enabled"]
      : ["menu__bluetooth-btn", "menu__bluetooth-btn--disabled"]
  );

  const bluetoothIcon = bind(bluetooth, "isPowered").as((powered) =>
    powered ? "󰂯" : "󰂲" // Bluetooth on : Bluetooth off
  );

  const bluetoothStatus = bind(bluetooth, "isPowered").as((powered) =>
    powered ? "On" : "Off"
  );

  return (
    <box spacing={12} hexpand>
      <button
        cssClasses={bluetoothClasses}
        onClicked={() => {
          bluetooth.toggle();
        }}
      >
        {bluetoothIcon}
      </button>
      <box vertical halign={Gtk.Align.START}>
        <label halign={Gtk.Align.START} cssClasses={["menu__label--primary"]}>Bluetooth</label>
        <label halign={Gtk.Align.START} cssClasses={["menu__label--secondary"]}>{bluetoothStatus}</label>
      </box>
    </box>
  );
}

export function Menu() {
  const brightness = new Brightness();

  return (
    <menubutton cssClasses={["menu"]}>
      <label>{"󰣇"}</label>
      <popover cssClasses={["menu__popover"]}>
        <box widthRequest={400} orientation={1} cssClasses={["menu__popover-container"]}>
          <label>okie</label>
          <box spacing={8}>
            <box vertical hexpand spacing={4} cssClasses={["menu__popover-panel"]}>
              <WifiButton />
              <BluetoothButton />
            </box>
            <box vertical hexpand spacing={4} cssClasses={["menu__popover-panel"]}>
              <button cssClasses={["menu__nightmode-btn"]}>Night Mode</button>
            </box>
          </box>
          <box orientation={1}>
            <label>Display</label>
            <slider
              widthRequest={100}
              value={bind(brightness, "screen")}
              max={bind(brightness, "screenMax")}
              onChangeValue={(self) => {
                brightness.setScreenBrightness(self.value);
              }}
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
