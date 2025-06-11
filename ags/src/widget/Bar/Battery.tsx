import { Variable, bind } from "astal";
import AstalBattery from "gi://AstalBattery";
import PowerProfiles from "gi://AstalPowerProfiles";
import { Gtk } from "astal/gtk4";

export default function Battery() {
  const battery = AstalBattery.get_default();
  const powerProfiles = PowerProfiles.get_default();

  const batteryDisplay = Variable.derive(
    [bind(battery, "percentage"), bind(battery, "charging")],
    (percentage, charging) => {
      const percent = Math.round(percentage * 100);

      let icon;
      if (charging) icon = "󰂄";
      else if (percent >= 90) icon = "󰁹";
      else if (percent >= 80) icon = "󰂂";
      else if (percent >= 70) icon = "󰂁";
      else if (percent >= 60) icon = "󰂀";
      else if (percent >= 50) icon = "󰁿";
      else if (percent >= 40) icon = "󰁾";
      else if (percent >= 30) icon = "󰁽";
      else if (percent >= 20) icon = "󰁼";
      else if (percent >= 10) icon = "󰁻";
      else icon = "󰁺";

      return icon;
      // return `${icon}  ${percent}%`;
    }
  );


  const profileButtons = powerProfiles.get_profiles().map((profile) => (
    <button
      cssClasses={bind(powerProfiles, "activeProfile").as((active) =>
        active === profile.profile
          ? ["w-full", "p-3", "rounded-lg", "bg-primary", "text-on_primary", "hover:opacity-90", "transition-all", "duration-200"]
          : ["w-full", "p-3", "rounded-lg", "bg-transparent", "hover:bg-black/10", "transition-all", "duration-200"]
      )}
      onClicked={() => {
        powerProfiles.set_active_profile(profile.profile);
      }}
    >
      <box spacing={8}>
        <label cssClasses={["text-2xl", "min-w-[32px]", "text-center"]}>
          {profile.profile === "power-saver" ? "󰌪" : profile.profile === "balanced" ? "󰗑" : "󱐋"}
        </label>
        <box vertical halign={Gtk.Align.START}>
          <label
            cssClasses={["font-bold", "text-sm"]}
            halign={Gtk.Align.START}
          >
            {profile.profile.charAt(0).toUpperCase() +
              profile.profile.slice(1).replace("-", " ")}
          </label>
          <label
            cssClasses={["text-xs", "opacity-70"]}
            halign={Gtk.Align.START}
          >
            {profile.profile === "power-saver"
              ? "Extend battery life"
              : profile.profile === "balanced"
              ? "Balance power and performance"
              : "Maximum performance"}
          </label>
        </box>
      </box>
    </button>
  ));

  return (
    <menubutton cssClasses={["bg-transparent", "rounded-lg", "px-3", "py-1", "m-0.5", "transition-all", "duration-200", "hover:bg-black/50"]}>
      <label>{bind(batteryDisplay)}</label>
      <popover>
        <box orientation={1} cssClasses={["min-w-[280px]", "p-3"]}>
          {/* <label
            cssClasses={["label--primary", "label--primary--title"]}
            halign={Gtk.Align.START}
          >
            Power Profiles
          </label> */}
          <box vertical cssClasses={["space-y-1"]}>
            {profileButtons}
          </box>
        </box>
      </popover>
    </menubutton>
  );
}
