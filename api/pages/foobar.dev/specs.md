# foobar.dev/specs

## Server Specification
Markweb servers, at its simplest, are responsible for returning **plain text** so that it can be rendered by the client. The end result the user sees is controlled by the client, and the server should not interfere with the page contents __unless__ it is for replacing **Markscript placeholders** with their corresponding values. *(More on Markscript in its own section.)*

### Legend
✳️: Optional

✅: Required (to be with the Markweb spec)
|Spec|Definition|Required?|
|----|----------|---------|
|Markscript|The scripting language for Markweb.|✳️|

## Client Specification
Markweb clients, as said above, render what the server returns. Similar to the server, the client should not interfere with the page contents, unless it is for theming-related purposes. The client is not responsible for running any Markscripts which don't start with `@use client`/server only scripts.

### Legend
✳️: Optional

✅: Required (to be with the Markweb spec)
|Spec|Definition|Required?|
|--|--|--|
|Markscript|The scripting language for Markweb.|✳️|

## Markscript Specification
TODO
