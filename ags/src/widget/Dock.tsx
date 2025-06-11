import { bind, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import AstalApps from "gi://AstalApps";

export default function Dock(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
  const apps = new AstalApps.Apps({
    nameMultiplier: 2,
    entryMultiplier: 0,
    executableMultiplier: 2,
  });

  const isVisible = Variable(false);
  const pinnedApps = [
    "Steam",
    "Visual Studio Code",
    "1Password",
    "Spotify",
    "Alacritty",
  ];

  return (
    <window
      visible
      cssClasses={["Dock"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={BOTTOM | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <box />
        <box 
          orientation={0} 
          cssClasses={["dock"]}
          onHoverEnter={() => isVisible.set(true)}
          onHoverLeave={() => isVisible.set(false)}
        >
          <revealer
            revealChild={bind(isVisible)}
            transitionDuration={200}
            transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
          >
            <box className="dock-content">
              {apps
                .get_list()
                .filter((app) => pinnedApps.includes(app.name))
                .map((app) => {
                  return (
                    <button
                      className="dock-button"
                      onClicked={() => app.launch()}
                      tooltip={app.name}
                    >
                      <image iconName={app.iconName} pixelSize={32} />
                    </button>
                  );
                })}
            </box>
          </revealer>
          <box widthRequest={300}
          heightRequest={4}
            cssClasses={["dock-trigger"]}
          >
            <label></label>
          </box>
        </box>
        <box />
      </centerbox>
    </window>
  );
}
