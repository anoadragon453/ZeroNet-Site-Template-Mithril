# ZeroNet Site Template - Mithril

This is an evolution of my [previous ZeroNet site
template](https://github.com/anoadragon453/ZeroNetTemplate) that featured
Vue.js, this time using [Mithril.js](https://mithril.js.org/). It also comes
with a much cleaner codebase and (soon) much documentation on how to set
everything up if you're just a beginner to ZeroNet in general.

## Setup

Open up ZeroHello (the main site in ZeroNet), click the three-dotted menu (⋮)
button at the top left and select 'Create new, empty site'. This will open up
a newly created website, with some minimal information inside. Note down the
large random string in the URL bar beginning with `1...`. This is your site
address, and others can use it to visit your site (after you've published it
of course).

Now, go back to ZeroHello again, click the same three-dot menu (⋮) and click
'Show data directory'. This should open up your file manager to a folder
called `data` (if it didn't, know that this folder is located at
`path/to/zeronet/data/`). Note that one of the folders in here will be named
the same thing as your site address. This is your site's folder, and its
contents are currently the contents of your site. Feel free to have a look
around at what's inside.

Now, to install the template, you'll want to delete everything **inside** your site folder (do not delete the site folder itself!). So you should just know have an empty folder with the name of your site address.

Now copy (or clone) the contents of this repository to that folder. Make sure
that files like `package.json` and `dbschema.json` are inside your site
folder and not in a sub-directory.

Now, ensure [npm](https://nodejs.org/en/) is installed. Run `npm install &&
npm run build` inside your site directory. This will download and install
needed dependencies, as well as build the website template. This will produce
some output (and hopefully no errors), as well as an `index.html` and a `js/`
directory.

Switch back over to ZeroNet and visit your site again (should in the sidebar
on ZeroHello) and you should see the template webpage appear!

## Starting Development

### Commands

Here are some commands that come with the template that may be useful during
development. You can find how each of these work in the `"scripts"` section
of `package.json`:

```
npm start
```

Builds the site and automatically rebuild whenever a file is changed. No need
to manually run build every time. All that's necessary to see changes to your
site is to refresh the page in your browser.

```
npm run build
```

This simply builds the site once in development mode.

```
npm run build:prod
```

This builds the website in production mode, which is not very useful for
debugging, but will run faster due to optimizations. Run this before
publishing a new version of your site to users.

```
npm run lint
```

This lints your code and points out syntax errors or code cleanliness errors.
Additionally, `npm run lint:fix` will try and automatically fix errors for
you.

```
npm run test
```

Runs all of the unit tests in the `tests/` directory. It is very useful to
test your code to make sure you don't break anything when making changes.
Feel free to add more tests in the `tests/` directory and this command will
run them for you. This uses `ospec`, which is
[recommended](https://mithril.js.org/testing.html) for use with Mithril.js.

## Included Technologies

This template is node-based, and as such uses `npm` and other modern web
technologies. Related bits include:

* [Mithril.js](https://mithril.js.org/)

Mithril.js is a JavaScript site framework that allows you to easily bundle up
parts of your website (such as a menu, a button, or a whole page) into
re-usable components than can be placed around your site.

It also handles "routing", which is how your site decides what to show when
visiting a specific URL path (such as
`http://127.0.0.1:43110/1mysite/profile/admin`). Mithril will then display
the profile page for user "admin", as an example. Note that getting this
working inside of ZeroNet requires a custom included RouteResolver, called
[mithril-zeroframe-router](https://github.com/anoadragon453/mithril-zeroframe-router).


* [TypeScript](https://www.typescriptlang.org/) for JavaScript type-checking

TypeScript is a language that 'trans-compiles' into JavaScript (as in you
write your code in TypeScript, and a program turns that into JavaScript which
the browser can understand).

The allure of TypeScript is that it can check your code is doing what it
should before it runs by performing type-checking. As your site grows in
complexity, type-checking will be essential to ensuring that things remain
maintainable.

As a side-note, when building
[ZeroLSTN](https://github.com/anoadragon453/zerolstn), I only ran into issues
that took me sometimes up to half an hour to debug, when it turns out it was
simple due to the wrong type of object being passed. TypeScript points these
types of mistakes out to you immediately.

* [Webpack 4](https://webpack.js.org/)

Webpack is used to bundle everything in your website (from TypeScript, to
CSS) into HTML, CSS and JavaScript files that the browser can load and
understand. It is extremely powerful, and has good documentation.

* [TSLint](https://palantir.github.io/tslint/)

TSLint performs linting (code style checking) on all TypeScript files.

* [ospec](https://github.com/MithrilJS/mithril.js/tree/master/ospec)

ospec is a minimal testing framework from the Mithril.js developers.


## Content.json

`content.json` is the file that holds all of the metadata about your site, includes the address, file hashes, and what files should be considered as user data, what files shouldn't be sent to peers and so on.

Explanation for each of the keys in the `content.json` included in the template is below.

```javascript
// Default content.json
{
 "address": "1LX49GcJ52xF8UGvN1obXex6u4XLwfmzZW",
 "description": "ZeroNet Site Template",
 "files": {
  "README.md": {
   "sha512": "b5be4a8867d401acb6f215f85aa900ab74fdcb1aad8802794359dbb54fad57da",
   "size": 6063
  },
  "dbschema.json": {
   "sha512": "edd33feaaeef761de525163755d6bc9eadc4a86e62a2a3ef85d5049247dead08",
   "size": 1980
  },
  "index.html": {
   "sha512": "71bd634e35c52f856217d29b2705115eb47f967b1c3dc849f8febac8872402fe",
   "size": 649
  }
 },
 "ignore": "(^(content|dbschema).json)|(tests.*)|(node_modules.*)|(^\\..+)",
 "inner_path": "content.json",
 "modified": 1547584373,
 "signers_sign": "HGOykyETw5Osr0Wp/AgjJim4vYcra/TuWFbQ5g9ZbU8VABlpZlpRA+IFFDfoWG6A6V6tySdVf3uKbuihKrRE3KM=",
 "signs": {
  "1LX49GcJ52xF8UGvN1obXex6u4XLwfmzZW": "Gw8AOkVAiyg1B/HweXjmjDcq8HKvt/4tLMrxzdrh1o6APJ4E6wmdDKyyOdiRUHenZEWrNxSn8KX1+MXQuF9yTFU="
 },
 "signs_required": 1,
 "title": "ZeroNet Site Template",
 "zeronet_version": "0.6.4"
}
```

`address` is your site address.

`description` is the description of your site, and can be changed in the site sidebar through the browser.

`files` is a dictionary of all the sharable files in your site. For each file it has a sha512 hash and a size. These are both used in conjunction for other peers to verify that a file they are downloading is actually the file that should be on the site. For instance, consider that I was a peer trying to download this website. First I would request this `content.json` file, which tells me what other files to download. I make a request to peers for `index.html`, but imagine one of the peers is malicious, and instead of `index.html` they send me an image of a frowny cat called `index.html`.

Well I don't want this sad image, and thankfully ZeroNet will prevent that from happening, because when it receives the file from the peer, it calculates the sha512 hash and the size and checks that it matches what's listed in `content.json`. If it's not a match, ZeroNet assumes something malicious is going on and drops the file and asks someone else for it.

`ignore` is a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) that tells ZeroNet which files to include in the `files` key. You may have noticed there's a lot less files in the `files` key then there are in the repo, and that is due to `ignore`. Specifically, with the rule `(^(content|dbschema).json)|(tests.*)|(node_modules.*)|(^\\..+)` we are saying:

* Don't allow any `.json` files except for `content.json` and `dbschema.json`. This blocks all the TypeScript, Webpack and npm config files.
* Don't allow the `tests/` directory.
* Don't allow the `node_modules/` directory (can you imagine syncing *that* to every peer?)
* Don't allow any file or folder that starts with a `.`.

Each of these rules is separated by `|`.

`inner_path` is the relative address to this file, starting from the site root.

`modified` is the UNIX timestamp of when this file was last modified. Sites using this when determining the latest version of `content.json` and thus the site. This value can be trusted as `content.json` is signed by the private key holder of the site, which peers can verify using the site's public key, which is its address.

`signers_sign` TODO

`signs` is a dictionary of public keys and signatures. If the signature is valid for the private key `1LX49GcJ52xF8UGvN1obXex6u4XLwfmzZW`, which is the site address, we can be confident that the information within this `content.json` came from the site administrator (assuming they did not lose their keys!).

`signs_required` is a number representing the amount of private key signatures required to successfully sign this site. As of ZeroNet 0.6.4, Multi-signature is not currently implemented, so keep this value at `1`.

`title` is the title of the site that will appear in the browser tab.

`zeronet_version` was the version of ZeroNet that was used to sign this file.

Read the ZeroNet docs on `content.json` for more info [here](https://zeronet.io/docs/site_development/content_json/).

## User Data

TODO database, dbschema.json

## Testing

If you have any questions or suggestions, feel free to open an issue.

