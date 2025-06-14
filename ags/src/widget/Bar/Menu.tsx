import Network from "gi://AstalNetwork"
import Bluetooth from "gi://AstalBluetooth"
import { bind, Variable, exec } from "astal"
import { Gtk } from "astal/gtk4"
import Brightness from "./Brightness"
import Volume from "../../utils/Volume"

function WifiButton() {
  const net = Network.get_default()

  const wifiClasses = bind(net, "state").as((state) =>
    state == Network.State.CONNECTED_GLOBAL
      ? [
          "bg-primary",
          "text-on-primary",
          "rounded-lg",
          "p-2",
          "min-w-[32px]",
          "min-h-[32px]",
          "animate",
          "border",
          "border-white/15",
        ]
      : [
          "bg-white/[0.06]",
          "rounded-lg",
          "p-2",
          "min-w-[32px]",
          "min-h-[32px]",
          "animate",
          "hover:bg-white/[0.12]",
        ]
  )

  const wifiIcon = bind(net, "state").as((state) => {
    if (!net.wifi.get_enabled()) return "󰤮" // WiFi disabled
    switch (state) {
      case Network.State.CONNECTED_GLOBAL:
        return "󰤨" // WiFi connected
      case Network.State.CONNECTED_LOCAL:
      case Network.State.CONNECTED_SITE:
        return "󰤩" // WiFi limited connectivity
      case Network.State.CONNECTING:
        return "󰤦" // WiFi connecting
      default:
        return "󰤯" // WiFi disconnected
    }
  })

  return (
    <box spacing={8} hexpand cssClasses={["p-1", "rounded-lg"]}>
      <button
        cssClasses={wifiClasses}
        onClicked={() => {
          net.wifi.set_enabled(!net.wifi.get_enabled())
        }}
      >
        <label cssClasses={["text-base"]}>{wifiIcon}</label>
      </button>
      <box vertical halign={Gtk.Align.START} hexpand>
        <label halign={Gtk.Align.START} cssClasses={["font-bold", "text-sm"]}>
          Wi-Fi
        </label>
        <label halign={Gtk.Align.START} cssClasses={["text-xs", "opacity-70"]}>
          Sipp_Wifi
        </label>
      </box>
    </box>
  )
}

function BluetoothButton() {
  const bluetooth = Bluetooth.get_default()

  const bluetoothClasses = bind(bluetooth, "isPowered").as((powered) =>
    powered
      ? [
          "bg-primary",
          "text-on-primary",
          "rounded-lg",
          "p-2",
          "min-w-[32px]",
          "min-h-[32px]",
          "animate",
          "border",
          "border-white/15",
        ]
      : [
          "bg-white/[0.06]",
          "rounded-lg",
          "p-2",
          "min-w-[32px]",
          "min-h-[32px]",
          "animate",
          "hover:bg-white/[0.12]",
        ]
  )

  const bluetoothIcon = bind(bluetooth, "isPowered").as(
    (powered) => (powered ? "󰂯" : "󰂲") // Bluetooth on : Bluetooth off
  )

  const bluetoothStatus = bind(bluetooth, "isPowered").as((powered) =>
    powered ? "On" : "Off"
  )

  return (
    <box
      spacing={12}
      hexpand
      cssClasses={[
        "p-1",
        "rounded-lg",
        "animate",
        "hover:bg-white/[0.04]",
      ]}
    >
      <button
        cssClasses={bluetoothClasses}
        onClicked={() => {
          bluetooth.toggle()
        }}
      >
        <label cssClasses={["text-base"]}>{bluetoothIcon}</label>
      </button>
      <box vertical halign={Gtk.Align.START} hexpand>
        <label halign={Gtk.Align.START} cssClasses={["font-bold", "text-sm"]}>
          Bluetooth
        </label>
        <label halign={Gtk.Align.START} cssClasses={["text-xs", "opacity-70"]}>
          {bluetoothStatus}
        </label>
      </box>
    </box>
  )
}

export function Menu() {
  const brightness = new Brightness()
  const volume = new Volume()
  const nightMode = Variable(false)

  return (
    <menubutton
      cssClasses={[
        "bg-transparent",
        "rounded-lg",
        "px-3",
        "py-1",
        "m-0.5",
        "animate",
        "hover:bg-black/50",
      ]}
    >
      <label cssClasses={["text-lg"]}>{"󰣇"}</label>
      <popover>
        <box widthRequest={420} orientation={1}>
          <box spacing={8}>
            <box
              vertical
              hexpand
              spacing={4}
              cssClasses={["bg-canvas-secondary", "rounded-xl", "p-4", "mt-2"]}
            >
              <WifiButton />
              <BluetoothButton />
            </box>
            <box
              vertical
              hexpand
              spacing={4}
              cssClasses={["bg-canvas-secondary", "rounded-xl", "p-4", "mt-2"]}
            >
              <button
                cssClasses={bind(nightMode).as(enabled => [
                  "w-full",
                  "rounded-lg",
                  "px-3",
                  "py-2",
                  "animate",
                  ...(enabled ? ["bg-primary", "text-on-primary"] : ["bg-white/[0.08]", "hover:bg-white/[0.12]"])
                ])}
                onClicked={() => {
                  const newState = !nightMode.get()
                  nightMode.set(newState)
                  if (newState) {
                    exec("hyprctl hyprsunset temperature 2500")
                  } else {
                    exec("hyprctl hyprsunset temperature 6000")
                  }
                }}
              >
                <label>{bind(nightMode).as(enabled => enabled ? "󰖔" : "󰖙")} Night Mode</label>
              </button>
            </box>
          </box>
          <box cssClasses={["my-1", "min-h-0", "bg-white/[0.08]"]} />
          <box
            vertical
            spacing={8}
            cssClasses={["bg-canvas-secondary", "rounded-xl", "p-4", "mt-2"]}
          >
            <box spacing={8}>
              <label cssClasses={["text-base", "opacity-80"]}>󰃠</label>
              <label
                cssClasses={["font-bold", "text-sm", "ml-2"]}
                halign={Gtk.Align.START}
                hexpand
              >
                Display
              </label>
            </box>
            <slider
              value={bind(brightness, "screen")}
              max={bind(brightness, "screenMax")}
              onChangeValue={(self) => {
                brightness.setScreenBrightness(self.value)
              }}
            />
          </box>
          <box cssClasses={["my-1", "min-h-0", "bg-white/[0.08]"]} />
          <box
            vertical
            spacing={8}
            cssClasses={[
              "bg-black/[0.08]",
              "rounded-xl",
              "p-4",
              "border",
              "border-white/[0.06]",
              "animate",
            ]}
          >
            <box spacing={8}>
              <label cssClasses={["text-base", "opacity-80"]}>󰕾</label>
              <label
                cssClasses={["font-bold", "text-sm", "ml-2"]}
                halign={Gtk.Align.START}
                hexpand
              >
                Sound
              </label>
            </box>
            <slider
              value={bind(volume, "volume")}
              max={bind(volume, "volumeMax")}
              onChangeValue={(self) => {
                volume.setVolume(self.value)
              }}
            />
          </box>
        </box>
      </popover>
    </menubutton>
  )
}
