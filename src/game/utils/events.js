import EventEmitter from "events";

// Shared event bus between Phaser and React
const gameEvents = new EventEmitter();

export default gameEvents;
