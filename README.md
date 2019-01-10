# ZAME Server

Zite component of
[ZAME](https://github.com/lentsius-bark/zame-zeroframe-godot/), an example
Godot game for the [ZeroNet Godot plugin](https://github.com/anoadragon453/zeroframe-godot-plugin), which allows game developers to
make fully-p2p multiplayer games without a server.

## Installation

First install and run [ZeroNet](https://zeronet.io).

Create a new site either through the menu on
[ZeroHello](http://127.0.0.1:43110) or through the command line with:

`python ./zeronet.py siteCreate`

In both instances you should get a public key (otherwise known as your site
address, the XXX in http://127.0.0.1:43110/XXX for your site).

In ZeroHello's menu, there's a button that says 'Show data directory'.
Clicking that will open up the site data folder. In there should be a folder
with your site address.

Inside, delete everything that's in there, and copy the files from this repo into it.

Finally, open up `content.json` with your favorite text editor, and replace
`1LX49GcJ52xF8UGvN1obXex6u4XLwfmzZW` with your own site address. Do the same
for `data/users/content.json`.

Navigate to your site (may need to refresh with browser console open) and you
should see the ZAME level explorer!

## Introduction

[ZAME](https://github.com/lentsius-bark/zame-zeroframe-godot/) is a
platforming game. A very important part of any good platforming game are the
levels and level design. ZAME allows you to both play and design your own
levels (called 'maps') and share them with the wider ZAME community.

If a game developer wanted to implement such a level sharing feature in their
game, they typically would have to first purchase a server running in the
cloud somewhere with cloud storage. They would then set up that server, with
a database, perhaps a web server with a REST interface, and implement caching
and such on top of it so that it runs quickly.

This is all well and good, but such a server likely requires a monthly
payment, that only gets higher as more users join and play your game. You
have to upgrade the storage capacity, upgrade the CPU to handle more
requests, not to mention keep the server and its software up to date.

Wouldn't it be better if your users could do the hosting for you?

[ZeroNet](https://zeronet.io) makes this possible, and even
developer-friendly. Created by developer Tamas Kocsis, ZeroNet is a
networking protocol that allows for the creation and hosting of websites on a
network run entirely by the users browsing it. No longer do website
developers have to worry about purchasing an expensive server, and keeping it
running 24/7. The average smartphone of today is decently powerful. Let's
spread that hosting workload over the users who themselves are invested in
keeping the site and service going!

## Structure

ZAME is a game built in [Godot](https://godot.org), a free and open source
game engine. Godot has a plugin system, including a plugin for games to
connect to the ZeroNet network called
[ZeroFrame](https://github.com/anoadragon453/zeroframe-godot-plugin). ZAME
uses this to send and receive commands to a local ZeroNet daemon running on
the host machine. Currently a running local ZeroNet daemon is required for
ZAME to function, but this will soon be packaged up into another Godot
plugin, and thus it'll all come packaged together in the game itself.

The ZAME server is just a ZeroNet website (commonly referred to as a 'zite'),
that holds Godot Scene files (`*.tscn`), which are just text files describing
the contents of a Godot Scene. This is very easy to import and export into
Godot, and hold all the information necessary for a user's level, so we just
use them without any further encoding.

ZAME uses the ZeroFrame Godot plugin. This plugin allows you to use the
[ZeroFrame
API](https://zeronet.io/docs/site_development/zeroframe_api_reference/) to
communicate with the locally-running ZeroNet daemon.

Users are identified on ZeroNet via a public key (ex.
`1MGkgDZU8KW1LATaQr5rrfLFSjjnsxw6sF`). Their data is stored on the zite in
the `data/users/<their public key>/`. That directory contains two files:
`content.json` and `data.json`, as well as a `maps/` directory, which
contains all the levels they've made. The `content.json` file just contains
metadata about the other files. The `data.json` file, as the name suggests,
has all the user's data, such as level names, level descriptions, and upvoted
levels.

When a ZAME player has created a level and they are happy with it, they can
publish it to the ZAME community. This process is done via the following:

* ZAME reads in the current user's `data.json` file using `ZeroFrame.fileGet`.

* The data from the file is parsed into a Godot dictionary, new level metadata is added, then the dictionary is converted back to JSON.

* ZAME then write the updated `data.json` file back using `ZeroFrame.fileWrite`.

* ZAME sends the level file to the ZeroNet daemon using `ZeroFrame.fileWrite`, placing it in the user's `maps/` directory.

* Finally, ZAME tells ZeroNet to sign and publish the latest changes to the user data using `ZeroFrame.sitePublish`. Your level is now available for anyone to view and download!

When a user visits the zite, information from every user's `data.json` file
is compiled into an easily queryable SQLite database automatically by
ZeroNet. The zite can then simply execute a few queries to show the latest
and most upvoted user levels!

## Optional Files

ZeroNet has the concept of optional files, which are files that are not
automatically downloaded and seeded by every user when they download the site
initially. This works well for sites with videos or many images, which would
be a pain for each user to download just to see your site's main content.

ZAME's zite uses this feature, but only for map preview images. As maps are
text and thus quite small already, there isn't much need not to try and share
them as much as possible! However, map preview images are less important (and
much larger in file size!), and thus they are only downloaded on demand, when
you request to view them.