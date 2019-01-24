// mithril-zeroframe-router is a mithril RouteResolver that on resolving a route,
// additionally instructs ZeroNet's UiWrapper to change its URL to the same
// route, thus syncing routes between the iframe and the wrapper
//
// A call to ZeroFrame's 'wrapperInnerLoaded' command is necessary on page load
// in order to instruct mithril on which hash to load initially from the outer
// page URL.

import {Comp, RouteResolver} from "mithril";

import ZeroFrame from "zeroframe";
const zeroframe = new ZeroFrame();

// Resolver is a function that returns a mithril RouteResolver
// <https://mithril.js.org/route.html#routeresolver>, and acts as a thin wrapper
// around a mithril Component. Instead of simply handing a Component object, say
// `MyComponent` to the mithril router, you instead give it
// `Resolver(MyComponent)`.
//
// When the route is being changed within the iframe,
// such as navigating to `/#!/hello`, by default this will not be reflected
// outside of the iframe (aka the user's address bar). resolver, on being
// notified the route is being changed, will make a call to ZeroFrame, telling
// it to update the page URL to match the new route.
//
// It then just returns the Component that was handed to it so all original
// functionality is preserved.
const Resolver = (component: Comp<{}, {}>) => {
    const resolver: RouteResolver<{}, {}> = {
        onmatch(attrs, path) {
            // Retrieve the current details of the inner iframe page
            const yOffset = window.pageYOffset;
            const urlPath = window.location.hash;
            const title = document.title;

            // Update the outer page to match
            zeroframe.cmd("wrapperPushState", [{pageYOffset: yOffset}, title, urlPath]);

            // Return the original component to the router
            return component;
        },
    };
    return resolver;
};

export default Resolver;
