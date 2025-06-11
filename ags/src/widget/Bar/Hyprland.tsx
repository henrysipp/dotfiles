import { bind } from "astal";
import AstalHyprland from "gi://AstalHyprland";

export default function Hyprland() {
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
      <label>
        {bind(hyprland, "focusedClient").as(client => 
          client ? client.initialTitle : ""
        )}
      </label>
    </box>
  )
}