import { App, Astal, Gdk } from "astal/gtk4";
import Hyprland from "./Bar/Hyprland";
import Tray from "./Bar/Tray";
import Battery from "./Bar/Battery";
import DateTime from "./Bar/DateTime";
import { Menu } from "./Bar/Menu";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName="centerbox">
        <box>
          <Hyprland />
        </box>
        <box />
        <box>
          <Tray />
          <Battery />
          <DateTime />
          <Menu />
        </box>
      </centerbox>
    </window>
  );
}