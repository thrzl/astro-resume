# simple resume

*built with bun and astro*

a quick disclaimer: this project is built for me first. i might build in certain things that are good practice/accessible (i.e. the hyphenation of long names), however there are some things i just don't care about.

i.e. hosting/publishing this on the net is theoretically possible, it's just not something i care about at the moment. this is designed for the PDF output.

## structure

the important parts are:

before doing anything else, you need to add your configuration to `profile.toml`. there's an example file at `profile.toml.example`.

resume entries are loaded from `src/content/<category>/entry.md`. the filename isn't important and isn't referenced anywhere else.

markdown files exists in the following format:
```md
---
company: "Google"
role: "Research & Development"
startdate: 2017-06-07

# this is optional; if not specified, becomes "Present"
# enddate: 2025-08-14

# also optional
# url: "https://google.com"
---

you can also add body content.
```

## commands

all commands are run from the root of the project, from a terminal:

| command                   | action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | installs dependencies                            |
| `bun dev`             | starts local dev server at `localhost:4321`      |
| `bun build-pdf`           | builds site + generates pdf at `output.pdf`          |
| `bun preview`         | preview your build locally, before deploying     |
| `bun astro ...`       | run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | get help using the Astro CLI                     |
