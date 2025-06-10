import { Variable } from "astal";
import { Gtk } from "astal/gtk4";

const time = Variable("").poll(1000, "date +'%a %b %-d %-l:%M %p'");

export default function DateTime() {
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