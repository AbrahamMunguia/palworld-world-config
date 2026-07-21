/**
 * Plain-English descriptions for known Palworld dedicated-server INI keys,
 * shown to the user as a tooltip next to the matching field. Sourced from
 * the official dedicated-server docs (docs.palworldgame.com) and the
 * community wiki (palworld.wiki.gg/wiki/PalWorldSettings.ini).
 *
 * This is intentionally a flat, data-only lookup table — the form itself is
 * schema-less (it renders a control per key purely based on runtime type,
 * see `ConfigValueField`), so any key not listed here simply renders
 * without a tooltip rather than being treated as an error.
 */
export const SETTING_DESCRIPTIONS: Record<string, string> = {
  Difficulty: "Overall game difficulty preset (e.g. None, Casual, Normal).",
  DayTimeSpeedRate: "Multiplier for how fast in-game daytime passes.",
  NightTimeSpeedRate: "Multiplier for how fast in-game nighttime passes.",
  ExpRate: "Multiplier applied to experience points gained.",
  PalCaptureRate: "Multiplier for the chance to successfully capture a Pal.",
  PalSpawnNumRate: "Multiplier for how many Pals spawn in the world.",
  PalDamageRateAttack: "Multiplier for damage dealt by Pals.",
  PalDamageRateDefense: "Multiplier for damage taken by Pals.",
  PlayerDamageRateAttack: "Multiplier for damage dealt by players.",
  PlayerDamageRateDefense: "Multiplier for damage taken by players.",
  PlayerStomachDecreaceRate: "Multiplier for how fast a player's hunger (satiety) depletes.",
  PlayerStaminaDecreaceRate: "Multiplier for how fast a player's stamina depletes.",
  PlayerAutoHPRegeneRate: "Multiplier for passive HP regeneration for players while active.",
  PlayerAutoHpRegeneRateInSleep: "Multiplier for HP regeneration for players while sleeping.",
  PalStomachDecreaceRate: "Multiplier for how fast a Pal's hunger depletes.",
  PalStaminaDecreaceRate: "Multiplier for how fast a Pal's stamina depletes.",
  PalAutoHPRegeneRate: "Multiplier for passive HP regeneration for Pals while active.",
  PalAutoHpRegeneRateInSleep: "Multiplier for HP regeneration for Pals while sleeping.",
  BuildObjectDamageRate: "Multiplier for damage dealt to player-built structures.",
  BuildObjectDeteriorationDamageRate: "Multiplier for passive deterioration damage to built structures over time.",
  CollectionDropRate: "Multiplier for item drops from gatherable resource objects.",
  CollectionObjectHpRate: "Multiplier for the HP (durability) of gatherable resource objects.",
  CollectionObjectRespawnSpeedRate: "Multiplier for how quickly gatherable resource objects respawn.",
  EnemyDropItemRate: "Multiplier for item drops from defeated enemies.",
  DeathPenalty: "What a player loses on death (e.g. None, Item, ItemAndEquipment, All).",
  bEnablePlayerToPlayerDamage: "Whether players can deal damage to other players.",
  bEnableFriendlyFire: "Whether members of the same guild can damage each other.",
  bEnableInvaderEnemy: "Whether hostile invader enemies can appear at bases.",
  bActiveUNKO: "Whether the \"UNKO\" (Poop Pal) special content is enabled.",
  bEnableAimAssistPad: "Whether aim assist is enabled for gamepad input.",
  bEnableAimAssistKeyboard: "Whether aim assist is enabled for keyboard/mouse input.",
  DropItemMaxNum: "Maximum number of dropped items allowed to exist in the world at once.",
  DropItemMaxNum_UNKO: "Maximum number of dropped \"UNKO\" items allowed to exist at once.",
  BaseCampMaxNum: "Maximum number of base camps allowed on the server.",
  BaseCampWorkerMaxNum: "Maximum number of Pals that can work at a single base camp.",
  DropItemAliveMaxHours: "Number of hours a dropped item stays in the world before despawning.",
  bAutoResetGuildNoOnlinePlayers: "Whether guilds with no online members are automatically reset/disbanded.",
  AutoResetGuildTimeNoOnlinePlayers: "Number of hours of guild inactivity before auto-reset triggers.",
  GuildPlayerMaxNum: "Maximum number of players allowed per guild.",
  PalEggDefaultHatchingTime: "Number of hours it takes for a Pal egg to hatch by default.",
  WorkSpeedRate: "Multiplier for how fast Pals complete work tasks.",
  bIsMultiplay: "Whether multiplayer is enabled on this server.",
  bIsPvP: "Whether player-vs-player combat is enabled server-wide.",
  bCanPickupOtherGuildDeathPenaltyDrop:
    "Whether players can pick up death-penalty item drops belonging to other guilds.",
  bEnableNonLoginPenalty: "Whether penalties apply to a player's base/Pals while they are offline.",
  bEnableFastTravel: "Whether fast travel between unlocked points is enabled.",
  bIsStartLocationSelectByMap: "Whether new players can choose their starting location on the map.",
  bExistPlayerAfterLogout: "Whether a player's character remains physically present in the world after logging out.",
  bEnableDefenseOtherGuildPlayer:
    "Whether players can be attacked/defended against by other guilds' base defenses.",
  CoopPlayerMaxNum: "Maximum number of players allowed in a single co-op play session.",
  ServerPlayerMaxNum: "Maximum total number of players allowed on the server.",
  ServerName: "The server's display name shown in the server browser.",
  ServerDescription: "A short description of the server shown in the server browser.",
  AdminPassword: "Password required to gain admin/RCON privileges on the server.",
  ServerPassword: "Password required for players to join the server.",
  PublicPort: "The UDP port the server listens on for player connections.",
  PublicIP: "The public IP address advertised for the server.",
  RCONEnabled: "Whether the RCON remote console/admin protocol is enabled.",
  RCONPort: "The port used for RCON remote console connections.",
  Region: "A free-text region identifier shown in the server browser.",
  bUseAuth: "Whether Steam/EOS account authentication is required to join.",
  BanListURL: "URL of a remote ban list the server fetches and applies.",
  MaxPlayers: "Maximum number of concurrent players (Engine.GameSession-level cap, distinct from ServerPlayerMaxNum).",
}

/**
 * Looks up the plain-English description for a Palworld INI key, matched
 * against the raw label a field control renders (the INI key name).
 * Returns `undefined` for keys with no known description — callers should
 * treat that as "no tooltip", not an error.
 */
export function getSettingDescription(label: string): string | undefined {
  return Object.hasOwn(SETTING_DESCRIPTIONS, label) ? SETTING_DESCRIPTIONS[label] : undefined
}
