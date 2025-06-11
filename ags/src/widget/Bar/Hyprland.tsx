import { bind } from "astal"
import AstalHyprland from "gi://AstalHyprland"

export default function Hyprland() {
  const hyprland = AstalHyprland.get_default()

  const common = [
    "px-2", "py-1",
    "rounded-none",
    "text-lg",
    "font-bold",
    "text-center",
    "transition-all",
    "duration-200",
  ]
  const activeClasses = [
    ...common,
    "bg-emerald-700",
    "text-emerald-100",
  ]
  const inactiveClasses = [
    ...common,
    "bg-transparent",
    "text-white/50",
    "hover:bg-black/50",
  ]

  return (
    <box>
      <box cssClasses={["mr-4"]}>
      {bind(hyprland, "workspaces").as((workspaces) => {
        const baseWorkspaces = [1, 2, 3, 4]
        const activeWorkspaces = workspaces.map((w) => w.id)
        const additionalWorkspaces = activeWorkspaces.filter((id) => id > 4)
        const allWorkspaces = [...baseWorkspaces, ...additionalWorkspaces]

        return allWorkspaces.map((id) => (
          <button
            cssClasses={bind(hyprland, "focusedWorkspace").as((focused) =>
              focused?.id === id ? activeClasses : inactiveClasses
            )}
            onClicked={() => {
              hyprland.dispatch("workspace", id.toString())
            }}
          >
            {id}
          </button>
        ))
      })}
      </box>
      <label>
        {bind(hyprland, "focusedClient").as((client) =>
          client ? client.initialTitle : ""
        )}
      </label>
    </box>
  )
}
