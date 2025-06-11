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
      ? ["bg-primary", "text-on_primary", "rounded-lg", "p-2", "min-w-[32px]", "min-h-[32px]", "transition-all", "duration-200", "border", "border-white/15"]
      : ["bg-white/[0.06]", "rounded-lg", "p-2", "min-w-[32px]", "min-h-[32px]", "transition-all", "duration-200", "hover:bg-white/[0.12]"]
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
    <box spacing={8} hexpand cssClasses={["p-1", "rounded-lg", "transition-all", "duration-200", "hover:bg-white/[0.04]"]}>
      <button
        cssClasses={wifiClasses}
        onClicked={() => {
          net.wifi.set_enabled(!net.wifi.get_enabled());
        }}
      >
        <label cssClasses={["text-base"]}>{wifiIcon}</label>
      </button>
      <box vertical halign={Gtk.Align.START} hexpand>
        <label halign={Gtk.Align.START} cssClasses={["font-bold", "text-sm"]}>Wi-Fi</label>
        <label halign={Gtk.Align.START} cssClasses={["text-xs", "opacity-70"]}>Sipp_Wifi</label>
      </box>
    </box>
  );
}

function BluetoothButton() {
  const bluetooth = Bluetooth.get_default();

  const bluetoothClasses = bind(bluetooth, "isPowered").as((powered) =>
    powered
      ? ["bg-primary", "text-on_primary", "rounded-lg", "p-2", "min-w-[32px]", "min-h-[32px]", "transition-all", "duration-200", "border", "border-white/15"]
      : ["bg-white/[0.06]", "rounded-lg", "p-2", "min-w-[32px]", "min-h-[32px]", "transition-all", "duration-200", "hover:bg-white/[0.12]"]
  );

  const bluetoothIcon = bind(bluetooth, "isPowered").as((powered) =>
    powered ? "󰂯" : "󰂲" // Bluetooth on : Bluetooth off
  );

  const bluetoothStatus = bind(bluetooth, "isPowered").as((powered) =>
    powered ? "On" : "Off"
  );

  return (
    <box spacing={12} hexpand cssClasses={["p-1", "rounded-lg", "transition-all", "duration-200", "hover:bg-white/[0.04]"]}>
      <button
        cssClasses={bluetoothClasses}
        onClicked={() => {
          bluetooth.toggle();
        }}
      >
        <label cssClasses={["text-base"]}>{bluetoothIcon}</label>
      </button>
      <box vertical halign={Gtk.Align.START} hexpand>
        <label halign={Gtk.Align.START} cssClasses={["font-bold", "text-sm"]}>Bluetooth</label>
        <label halign={Gtk.Align.START} cssClasses={["text-xs", "opacity-70"]}>{bluetoothStatus}</label>
      </box>
    </box>
  );
}

export function Menu() {
  const brightness = new Brightness();
  const volume = new Volume();

  return (
    <menubutton cssClasses={["bg-transparent", "rounded-lg", "px-3", "py-1", "m-0.5", "transition-all", "duration-200", "hover:bg-black/50"]}>
      <label cssClasses={["text-lg"]}>{"󰣇"}</label>
      <popover >
        <box widthRequest={420} orientation={1}>
          <box spacing={8}>
            <box vertical hexpand spacing={4} cssClasses={["bg-black/[0.08]", "rounded-xl", "p-4", "border", "border-white/[0.06]", "transition-all", "duration-200"]}>
              <WifiButton />
              <BluetoothButton />
            </box>
            <box vertical hexpand spacing={4} cssClasses={["bg-black/[0.08]", "rounded-xl", "p-4", "border", "border-white/[0.06]", "transition-all", "duration-200"]}>
              <button cssClasses={["w-full", "bg-white/[0.08]", "rounded-lg", "px-3", "py-2", "transition-all", "duration-200", "hover:bg-white/[0.15]", "active:bg-white/[0.2]"]}>
                  <label cssClasses={["text-base"]}>󰃚</label>
                  <label>Night Mode</label>
              </button>
            </box>
          </box>
          <box cssClasses={["my-1", "min-h-0", "bg-white/[0.08]"]} />
          <box vertical spacing={8} cssClasses={["bg-black/[0.08]", "rounded-xl", "p-4", "border", "border-white/[0.06]", "transition-all", "duration-200"]}>
            <box spacing={8}>
              <label cssClasses={["text-base", "opacity-80"]}>󰃠</label>
              <label 
                cssClasses={["font-bold", "text-sm", "ml-2"]} 
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
          <box cssClasses={["my-1", "min-h-0", "bg-white/[0.08]"]} />
          <box vertical spacing={8} cssClasses={["bg-black/[0.08]", "rounded-xl", "p-4", "border", "border-white/[0.06]", "transition-all", "duration-200"]}>
            <box spacing={8}>
              <label cssClasses={["text-base", "opacity-80"]}>󰕾</label>
              <label 
                cssClasses={["font-bold", "text-sm", "ml-2"]} 
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
