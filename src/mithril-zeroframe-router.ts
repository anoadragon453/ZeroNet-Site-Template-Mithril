import {RouteResolver, Comp} from 'mithril'

import ZeroFrame from 'zeroframe'
const zeroframe = new ZeroFrame()

// zeroFrameRouter is a mithril RouteResolver that on resolving a route
// additionally instructs ZeroNet's UiWrapper to change its URL to the same
// route, thus syncing routes between the iframe and the wrapper

interface Attrs {
	id: string;
}

interface State {
}

interface CompState {
}

// TODO: On page load, change iframe to outer URL hash
let Resolver = function(component: Comp<Attrs, CompState>) {
    let resolver: RouteResolver<Attrs, State> & State = {
        onmatch(attrs, path) {
            // TODO: Check outer URL hash
            // (if it's changed since last request or there is no last request?)
            // then take the outer's URL and apply to iframe
            // Otherwise take inner and apply to outer
            let yOffset = window.pageYOffset
            let urlPath = window.location.hash
            let title = document.title
            console.log("Visiting:", path)

            zeroframe.cmd('wrapperPushState', [{pageYOffset: yOffset}, title, urlPath])

            return component
        },
        render(vnode) {
            return vnode
        }
    }
    return resolver
}

export default Resolver