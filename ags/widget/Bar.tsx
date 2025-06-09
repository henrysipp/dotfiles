import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable, bind } from "astal";
import AstalPowerProfiles from "gi://AstalPowerProfiles";
import AstalTray from "gi://AstalTray";
import AstalBluetooth from "gi://AstalBluetooth";
import AstalBattery from "gi://AstalBattery";
import AstalHyprland from "gi://AstalHyprland";

const time = Variable("").poll(1000, "date");

function Hyprland() {
  const hyprland = AstalHyprland.get_default();
  
  return (
    <box>
      {bind(hyprland, "workspaces").as(workspaces => {
        const baseWorkspaces = [1, 2, 3, 4];
        const activeWorkspaces = workspaces.map(w => w.id);
        const additionalWorkspaces = activeWorkspaces.filter(id => id > 4);
        const allWorkspaces = [...baseWorkspaces, ...additionalWorkspaces];
        
        return allWorkspaces.map((id) => (
          <button 
            cssClasses={bind(hyprland, "focusedWorkspace").as(focused => [
              "hypr-button",
              focused?.id === id ? "hypr-button--active" : ""
            ])}
            onClicked={() => {
              hyprland.dispatch("workspace", id.toString())
            }}
          >
            {id}
          </button>
        ));
      })}
    </box>
  )
}

function Tray() {
  const tray = AstalTray.get_default();
  
  return (
    <box>
      {bind(tray, "items").as(items => 
        items.map((item) => (
          <button
            onClicked={(self) => {
              item.activate(100, 100);
            }}
            tooltipText={item.tooltip_markup || item.title || item.id}
          >
            {/* {item.gicon ? (
              <icon gicon={item.gicon} />
            ) : ( */}
              <label>{item.tooltip_markup|| item.title || item.id}</label>
            {/* )} */}
          </button>
        ))
      )}
    </box>
  );
}

function Battery() {
  const battery = AstalBattery.get_default();
  
  const batteryIcon = Variable.derive([bind(battery, "percentage"), bind(battery, "charging")], (percentage, charging) => {
    const percent = Math.round(percentage * 100);
    
    if (charging) return "󰂄";
    if (percent >= 90) return "󰁹";
    if (percent >= 80) return "󰂂";
    if (percent >= 70) return "󰂁";
    if (percent >= 60) return "󰂀";
    if (percent >= 50) return "󰁿";
    if (percent >= 40) return "󰁾";
    if (percent >= 30) return "󰁽";
    if (percent >= 20) return "󰁼";
    if (percent >= 10) return "󰁻";
    return "󰁺";
  });
  
  return (
    <box>
      <label>{bind(batteryIcon)}</label>
      <label>{bind(battery, "percentage").as(percentage => `${Math.round(percentage * 100)}%`)}</label>
    </box>
  );
}

function DateTime() {
  return (
    <menubutton
    // hexpand
    // halign={Gtk.Align.CENTER}
    >
      <label label={time()} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  );
}

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
        <Hyprland />
        {/* <Tray /> */}
        {/* <box hexpand /> */}
        <DateTime />
        <Battery />
        <box />
      </centerbox>
    </window>
  );
}
