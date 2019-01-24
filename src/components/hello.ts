import m from "mithril";

// Mithril components
import Map from "./map";

let count = 0;
const Hello = {
    view() {
        return m("main", [
            m("h1", "My Cool Website"),
            m("h4", "With Mithril.js, TypeScript and ZeroNet!"),
            m("button", {onclick() { count++; }}, count + " clicks"),
        ]);
    },
};

export default Hello;
