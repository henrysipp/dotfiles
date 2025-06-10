import { Variable, bind } from "astal";
import AstalBattery from "gi://AstalBattery";

export default function Battery() {
  const battery = AstalBattery.get_default();
  
  const batteryDisplay = Variable.derive([bind(battery, "percentage"), bind(battery, "charging")], (percentage, charging) => {
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
  });
  
  return (
    <box>
      <button>
        {bind(batteryDisplay)}
      </button>
    </box>
  );
}