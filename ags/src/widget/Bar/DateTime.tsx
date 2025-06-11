import { Variable } from "astal";
import { Gtk } from "astal/gtk4";

const time = Variable("").poll(1000, "date +'%a %b %-d %-l:%M %p'");

export default function DateTime() {
  return (
    <menubutton cssClasses={["bg-transparent", "rounded-lg", "px-3", "py-1", "m-0.5", "transition-all", "duration-200", "hover:bg-black/50"]}>
      <label label={time()} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  );
}