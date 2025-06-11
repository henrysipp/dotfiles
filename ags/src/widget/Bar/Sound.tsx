import { Variable, bind } from "astal";
import Volume from "../../utils/Volume";

export default function Sound() {
  const volume = new Volume();

  const soundDisplay = Variable.derive(
    [bind(volume, "volume"), bind(volume, "muted")],
    (vol, muted) => {
      if (muted) return "󰖁";
      
      const percent = vol * 100;
      if (percent >= 70) return "󰕾";
      else if (percent >= 30) return "󰖀";
      else if (percent > 0) return "󰕿";
      else return "󰖁";
    }
  );

  return (
    <button 
      cssClasses={["bg-transparent", "rounded-lg", "px-3", "py-1", "m-0.5", "transition-all", "duration-200", "hover:bg-black/50"]}
      onClicked={() => volume.toggleMute()}
    >
      <label>{bind(soundDisplay)}</label>
    </button>
  );
}