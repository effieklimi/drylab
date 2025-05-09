drylab
=================

A CLI for drylab agentic workflows


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/drylab.svg)](https://npmjs.org/package/drylab)
[![Downloads/week](https://img.shields.io/npm/dw/drylab.svg)](https://npmjs.org/package/drylab)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g drylab
$ drylab COMMAND
running command...
$ drylab (--version)
drylab/0.1.2 darwin-arm64 node-v21.4.0
$ drylab --help [COMMAND]
USAGE
  $ drylab COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`drylab content DOISTRING`](#drylab-content-doistring)
* [`drylab hello PERSON`](#drylab-hello-person)
* [`drylab hello:world`](#drylab-helloworld)
* [`drylab help [COMMAND]`](#drylab-help-command)
* [`drylab plugins`](#drylab-plugins)
* [`drylab plugins:add PLUGIN`](#drylab-pluginsadd-plugin)
* [`drylab plugins:inspect PLUGIN...`](#drylab-pluginsinspect-plugin)
* [`drylab plugins:install PLUGIN`](#drylab-pluginsinstall-plugin)
* [`drylab plugins:link PATH`](#drylab-pluginslink-path)
* [`drylab plugins:remove [PLUGIN]`](#drylab-pluginsremove-plugin)
* [`drylab plugins:reset`](#drylab-pluginsreset)
* [`drylab plugins:uninstall [PLUGIN]`](#drylab-pluginsuninstall-plugin)
* [`drylab plugins:unlink [PLUGIN]`](#drylab-pluginsunlink-plugin)
* [`drylab plugins:update`](#drylab-pluginsupdate)

## `drylab content DOISTRING`

Retrieves content or triggers a workflow using a Digital Object Identifier (DOI).

```
USAGE
  $ drylab content DOISTRING

ARGUMENTS
  DOISTRING  The Digital Object Identifier (DOI) to use.

DESCRIPTION
  Retrieves content or triggers a workflow using a Digital Object Identifier (DOI).

EXAMPLES
  $ drylab content 10.1371/journal.pone.0018882

  $ drylab content "10.1000/some complex/doi with spaces"
```

_See code: [src/commands/content.ts](https://github.com/effieklimi/drylab/blob/v0.1.2/src/commands/content.ts)_

## `drylab hello PERSON`

Say hello

```
USAGE
  $ drylab hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ drylab hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/effieklimi/drylab/blob/v0.1.2/src/commands/hello/index.ts)_

## `drylab hello:world`

Say hello world

```
USAGE
  $ drylab hello:world

DESCRIPTION
  Say hello world

EXAMPLES
  $ drylab hello:world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/effieklimi/drylab/blob/v0.1.2/src/commands/hello/world.ts)_

## `drylab help [COMMAND]`

Display help for drylab.

```
USAGE
  $ drylab help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for drylab.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.28/src/commands/help.ts)_

## `drylab plugins`

List installed plugins.

```
USAGE
  $ drylab plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ drylab plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/index.ts)_

## `drylab plugins:add PLUGIN`

Installs a plugin into drylab.

```
USAGE
  $ drylab plugins:add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into drylab.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DRYLAB_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DRYLAB_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ drylab plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ drylab plugins:add myplugin

  Install a plugin from a github url.

    $ drylab plugins:add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ drylab plugins:add someuser/someplugin
```

## `drylab plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ drylab plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ drylab plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/inspect.ts)_

## `drylab plugins:install PLUGIN`

Installs a plugin into drylab.

```
USAGE
  $ drylab plugins:install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into drylab.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DRYLAB_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DRYLAB_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ drylab plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ drylab plugins:install myplugin

  Install a plugin from a github url.

    $ drylab plugins:install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ drylab plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/install.ts)_

## `drylab plugins:link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ drylab plugins:link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ drylab plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/link.ts)_

## `drylab plugins:remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ drylab plugins:remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ drylab plugins:unlink
  $ drylab plugins:remove

EXAMPLES
  $ drylab plugins:remove myplugin
```

## `drylab plugins:reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ drylab plugins:reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/reset.ts)_

## `drylab plugins:uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ drylab plugins:uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ drylab plugins:unlink
  $ drylab plugins:remove

EXAMPLES
  $ drylab plugins:uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/uninstall.ts)_

## `drylab plugins:unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ drylab plugins:unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ drylab plugins:unlink
  $ drylab plugins:remove

EXAMPLES
  $ drylab plugins:unlink myplugin
```

## `drylab plugins:update`

Update installed plugins.

```
USAGE
  $ drylab plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/update.ts)_
<!-- commandsstop -->
