import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widget/Bar"
import Dock from "./widget/Dock"

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar)
        // App.get_monitors().map(Dock)
    },
})
