import { App } from "astal/gtk4"
import { exec } from "astal"
// import style from "./src/style.scss"
import Bar from "./src/widget/Bar"

// https://github.com/Aiz0/dotless
const style = exec("npx tailwindcss -i src/styles/main.css")
  .replace(/::backdrop.*?}\n{2}/s, "") // remove backdrop pseudoclass
  .replace(", ::before, ::after", "") // remove before & after psudoclasses
  .replace(", :host", "");

  
App.start({
    css: style,
    // gtkTheme: "Adwaita-dark",
    main() {
        App.get_monitors().map(Bar)
        // App.get_monitors().map(Dock)
    },
})
