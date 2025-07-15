
# foobar.dev

## Introduction

Welcome to foobar.dev! This website is the official developer documentation for Saturn MarkWeb Server.
It also provides specifications for servers and clients.
Saturn MarkWeb Server (abbreviated to SMWS) is the current implementation of a MarkWeb server, replacing the previous implementation written in Python/Flask for NodeJS.

MarkWeb **servers** can be accessed via any protocol, although HTTP is recommended. They are responsible for **serving** MarkWeb pages, which are written in __Markdown__.
MarkWeb **clients** access MarkWeb servers via whatever protocol is implemented (again, HTTP is recommended). They are responsible for **rendering** MarkWeb pages.

## Projects that use Markweb
### Legend
- 🪦: The project is **no longer in development**.
- ⚠️: The project is in its **alpha phase**, it is not recommended to use in production.
### Servers
|Name|Made in|Status|
|----|-------|------------------|
|Ivo Markweb Server|Python|🪦|
|Saturn Markweb Server|TypeScript|⚠️|
### Clients
Currently none are in active development until the server leaves ⚠️ alpha.
