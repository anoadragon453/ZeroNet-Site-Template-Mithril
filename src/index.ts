// Polyfill DOM env for mithril
import m, { RouteResolver } from 'mithril'
import ZeroFrame from 'zeroframe'
const zeroframe = new ZeroFrame()

import Resolver from './mithril-zeroframe-router'

// Route components
import Hello from './components/hello'

let Main = {
    view: function() {
        return m.render(document.body, [
            m("h1", "main page"),
            m("a", {href: "#!/hello"}, "hello"),
        ])
    }
}

// Set mithril's default RouteResolver to zeroframeRouter, which allows
// interoperability with ZeroNet's iframe-based design. (See
// mithril-zeroframe-router.ts for more details)
zeroframe.cmd('wrapperInnerLoaded', [])
m.route(document.body, '/', {
    '/': Resolver(Main),
    '/hello': Resolver(Hello),
})