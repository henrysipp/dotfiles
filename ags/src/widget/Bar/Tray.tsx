import { bind, GObject } from "astal"
import { Gtk } from "astal/gtk4"
import AstalTray from "gi://AstalTray"

const SYNC = GObject.BindingFlags.SYNC_CREATE

function renderTrayItem(item: AstalTray.TrayItem) {
  const popover = Gtk.PopoverMenu.new_from_model(item.menu_model)
  const icon = new Gtk.Image()

  const buttonClasses = [
    "bg-transparent",
    "px-2", "py-1",
  ]
  const button = new Gtk.MenuButton({
    popover,
    child: icon,
    cssClasses: buttonClasses,
    tooltipText: item.tooltip_markup || item.title || item.id,
  })

  item.bind_property("gicon", icon, "gicon", SYNC)
  popover.insert_action_group("dbusmenu", item.action_group)
  item.connect("notify::action-group", () => {
    popover.insert_action_group("dbusmenu", item.action_group)
  })

  return button
}

export default function Tray() {
  const tray = AstalTray.get_default()

  return (
    <box cssClasses={["flex", "items-center"]}>
      {bind(tray, "items").as((items) =>
        items.map((item) => {
          return renderTrayItem(item)
        })
      )}
    </box>
  )
}
