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

      return `${icon}  ${percent}%`;
    }
  );


  const profileButtons = powerProfiles.get_profiles().map((profile) => (
    <button
      cssClasses={bind(powerProfiles, "activeProfile").as((active) =>
        active === profile.profile
          ? ["battery__profile-btn", "battery__profile-btn--active"]
          : ["battery__profile-btn", "battery__profile-btn--inactive"]
      )}
      onClicked={() => {
        powerProfiles.set_active_profile(profile.profile);
      }}
    >
      <box spacing={8}>
        <label cssClasses={["battery__profile-icon"]}>
          {profile.profile === "power-saver" ? "󰌪" : profile.profile === "balanced" ? "󰗑" : "󱐋"}
        </label>
        <box vertical halign={Gtk.Align.START}>
          <label
            cssClasses={["label--primary"]}
            halign={Gtk.Align.START}
          >
            {profile.profile.charAt(0).toUpperCase() +
              profile.profile.slice(1).replace("-", " ")}
          </label>
          <label
            cssClasses={["label--secondary"]}
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
    <menubutton cssClasses={["battery"]}>
      <label>{bind(batteryDisplay)}</label>
      <popover cssClasses={["battery__popover"]}>
        <box orientation={1} cssClasses={["battery__popover-container"]}>
          {/* <label
            cssClasses={["label--primary", "label--primary--title"]}
            halign={Gtk.Align.START}
          >
            Power Profiles
          </label> */}
          <box vertical spacing={4}>
            {profileButtons}
          </box>
        </box>
      </popover>
    </menubutton>
  );
}
