import Network from "gi://AstalNetwork";
import Bluetooth from "gi://AstalBluetooth";
import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import Brightness from "./Brightness";
import Volume from "./Volume";

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
    <box spacing={8} hexpand cssClasses={["menu__button-row"]}>
      <button
        cssClasses={wifiClasses}
        onClicked={() => {
          net.wifi.set_enabled(!net.wifi.get_enabled());
        }}
      >
        <label cssClasses={["menu__button-icon"]}>{wifiIcon}</label>
      </button>
      <box vertical halign={Gtk.Align.START} hexpand>
        <label halign={Gtk.Align.START} cssClasses={["label--primary"]}>Wi-Fi</label>
        <label halign={Gtk.Align.START} cssClasses={["label--secondary"]}>Sipp_Wifi</label>
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
    <box spacing={12} hexpand cssClasses={["menu__button-row"]}>
      <button
        cssClasses={bluetoothClasses}
        onClicked={() => {
          bluetooth.toggle();
        }}
      >
        <label cssClasses={["menu__button-icon"]}>{bluetoothIcon}</label>
      </button>
      <box vertical halign={Gtk.Align.START} hexpand>
        <label halign={Gtk.Align.START} cssClasses={["label--primary"]}>Bluetooth</label>
        <label halign={Gtk.Align.START} cssClasses={["label--secondary"]}>{bluetoothStatus}</label>
      </box>
    </box>
  );
}

export function Menu() {
  const brightness = new Brightness();
  const volume = new Volume();

  return (
    <menubutton cssClasses={["menu"]}>
      <label cssClasses={["menu__trigger-icon"]}>{"󰣇"}</label>
      <popover cssClasses={["menu__popover"]}>
        <box widthRequest={420} orientation={1} cssClasses={["menu__popover-container"]}>
          <box spacing={8}>
            <box vertical hexpand spacing={4} cssClasses={["menu__popover-panel"]}>
              <WifiButton />
              <BluetoothButton />
            </box>
            <box vertical hexpand spacing={4} cssClasses={["menu__popover-panel"]}>
              <button cssClasses={["menu__nightmode-btn"]}>
                  <label cssClasses={["menu__nightmode-icon"]}>󰃚</label>
                  <label>Night Mode</label>
              </button>
            </box>
          </box>
          <box cssClasses={["menu__separator"]} />
          <box vertical spacing={8} cssClasses={["menu__popover-panel"]}>
            <box spacing={8}>
              <label cssClasses={["menu__slider-icon"]}>󰃠</label>
              <label 
                cssClasses={["label--primary", "label--primary--title"]} 
                halign={Gtk.Align.START}
                hexpand>Display</label>
            </box>
            <slider
              value={bind(brightness, "screen")}
              max={bind(brightness, "screenMax")}
              onChangeValue={(self) => {
                brightness.setScreenBrightness(self.value);
              }}
            />
          </box>
          <box cssClasses={["menu__separator"]} />
          <box vertical spacing={8} cssClasses={["menu__popover-panel"]}>
            <box spacing={8}>
              <label cssClasses={["menu__slider-icon"]}>󰕾</label>
              <label 
                cssClasses={["label--primary", "label--primary--title"]} 
                halign={Gtk.Align.START}
                hexpand>Sound</label>
            </box>
            <slider
              value={bind(volume, "volume")}
              max={bind(volume, "volumeMax")}
              onChangeValue={(self) => {
                volume.setVolume(self.value);
              }}
            />
          </box>
        </box>
      </popover>
    </menubutton>
  );
}
