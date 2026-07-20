--- 
Project: Palworld-world-config
Version: 1.0
---
# Title
Palworld World Config
# Context
Palworld allows for multiplayer self-hosted world to play with friends. The problem relies on the file being a .ini that has a major impact on what they do, how they do it, and what impact does it have.
The idea is we build a simple UI that imports the current configuration from a .ini file, and allows the user via either steppers or inputs (numerical / boolean / text) to edit the values and preview its consecuences in text.
# Role
You are a frontend developer experienced on standalone applications building a simple three page application 
# Instruction
Build the UI with three pages.
- First page will be a landing where we disclouse instructions to mount the server and play with friends
- Second page will be import/edit file. The user is able to import a .ini file and we populate the page with the configurations
# Specification
Since we are importing a .ini file, call for `read-export-file agent` and for `frontend-component` agent so they handle the load of creating the components.
