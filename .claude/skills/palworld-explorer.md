---
name: palworld-explorer
description: Reference for what each key in PalWorldSettings.ini (the `OptionSettings=(...)` struct) actually controls in-game — type, default, valid range, and gameplay effect. Read this before writing or reviewing any "preview the consequences of this value" text, tooltip, or help copy on the edit page, and before deciding what input control (stepper/toggle/text/enum select) a given key deserves.
---

You are looking up what a Palworld dedicated server setting does so the app can explain it to a non-technical player editing `PalWorldSettings.ini`.

## How to use this reference

1. Find the key below by name (keys are case-sensitive, exactly as they appear inside `OptionSettings=(...)`).
2. Use the **Effect** column to write the "preview its consequences in text" copy for that field — phrase it in terms of what changes for players, not the raw number.
3. Use **Type / Range** to decide the input control: booleans → toggle, bounded floats/ints → stepper with min/max, unbounded numeric rates → numeric input with a sane soft-max, free text/enum → text input or select.
4. If a key from an imported file isn't listed here, don't invent behavior for it — surface the raw key/value as-is and flag it as unrecognized rather than guessing what it does. Palworld has added/renamed keys across patches; treat this list as a strong prior, not exhaustive truth, and prefer what's actually in the user's imported file over this list when they conflict.

## World / time

| Key | Type / Range | Effect |
|---|---|---|
| `Difficulty` | enum: `None`, `Casual`, `Normal`, `Hard` | Overall preset; when not `None`, several rates below are overridden server-side regardless of what the file says. |
| `DayTimeSpeedRate` | float, e.g. 0.1–5.0 (default 1.0) | How fast in-game daytime passes. Higher = shorter days. |
| `NightTimeSpeedRate` | float, e.g. 0.1–5.0 (default 1.0) | How fast in-game nighttime passes. Higher = shorter nights. |

## Player rates

| Key | Type / Range | Effect |
|---|---|---|
| `ExpRate` | float (default 1.0) | Multiplier on XP gained from all sources. |
| `PlayerDamageRateAttack` | float (default 1.0) | Multiplier on damage players deal. |
| `PlayerDamageRateDefense` | float (default 1.0) | Multiplier on damage players take (higher = players take *less* damage — it divides incoming damage). |
| `PlayerStomachDecreaceRate` | float (default 1.0) | How fast player hunger drains. Lower = hunger drains slower. |
| `PlayerStaminaDecreaceRate` | float (default 1.0) | How fast player stamina drains during actions like sprinting/climbing. |
| `PlayerAutoHPRegeneRate` | float (default 1.0) | Passive HP regen rate while awake. |
| `PlayerAutoHpRegeneRateInSleep` | float (default 1.0) | HP regen rate while sleeping in a bed. |

## Pal rates

| Key | Type / Range | Effect |
|---|---|---|
| `PalCaptureRate` | float (default 1.0) | Multiplier on the chance a thrown Pal Sphere successfully captures. |
| `PalSpawnNumRate` | float (default 1.0) | Multiplier on how many wild Pals spawn in the world. |
| `PalDamageRateAttack` | float (default 1.0) | Multiplier on damage Pals deal (wild + owned, in combat). |
| `PalDamageRateDefense` | float (default 1.0) | Multiplier on damage Pals take. |
| `PalStomachDecreaceRate` | float (default 1.0) | How fast owned Pals' hunger drains. |
| `PalStaminaDecreaceRate` | float (default 1.0) | How fast owned Pals' stamina drains during work/combat. |
| `PalAutoHPRegeneRate` | float (default 1.0) | Passive HP regen rate for Pals while active. |
| `PalAutoHpRegeneRateInSleep` | float (default 1.0) | Pal HP regen rate while in the Palbox/resting. |
| `PalEggDefaultHatchingTime` | float, hours (default 1.0) | How many in-game hours a Pal egg takes to hatch. |
| `WorkSpeedRate` | float (default 1.0) | Multiplier on how fast Pals complete base-building/production work. |

## Combat / PvP / penalties

| Key | Type / Range | Effect |
|---|---|---|
| `bEnablePlayerToPlayerDamage` | bool | Whether players can damage each other at all (gate for PvP). |
| `bEnableFriendlyFire` | bool | Whether guild/party members can damage each other. |
| `bEnableInvaderEnemy` | bool | Whether hostile human "invader" NPCs can spawn and raid. |
| `bEnableAimAssistPad` | bool | Aim assist for controller input. |
| `bEnableAimAssistKeyboard` | bool | Aim assist for mouse/keyboard input. |
| `bIsPvP` | bool | Server-wide PvP mode toggle. |
| `DeathPenalty` | enum: `None`, `Item`, `ItemAndEquipment`, `All` | What a player loses on death — nothing, dropped items only, items+equipment, or everything including Pals. |
| `bEnableNonLoginPenalty` | bool | Whether an offline player's base/items are still vulnerable to the death-penalty drop mechanics. |
| `bCanPickupOtherGuildDeathPenaltyDrop` | bool | Whether other guilds can loot a dead player's dropped items. |
| `bEnableDefenseOtherGuildPlayer` | bool | Whether base defenses (turrets, walls) fire on players from other guilds. |

## Building / base

| Key | Type / Range | Effect |
|---|---|---|
| `BuildObjectDamageRate` | float (default 1.0) | Multiplier on damage dealt to player-built structures. |
| `BuildObjectDeteriorationRate` | float (default 1.0) | How fast built structures decay/degrade over time. |
| `BaseCampMaxNum` | int (default 128) | Max number of base camps a guild can have. |
| `BaseCampWorkerMaxNum` | int (default 15) | Max number of Pals that can be assigned to work at one base camp. |

## Drops / collection / items

| Key | Type / Range | Effect |
|---|---|---|
| `CollectionDropRate` | float (default 1.0) | Multiplier on resources gained from gathering nodes (trees, rocks, etc). |
| `CollectionObjectHpRate` | float (default 1.0) | HP of gatherable nodes — higher means more hits needed to deplete them. |
| `CollectionObjectRespawnSpeedRate` | float (default 1.0) | How quickly depleted gathering nodes respawn. |
| `EnemyDropItemRate` | float (default 1.0) | Multiplier on item drops from defeated enemies/Pals. |
| `DropItemMaxNum` | int (default 3000) | Max number of dropped items allowed to exist in the world at once (older items despawn to make room). |
| `DropItemAliveMaxHours` | float, hours (default 1.0) | How long a dropped item stays in the world before despawning. |

## Guild / social

| Key | Type / Range | Effect |
|---|---|---|
| `GuildPlayerMaxNum` | int (default 20) | Max members allowed per guild. |
| `bAutoResetGuildNoOnlinePlayers` | bool | Whether a guild with no online members for a period gets auto-disbanded/reset. |
| `AutoResetGuildTimeNoOnlinePlayers` | float, hours | How long a guild can have zero online members before the above reset triggers. |

## Server / networking

| Key | Type / Range | Effect |
|---|---|---|
| `ServerName` | string | Name shown in the server browser. |
| `ServerDescription` | string | Description shown in the server browser. |
| `ServerPassword` | string | Password required to join; empty = public. |
| `AdminPassword` | string | Password required for in-game admin commands. |
| `PublicPort` | int (default 8211) | UDP port the server listens on / advertises. |
| `PublicIP` | string | IP advertised to the server browser (leave blank to auto-detect). |
| `ServerPlayerMaxNum` | int (default 32) | Max concurrent players on the server. |
| `CoopPlayerMaxNum` | int (default 4) | Max players allowed in one co-op instance/party context. |
| `bIsMultiplay` | bool | Whether this world runs as a multiplayer dedicated/co-op session vs. singleplayer. |
| `bUseAuth` | bool | Whether Steam/platform auth is required to join. |
| `RCONEnabled` | bool | Whether the RCON remote-console interface is enabled. |
| `RCONPort` | int (default 25575) | Port RCON listens on when enabled. |
| `RESTAPIEnabled` | bool | Whether the server's REST admin API is enabled. |
| `RESTAPIPort` | int (default 8212) | Port the REST API listens on when enabled. |
| `Region` | string | Region tag shown in the server browser. |
| `bShowPlayerList` | bool | Whether the current player list is publicly queryable. |
| `ChatPostLimitPerMinute` | int | Rate limit on chat messages per player per minute (anti-spam). |
| `BanListURL` | string | URL the server pulls a shared ban list from. |
| `bEnableFastTravel` | bool | Whether fast travel between unlocked waypoints is allowed. |
| `bIsStartLocationSelectByMap` | bool | Whether new players choose their spawn point on the map vs. a fixed spawn. |
| `bExistPlayerAfterLogout` | bool | Whether a player's character body remains in the world (vulnerable) after logging out, vs. despawning. |

## Notes for the "preview consequences" feature

- Rate fields (`*Rate`) are multipliers on the vanilla value — write copy as relative change ("Pals will take 2x damage") rather than restating the raw float.
- Several `b`-prefixed keys are interdependent (e.g. `bEnablePlayerToPlayerDamage` gates whether `bEnableFriendlyFire` / `bIsPvP` have any effect) — when previewing consequences, check gating keys and note when a change is a no-op because a prerequisite toggle is off.
- `Difficulty != None` can silently override several rate fields server-side — if previewing consequences for a rate field, check `Difficulty` first and flag the override rather than promising an effect that won't actually apply.
