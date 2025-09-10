import * as Phaser from "phaser";

// Shared EventBus for Phaser ↔ React
export const EventBus = new Phaser.Events.EventEmitter();
