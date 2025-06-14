import { App, Astal, Gdk } from "astal/gtk4"
import Hyprland from "./Bar/Hyprland"
import Tray from "./Bar/Tray"
import Battery from "./Bar/Battery"
import Sound from "./Bar/Sound"
import DateTime from "./Bar/DateTime"
import { Menu } from "./Bar/Menu"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor
  return (
    <window
      visible
      cssClasses={["bg-transparent"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox hexpand cssClasses={["bg-black/80"]}>
        <box cssClasses={["ml-2"]}>
          <Hyprland />
        </box>
        <box />
        <box cssClasses={["mr-2"]}>
          <Tray />
          <Battery />
          <Sound />
          <DateTime />
          <Menu />
        </box>
      </centerbox>
    </window>
  )
}
