drylab
=================

A CLI for using Drylab's agentic workflows locally


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
* [`drylab content <PAPER_DOI>`](#drylab-content-doistring)


## `drylab content PAPER_DOI`

Retrieves content or triggers a workflow using a Digital Object Identifier (DOI).

```
USAGE
  $ drylab content PAPER_DOI

ARGUMENTS
  DOISTRING  The Digital Object Identifier (DOI) to use.

DESCRIPTION
  Retrieves content or triggers a workflow using a Digital Object Identifier (DOI).

EXAMPLES
  $ drylab content 10.1371/journal.pone.0018882

  $ drylab content "10.1000/another doi/with weird characters"
```

_See code: [src/commands/content.ts](https://github.com/effieklimi/drylab/blob/v0.1.2/src/commands/content.ts)_

<!-- commandsstop -->
