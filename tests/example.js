var o = require("mithril/ospec/ospec")

// TODO: Test some function in the template
// This is just an example test.
o.spec("math", function() {
    o("addition works", function() {
        o(1 + 2).equals(3)
    })
})
