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
      cssClasses={["bg-transparent"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={BOTTOM | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <box />
        <box 
          orientation={0} 
          cssClasses={[]}
          onHoverEnter={() => isVisible.set(true)}
          onHoverLeave={() => isVisible.set(false)}
        >
          <revealer
            revealChild={bind(isVisible)}
            transitionDuration={200}
            transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
          >
            <box cssClasses={["bg-black/80", "rounded-xl", "p-2", "mb-1"]}>
              {apps
                .get_list()
                .filter((app) => pinnedApps.includes(app.name))
                .map((app) => {
                  return (
                    <button
                      cssClasses={["bg-transparent", "rounded-lg", "m-1", "p-2", "transition-all", "duration-200", "hover:bg-white/10"]}
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
            cssClasses={["min-h-1", "max-h-1", "h-1", "flex-shrink-0", "flex-grow-0"]}
          >
            <label></label>
          </box>
        </box>
        <box />
      </centerbox>
    </window>
  );
}
