---
description: Scaffold a new feature — researches prior art if the description calls for it, then builds and security-audits the UI.
argument-hint: <feature-name> <description>
---

You are scaffolding a new feature for this app.

**Arguments:** `$ARGUMENTS`

The first word/token is the feature name; everything after it is the description. If only one token is given, treat it as both the name and the description.

Follow this chain of thought exactly:

## 1. Scan the description for keywords

Case-insensitively check the description for these four keywords:

1. `web`
2. `search`
3. `implement`
4. `create`

## 2. Research branch — fires if keyword 1 OR keyword 2 is present (`web` or `search`)

Launch a `general-purpose` agent (it has WebSearch/WebFetch) to research the feature. Brief it with the feature name and full description, and ask it to find the **three most relevant results** to use as a factual/technical base for the feature (e.g. how similar features are implemented elsewhere, relevant docs/specs, prior art). Have it report back a short summary of each of the three sources plus links, in under 300 words.

Run this agent in the foreground (`run_in_background: false`) if the build branch below will also fire, since its findings should feed into the build step. If the build branch will not fire, it may run in the background.

## 3. Build branch — fires if keyword 3 OR keyword 4 is present (`implement` or `create`)

Both branches can fire together — if the research branch also ran, wait for it and pass its findings to this step as context.

1. Launch the `frontend-component` agent to build the feature's UI. Give it: the feature name, the full description, and (if applicable) the research summary from step 2.
2. Once `frontend-component` finishes, launch the `security-analyst` agent to audit what was just created or changed (new components, any file import/export or parsing logic touched, injection vectors, secrets) before considering the feature done.

## 4. Neither branch matches

If none of the four keywords appear in the description, don't guess — ask the user whether this feature needs research, a UI component, or both.

## 5. Report back

Summarize for the user: which branch(es) ran, what each agent produced (files created/changed), and any findings from `security-analyst`, ranked most-severe first.
