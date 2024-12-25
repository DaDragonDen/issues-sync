import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
export const id = 1624;
export const ids = [1624];
export const modules = {

/***/ 9312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AudioPlayer: () => AudioPlayer,
  AudioPlayerError: () => AudioPlayerError,
  AudioPlayerStatus: () => AudioPlayerStatus,
  AudioReceiveStream: () => AudioReceiveStream,
  AudioResource: () => AudioResource,
  EndBehaviorType: () => EndBehaviorType,
  NoSubscriberBehavior: () => NoSubscriberBehavior,
  PlayerSubscription: () => PlayerSubscription,
  SSRCMap: () => SSRCMap,
  SpeakingMap: () => SpeakingMap,
  StreamType: () => StreamType,
  VoiceConnection: () => VoiceConnection,
  VoiceConnectionDisconnectReason: () => VoiceConnectionDisconnectReason,
  VoiceConnectionStatus: () => VoiceConnectionStatus,
  VoiceReceiver: () => VoiceReceiver,
  createAudioPlayer: () => createAudioPlayer,
  createAudioResource: () => createAudioResource,
  createDefaultAudioReceiveStreamOptions: () => createDefaultAudioReceiveStreamOptions,
  demuxProbe: () => demuxProbe,
  entersState: () => entersState,
  generateDependencyReport: () => generateDependencyReport,
  getGroups: () => getGroups,
  getVoiceConnection: () => getVoiceConnection,
  getVoiceConnections: () => getVoiceConnections,
  joinVoiceChannel: () => joinVoiceChannel,
  validateDiscordOpusHead: () => validateDiscordOpusHead,
  version: () => version2
});
module.exports = __toCommonJS(src_exports);

// src/VoiceConnection.ts
var import_node_events7 = __webpack_require__(4434);

// src/DataStore.ts
var import_v10 = __webpack_require__(2489);
function createJoinVoiceChannelPayload(config) {
  return {
    op: import_v10.GatewayOpcodes.VoiceStateUpdate,
    // eslint-disable-next-line id-length
    d: {
      guild_id: config.guildId,
      channel_id: config.channelId,
      self_deaf: config.selfDeaf,
      self_mute: config.selfMute
    }
  };
}
__name(createJoinVoiceChannelPayload, "createJoinVoiceChannelPayload");
var groups = /* @__PURE__ */ new Map();
groups.set("default", /* @__PURE__ */ new Map());
function getOrCreateGroup(group) {
  const existing = groups.get(group);
  if (existing)
    return existing;
  const map = /* @__PURE__ */ new Map();
  groups.set(group, map);
  return map;
}
__name(getOrCreateGroup, "getOrCreateGroup");
function getGroups() {
  return groups;
}
__name(getGroups, "getGroups");
function getVoiceConnections(group = "default") {
  return groups.get(group);
}
__name(getVoiceConnections, "getVoiceConnections");
function getVoiceConnection(guildId, group = "default") {
  return getVoiceConnections(group)?.get(guildId);
}
__name(getVoiceConnection, "getVoiceConnection");
function untrackVoiceConnection(voiceConnection) {
  return getVoiceConnections(voiceConnection.joinConfig.group)?.delete(voiceConnection.joinConfig.guildId);
}
__name(untrackVoiceConnection, "untrackVoiceConnection");
function trackVoiceConnection(voiceConnection) {
  return getOrCreateGroup(voiceConnection.joinConfig.group).set(voiceConnection.joinConfig.guildId, voiceConnection);
}
__name(trackVoiceConnection, "trackVoiceConnection");
var FRAME_LENGTH = 20;
var audioCycleInterval;
var nextTime = -1;
var audioPlayers = [];
function audioCycleStep() {
  if (nextTime === -1)
    return;
  nextTime += FRAME_LENGTH;
  const available = audioPlayers.filter((player) => player.checkPlayable());
  for (const player of available) {
    player["_stepDispatch"]();
  }
  prepareNextAudioFrame(available);
}
__name(audioCycleStep, "audioCycleStep");
function prepareNextAudioFrame(players) {
  const nextPlayer = players.shift();
  if (!nextPlayer) {
    if (nextTime !== -1) {
      audioCycleInterval = setTimeout(() => audioCycleStep(), nextTime - Date.now());
    }
    return;
  }
  nextPlayer["_stepPrepare"]();
  setImmediate(() => prepareNextAudioFrame(players));
}
__name(prepareNextAudioFrame, "prepareNextAudioFrame");
function hasAudioPlayer(target) {
  return audioPlayers.includes(target);
}
__name(hasAudioPlayer, "hasAudioPlayer");
function addAudioPlayer(player) {
  if (hasAudioPlayer(player))
    return player;
  audioPlayers.push(player);
  if (audioPlayers.length === 1) {
    nextTime = Date.now();
    setImmediate(() => audioCycleStep());
  }
  return player;
}
__name(addAudioPlayer, "addAudioPlayer");
function deleteAudioPlayer(player) {
  const index = audioPlayers.indexOf(player);
  if (index === -1)
    return;
  audioPlayers.splice(index, 1);
  if (audioPlayers.length === 0) {
    nextTime = -1;
    if (audioCycleInterval !== void 0)
      clearTimeout(audioCycleInterval);
  }
}
__name(deleteAudioPlayer, "deleteAudioPlayer");

// src/networking/Networking.ts
var import_node_buffer3 = __webpack_require__(181);
var import_node_events3 = __webpack_require__(4434);
var import_v42 = __webpack_require__(3805);

// src/util/Secretbox.ts
var import_node_buffer = __webpack_require__(181);
var libs = {
  "sodium-native": (sodium) => ({
    open: (buffer, nonce2, secretKey) => {
      if (buffer) {
        const output = import_node_buffer.Buffer.allocUnsafe(buffer.length - sodium.crypto_box_MACBYTES);
        if (sodium.crypto_secretbox_open_easy(output, buffer, nonce2, secretKey))
          return output;
      }
      return null;
    },
    close: (opusPacket, nonce2, secretKey) => {
      const output = import_node_buffer.Buffer.allocUnsafe(opusPacket.length + sodium.crypto_box_MACBYTES);
      sodium.crypto_secretbox_easy(output, opusPacket, nonce2, secretKey);
      return output;
    },
    random: (num, buffer = import_node_buffer.Buffer.allocUnsafe(num)) => {
      sodium.randombytes_buf(buffer);
      return buffer;
    }
  }),
  sodium: (sodium) => ({
    open: sodium.api.crypto_secretbox_open_easy,
    close: sodium.api.crypto_secretbox_easy,
    random: (num, buffer = import_node_buffer.Buffer.allocUnsafe(num)) => {
      sodium.api.randombytes_buf(buffer);
      return buffer;
    }
  }),
  "libsodium-wrappers": (sodium) => ({
    open: sodium.crypto_secretbox_open_easy,
    close: sodium.crypto_secretbox_easy,
    random: sodium.randombytes_buf
  }),
  tweetnacl: (tweetnacl) => ({
    open: tweetnacl.secretbox.open,
    close: tweetnacl.secretbox,
    random: tweetnacl.randomBytes
  })
};
var fallbackError = /* @__PURE__ */ __name(() => {
  throw new Error(
    `Cannot play audio as no valid encryption package is installed.
- Install sodium, libsodium-wrappers, or tweetnacl.
- Use the generateDependencyReport() function for more information.
`
  );
}, "fallbackError");
var methods = {
  open: fallbackError,
  close: fallbackError,
  random: fallbackError
};
void (async () => {
  for (const libName of Object.keys(libs)) {
    try {
      const lib = __webpack_require__(8868)(libName);
      if (libName === "libsodium-wrappers" && lib.ready)
        await lib.ready;
      Object.assign(methods, libs[libName](lib));
      break;
    } catch {
    }
  }
})();

// src/util/util.ts
var noop = /* @__PURE__ */ __name(() => {
}, "noop");

// src/networking/VoiceUDPSocket.ts
var import_node_buffer2 = __webpack_require__(181);
var import_node_dgram = __webpack_require__(7194);
var import_node_events = __webpack_require__(4434);
var import_node_net = __webpack_require__(9278);
function parseLocalPacket(message) {
  const packet = import_node_buffer2.Buffer.from(message);
  const ip = packet.slice(8, packet.indexOf(0, 8)).toString("utf8");
  if (!(0, import_node_net.isIPv4)(ip)) {
    throw new Error("Malformed IP address");
  }
  const port = packet.readUInt16BE(packet.length - 2);
  return { ip, port };
}
__name(parseLocalPacket, "parseLocalPacket");
var KEEP_ALIVE_INTERVAL = 5e3;
var MAX_COUNTER_VALUE = 2 ** 32 - 1;
var VoiceUDPSocket = class extends import_node_events.EventEmitter {
  static {
    __name(this, "VoiceUDPSocket");
  }
  /**
   * The underlying network Socket for the VoiceUDPSocket.
   */
  socket;
  /**
   * The socket details for Discord (remote)
   */
  remote;
  /**
   * The counter used in the keep alive mechanism.
   */
  keepAliveCounter = 0;
  /**
   * The buffer used to write the keep alive counter into.
   */
  keepAliveBuffer;
  /**
   * The Node.js interval for the keep-alive mechanism.
   */
  keepAliveInterval;
  /**
   * The time taken to receive a response to keep alive messages.
   *
   * @deprecated This field is no longer updated as keep alive messages are no longer tracked.
   */
  ping;
  /**
   * Creates a new VoiceUDPSocket.
   *
   * @param remote - Details of the remote socket
   */
  constructor(remote) {
    super();
    this.socket = (0, import_node_dgram.createSocket)("udp4");
    this.socket.on("error", (error) => this.emit("error", error));
    this.socket.on("message", (buffer) => this.onMessage(buffer));
    this.socket.on("close", () => this.emit("close"));
    this.remote = remote;
    this.keepAliveBuffer = import_node_buffer2.Buffer.alloc(8);
    this.keepAliveInterval = setInterval(() => this.keepAlive(), KEEP_ALIVE_INTERVAL);
    setImmediate(() => this.keepAlive());
  }
  /**
   * Called when a message is received on the UDP socket.
   *
   * @param buffer - The received buffer
   */
  onMessage(buffer) {
    this.emit("message", buffer);
  }
  /**
   * Called at a regular interval to check whether we are still able to send datagrams to Discord.
   */
  keepAlive() {
    this.keepAliveBuffer.writeUInt32LE(this.keepAliveCounter, 0);
    this.send(this.keepAliveBuffer);
    this.keepAliveCounter++;
    if (this.keepAliveCounter > MAX_COUNTER_VALUE) {
      this.keepAliveCounter = 0;
    }
  }
  /**
   * Sends a buffer to Discord.
   *
   * @param buffer - The buffer to send
   */
  send(buffer) {
    this.socket.send(buffer, this.remote.port, this.remote.ip);
  }
  /**
   * Closes the socket, the instance will not be able to be reused.
   */
  destroy() {
    try {
      this.socket.close();
    } catch {
    }
    clearInterval(this.keepAliveInterval);
  }
  /**
   * Performs IP discovery to discover the local address and port to be used for the voice connection.
   *
   * @param ssrc - The SSRC received from Discord
   */
  async performIPDiscovery(ssrc) {
    return new Promise((resolve2, reject) => {
      const listener = /* @__PURE__ */ __name((message) => {
        try {
          if (message.readUInt16BE(0) !== 2)
            return;
          const packet = parseLocalPacket(message);
          this.socket.off("message", listener);
          resolve2(packet);
        } catch {
        }
      }, "listener");
      this.socket.on("message", listener);
      this.socket.once("close", () => reject(new Error("Cannot perform IP discovery - socket closed")));
      const discoveryBuffer = import_node_buffer2.Buffer.alloc(74);
      discoveryBuffer.writeUInt16BE(1, 0);
      discoveryBuffer.writeUInt16BE(70, 2);
      discoveryBuffer.writeUInt32BE(ssrc, 4);
      this.send(discoveryBuffer);
    });
  }
};

// src/networking/VoiceWebSocket.ts
var import_node_events2 = __webpack_require__(4434);
var import_v4 = __webpack_require__(3805);
var import_ws = __toESM(__webpack_require__(7879));
var VoiceWebSocket = class extends import_node_events2.EventEmitter {
  static {
    __name(this, "VoiceWebSocket");
  }
  /**
   * The current heartbeat interval, if any.
   */
  heartbeatInterval;
  /**
   * The time (milliseconds since UNIX epoch) that the last heartbeat acknowledgement packet was received.
   * This is set to 0 if an acknowledgement packet hasn't been received yet.
   */
  lastHeartbeatAck;
  /**
   * The time (milliseconds since UNIX epoch) that the last heartbeat was sent. This is set to 0 if a heartbeat
   * hasn't been sent yet.
   */
  lastHeartbeatSend;
  /**
   * The number of consecutively missed heartbeats.
   */
  missedHeartbeats = 0;
  /**
   * The last recorded ping.
   */
  ping;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * The underlying WebSocket of this wrapper.
   */
  ws;
  /**
   * Creates a new VoiceWebSocket.
   *
   * @param address - The address to connect to
   */
  constructor(address, debug) {
    super();
    this.ws = new import_ws.default(address);
    this.ws.onmessage = (err) => this.onMessage(err);
    this.ws.onopen = (err) => this.emit("open", err);
    this.ws.onerror = (err) => this.emit("error", err instanceof Error ? err : err.error);
    this.ws.onclose = (err) => this.emit("close", err);
    this.lastHeartbeatAck = 0;
    this.lastHeartbeatSend = 0;
    this.debug = debug ? (message) => this.emit("debug", message) : null;
  }
  /**
   * Destroys the VoiceWebSocket. The heartbeat interval is cleared, and the connection is closed.
   */
  destroy() {
    try {
      this.debug?.("destroyed");
      this.setHeartbeatInterval(-1);
      this.ws.close(1e3);
    } catch (error) {
      const err = error;
      this.emit("error", err);
    }
  }
  /**
   * Handles message events on the WebSocket. Attempts to JSON parse the messages and emit them
   * as packets.
   *
   * @param event - The message event
   */
  onMessage(event) {
    if (typeof event.data !== "string")
      return;
    this.debug?.(`<< ${event.data}`);
    let packet;
    try {
      packet = JSON.parse(event.data);
    } catch (error) {
      const err = error;
      this.emit("error", err);
      return;
    }
    if (packet.op === import_v4.VoiceOpcodes.HeartbeatAck) {
      this.lastHeartbeatAck = Date.now();
      this.missedHeartbeats = 0;
      this.ping = this.lastHeartbeatAck - this.lastHeartbeatSend;
    }
    this.emit("packet", packet);
  }
  /**
   * Sends a JSON-stringifiable packet over the WebSocket.
   *
   * @param packet - The packet to send
   */
  sendPacket(packet) {
    try {
      const stringified = JSON.stringify(packet);
      this.debug?.(`>> ${stringified}`);
      this.ws.send(stringified);
    } catch (error) {
      const err = error;
      this.emit("error", err);
    }
  }
  /**
   * Sends a heartbeat over the WebSocket.
   */
  sendHeartbeat() {
    this.lastHeartbeatSend = Date.now();
    this.missedHeartbeats++;
    const nonce2 = this.lastHeartbeatSend;
    this.sendPacket({
      op: import_v4.VoiceOpcodes.Heartbeat,
      // eslint-disable-next-line id-length
      d: nonce2
    });
  }
  /**
   * Sets/clears an interval to send heartbeats over the WebSocket.
   *
   * @param ms - The interval in milliseconds. If negative, the interval will be unset
   */
  setHeartbeatInterval(ms) {
    if (this.heartbeatInterval !== void 0)
      clearInterval(this.heartbeatInterval);
    if (ms > 0) {
      this.heartbeatInterval = setInterval(() => {
        if (this.lastHeartbeatSend !== 0 && this.missedHeartbeats >= 3) {
          this.ws.close();
          this.setHeartbeatInterval(-1);
        }
        this.sendHeartbeat();
      }, ms);
    }
  }
};

// src/networking/Networking.ts
var CHANNELS = 2;
var TIMESTAMP_INC = 48e3 / 100 * CHANNELS;
var MAX_NONCE_SIZE = 2 ** 32 - 1;
var SUPPORTED_ENCRYPTION_MODES = ["xsalsa20_poly1305_lite", "xsalsa20_poly1305_suffix", "xsalsa20_poly1305"];
var nonce = import_node_buffer3.Buffer.alloc(24);
function stringifyState(state) {
  return JSON.stringify({
    ...state,
    ws: Reflect.has(state, "ws"),
    udp: Reflect.has(state, "udp")
  });
}
__name(stringifyState, "stringifyState");
function chooseEncryptionMode(options) {
  const option = options.find((option2) => SUPPORTED_ENCRYPTION_MODES.includes(option2));
  if (!option) {
    throw new Error(`No compatible encryption modes. Available include: ${options.join(", ")}`);
  }
  return option;
}
__name(chooseEncryptionMode, "chooseEncryptionMode");
function randomNBit(numberOfBits) {
  return Math.floor(Math.random() * 2 ** numberOfBits);
}
__name(randomNBit, "randomNBit");
var Networking = class extends import_node_events3.EventEmitter {
  static {
    __name(this, "Networking");
  }
  _state;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * Creates a new Networking instance.
   */
  constructor(options, debug) {
    super();
    this.onWsOpen = this.onWsOpen.bind(this);
    this.onChildError = this.onChildError.bind(this);
    this.onWsPacket = this.onWsPacket.bind(this);
    this.onWsClose = this.onWsClose.bind(this);
    this.onWsDebug = this.onWsDebug.bind(this);
    this.onUdpDebug = this.onUdpDebug.bind(this);
    this.onUdpClose = this.onUdpClose.bind(this);
    this.debug = debug ? (message) => this.emit("debug", message) : null;
    this._state = {
      code: 0 /* OpeningWs */,
      ws: this.createWebSocket(options.endpoint),
      connectionOptions: options
    };
  }
  /**
   * Destroys the Networking instance, transitioning it into the Closed state.
   */
  destroy() {
    this.state = {
      code: 6 /* Closed */
    };
  }
  /**
   * The current state of the networking instance.
   */
  get state() {
    return this._state;
  }
  /**
   * Sets a new state for the networking instance, performing clean-up operations where necessary.
   */
  set state(newState) {
    const oldWs = Reflect.get(this._state, "ws");
    const newWs = Reflect.get(newState, "ws");
    if (oldWs && oldWs !== newWs) {
      oldWs.off("debug", this.onWsDebug);
      oldWs.on("error", noop);
      oldWs.off("error", this.onChildError);
      oldWs.off("open", this.onWsOpen);
      oldWs.off("packet", this.onWsPacket);
      oldWs.off("close", this.onWsClose);
      oldWs.destroy();
    }
    const oldUdp = Reflect.get(this._state, "udp");
    const newUdp = Reflect.get(newState, "udp");
    if (oldUdp && oldUdp !== newUdp) {
      oldUdp.on("error", noop);
      oldUdp.off("error", this.onChildError);
      oldUdp.off("close", this.onUdpClose);
      oldUdp.off("debug", this.onUdpDebug);
      oldUdp.destroy();
    }
    const oldState = this._state;
    this._state = newState;
    this.emit("stateChange", oldState, newState);
    this.debug?.(`state change:
from ${stringifyState(oldState)}
to ${stringifyState(newState)}`);
  }
  /**
   * Creates a new WebSocket to a Discord Voice gateway.
   *
   * @param endpoint - The endpoint to connect to
   */
  createWebSocket(endpoint) {
    const ws = new VoiceWebSocket(`wss://${endpoint}?v=4`, Boolean(this.debug));
    ws.on("error", this.onChildError);
    ws.once("open", this.onWsOpen);
    ws.on("packet", this.onWsPacket);
    ws.once("close", this.onWsClose);
    ws.on("debug", this.onWsDebug);
    return ws;
  }
  /**
   * Propagates errors from the children VoiceWebSocket and VoiceUDPSocket.
   *
   * @param error - The error that was emitted by a child
   */
  onChildError(error) {
    this.emit("error", error);
  }
  /**
   * Called when the WebSocket opens. Depending on the state that the instance is in,
   * it will either identify with a new session, or it will attempt to resume an existing session.
   */
  onWsOpen() {
    if (this.state.code === 0 /* OpeningWs */) {
      const packet = {
        op: import_v42.VoiceOpcodes.Identify,
        d: {
          server_id: this.state.connectionOptions.serverId,
          user_id: this.state.connectionOptions.userId,
          session_id: this.state.connectionOptions.sessionId,
          token: this.state.connectionOptions.token
        }
      };
      this.state.ws.sendPacket(packet);
      this.state = {
        ...this.state,
        code: 1 /* Identifying */
      };
    } else if (this.state.code === 5 /* Resuming */) {
      const packet = {
        op: import_v42.VoiceOpcodes.Resume,
        d: {
          server_id: this.state.connectionOptions.serverId,
          session_id: this.state.connectionOptions.sessionId,
          token: this.state.connectionOptions.token
        }
      };
      this.state.ws.sendPacket(packet);
    }
  }
  /**
   * Called when the WebSocket closes. Based on the reason for closing (given by the code parameter),
   * the instance will either attempt to resume, or enter the closed state and emit a 'close' event
   * with the close code, allowing the user to decide whether or not they would like to reconnect.
   *
   * @param code - The close code
   */
  onWsClose({ code }) {
    const canResume = code === 4015 || code < 4e3;
    if (canResume && this.state.code === 4 /* Ready */) {
      this.state = {
        ...this.state,
        code: 5 /* Resuming */,
        ws: this.createWebSocket(this.state.connectionOptions.endpoint)
      };
    } else if (this.state.code !== 6 /* Closed */) {
      this.destroy();
      this.emit("close", code);
    }
  }
  /**
   * Called when the UDP socket has closed itself if it has stopped receiving replies from Discord.
   */
  onUdpClose() {
    if (this.state.code === 4 /* Ready */) {
      this.state = {
        ...this.state,
        code: 5 /* Resuming */,
        ws: this.createWebSocket(this.state.connectionOptions.endpoint)
      };
    }
  }
  /**
   * Called when a packet is received on the connection's WebSocket.
   *
   * @param packet - The received packet
   */
  onWsPacket(packet) {
    if (packet.op === import_v42.VoiceOpcodes.Hello && this.state.code !== 6 /* Closed */) {
      this.state.ws.setHeartbeatInterval(packet.d.heartbeat_interval);
    } else if (packet.op === import_v42.VoiceOpcodes.Ready && this.state.code === 1 /* Identifying */) {
      const { ip, port, ssrc, modes } = packet.d;
      const udp = new VoiceUDPSocket({ ip, port });
      udp.on("error", this.onChildError);
      udp.on("debug", this.onUdpDebug);
      udp.once("close", this.onUdpClose);
      udp.performIPDiscovery(ssrc).then((localConfig) => {
        if (this.state.code !== 2 /* UdpHandshaking */)
          return;
        this.state.ws.sendPacket({
          op: import_v42.VoiceOpcodes.SelectProtocol,
          d: {
            protocol: "udp",
            data: {
              address: localConfig.ip,
              port: localConfig.port,
              mode: chooseEncryptionMode(modes)
            }
          }
        });
        this.state = {
          ...this.state,
          code: 3 /* SelectingProtocol */
        };
      }).catch((error) => this.emit("error", error));
      this.state = {
        ...this.state,
        code: 2 /* UdpHandshaking */,
        udp,
        connectionData: {
          ssrc
        }
      };
    } else if (packet.op === import_v42.VoiceOpcodes.SessionDescription && this.state.code === 3 /* SelectingProtocol */) {
      const { mode: encryptionMode, secret_key: secretKey } = packet.d;
      this.state = {
        ...this.state,
        code: 4 /* Ready */,
        connectionData: {
          ...this.state.connectionData,
          encryptionMode,
          secretKey: new Uint8Array(secretKey),
          sequence: randomNBit(16),
          timestamp: randomNBit(32),
          nonce: 0,
          nonceBuffer: import_node_buffer3.Buffer.alloc(24),
          speaking: false,
          packetsPlayed: 0
        }
      };
    } else if (packet.op === import_v42.VoiceOpcodes.Resumed && this.state.code === 5 /* Resuming */) {
      this.state = {
        ...this.state,
        code: 4 /* Ready */
      };
      this.state.connectionData.speaking = false;
    }
  }
  /**
   * Propagates debug messages from the child WebSocket.
   *
   * @param message - The emitted debug message
   */
  onWsDebug(message) {
    this.debug?.(`[WS] ${message}`);
  }
  /**
   * Propagates debug messages from the child UDPSocket.
   *
   * @param message - The emitted debug message
   */
  onUdpDebug(message) {
    this.debug?.(`[UDP] ${message}`);
  }
  /**
   * Prepares an Opus packet for playback. This includes attaching metadata to it and encrypting it.
   * It will be stored within the instance, and can be played by dispatchAudio()
   *
   * @remarks
   * Calling this method while there is already a prepared audio packet that has not yet been dispatched
   * will overwrite the existing audio packet. This should be avoided.
   * @param opusPacket - The Opus packet to encrypt
   * @returns The audio packet that was prepared
   */
  prepareAudioPacket(opusPacket) {
    const state = this.state;
    if (state.code !== 4 /* Ready */)
      return;
    state.preparedPacket = this.createAudioPacket(opusPacket, state.connectionData);
    return state.preparedPacket;
  }
  /**
   * Dispatches the audio packet previously prepared by prepareAudioPacket(opusPacket). The audio packet
   * is consumed and cannot be dispatched again.
   */
  dispatchAudio() {
    const state = this.state;
    if (state.code !== 4 /* Ready */)
      return false;
    if (state.preparedPacket !== void 0) {
      this.playAudioPacket(state.preparedPacket);
      state.preparedPacket = void 0;
      return true;
    }
    return false;
  }
  /**
   * Plays an audio packet, updating timing metadata used for playback.
   *
   * @param audioPacket - The audio packet to play
   */
  playAudioPacket(audioPacket) {
    const state = this.state;
    if (state.code !== 4 /* Ready */)
      return;
    const { connectionData } = state;
    connectionData.packetsPlayed++;
    connectionData.sequence++;
    connectionData.timestamp += TIMESTAMP_INC;
    if (connectionData.sequence >= 2 ** 16)
      connectionData.sequence = 0;
    if (connectionData.timestamp >= 2 ** 32)
      connectionData.timestamp = 0;
    this.setSpeaking(true);
    state.udp.send(audioPacket);
  }
  /**
   * Sends a packet to the voice gateway indicating that the client has start/stopped sending
   * audio.
   *
   * @param speaking - Whether or not the client should be shown as speaking
   */
  setSpeaking(speaking) {
    const state = this.state;
    if (state.code !== 4 /* Ready */)
      return;
    if (state.connectionData.speaking === speaking)
      return;
    state.connectionData.speaking = speaking;
    state.ws.sendPacket({
      op: import_v42.VoiceOpcodes.Speaking,
      d: {
        speaking: speaking ? 1 : 0,
        delay: 0,
        ssrc: state.connectionData.ssrc
      }
    });
  }
  /**
   * Creates a new audio packet from an Opus packet. This involves encrypting the packet,
   * then prepending a header that includes metadata.
   *
   * @param opusPacket - The Opus packet to prepare
   * @param connectionData - The current connection data of the instance
   */
  createAudioPacket(opusPacket, connectionData) {
    const packetBuffer = import_node_buffer3.Buffer.alloc(12);
    packetBuffer[0] = 128;
    packetBuffer[1] = 120;
    const { sequence, timestamp, ssrc } = connectionData;
    packetBuffer.writeUIntBE(sequence, 2, 2);
    packetBuffer.writeUIntBE(timestamp, 4, 4);
    packetBuffer.writeUIntBE(ssrc, 8, 4);
    packetBuffer.copy(nonce, 0, 0, 12);
    return import_node_buffer3.Buffer.concat([packetBuffer, ...this.encryptOpusPacket(opusPacket, connectionData)]);
  }
  /**
   * Encrypts an Opus packet using the format agreed upon by the instance and Discord.
   *
   * @param opusPacket - The Opus packet to encrypt
   * @param connectionData - The current connection data of the instance
   */
  encryptOpusPacket(opusPacket, connectionData) {
    const { secretKey, encryptionMode } = connectionData;
    if (encryptionMode === "xsalsa20_poly1305_lite") {
      connectionData.nonce++;
      if (connectionData.nonce > MAX_NONCE_SIZE)
        connectionData.nonce = 0;
      connectionData.nonceBuffer.writeUInt32BE(connectionData.nonce, 0);
      return [
        methods.close(opusPacket, connectionData.nonceBuffer, secretKey),
        connectionData.nonceBuffer.slice(0, 4)
      ];
    } else if (encryptionMode === "xsalsa20_poly1305_suffix") {
      const random = methods.random(24, connectionData.nonceBuffer);
      return [methods.close(opusPacket, random, secretKey), random];
    }
    return [methods.close(opusPacket, nonce, secretKey)];
  }
};

// src/receive/VoiceReceiver.ts
var import_node_buffer5 = __webpack_require__(181);
var import_v43 = __webpack_require__(3805);

// src/receive/AudioReceiveStream.ts
var import_node_stream = __webpack_require__(2203);

// src/audio/AudioPlayer.ts
var import_node_buffer4 = __webpack_require__(181);
var import_node_events4 = __webpack_require__(4434);

// src/audio/AudioPlayerError.ts
var AudioPlayerError = class extends Error {
  static {
    __name(this, "AudioPlayerError");
  }
  /**
   * The resource associated with the audio player at the time the error was thrown.
   */
  resource;
  constructor(error, resource) {
    super(error.message);
    this.resource = resource;
    this.name = error.name;
    this.stack = error.stack;
  }
};

// src/audio/PlayerSubscription.ts
var PlayerSubscription = class {
  static {
    __name(this, "PlayerSubscription");
  }
  /**
   * The voice connection of this subscription.
   */
  connection;
  /**
   * The audio player of this subscription.
   */
  player;
  constructor(connection, player) {
    this.connection = connection;
    this.player = player;
  }
  /**
   * Unsubscribes the connection from the audio player, meaning that the
   * audio player cannot stream audio to it until a new subscription is made.
   */
  unsubscribe() {
    this.connection["onSubscriptionRemoved"](this);
    this.player["unsubscribe"](this);
  }
};

// src/audio/AudioPlayer.ts
var SILENCE_FRAME = import_node_buffer4.Buffer.from([248, 255, 254]);
var NoSubscriberBehavior = /* @__PURE__ */ ((NoSubscriberBehavior2) => {
  NoSubscriberBehavior2["Pause"] = "pause";
  NoSubscriberBehavior2["Play"] = "play";
  NoSubscriberBehavior2["Stop"] = "stop";
  return NoSubscriberBehavior2;
})(NoSubscriberBehavior || {});
var AudioPlayerStatus = /* @__PURE__ */ ((AudioPlayerStatus2) => {
  AudioPlayerStatus2["AutoPaused"] = "autopaused";
  AudioPlayerStatus2["Buffering"] = "buffering";
  AudioPlayerStatus2["Idle"] = "idle";
  AudioPlayerStatus2["Paused"] = "paused";
  AudioPlayerStatus2["Playing"] = "playing";
  return AudioPlayerStatus2;
})(AudioPlayerStatus || {});
function stringifyState2(state) {
  return JSON.stringify({
    ...state,
    resource: Reflect.has(state, "resource"),
    stepTimeout: Reflect.has(state, "stepTimeout")
  });
}
__name(stringifyState2, "stringifyState");
var AudioPlayer = class extends import_node_events4.EventEmitter {
  static {
    __name(this, "AudioPlayer");
  }
  /**
   * The state that the AudioPlayer is in.
   */
  _state;
  /**
   * A list of VoiceConnections that are registered to this AudioPlayer. The player will attempt to play audio
   * to the streams in this list.
   */
  subscribers = [];
  /**
   * The behavior that the player should follow when it enters certain situations.
   */
  behaviors;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * Creates a new AudioPlayer.
   */
  constructor(options = {}) {
    super();
    this._state = { status: "idle" /* Idle */ };
    this.behaviors = {
      noSubscriber: "pause" /* Pause */,
      maxMissedFrames: 5,
      ...options.behaviors
    };
    this.debug = options.debug === false ? null : (message) => this.emit("debug", message);
  }
  /**
   * A list of subscribed voice connections that can currently receive audio to play.
   */
  get playable() {
    return this.subscribers.filter(({ connection }) => connection.state.status === "ready" /* Ready */).map(({ connection }) => connection);
  }
  /**
   * Subscribes a VoiceConnection to the audio player's play list. If the VoiceConnection is already subscribed,
   * then the existing subscription is used.
   *
   * @remarks
   * This method should not be directly called. Instead, use VoiceConnection#subscribe.
   * @param connection - The connection to subscribe
   * @returns The new subscription if the voice connection is not yet subscribed, otherwise the existing subscription
   */
  // @ts-ignore
  subscribe(connection) {
    const existingSubscription = this.subscribers.find((subscription) => subscription.connection === connection);
    if (!existingSubscription) {
      const subscription = new PlayerSubscription(connection, this);
      this.subscribers.push(subscription);
      setImmediate(() => this.emit("subscribe", subscription));
      return subscription;
    }
    return existingSubscription;
  }
  /**
   * Unsubscribes a subscription - i.e. removes a voice connection from the play list of the audio player.
   *
   * @remarks
   * This method should not be directly called. Instead, use PlayerSubscription#unsubscribe.
   * @param subscription - The subscription to remove
   * @returns Whether or not the subscription existed on the player and was removed
   */
  // @ts-ignore
  unsubscribe(subscription) {
    const index = this.subscribers.indexOf(subscription);
    const exists = index !== -1;
    if (exists) {
      this.subscribers.splice(index, 1);
      subscription.connection.setSpeaking(false);
      this.emit("unsubscribe", subscription);
    }
    return exists;
  }
  /**
   * The state that the player is in.
   */
  get state() {
    return this._state;
  }
  /**
   * Sets a new state for the player, performing clean-up operations where necessary.
   */
  set state(newState) {
    const oldState = this._state;
    const newResource = Reflect.get(newState, "resource");
    if (oldState.status !== "idle" /* Idle */ && oldState.resource !== newResource) {
      oldState.resource.playStream.on("error", noop);
      oldState.resource.playStream.off("error", oldState.onStreamError);
      oldState.resource.audioPlayer = void 0;
      oldState.resource.playStream.destroy();
      oldState.resource.playStream.read();
    }
    if (oldState.status === "buffering" /* Buffering */ && (newState.status !== "buffering" /* Buffering */ || newState.resource !== oldState.resource)) {
      oldState.resource.playStream.off("end", oldState.onFailureCallback);
      oldState.resource.playStream.off("close", oldState.onFailureCallback);
      oldState.resource.playStream.off("finish", oldState.onFailureCallback);
      oldState.resource.playStream.off("readable", oldState.onReadableCallback);
    }
    if (newState.status === "idle" /* Idle */) {
      this._signalStopSpeaking();
      deleteAudioPlayer(this);
    }
    if (newResource) {
      addAudioPlayer(this);
    }
    const didChangeResources = oldState.status !== "idle" /* Idle */ && newState.status === "playing" /* Playing */ && oldState.resource !== newState.resource;
    this._state = newState;
    this.emit("stateChange", oldState, this._state);
    if (oldState.status !== newState.status || didChangeResources) {
      this.emit(newState.status, oldState, this._state);
    }
    this.debug?.(`state change:
from ${stringifyState2(oldState)}
to ${stringifyState2(newState)}`);
  }
  /**
   * Plays a new resource on the player. If the player is already playing a resource, the existing resource is destroyed
   * (it cannot be reused, even in another player) and is replaced with the new resource.
   *
   * @remarks
   * The player will transition to the Playing state once playback begins, and will return to the Idle state once
   * playback is ended.
   *
   * If the player was previously playing a resource and this method is called, the player will not transition to the
   * Idle state during the swap over.
   * @param resource - The resource to play
   * @throws Will throw if attempting to play an audio resource that has already ended, or is being played by another player
   */
  play(resource) {
    if (resource.ended) {
      throw new Error("Cannot play a resource that has already ended.");
    }
    if (resource.audioPlayer) {
      if (resource.audioPlayer === this) {
        return;
      }
      throw new Error("Resource is already being played by another audio player.");
    }
    resource.audioPlayer = this;
    const onStreamError = /* @__PURE__ */ __name((error) => {
      if (this.state.status !== "idle" /* Idle */) {
        this.emit("error", new AudioPlayerError(error, this.state.resource));
      }
      if (this.state.status !== "idle" /* Idle */ && this.state.resource === resource) {
        this.state = {
          status: "idle" /* Idle */
        };
      }
    }, "onStreamError");
    resource.playStream.once("error", onStreamError);
    if (resource.started) {
      this.state = {
        status: "playing" /* Playing */,
        missedFrames: 0,
        playbackDuration: 0,
        resource,
        onStreamError
      };
    } else {
      const onReadableCallback = /* @__PURE__ */ __name(() => {
        if (this.state.status === "buffering" /* Buffering */ && this.state.resource === resource) {
          this.state = {
            status: "playing" /* Playing */,
            missedFrames: 0,
            playbackDuration: 0,
            resource,
            onStreamError
          };
        }
      }, "onReadableCallback");
      const onFailureCallback = /* @__PURE__ */ __name(() => {
        if (this.state.status === "buffering" /* Buffering */ && this.state.resource === resource) {
          this.state = {
            status: "idle" /* Idle */
          };
        }
      }, "onFailureCallback");
      resource.playStream.once("readable", onReadableCallback);
      resource.playStream.once("end", onFailureCallback);
      resource.playStream.once("close", onFailureCallback);
      resource.playStream.once("finish", onFailureCallback);
      this.state = {
        status: "buffering" /* Buffering */,
        resource,
        onReadableCallback,
        onFailureCallback,
        onStreamError
      };
    }
  }
  /**
   * Pauses playback of the current resource, if any.
   *
   * @param interpolateSilence - If true, the player will play 5 packets of silence after pausing to prevent audio glitches
   * @returns `true` if the player was successfully paused, otherwise `false`
   */
  pause(interpolateSilence = true) {
    if (this.state.status !== "playing" /* Playing */)
      return false;
    this.state = {
      ...this.state,
      status: "paused" /* Paused */,
      silencePacketsRemaining: interpolateSilence ? 5 : 0
    };
    return true;
  }
  /**
   * Unpauses playback of the current resource, if any.
   *
   * @returns `true` if the player was successfully unpaused, otherwise `false`
   */
  unpause() {
    if (this.state.status !== "paused" /* Paused */)
      return false;
    this.state = {
      ...this.state,
      status: "playing" /* Playing */,
      missedFrames: 0
    };
    return true;
  }
  /**
   * Stops playback of the current resource and destroys the resource. The player will either transition to the Idle state,
   * or remain in its current state until the silence padding frames of the resource have been played.
   *
   * @param force - If true, will force the player to enter the Idle state even if the resource has silence padding frames
   * @returns `true` if the player will come to a stop, otherwise `false`
   */
  stop(force = false) {
    if (this.state.status === "idle" /* Idle */)
      return false;
    if (force || this.state.resource.silencePaddingFrames === 0) {
      this.state = {
        status: "idle" /* Idle */
      };
    } else if (this.state.resource.silenceRemaining === -1) {
      this.state.resource.silenceRemaining = this.state.resource.silencePaddingFrames;
    }
    return true;
  }
  /**
   * Checks whether the underlying resource (if any) is playable (readable)
   *
   * @returns `true` if the resource is playable, otherwise `false`
   */
  checkPlayable() {
    const state = this._state;
    if (state.status === "idle" /* Idle */ || state.status === "buffering" /* Buffering */)
      return false;
    if (!state.resource.readable) {
      this.state = {
        status: "idle" /* Idle */
      };
      return false;
    }
    return true;
  }
  /**
   * Called roughly every 20ms by the global audio player timer. Dispatches any audio packets that are buffered
   * by the active connections of this audio player.
   */
  // @ts-ignore
  _stepDispatch() {
    const state = this._state;
    if (state.status === "idle" /* Idle */ || state.status === "buffering" /* Buffering */)
      return;
    for (const connection of this.playable) {
      connection.dispatchAudio();
    }
  }
  /**
   * Called roughly every 20ms by the global audio player timer. Attempts to read an audio packet from the
   * underlying resource of the stream, and then has all the active connections of the audio player prepare it
   * (encrypt it, append header data) so that it is ready to play at the start of the next cycle.
   */
  // @ts-ignore
  _stepPrepare() {
    const state = this._state;
    if (state.status === "idle" /* Idle */ || state.status === "buffering" /* Buffering */)
      return;
    const playable = this.playable;
    if (state.status === "autopaused" /* AutoPaused */ && playable.length > 0) {
      this.state = {
        ...state,
        status: "playing" /* Playing */,
        missedFrames: 0
      };
    }
    if (state.status === "paused" /* Paused */ || state.status === "autopaused" /* AutoPaused */) {
      if (state.silencePacketsRemaining > 0) {
        state.silencePacketsRemaining--;
        this._preparePacket(SILENCE_FRAME, playable, state);
        if (state.silencePacketsRemaining === 0) {
          this._signalStopSpeaking();
        }
      }
      return;
    }
    if (playable.length === 0) {
      if (this.behaviors.noSubscriber === "pause" /* Pause */) {
        this.state = {
          ...state,
          status: "autopaused" /* AutoPaused */,
          silencePacketsRemaining: 5
        };
        return;
      } else if (this.behaviors.noSubscriber === "stop" /* Stop */) {
        this.stop(true);
      }
    }
    const packet = state.resource.read();
    if (state.status === "playing" /* Playing */) {
      if (packet) {
        this._preparePacket(packet, playable, state);
        state.missedFrames = 0;
      } else {
        this._preparePacket(SILENCE_FRAME, playable, state);
        state.missedFrames++;
        if (state.missedFrames >= this.behaviors.maxMissedFrames) {
          this.stop();
        }
      }
    }
  }
  /**
   * Signals to all the subscribed connections that they should send a packet to Discord indicating
   * they are no longer speaking. Called once playback of a resource ends.
   */
  _signalStopSpeaking() {
    for (const { connection } of this.subscribers) {
      connection.setSpeaking(false);
    }
  }
  /**
   * Instructs the given connections to each prepare this packet to be played at the start of the
   * next cycle.
   *
   * @param packet - The Opus packet to be prepared by each receiver
   * @param receivers - The connections that should play this packet
   */
  _preparePacket(packet, receivers, state) {
    state.playbackDuration += 20;
    for (const connection of receivers) {
      connection.prepareAudioPacket(packet);
    }
  }
};
function createAudioPlayer(options) {
  return new AudioPlayer(options);
}
__name(createAudioPlayer, "createAudioPlayer");

// src/receive/AudioReceiveStream.ts
var EndBehaviorType = /* @__PURE__ */ ((EndBehaviorType2) => {
  EndBehaviorType2[EndBehaviorType2["Manual"] = 0] = "Manual";
  EndBehaviorType2[EndBehaviorType2["AfterSilence"] = 1] = "AfterSilence";
  EndBehaviorType2[EndBehaviorType2["AfterInactivity"] = 2] = "AfterInactivity";
  return EndBehaviorType2;
})(EndBehaviorType || {});
function createDefaultAudioReceiveStreamOptions() {
  return {
    end: {
      behavior: 0 /* Manual */
    }
  };
}
__name(createDefaultAudioReceiveStreamOptions, "createDefaultAudioReceiveStreamOptions");
var AudioReceiveStream = class extends import_node_stream.Readable {
  static {
    __name(this, "AudioReceiveStream");
  }
  /**
   * The end behavior of the receive stream.
   */
  end;
  endTimeout;
  constructor({ end, ...options }) {
    super({
      ...options,
      objectMode: true
    });
    this.end = end;
  }
  push(buffer) {
    if (buffer && (this.end.behavior === 2 /* AfterInactivity */ || this.end.behavior === 1 /* AfterSilence */ && (buffer.compare(SILENCE_FRAME) !== 0 || this.endTimeout === void 0))) {
      this.renewEndTimeout(this.end);
    }
    return super.push(buffer);
  }
  renewEndTimeout(end) {
    if (this.endTimeout) {
      clearTimeout(this.endTimeout);
    }
    this.endTimeout = setTimeout(() => this.push(null), end.duration);
  }
  _read() {
  }
};

// src/receive/SSRCMap.ts
var import_node_events5 = __webpack_require__(4434);
var SSRCMap = class extends import_node_events5.EventEmitter {
  static {
    __name(this, "SSRCMap");
  }
  /**
   * The underlying map.
   */
  map;
  constructor() {
    super();
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * Updates the map with new user data
   *
   * @param data - The data to update with
   */
  update(data) {
    const existing = this.map.get(data.audioSSRC);
    const newValue = {
      ...this.map.get(data.audioSSRC),
      ...data
    };
    this.map.set(data.audioSSRC, newValue);
    if (!existing)
      this.emit("create", newValue);
    this.emit("update", existing, newValue);
  }
  /**
   * Gets the stored voice data of a user.
   *
   * @param target - The target, either their user id or audio SSRC
   */
  get(target) {
    if (typeof target === "number") {
      return this.map.get(target);
    }
    for (const data of this.map.values()) {
      if (data.userId === target) {
        return data;
      }
    }
    return void 0;
  }
  /**
   * Deletes the stored voice data about a user.
   *
   * @param target - The target of the delete operation, either their audio SSRC or user id
   * @returns The data that was deleted, if any
   */
  delete(target) {
    if (typeof target === "number") {
      const existing = this.map.get(target);
      if (existing) {
        this.map.delete(target);
        this.emit("delete", existing);
      }
      return existing;
    }
    for (const [audioSSRC, data] of this.map.entries()) {
      if (data.userId === target) {
        this.map.delete(audioSSRC);
        this.emit("delete", data);
        return data;
      }
    }
    return void 0;
  }
};

// src/receive/SpeakingMap.ts
var import_node_events6 = __webpack_require__(4434);
var SpeakingMap = class _SpeakingMap extends import_node_events6.EventEmitter {
  static {
    __name(this, "SpeakingMap");
  }
  /**
   * The delay after a packet is received from a user until they're marked as not speaking anymore.
   */
  static DELAY = 100;
  /**
   * The currently speaking users, mapped to the milliseconds since UNIX epoch at which they started speaking.
   */
  users;
  speakingTimeouts;
  constructor() {
    super();
    this.users = /* @__PURE__ */ new Map();
    this.speakingTimeouts = /* @__PURE__ */ new Map();
  }
  onPacket(userId) {
    const timeout = this.speakingTimeouts.get(userId);
    if (timeout) {
      clearTimeout(timeout);
    } else {
      this.users.set(userId, Date.now());
      this.emit("start", userId);
    }
    this.startTimeout(userId);
  }
  startTimeout(userId) {
    this.speakingTimeouts.set(
      userId,
      setTimeout(() => {
        this.emit("end", userId);
        this.speakingTimeouts.delete(userId);
        this.users.delete(userId);
      }, _SpeakingMap.DELAY)
    );
  }
};

// src/receive/VoiceReceiver.ts
var VoiceReceiver = class {
  static {
    __name(this, "VoiceReceiver");
  }
  /**
   * The attached connection of this receiver.
   */
  voiceConnection;
  /**
   * Maps SSRCs to Discord user ids.
   */
  ssrcMap;
  /**
   * The current audio subscriptions of this receiver.
   */
  subscriptions;
  /**
   * The connection data of the receiver.
   *
   * @internal
   */
  connectionData;
  /**
   * The speaking map of the receiver.
   */
  speaking;
  constructor(voiceConnection) {
    this.voiceConnection = voiceConnection;
    this.ssrcMap = new SSRCMap();
    this.speaking = new SpeakingMap();
    this.subscriptions = /* @__PURE__ */ new Map();
    this.connectionData = {};
    this.onWsPacket = this.onWsPacket.bind(this);
    this.onUdpMessage = this.onUdpMessage.bind(this);
  }
  /**
   * Called when a packet is received on the attached connection's WebSocket.
   *
   * @param packet - The received packet
   * @internal
   */
  onWsPacket(packet) {
    if (packet.op === import_v43.VoiceOpcodes.ClientDisconnect && typeof packet.d?.user_id === "string") {
      this.ssrcMap.delete(packet.d.user_id);
    } else if (packet.op === import_v43.VoiceOpcodes.Speaking && typeof packet.d?.user_id === "string" && typeof packet.d?.ssrc === "number") {
      this.ssrcMap.update({ userId: packet.d.user_id, audioSSRC: packet.d.ssrc });
    } else if (packet.op === import_v43.VoiceOpcodes.ClientConnect && typeof packet.d?.user_id === "string" && typeof packet.d?.audio_ssrc === "number") {
      this.ssrcMap.update({
        userId: packet.d.user_id,
        audioSSRC: packet.d.audio_ssrc,
        videoSSRC: packet.d.video_ssrc === 0 ? void 0 : packet.d.video_ssrc
      });
    }
  }
  decrypt(buffer, mode, nonce2, secretKey) {
    let end;
    if (mode === "xsalsa20_poly1305_lite") {
      buffer.copy(nonce2, 0, buffer.length - 4);
      end = buffer.length - 4;
    } else if (mode === "xsalsa20_poly1305_suffix") {
      buffer.copy(nonce2, 0, buffer.length - 24);
      end = buffer.length - 24;
    } else {
      buffer.copy(nonce2, 0, 0, 12);
    }
    const decrypted = methods.open(buffer.slice(12, end), nonce2, secretKey);
    if (!decrypted)
      return;
    return import_node_buffer5.Buffer.from(decrypted);
  }
  /**
   * Parses an audio packet, decrypting it to yield an Opus packet.
   *
   * @param buffer - The buffer to parse
   * @param mode - The encryption mode
   * @param nonce - The nonce buffer used by the connection for encryption
   * @param secretKey - The secret key used by the connection for encryption
   * @returns The parsed Opus packet
   */
  parsePacket(buffer, mode, nonce2, secretKey) {
    let packet = this.decrypt(buffer, mode, nonce2, secretKey);
    if (!packet)
      return;
    if (packet[0] === 190 && packet[1] === 222) {
      const headerExtensionLength = packet.readUInt16BE(2);
      packet = packet.subarray(4 + 4 * headerExtensionLength);
    }
    return packet;
  }
  /**
   * Called when the UDP socket of the attached connection receives a message.
   *
   * @param msg - The received message
   * @internal
   */
  onUdpMessage(msg) {
    if (msg.length <= 8)
      return;
    const ssrc = msg.readUInt32BE(8);
    const userData = this.ssrcMap.get(ssrc);
    if (!userData)
      return;
    this.speaking.onPacket(userData.userId);
    const stream = this.subscriptions.get(userData.userId);
    if (!stream)
      return;
    if (this.connectionData.encryptionMode && this.connectionData.nonceBuffer && this.connectionData.secretKey) {
      const packet = this.parsePacket(
        msg,
        this.connectionData.encryptionMode,
        this.connectionData.nonceBuffer,
        this.connectionData.secretKey
      );
      if (packet) {
        stream.push(packet);
      } else {
        stream.destroy(new Error("Failed to parse packet"));
      }
    }
  }
  /**
   * Creates a subscription for the given user id.
   *
   * @param target - The id of the user to subscribe to
   * @returns A readable stream of Opus packets received from the target
   */
  subscribe(userId, options) {
    const existing = this.subscriptions.get(userId);
    if (existing)
      return existing;
    const stream = new AudioReceiveStream({
      ...createDefaultAudioReceiveStreamOptions(),
      ...options
    });
    stream.once("close", () => this.subscriptions.delete(userId));
    this.subscriptions.set(userId, stream);
    return stream;
  }
};

// src/VoiceConnection.ts
var VoiceConnectionStatus = /* @__PURE__ */ ((VoiceConnectionStatus2) => {
  VoiceConnectionStatus2["Connecting"] = "connecting";
  VoiceConnectionStatus2["Destroyed"] = "destroyed";
  VoiceConnectionStatus2["Disconnected"] = "disconnected";
  VoiceConnectionStatus2["Ready"] = "ready";
  VoiceConnectionStatus2["Signalling"] = "signalling";
  return VoiceConnectionStatus2;
})(VoiceConnectionStatus || {});
var VoiceConnectionDisconnectReason = /* @__PURE__ */ ((VoiceConnectionDisconnectReason2) => {
  VoiceConnectionDisconnectReason2[VoiceConnectionDisconnectReason2["WebSocketClose"] = 0] = "WebSocketClose";
  VoiceConnectionDisconnectReason2[VoiceConnectionDisconnectReason2["AdapterUnavailable"] = 1] = "AdapterUnavailable";
  VoiceConnectionDisconnectReason2[VoiceConnectionDisconnectReason2["EndpointRemoved"] = 2] = "EndpointRemoved";
  VoiceConnectionDisconnectReason2[VoiceConnectionDisconnectReason2["Manual"] = 3] = "Manual";
  return VoiceConnectionDisconnectReason2;
})(VoiceConnectionDisconnectReason || {});
var VoiceConnection = class extends import_node_events7.EventEmitter {
  static {
    __name(this, "VoiceConnection");
  }
  /**
   * The number of consecutive rejoin attempts. Initially 0, and increments for each rejoin.
   * When a connection is successfully established, it resets to 0.
   */
  rejoinAttempts;
  /**
   * The state of the voice connection.
   */
  _state;
  /**
   * A configuration storing all the data needed to reconnect to a Guild's voice server.
   *
   * @internal
   */
  joinConfig;
  /**
   * The two packets needed to successfully establish a voice connection. They are received
   * from the main Discord gateway after signalling to change the voice state.
   */
  packets;
  /**
   * The receiver of this voice connection. You should join the voice channel with `selfDeaf` set
   * to false for this feature to work properly.
   */
  receiver;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * Creates a new voice connection.
   *
   * @param joinConfig - The data required to establish the voice connection
   * @param options - The options used to create this voice connection
   */
  constructor(joinConfig, options) {
    super();
    this.debug = options.debug ? (message) => this.emit("debug", message) : null;
    this.rejoinAttempts = 0;
    this.receiver = new VoiceReceiver(this);
    this.onNetworkingClose = this.onNetworkingClose.bind(this);
    this.onNetworkingStateChange = this.onNetworkingStateChange.bind(this);
    this.onNetworkingError = this.onNetworkingError.bind(this);
    this.onNetworkingDebug = this.onNetworkingDebug.bind(this);
    const adapter = options.adapterCreator({
      onVoiceServerUpdate: (data) => this.addServerPacket(data),
      onVoiceStateUpdate: (data) => this.addStatePacket(data),
      destroy: () => this.destroy(false)
    });
    this._state = { status: "signalling" /* Signalling */, adapter };
    this.packets = {
      server: void 0,
      state: void 0
    };
    this.joinConfig = joinConfig;
  }
  /**
   * The current state of the voice connection.
   */
  get state() {
    return this._state;
  }
  /**
   * Updates the state of the voice connection, performing clean-up operations where necessary.
   */
  set state(newState) {
    const oldState = this._state;
    const oldNetworking = Reflect.get(oldState, "networking");
    const newNetworking = Reflect.get(newState, "networking");
    const oldSubscription = Reflect.get(oldState, "subscription");
    const newSubscription = Reflect.get(newState, "subscription");
    if (oldNetworking !== newNetworking) {
      if (oldNetworking) {
        oldNetworking.on("error", noop);
        oldNetworking.off("debug", this.onNetworkingDebug);
        oldNetworking.off("error", this.onNetworkingError);
        oldNetworking.off("close", this.onNetworkingClose);
        oldNetworking.off("stateChange", this.onNetworkingStateChange);
        oldNetworking.destroy();
      }
      if (newNetworking)
        this.updateReceiveBindings(newNetworking.state, oldNetworking?.state);
    }
    if (newState.status === "ready" /* Ready */) {
      this.rejoinAttempts = 0;
    } else if (newState.status === "destroyed" /* Destroyed */) {
      for (const stream of this.receiver.subscriptions.values()) {
        if (!stream.destroyed)
          stream.destroy();
      }
    }
    if (oldState.status !== "destroyed" /* Destroyed */ && newState.status === "destroyed" /* Destroyed */) {
      oldState.adapter.destroy();
    }
    this._state = newState;
    if (oldSubscription && oldSubscription !== newSubscription) {
      oldSubscription.unsubscribe();
    }
    this.emit("stateChange", oldState, newState);
    if (oldState.status !== newState.status) {
      this.emit(newState.status, oldState, newState);
    }
  }
  /**
   * Registers a `VOICE_SERVER_UPDATE` packet to the voice connection. This will cause it to reconnect using the
   * new data provided in the packet.
   *
   * @param packet - The received `VOICE_SERVER_UPDATE` packet
   */
  addServerPacket(packet) {
    this.packets.server = packet;
    if (packet.endpoint) {
      this.configureNetworking();
    } else if (this.state.status !== "destroyed" /* Destroyed */) {
      this.state = {
        ...this.state,
        status: "disconnected" /* Disconnected */,
        reason: 2 /* EndpointRemoved */
      };
    }
  }
  /**
   * Registers a `VOICE_STATE_UPDATE` packet to the voice connection. Most importantly, it stores the id of the
   * channel that the client is connected to.
   *
   * @param packet - The received `VOICE_STATE_UPDATE` packet
   */
  addStatePacket(packet) {
    this.packets.state = packet;
    if (packet.self_deaf !== void 0)
      this.joinConfig.selfDeaf = packet.self_deaf;
    if (packet.self_mute !== void 0)
      this.joinConfig.selfMute = packet.self_mute;
    if (packet.channel_id)
      this.joinConfig.channelId = packet.channel_id;
  }
  /**
   * Called when the networking state changes, and the new ws/udp packet/message handlers need to be rebound
   * to the new instances.
   *
   * @param newState - The new networking state
   * @param oldState - The old networking state, if there is one
   */
  updateReceiveBindings(newState, oldState) {
    const oldWs = Reflect.get(oldState ?? {}, "ws");
    const newWs = Reflect.get(newState, "ws");
    const oldUdp = Reflect.get(oldState ?? {}, "udp");
    const newUdp = Reflect.get(newState, "udp");
    if (oldWs !== newWs) {
      oldWs?.off("packet", this.receiver.onWsPacket);
      newWs?.on("packet", this.receiver.onWsPacket);
    }
    if (oldUdp !== newUdp) {
      oldUdp?.off("message", this.receiver.onUdpMessage);
      newUdp?.on("message", this.receiver.onUdpMessage);
    }
    this.receiver.connectionData = Reflect.get(newState, "connectionData") ?? {};
  }
  /**
   * Attempts to configure a networking instance for this voice connection using the received packets.
   * Both packets are required, and any existing networking instance will be destroyed.
   *
   * @remarks
   * This is called when the voice server of the connection changes, e.g. if the bot is moved into a
   * different channel in the same guild but has a different voice server. In this instance, the connection
   * needs to be re-established to the new voice server.
   *
   * The connection will transition to the Connecting state when this is called.
   */
  configureNetworking() {
    const { server, state } = this.packets;
    if (!server || !state || this.state.status === "destroyed" /* Destroyed */ || !server.endpoint)
      return;
    const networking = new Networking(
      {
        endpoint: server.endpoint,
        serverId: server.guild_id,
        token: server.token,
        sessionId: state.session_id,
        userId: state.user_id
      },
      Boolean(this.debug)
    );
    networking.once("close", this.onNetworkingClose);
    networking.on("stateChange", this.onNetworkingStateChange);
    networking.on("error", this.onNetworkingError);
    networking.on("debug", this.onNetworkingDebug);
    this.state = {
      ...this.state,
      status: "connecting" /* Connecting */,
      networking
    };
  }
  /**
   * Called when the networking instance for this connection closes. If the close code is 4014 (do not reconnect),
   * the voice connection will transition to the Disconnected state which will store the close code. You can
   * decide whether or not to reconnect when this occurs by listening for the state change and calling reconnect().
   *
   * @remarks
   * If the close code was anything other than 4014, it is likely that the closing was not intended, and so the
   * VoiceConnection will signal to Discord that it would like to rejoin the channel. This automatically attempts
   * to re-establish the connection. This would be seen as a transition from the Ready state to the Signalling state.
   * @param code - The close code
   */
  onNetworkingClose(code) {
    if (this.state.status === "destroyed" /* Destroyed */)
      return;
    if (code === 4014) {
      this.state = {
        ...this.state,
        status: "disconnected" /* Disconnected */,
        reason: 0 /* WebSocketClose */,
        closeCode: code
      };
    } else {
      this.state = {
        ...this.state,
        status: "signalling" /* Signalling */
      };
      this.rejoinAttempts++;
      if (!this.state.adapter.sendPayload(createJoinVoiceChannelPayload(this.joinConfig))) {
        this.state = {
          ...this.state,
          status: "disconnected" /* Disconnected */,
          reason: 1 /* AdapterUnavailable */
        };
      }
    }
  }
  /**
   * Called when the state of the networking instance changes. This is used to derive the state of the voice connection.
   *
   * @param oldState - The previous state
   * @param newState - The new state
   */
  onNetworkingStateChange(oldState, newState) {
    this.updateReceiveBindings(newState, oldState);
    if (oldState.code === newState.code)
      return;
    if (this.state.status !== "connecting" /* Connecting */ && this.state.status !== "ready" /* Ready */)
      return;
    if (newState.code === 4 /* Ready */) {
      this.state = {
        ...this.state,
        status: "ready" /* Ready */
      };
    } else if (newState.code !== 6 /* Closed */) {
      this.state = {
        ...this.state,
        status: "connecting" /* Connecting */
      };
    }
  }
  /**
   * Propagates errors from the underlying network instance.
   *
   * @param error - The error to propagate
   */
  onNetworkingError(error) {
    this.emit("error", error);
  }
  /**
   * Propagates debug messages from the underlying network instance.
   *
   * @param message - The debug message to propagate
   */
  onNetworkingDebug(message) {
    this.debug?.(`[NW] ${message}`);
  }
  /**
   * Prepares an audio packet for dispatch.
   *
   * @param buffer - The Opus packet to prepare
   */
  prepareAudioPacket(buffer) {
    const state = this.state;
    if (state.status !== "ready" /* Ready */)
      return;
    return state.networking.prepareAudioPacket(buffer);
  }
  /**
   * Dispatches the previously prepared audio packet (if any)
   */
  dispatchAudio() {
    const state = this.state;
    if (state.status !== "ready" /* Ready */)
      return;
    return state.networking.dispatchAudio();
  }
  /**
   * Prepares an audio packet and dispatches it immediately.
   *
   * @param buffer - The Opus packet to play
   */
  playOpusPacket(buffer) {
    const state = this.state;
    if (state.status !== "ready" /* Ready */)
      return;
    state.networking.prepareAudioPacket(buffer);
    return state.networking.dispatchAudio();
  }
  /**
   * Destroys the VoiceConnection, preventing it from connecting to voice again.
   * This method should be called when you no longer require the VoiceConnection to
   * prevent memory leaks.
   *
   * @param adapterAvailable - Whether the adapter can be used
   */
  destroy(adapterAvailable = true) {
    if (this.state.status === "destroyed" /* Destroyed */) {
      throw new Error("Cannot destroy VoiceConnection - it has already been destroyed");
    }
    if (getVoiceConnection(this.joinConfig.guildId, this.joinConfig.group) === this) {
      untrackVoiceConnection(this);
    }
    if (adapterAvailable) {
      this.state.adapter.sendPayload(createJoinVoiceChannelPayload({ ...this.joinConfig, channelId: null }));
    }
    this.state = {
      status: "destroyed" /* Destroyed */
    };
  }
  /**
   * Disconnects the VoiceConnection, allowing the possibility of rejoining later on.
   *
   * @returns `true` if the connection was successfully disconnected
   */
  disconnect() {
    if (this.state.status === "destroyed" /* Destroyed */ || this.state.status === "signalling" /* Signalling */) {
      return false;
    }
    this.joinConfig.channelId = null;
    if (!this.state.adapter.sendPayload(createJoinVoiceChannelPayload(this.joinConfig))) {
      this.state = {
        adapter: this.state.adapter,
        subscription: this.state.subscription,
        status: "disconnected" /* Disconnected */,
        reason: 1 /* AdapterUnavailable */
      };
      return false;
    }
    this.state = {
      adapter: this.state.adapter,
      reason: 3 /* Manual */,
      status: "disconnected" /* Disconnected */
    };
    return true;
  }
  /**
   * Attempts to rejoin (better explanation soon:tm:)
   *
   * @remarks
   * Calling this method successfully will automatically increment the `rejoinAttempts` counter,
   * which you can use to inform whether or not you'd like to keep attempting to reconnect your
   * voice connection.
   *
   * A state transition from Disconnected to Signalling will be observed when this is called.
   */
  rejoin(joinConfig) {
    if (this.state.status === "destroyed" /* Destroyed */) {
      return false;
    }
    const notReady = this.state.status !== "ready" /* Ready */;
    if (notReady)
      this.rejoinAttempts++;
    Object.assign(this.joinConfig, joinConfig);
    if (this.state.adapter.sendPayload(createJoinVoiceChannelPayload(this.joinConfig))) {
      if (notReady) {
        this.state = {
          ...this.state,
          status: "signalling" /* Signalling */
        };
      }
      return true;
    }
    this.state = {
      adapter: this.state.adapter,
      subscription: this.state.subscription,
      status: "disconnected" /* Disconnected */,
      reason: 1 /* AdapterUnavailable */
    };
    return false;
  }
  /**
   * Updates the speaking status of the voice connection. This is used when audio players are done playing audio,
   * and need to signal that the connection is no longer playing audio.
   *
   * @param enabled - Whether or not to show as speaking
   */
  setSpeaking(enabled) {
    if (this.state.status !== "ready" /* Ready */)
      return false;
    return this.state.networking.setSpeaking(enabled);
  }
  /**
   * Subscribes to an audio player, allowing the player to play audio on this voice connection.
   *
   * @param player - The audio player to subscribe to
   * @returns The created subscription
   */
  subscribe(player) {
    if (this.state.status === "destroyed" /* Destroyed */)
      return;
    const subscription = player["subscribe"](this);
    this.state = {
      ...this.state,
      subscription
    };
    return subscription;
  }
  /**
   * The latest ping (in milliseconds) for the WebSocket connection and audio playback for this voice
   * connection, if this data is available.
   *
   * @remarks
   * For this data to be available, the VoiceConnection must be in the Ready state, and its underlying
   * WebSocket connection and UDP socket must have had at least one ping-pong exchange.
   */
  get ping() {
    if (this.state.status === "ready" /* Ready */ && this.state.networking.state.code === 4 /* Ready */) {
      return {
        ws: this.state.networking.state.ws.ping,
        udp: this.state.networking.state.udp.ping
      };
    }
    return {
      ws: void 0,
      udp: void 0
    };
  }
  /**
   * Called when a subscription of this voice connection to an audio player is removed.
   *
   * @param subscription - The removed subscription
   */
  onSubscriptionRemoved(subscription) {
    if (this.state.status !== "destroyed" /* Destroyed */ && this.state.subscription === subscription) {
      this.state = {
        ...this.state,
        subscription: void 0
      };
    }
  }
};
function createVoiceConnection(joinConfig, options) {
  const payload = createJoinVoiceChannelPayload(joinConfig);
  const existing = getVoiceConnection(joinConfig.guildId, joinConfig.group);
  if (existing && existing.state.status !== "destroyed" /* Destroyed */) {
    if (existing.state.status === "disconnected" /* Disconnected */) {
      existing.rejoin({
        channelId: joinConfig.channelId,
        selfDeaf: joinConfig.selfDeaf,
        selfMute: joinConfig.selfMute
      });
    } else if (!existing.state.adapter.sendPayload(payload)) {
      existing.state = {
        ...existing.state,
        status: "disconnected" /* Disconnected */,
        reason: 1 /* AdapterUnavailable */
      };
    }
    return existing;
  }
  const voiceConnection = new VoiceConnection(joinConfig, options);
  trackVoiceConnection(voiceConnection);
  if (voiceConnection.state.status !== "destroyed" /* Destroyed */ && !voiceConnection.state.adapter.sendPayload(payload)) {
    voiceConnection.state = {
      ...voiceConnection.state,
      status: "disconnected" /* Disconnected */,
      reason: 1 /* AdapterUnavailable */
    };
  }
  return voiceConnection;
}
__name(createVoiceConnection, "createVoiceConnection");

// src/joinVoiceChannel.ts
function joinVoiceChannel(options) {
  const joinConfig = {
    selfDeaf: true,
    selfMute: false,
    group: "default",
    ...options
  };
  return createVoiceConnection(joinConfig, {
    adapterCreator: options.adapterCreator,
    debug: options.debug
  });
}
__name(joinVoiceChannel, "joinVoiceChannel");

// src/audio/AudioResource.ts
var import_node_stream2 = __webpack_require__(2203);
var import_prism_media2 = __toESM(__webpack_require__(2122));

// src/audio/TransformerGraph.ts
var import_prism_media = __toESM(__webpack_require__(2122));
var FFMPEG_PCM_ARGUMENTS = ["-analyzeduration", "0", "-loglevel", "0", "-f", "s16le", "-ar", "48000", "-ac", "2"];
var FFMPEG_OPUS_ARGUMENTS = [
  "-analyzeduration",
  "0",
  "-loglevel",
  "0",
  "-acodec",
  "libopus",
  "-f",
  "opus",
  "-ar",
  "48000",
  "-ac",
  "2"
];
var StreamType = /* @__PURE__ */ ((StreamType2) => {
  StreamType2["Arbitrary"] = "arbitrary";
  StreamType2["OggOpus"] = "ogg/opus";
  StreamType2["Opus"] = "opus";
  StreamType2["Raw"] = "raw";
  StreamType2["WebmOpus"] = "webm/opus";
  return StreamType2;
})(StreamType || {});
var Node = class {
  static {
    __name(this, "Node");
  }
  /**
   * The outbound edges from this node.
   */
  edges = [];
  /**
   * The type of stream for this node.
   */
  type;
  constructor(type) {
    this.type = type;
  }
  /**
   * Creates an outbound edge from this node.
   *
   * @param edge - The edge to create
   */
  addEdge(edge) {
    this.edges.push({ ...edge, from: this });
  }
};
var NODES = null;
function getNode(type) {
  const node = (NODES ??= initializeNodes()).get(type);
  if (!node)
    throw new Error(`Node type '${type}' does not exist!`);
  return node;
}
__name(getNode, "getNode");
function canEnableFFmpegOptimizations() {
  try {
    return import_prism_media.default.FFmpeg.getInfo().output.includes("--enable-libopus");
  } catch {
  }
  return false;
}
__name(canEnableFFmpegOptimizations, "canEnableFFmpegOptimizations");
function initializeNodes() {
  const nodes = /* @__PURE__ */ new Map();
  for (const streamType of Object.values(StreamType)) {
    nodes.set(streamType, new Node(streamType));
  }
  nodes.get("raw" /* Raw */).addEdge({
    type: "opus encoder" /* OpusEncoder */,
    to: nodes.get("opus" /* Opus */),
    cost: 1.5,
    transformer: () => new import_prism_media.default.opus.Encoder({ rate: 48e3, channels: 2, frameSize: 960 })
  });
  nodes.get("opus" /* Opus */).addEdge({
    type: "opus decoder" /* OpusDecoder */,
    to: nodes.get("raw" /* Raw */),
    cost: 1.5,
    transformer: () => new import_prism_media.default.opus.Decoder({ rate: 48e3, channels: 2, frameSize: 960 })
  });
  nodes.get("ogg/opus" /* OggOpus */).addEdge({
    type: "ogg/opus demuxer" /* OggOpusDemuxer */,
    to: nodes.get("opus" /* Opus */),
    cost: 1,
    transformer: () => new import_prism_media.default.opus.OggDemuxer()
  });
  nodes.get("webm/opus" /* WebmOpus */).addEdge({
    type: "webm/opus demuxer" /* WebmOpusDemuxer */,
    to: nodes.get("opus" /* Opus */),
    cost: 1,
    transformer: () => new import_prism_media.default.opus.WebmDemuxer()
  });
  const FFMPEG_PCM_EDGE = {
    type: "ffmpeg pcm" /* FFmpegPCM */,
    to: nodes.get("raw" /* Raw */),
    cost: 2,
    transformer: (input) => new import_prism_media.default.FFmpeg({
      args: ["-i", typeof input === "string" ? input : "-", ...FFMPEG_PCM_ARGUMENTS]
    })
  };
  nodes.get("arbitrary" /* Arbitrary */).addEdge(FFMPEG_PCM_EDGE);
  nodes.get("ogg/opus" /* OggOpus */).addEdge(FFMPEG_PCM_EDGE);
  nodes.get("webm/opus" /* WebmOpus */).addEdge(FFMPEG_PCM_EDGE);
  nodes.get("raw" /* Raw */).addEdge({
    type: "volume transformer" /* InlineVolume */,
    to: nodes.get("raw" /* Raw */),
    cost: 0.5,
    transformer: () => new import_prism_media.default.VolumeTransformer({ type: "s16le" })
  });
  if (canEnableFFmpegOptimizations()) {
    const FFMPEG_OGG_EDGE = {
      type: "ffmpeg ogg" /* FFmpegOgg */,
      to: nodes.get("ogg/opus" /* OggOpus */),
      cost: 2,
      transformer: (input) => new import_prism_media.default.FFmpeg({
        args: ["-i", typeof input === "string" ? input : "-", ...FFMPEG_OPUS_ARGUMENTS]
      })
    };
    nodes.get("arbitrary" /* Arbitrary */).addEdge(FFMPEG_OGG_EDGE);
    nodes.get("ogg/opus" /* OggOpus */).addEdge(FFMPEG_OGG_EDGE);
    nodes.get("webm/opus" /* WebmOpus */).addEdge(FFMPEG_OGG_EDGE);
  }
  return nodes;
}
__name(initializeNodes, "initializeNodes");
function findPath(from, constraints, goal = getNode("opus" /* Opus */), path = [], depth = 5) {
  if (from === goal && constraints(path)) {
    return { cost: 0 };
  } else if (depth === 0) {
    return { cost: Number.POSITIVE_INFINITY };
  }
  let currentBest;
  for (const edge of from.edges) {
    if (currentBest && edge.cost > currentBest.cost)
      continue;
    const next = findPath(edge.to, constraints, goal, [...path, edge], depth - 1);
    const cost = edge.cost + next.cost;
    if (!currentBest || cost < currentBest.cost) {
      currentBest = { cost, edge, next };
    }
  }
  return currentBest ?? { cost: Number.POSITIVE_INFINITY };
}
__name(findPath, "findPath");
function constructPipeline(step) {
  const edges = [];
  let current = step;
  while (current?.edge) {
    edges.push(current.edge);
    current = current.next;
  }
  return edges;
}
__name(constructPipeline, "constructPipeline");
function findPipeline(from, constraint) {
  return constructPipeline(findPath(getNode(from), constraint));
}
__name(findPipeline, "findPipeline");

// src/audio/AudioResource.ts
var AudioResource = class {
  static {
    __name(this, "AudioResource");
  }
  /**
   * An object-mode Readable stream that emits Opus packets. This is what is played by audio players.
   */
  playStream;
  /**
   * The pipeline used to convert the input stream into a playable format. For example, this may
   * contain an FFmpeg component for arbitrary inputs, and it may contain a VolumeTransformer component
   * for resources with inline volume transformation enabled.
   */
  edges;
  /**
   * Optional metadata that can be used to identify the resource.
   */
  metadata;
  /**
   * If the resource was created with inline volume transformation enabled, then this will be a
   * prism-media VolumeTransformer. You can use this to alter the volume of the stream.
   */
  volume;
  /**
   * If using an Opus encoder to create this audio resource, then this will be a prism-media opus.Encoder.
   * You can use this to control settings such as bitrate, FEC, PLP.
   */
  encoder;
  /**
   * The audio player that the resource is subscribed to, if any.
   */
  audioPlayer;
  /**
   * The playback duration of this audio resource, given in milliseconds.
   */
  playbackDuration = 0;
  /**
   * Whether or not the stream for this resource has started (data has become readable)
   */
  started = false;
  /**
   * The number of silence frames to append to the end of the resource's audio stream, to prevent interpolation glitches.
   */
  silencePaddingFrames;
  /**
   * The number of remaining silence frames to play. If -1, the frames have not yet started playing.
   */
  silenceRemaining = -1;
  constructor(edges, streams, metadata, silencePaddingFrames) {
    this.edges = edges;
    this.playStream = streams.length > 1 ? (0, import_node_stream2.pipeline)(streams, noop) : streams[0];
    this.metadata = metadata;
    this.silencePaddingFrames = silencePaddingFrames;
    for (const stream of streams) {
      if (stream instanceof import_prism_media2.default.VolumeTransformer) {
        this.volume = stream;
      } else if (stream instanceof import_prism_media2.default.opus.Encoder) {
        this.encoder = stream;
      }
    }
    this.playStream.once("readable", () => this.started = true);
  }
  /**
   * Whether this resource is readable. If the underlying resource is no longer readable, this will still return true
   * while there are silence padding frames left to play.
   */
  get readable() {
    if (this.silenceRemaining === 0)
      return false;
    const real = this.playStream.readable;
    if (!real) {
      if (this.silenceRemaining === -1)
        this.silenceRemaining = this.silencePaddingFrames;
      return this.silenceRemaining !== 0;
    }
    return real;
  }
  /**
   * Whether this resource has ended or not.
   */
  get ended() {
    return this.playStream.readableEnded || this.playStream.destroyed || this.silenceRemaining === 0;
  }
  /**
   * Attempts to read an Opus packet from the audio resource. If a packet is available, the playbackDuration
   * is incremented.
   *
   * @remarks
   * It is advisable to check that the playStream is readable before calling this method. While no runtime
   * errors will be thrown, you should check that the resource is still available before attempting to
   * read from it.
   * @internal
   */
  read() {
    if (this.silenceRemaining === 0) {
      return null;
    } else if (this.silenceRemaining > 0) {
      this.silenceRemaining--;
      return SILENCE_FRAME;
    }
    const packet = this.playStream.read();
    if (packet) {
      this.playbackDuration += 20;
    }
    return packet;
  }
};
var VOLUME_CONSTRAINT = /* @__PURE__ */ __name((path) => path.some((edge) => edge.type === "volume transformer" /* InlineVolume */), "VOLUME_CONSTRAINT");
var NO_CONSTRAINT = /* @__PURE__ */ __name(() => true, "NO_CONSTRAINT");
function inferStreamType(stream) {
  if (stream instanceof import_prism_media2.default.opus.Encoder) {
    return { streamType: "opus" /* Opus */, hasVolume: false };
  } else if (stream instanceof import_prism_media2.default.opus.Decoder) {
    return { streamType: "raw" /* Raw */, hasVolume: false };
  } else if (stream instanceof import_prism_media2.default.VolumeTransformer) {
    return { streamType: "raw" /* Raw */, hasVolume: true };
  } else if (stream instanceof import_prism_media2.default.opus.OggDemuxer) {
    return { streamType: "opus" /* Opus */, hasVolume: false };
  } else if (stream instanceof import_prism_media2.default.opus.WebmDemuxer) {
    return { streamType: "opus" /* Opus */, hasVolume: false };
  }
  return { streamType: "arbitrary" /* Arbitrary */, hasVolume: false };
}
__name(inferStreamType, "inferStreamType");
function createAudioResource(input, options = {}) {
  let inputType = options.inputType;
  let needsInlineVolume = Boolean(options.inlineVolume);
  if (typeof input === "string") {
    inputType = "arbitrary" /* Arbitrary */;
  } else if (inputType === void 0) {
    const analysis = inferStreamType(input);
    inputType = analysis.streamType;
    needsInlineVolume = needsInlineVolume && !analysis.hasVolume;
  }
  const transformerPipeline = findPipeline(inputType, needsInlineVolume ? VOLUME_CONSTRAINT : NO_CONSTRAINT);
  if (transformerPipeline.length === 0) {
    if (typeof input === "string")
      throw new Error(`Invalid pipeline constructed for string resource '${input}'`);
    return new AudioResource(
      [],
      [input],
      options.metadata ?? null,
      options.silencePaddingFrames ?? 5
    );
  }
  const streams = transformerPipeline.map((edge) => edge.transformer(input));
  if (typeof input !== "string")
    streams.unshift(input);
  return new AudioResource(
    transformerPipeline,
    streams,
    options.metadata ?? null,
    options.silencePaddingFrames ?? 5
  );
}
__name(createAudioResource, "createAudioResource");

// src/util/generateDependencyReport.ts
var import_node_path = __webpack_require__(6928);
var import_prism_media3 = __toESM(__webpack_require__(2122));
function findPackageJSON(dir, packageName, depth) {
  if (depth === 0)
    return void 0;
  const attemptedPath = (0, import_node_path.resolve)(dir, "./package.json");
  try {
    const pkg = __webpack_require__(8868)(attemptedPath);
    if (pkg.name !== packageName)
      throw new Error("package.json does not match");
    return pkg;
  } catch {
    return findPackageJSON((0, import_node_path.resolve)(dir, ".."), packageName, depth - 1);
  }
}
__name(findPackageJSON, "findPackageJSON");
function version(name) {
  try {
    if (name === "@discordjs/voice") {
      return "0.17.0";
    }
    const pkg = findPackageJSON((0, import_node_path.dirname)(/*require.resolve*/(__webpack_require__(8868).resolve(name))), name, 3);
    return pkg?.version ?? "not found";
  } catch {
    return "not found";
  }
}
__name(version, "version");
function generateDependencyReport() {
  const report = [];
  const addVersion = /* @__PURE__ */ __name((name) => report.push(`- ${name}: ${version(name)}`), "addVersion");
  report.push("Core Dependencies");
  addVersion("@discordjs/voice");
  addVersion("prism-media");
  report.push("");
  report.push("Opus Libraries");
  addVersion("@discordjs/opus");
  addVersion("opusscript");
  report.push("");
  report.push("Encryption Libraries");
  addVersion("sodium-native");
  addVersion("sodium");
  addVersion("libsodium-wrappers");
  addVersion("tweetnacl");
  report.push("");
  report.push("FFmpeg");
  try {
    const info = import_prism_media3.default.FFmpeg.getInfo();
    report.push(`- version: ${info.version}`);
    report.push(`- libopus: ${info.output.includes("--enable-libopus") ? "yes" : "no"}`);
  } catch {
    report.push("- not found");
  }
  return ["-".repeat(50), ...report, "-".repeat(50)].join("\n");
}
__name(generateDependencyReport, "generateDependencyReport");

// src/util/entersState.ts
var import_node_events8 = __webpack_require__(4434);

// src/util/abortAfter.ts
function abortAfter(delay) {
  const ac = new AbortController();
  const timeout = setTimeout(() => ac.abort(), delay);
  ac.signal.addEventListener("abort", () => clearTimeout(timeout));
  return [ac, ac.signal];
}
__name(abortAfter, "abortAfter");

// src/util/entersState.ts
async function entersState(target, status, timeoutOrSignal) {
  if (target.state.status !== status) {
    const [ac, signal] = typeof timeoutOrSignal === "number" ? abortAfter(timeoutOrSignal) : [void 0, timeoutOrSignal];
    try {
      await (0, import_node_events8.once)(target, status, { signal });
    } finally {
      ac?.abort();
    }
  }
  return target;
}
__name(entersState, "entersState");

// src/util/demuxProbe.ts
var import_node_buffer6 = __webpack_require__(181);
var import_node_process = __toESM(__webpack_require__(932));
var import_node_stream3 = __webpack_require__(2203);
var import_prism_media4 = __toESM(__webpack_require__(2122));
function validateDiscordOpusHead(opusHead) {
  const channels = opusHead.readUInt8(9);
  const sampleRate = opusHead.readUInt32LE(12);
  return channels === 2 && sampleRate === 48e3;
}
__name(validateDiscordOpusHead, "validateDiscordOpusHead");
async function demuxProbe(stream, probeSize = 1024, validator = validateDiscordOpusHead) {
  return new Promise((resolve2, reject) => {
    if (stream.readableObjectMode) {
      reject(new Error("Cannot probe a readable stream in object mode"));
      return;
    }
    if (stream.readableEnded) {
      reject(new Error("Cannot probe a stream that has ended"));
      return;
    }
    let readBuffer = import_node_buffer6.Buffer.alloc(0);
    let resolved;
    const finish = /* @__PURE__ */ __name((type) => {
      stream.off("data", onData);
      stream.off("close", onClose);
      stream.off("end", onClose);
      stream.pause();
      resolved = type;
      if (stream.readableEnded) {
        resolve2({
          stream: import_node_stream3.Readable.from(readBuffer),
          type
        });
      } else {
        if (readBuffer.length > 0) {
          stream.push(readBuffer);
        }
        resolve2({
          stream,
          type
        });
      }
    }, "finish");
    const foundHead = /* @__PURE__ */ __name((type) => (head) => {
      if (validator(head)) {
        finish(type);
      }
    }, "foundHead");
    const webm = new import_prism_media4.default.opus.WebmDemuxer();
    webm.once("error", noop);
    webm.on("head", foundHead("webm/opus" /* WebmOpus */));
    const ogg = new import_prism_media4.default.opus.OggDemuxer();
    ogg.once("error", noop);
    ogg.on("head", foundHead("ogg/opus" /* OggOpus */));
    const onClose = /* @__PURE__ */ __name(() => {
      if (!resolved) {
        finish("arbitrary" /* Arbitrary */);
      }
    }, "onClose");
    const onData = /* @__PURE__ */ __name((buffer) => {
      readBuffer = import_node_buffer6.Buffer.concat([readBuffer, buffer]);
      webm.write(buffer);
      ogg.write(buffer);
      if (readBuffer.length >= probeSize) {
        stream.off("data", onData);
        stream.pause();
        import_node_process.default.nextTick(onClose);
      }
    }, "onData");
    stream.once("error", reject);
    stream.on("data", onData);
    stream.once("close", onClose);
    stream.once("end", onClose);
  });
}
__name(demuxProbe, "demuxProbe");

// src/index.ts
var version2 = "0.17.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9414:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 8388:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * Types extracted from https://discord.com/developers/docs/topics/gateway
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayDispatchEvents = exports.GatewayIntentBits = exports.GatewayCloseCodes = exports.GatewayOpcodes = exports.GatewayVersion = void 0;
__exportStar(__webpack_require__(9414), exports);
exports.GatewayVersion = '10';
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
 */
var GatewayOpcodes;
(function (GatewayOpcodes) {
    /**
     * An event was dispatched
     */
    GatewayOpcodes[GatewayOpcodes["Dispatch"] = 0] = "Dispatch";
    /**
     * A bidirectional opcode to maintain an active gateway connection.
     * Fired periodically by the client, or fired by the gateway to request an immediate heartbeat from the client.
     */
    GatewayOpcodes[GatewayOpcodes["Heartbeat"] = 1] = "Heartbeat";
    /**
     * Starts a new session during the initial handshake
     */
    GatewayOpcodes[GatewayOpcodes["Identify"] = 2] = "Identify";
    /**
     * Update the client's presence
     */
    GatewayOpcodes[GatewayOpcodes["PresenceUpdate"] = 3] = "PresenceUpdate";
    /**
     * Used to join/leave or move between voice channels
     */
    GatewayOpcodes[GatewayOpcodes["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
    /**
     * Resume a previous session that was disconnected
     */
    GatewayOpcodes[GatewayOpcodes["Resume"] = 6] = "Resume";
    /**
     * You should attempt to reconnect and resume immediately
     */
    GatewayOpcodes[GatewayOpcodes["Reconnect"] = 7] = "Reconnect";
    /**
     * Request information about offline guild members in a large guild
     */
    GatewayOpcodes[GatewayOpcodes["RequestGuildMembers"] = 8] = "RequestGuildMembers";
    /**
     * The session has been invalidated. You should reconnect and identify/resume accordingly
     */
    GatewayOpcodes[GatewayOpcodes["InvalidSession"] = 9] = "InvalidSession";
    /**
     * Sent immediately after connecting, contains the `heartbeat_interval` to use
     */
    GatewayOpcodes[GatewayOpcodes["Hello"] = 10] = "Hello";
    /**
     * Sent in response to receiving a heartbeat to acknowledge that it has been received
     */
    GatewayOpcodes[GatewayOpcodes["HeartbeatAck"] = 11] = "HeartbeatAck";
})(GatewayOpcodes || (exports.GatewayOpcodes = GatewayOpcodes = {}));
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
 */
var GatewayCloseCodes;
(function (GatewayCloseCodes) {
    /**
     * We're not sure what went wrong. Try reconnecting?
     */
    GatewayCloseCodes[GatewayCloseCodes["UnknownError"] = 4000] = "UnknownError";
    /**
     * You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!
     *
     * See https://discord.com/developers/docs/topics/gateway-events#payload-structure
     */
    GatewayCloseCodes[GatewayCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
    /**
     * You sent an invalid payload to us. Don't do that!
     *
     * See https://discord.com/developers/docs/topics/gateway#sending-events
     */
    GatewayCloseCodes[GatewayCloseCodes["DecodeError"] = 4002] = "DecodeError";
    /**
     * You sent us a payload prior to identifying
     *
     * See https://discord.com/developers/docs/topics/gateway-events#identify
     */
    GatewayCloseCodes[GatewayCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
    /**
     * The account token sent with your identify payload is incorrect
     *
     * See https://discord.com/developers/docs/topics/gateway-events#identify
     */
    GatewayCloseCodes[GatewayCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
    /**
     * You sent more than one identify payload. Don't do that!
     */
    GatewayCloseCodes[GatewayCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
    /**
     * The sequence sent when resuming the session was invalid. Reconnect and start a new session
     *
     * See https://discord.com/developers/docs/topics/gateway-events#resume
     */
    GatewayCloseCodes[GatewayCloseCodes["InvalidSeq"] = 4007] = "InvalidSeq";
    /**
     * Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this
     */
    GatewayCloseCodes[GatewayCloseCodes["RateLimited"] = 4008] = "RateLimited";
    /**
     * Your session timed out. Reconnect and start a new one
     */
    GatewayCloseCodes[GatewayCloseCodes["SessionTimedOut"] = 4009] = "SessionTimedOut";
    /**
     * You sent us an invalid shard when identifying
     *
     * See https://discord.com/developers/docs/topics/gateway#sharding
     */
    GatewayCloseCodes[GatewayCloseCodes["InvalidShard"] = 4010] = "InvalidShard";
    /**
     * The session would have handled too many guilds - you are required to shard your connection in order to connect
     *
     * See https://discord.com/developers/docs/topics/gateway#sharding
     */
    GatewayCloseCodes[GatewayCloseCodes["ShardingRequired"] = 4011] = "ShardingRequired";
    /**
     * You sent an invalid version for the gateway
     */
    GatewayCloseCodes[GatewayCloseCodes["InvalidAPIVersion"] = 4012] = "InvalidAPIVersion";
    /**
     * You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value
     *
     * See https://discord.com/developers/docs/topics/gateway#gateway-intents
     */
    GatewayCloseCodes[GatewayCloseCodes["InvalidIntents"] = 4013] = "InvalidIntents";
    /**
     * You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not
     * enabled or are not whitelisted for
     *
     * See https://discord.com/developers/docs/topics/gateway#gateway-intents
     *
     * See https://discord.com/developers/docs/topics/gateway#privileged-intents
     */
    GatewayCloseCodes[GatewayCloseCodes["DisallowedIntents"] = 4014] = "DisallowedIntents";
})(GatewayCloseCodes || (exports.GatewayCloseCodes = GatewayCloseCodes = {}));
/**
 * https://discord.com/developers/docs/topics/gateway#list-of-intents
 */
var GatewayIntentBits;
(function (GatewayIntentBits) {
    GatewayIntentBits[GatewayIntentBits["Guilds"] = 1] = "Guilds";
    GatewayIntentBits[GatewayIntentBits["GuildMembers"] = 2] = "GuildMembers";
    GatewayIntentBits[GatewayIntentBits["GuildModeration"] = 4] = "GuildModeration";
    /**
     * @deprecated This is the old name for {@apilink GatewayIntentBits#GuildModeration}
     */
    GatewayIntentBits[GatewayIntentBits["GuildBans"] = 4] = "GuildBans";
    GatewayIntentBits[GatewayIntentBits["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
    GatewayIntentBits[GatewayIntentBits["GuildIntegrations"] = 16] = "GuildIntegrations";
    GatewayIntentBits[GatewayIntentBits["GuildWebhooks"] = 32] = "GuildWebhooks";
    GatewayIntentBits[GatewayIntentBits["GuildInvites"] = 64] = "GuildInvites";
    GatewayIntentBits[GatewayIntentBits["GuildVoiceStates"] = 128] = "GuildVoiceStates";
    GatewayIntentBits[GatewayIntentBits["GuildPresences"] = 256] = "GuildPresences";
    GatewayIntentBits[GatewayIntentBits["GuildMessages"] = 512] = "GuildMessages";
    GatewayIntentBits[GatewayIntentBits["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
    GatewayIntentBits[GatewayIntentBits["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
    GatewayIntentBits[GatewayIntentBits["DirectMessages"] = 4096] = "DirectMessages";
    GatewayIntentBits[GatewayIntentBits["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
    GatewayIntentBits[GatewayIntentBits["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
    GatewayIntentBits[GatewayIntentBits["MessageContent"] = 32768] = "MessageContent";
    GatewayIntentBits[GatewayIntentBits["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
    GatewayIntentBits[GatewayIntentBits["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
    GatewayIntentBits[GatewayIntentBits["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
    GatewayIntentBits[GatewayIntentBits["GuildMessagePolls"] = 16777216] = "GuildMessagePolls";
    GatewayIntentBits[GatewayIntentBits["DirectMessagePolls"] = 33554432] = "DirectMessagePolls";
})(GatewayIntentBits || (exports.GatewayIntentBits = GatewayIntentBits = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#receive-events
 */
var GatewayDispatchEvents;
(function (GatewayDispatchEvents) {
    GatewayDispatchEvents["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
    GatewayDispatchEvents["ChannelCreate"] = "CHANNEL_CREATE";
    GatewayDispatchEvents["ChannelDelete"] = "CHANNEL_DELETE";
    GatewayDispatchEvents["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
    GatewayDispatchEvents["ChannelUpdate"] = "CHANNEL_UPDATE";
    GatewayDispatchEvents["GuildBanAdd"] = "GUILD_BAN_ADD";
    GatewayDispatchEvents["GuildBanRemove"] = "GUILD_BAN_REMOVE";
    GatewayDispatchEvents["GuildCreate"] = "GUILD_CREATE";
    GatewayDispatchEvents["GuildDelete"] = "GUILD_DELETE";
    GatewayDispatchEvents["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
    GatewayDispatchEvents["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
    GatewayDispatchEvents["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
    GatewayDispatchEvents["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
    GatewayDispatchEvents["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
    GatewayDispatchEvents["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
    GatewayDispatchEvents["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
    GatewayDispatchEvents["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
    GatewayDispatchEvents["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
    GatewayDispatchEvents["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
    GatewayDispatchEvents["GuildUpdate"] = "GUILD_UPDATE";
    GatewayDispatchEvents["IntegrationCreate"] = "INTEGRATION_CREATE";
    GatewayDispatchEvents["IntegrationDelete"] = "INTEGRATION_DELETE";
    GatewayDispatchEvents["IntegrationUpdate"] = "INTEGRATION_UPDATE";
    GatewayDispatchEvents["InteractionCreate"] = "INTERACTION_CREATE";
    GatewayDispatchEvents["InviteCreate"] = "INVITE_CREATE";
    GatewayDispatchEvents["InviteDelete"] = "INVITE_DELETE";
    GatewayDispatchEvents["MessageCreate"] = "MESSAGE_CREATE";
    GatewayDispatchEvents["MessageDelete"] = "MESSAGE_DELETE";
    GatewayDispatchEvents["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
    GatewayDispatchEvents["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
    GatewayDispatchEvents["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
    GatewayDispatchEvents["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
    GatewayDispatchEvents["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
    GatewayDispatchEvents["MessageUpdate"] = "MESSAGE_UPDATE";
    GatewayDispatchEvents["PresenceUpdate"] = "PRESENCE_UPDATE";
    GatewayDispatchEvents["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
    GatewayDispatchEvents["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
    GatewayDispatchEvents["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
    GatewayDispatchEvents["Ready"] = "READY";
    GatewayDispatchEvents["Resumed"] = "RESUMED";
    GatewayDispatchEvents["ThreadCreate"] = "THREAD_CREATE";
    GatewayDispatchEvents["ThreadDelete"] = "THREAD_DELETE";
    GatewayDispatchEvents["ThreadListSync"] = "THREAD_LIST_SYNC";
    GatewayDispatchEvents["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
    GatewayDispatchEvents["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
    GatewayDispatchEvents["ThreadUpdate"] = "THREAD_UPDATE";
    GatewayDispatchEvents["TypingStart"] = "TYPING_START";
    GatewayDispatchEvents["UserUpdate"] = "USER_UPDATE";
    GatewayDispatchEvents["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
    GatewayDispatchEvents["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
    GatewayDispatchEvents["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
    GatewayDispatchEvents["MessagePollVoteAdd"] = "MESSAGE_POLL_VOTE_ADD";
    GatewayDispatchEvents["MessagePollVoteRemove"] = "MESSAGE_POLL_VOTE_REMOVE";
    GatewayDispatchEvents["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
    GatewayDispatchEvents["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
    GatewayDispatchEvents["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
    GatewayDispatchEvents["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
    GatewayDispatchEvents["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
    GatewayDispatchEvents["AutoModerationRuleCreate"] = "AUTO_MODERATION_RULE_CREATE";
    GatewayDispatchEvents["AutoModerationRuleUpdate"] = "AUTO_MODERATION_RULE_UPDATE";
    GatewayDispatchEvents["AutoModerationRuleDelete"] = "AUTO_MODERATION_RULE_DELETE";
    GatewayDispatchEvents["AutoModerationActionExecution"] = "AUTO_MODERATION_ACTION_EXECUTION";
    GatewayDispatchEvents["GuildAuditLogEntryCreate"] = "GUILD_AUDIT_LOG_ENTRY_CREATE";
    GatewayDispatchEvents["EntitlementCreate"] = "ENTITLEMENT_CREATE";
    GatewayDispatchEvents["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
    GatewayDispatchEvents["EntitlementDelete"] = "ENTITLEMENT_DELETE";
})(GatewayDispatchEvents || (exports.GatewayDispatchEvents = GatewayDispatchEvents = {}));
// #endregion Shared
//# sourceMappingURL=v10.js.map

/***/ }),

/***/ 6690:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormattingPatterns = void 0;
/**
 * https://discord.com/developers/docs/reference#message-formatting-formats
 */
exports.FormattingPatterns = {
    /**
     * Regular expression for matching a user mention, strictly without a nickname
     *
     * The `id` group property is present on the `exec` result of this expression
     */
    User: /<@(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a user mention, strictly with a nickname
     *
     * The `id` group property is present on the `exec` result of this expression
     *
     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
     */
    UserWithNickname: /<@!(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a user mention, with or without a nickname
     *
     * The `id` group property is present on the `exec` result of this expression
     *
     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
     */
    UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a channel mention
     *
     * The `id` group property is present on the `exec` result of this expression
     */
    Channel: /<#(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a role mention
     *
     * The `id` group property is present on the `exec` result of this expression
     */
    Role: /<@&(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a application command mention
     *
     * The `fullName` (possibly including `name`, `subcommandOrGroup` and `subcommand`) and `id` group properties are present on the `exec` result of this expression
     */
    SlashCommand: 
    // eslint-disable-next-line unicorn/no-unsafe-regex
    /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
    /**
     * Regular expression for matching a custom emoji, either static or animated
     *
     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
     */
    Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching strictly an animated custom emoji
     *
     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
     */
    AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching strictly a static custom emoji
     *
     * The `name` and `id` group properties are present on the `exec` result of this expression
     */
    StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a timestamp, either default or custom styled
     *
     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
     */
    // eslint-disable-next-line prefer-named-capture-group
    Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[DFRTdft]))?>/,
    /**
     * Regular expression for matching strictly default styled timestamps
     *
     * The `timestamp` group property is present on the `exec` result of this expression
     */
    DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
    /**
     * Regular expression for matching strictly custom styled timestamps
     *
     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
     */
    StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[DFRTdft])>/,
};
/**
 * Freezes the formatting patterns
 *
 * @internal
 */
Object.freeze(exports.FormattingPatterns);
//# sourceMappingURL=globals.js.map

/***/ }),

/***/ 3363:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionFlagsBits = void 0;
/**
 * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
 *
 * These flags are exported as `BigInt`s and NOT numbers. Wrapping them in `Number()`
 * may cause issues, try to use BigInts as much as possible or modules that can
 * replicate them in some way
 */
exports.PermissionFlagsBits = {
    /**
     * Allows creation of instant invites
     *
     * Applies to channel types: Text, Voice, Stage
     */
    CreateInstantInvite: 1n << 0n,
    /**
     * Allows kicking members
     */
    // eslint-disable-next-line sonarjs/no-identical-expressions
    KickMembers: 1n << 1n,
    /**
     * Allows banning members
     */
    BanMembers: 1n << 2n,
    /**
     * Allows all permissions and bypasses channel permission overwrites
     */
    Administrator: 1n << 3n,
    /**
     * Allows management and editing of channels
     *
     * Applies to channel types: Text, Voice, Stage
     */
    ManageChannels: 1n << 4n,
    /**
     * Allows management and editing of the guild
     */
    ManageGuild: 1n << 5n,
    /**
     * Allows for the addition of reactions to messages
     *
     * Applies to channel types: Text, Voice, Stage
     */
    AddReactions: 1n << 6n,
    /**
     * Allows for viewing of audit logs
     */
    ViewAuditLog: 1n << 7n,
    /**
     * Allows for using priority speaker in a voice channel
     *
     * Applies to channel types: Voice
     */
    PrioritySpeaker: 1n << 8n,
    /**
     * Allows the user to go live
     *
     * Applies to channel types: Voice, Stage
     */
    Stream: 1n << 9n,
    /**
     * Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels
     *
     * Applies to channel types: Text, Voice, Stage
     */
    ViewChannel: 1n << 10n,
    /**
     * Allows for sending messages in a channel and creating threads in a forum
     * (does not allow sending messages in threads)
     *
     * Applies to channel types: Text, Voice, Stage
     */
    SendMessages: 1n << 11n,
    /**
     * Allows for sending of `/tts` messages
     *
     * Applies to channel types: Text, Voice, Stage
     */
    SendTTSMessages: 1n << 12n,
    /**
     * Allows for deletion of other users messages
     *
     * Applies to channel types: Text, Voice, Stage
     */
    ManageMessages: 1n << 13n,
    /**
     * Links sent by users with this permission will be auto-embedded
     *
     * Applies to channel types: Text, Voice, Stage
     */
    EmbedLinks: 1n << 14n,
    /**
     * Allows for uploading images and files
     *
     * Applies to channel types: Text, Voice, Stage
     */
    AttachFiles: 1n << 15n,
    /**
     * Allows for reading of message history
     *
     * Applies to channel types: Text, Voice, Stage
     */
    ReadMessageHistory: 1n << 16n,
    /**
     * Allows for using the `@everyone` tag to notify all users in a channel,
     * and the `@here` tag to notify all online users in a channel
     *
     * Applies to channel types: Text, Voice, Stage
     */
    MentionEveryone: 1n << 17n,
    /**
     * Allows the usage of custom emojis from other servers
     *
     * Applies to channel types: Text, Voice, Stage
     */
    UseExternalEmojis: 1n << 18n,
    /**
     * Allows for viewing guild insights
     */
    ViewGuildInsights: 1n << 19n,
    /**
     * Allows for joining of a voice channel
     *
     * Applies to channel types: Voice, Stage
     */
    Connect: 1n << 20n,
    /**
     * Allows for speaking in a voice channel
     *
     * Applies to channel types: Voice
     */
    Speak: 1n << 21n,
    /**
     * Allows for muting members in a voice channel
     *
     * Applies to channel types: Voice, Stage
     */
    MuteMembers: 1n << 22n,
    /**
     * Allows for deafening of members in a voice channel
     *
     * Applies to channel types: Voice
     */
    DeafenMembers: 1n << 23n,
    /**
     * Allows for moving of members between voice channels
     *
     * Applies to channel types: Voice, Stage
     */
    MoveMembers: 1n << 24n,
    /**
     * Allows for using voice-activity-detection in a voice channel
     *
     * Applies to channel types: Voice
     */
    UseVAD: 1n << 25n,
    /**
     * Allows for modification of own nickname
     */
    ChangeNickname: 1n << 26n,
    /**
     * Allows for modification of other users nicknames
     */
    ManageNicknames: 1n << 27n,
    /**
     * Allows management and editing of roles
     *
     * Applies to channel types: Text, Voice, Stage
     */
    ManageRoles: 1n << 28n,
    /**
     * Allows management and editing of webhooks
     *
     * Applies to channel types: Text, Voice, Stage
     */
    ManageWebhooks: 1n << 29n,
    /**
     * Allows management and editing of emojis, stickers, and soundboard sounds
     *
     * @deprecated This is the old name for {@apilink PermissionFlagsBits#ManageGuildExpressions}
     */
    ManageEmojisAndStickers: 1n << 30n,
    /**
     * Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users
     */
    ManageGuildExpressions: 1n << 30n,
    /**
     * Allows members to use application commands, including slash commands and context menu commands
     *
     * Applies to channel types: Text, Voice, Stage
     */
    UseApplicationCommands: 1n << 31n,
    /**
     * Allows for requesting to speak in stage channels
     *
     * Applies to channel types: Stage
     */
    RequestToSpeak: 1n << 32n,
    /**
     * Allows for editing and deleting scheduled events created by all users
     *
     * Applies to channel types: Voice, Stage
     */
    ManageEvents: 1n << 33n,
    /**
     * Allows for deleting and archiving threads, and viewing all private threads
     *
     * Applies to channel types: Text
     */
    ManageThreads: 1n << 34n,
    /**
     * Allows for creating public and announcement threads
     *
     * Applies to channel types: Text
     */
    CreatePublicThreads: 1n << 35n,
    /**
     * Allows for creating private threads
     *
     * Applies to channel types: Text
     */
    CreatePrivateThreads: 1n << 36n,
    /**
     * Allows the usage of custom stickers from other servers
     *
     * Applies to channel types: Text, Voice, Stage
     */
    UseExternalStickers: 1n << 37n,
    /**
     * Allows for sending messages in threads
     *
     * Applies to channel types: Text
     */
    SendMessagesInThreads: 1n << 38n,
    /**
     * Allows for using Activities (applications with the {@apilink ApplicationFlags.Embedded} flag) in a voice channel
     *
     * Applies to channel types: Voice
     */
    UseEmbeddedActivities: 1n << 39n,
    /**
     * Allows for timing out users to prevent them from sending or reacting to messages in chat and threads,
     * and from speaking in voice and stage channels
     */
    ModerateMembers: 1n << 40n,
    /**
     * Allows for viewing role subscription insights
     */
    ViewCreatorMonetizationAnalytics: 1n << 41n,
    /**
     * Allows for using soundboard in a voice channel
     *
     * Applies to channel types: Voice
     */
    UseSoundboard: 1n << 42n,
    /**
     * Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user
     */
    CreateGuildExpressions: 1n << 43n,
    /**
     * Allows for creating scheduled events, and editing and deleting those created by the current user
     *
     * Applies to channel types: Voice, Stage
     */
    CreateEvents: 1n << 44n,
    /**
     * Allows the usage of custom soundboard sounds from other servers
     *
     * Applies to channel types: Voice
     */
    UseExternalSounds: 1n << 45n,
    /**
     * Allows sending voice messages
     *
     * Applies to channel types: Text, Voice, Stage
     */
    SendVoiceMessages: 1n << 46n,
    /**
     * Allows sending polls
     *
     * Applies to channel types: Text, Voice, Stage
     */
    SendPolls: 1n << 49n,
};
/**
 * Freeze the object of bits, preventing any modifications to it
 *
 * @internal
 */
Object.freeze(exports.PermissionFlagsBits);
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 7320:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=attachment.js.map

/***/ }),

/***/ 7256:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=base.js.map

/***/ }),

/***/ 8313:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=boolean.js.map

/***/ }),

/***/ 8914:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 799:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=integer.js.map

/***/ }),

/***/ 2071:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=mentionable.js.map

/***/ }),

/***/ 4344:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=number.js.map

/***/ }),

/***/ 1:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=role.js.map

/***/ }),

/***/ 336:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationCommandOptionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
 */
var ApplicationCommandOptionType;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["Subcommand"] = 1] = "Subcommand";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SubcommandGroup"] = 2] = "SubcommandGroup";
    ApplicationCommandOptionType[ApplicationCommandOptionType["String"] = 3] = "String";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Integer"] = 4] = "Integer";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Boolean"] = 5] = "Boolean";
    ApplicationCommandOptionType[ApplicationCommandOptionType["User"] = 6] = "User";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Channel"] = 7] = "Channel";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Role"] = 8] = "Role";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Mentionable"] = 9] = "Mentionable";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Number"] = 10] = "Number";
    ApplicationCommandOptionType[ApplicationCommandOptionType["Attachment"] = 11] = "Attachment";
})(ApplicationCommandOptionType || (exports.ApplicationCommandOptionType = ApplicationCommandOptionType = {}));
//# sourceMappingURL=shared.js.map

/***/ }),

/***/ 8780:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=string.js.map

/***/ }),

/***/ 3758:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=subcommand.js.map

/***/ }),

/***/ 3131:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=subcommandGroup.js.map

/***/ }),

/***/ 3394:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 2289:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7320), exports);
__exportStar(__webpack_require__(7256), exports);
__exportStar(__webpack_require__(8313), exports);
__exportStar(__webpack_require__(8914), exports);
__exportStar(__webpack_require__(799), exports);
__exportStar(__webpack_require__(2071), exports);
__exportStar(__webpack_require__(4344), exports);
__exportStar(__webpack_require__(1), exports);
__exportStar(__webpack_require__(336), exports);
__exportStar(__webpack_require__(8780), exports);
__exportStar(__webpack_require__(3758), exports);
__exportStar(__webpack_require__(3131), exports);
__exportStar(__webpack_require__(3394), exports);
//# sourceMappingURL=chatInput.js.map

/***/ }),

/***/ 6415:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=contextMenu.js.map

/***/ }),

/***/ 1463:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APIApplicationCommandPermissionsConstant = exports.ApplicationCommandPermissionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type
 */
var ApplicationCommandPermissionType;
(function (ApplicationCommandPermissionType) {
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Role"] = 1] = "Role";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["User"] = 2] = "User";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Channel"] = 3] = "Channel";
})(ApplicationCommandPermissionType || (exports.ApplicationCommandPermissionType = ApplicationCommandPermissionType = {}));
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants
 */
exports.APIApplicationCommandPermissionsConstant = {
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    Everyone: (guildId) => String(guildId),
    AllChannels: (guildId) => String(BigInt(guildId) - 1n),
};
//# sourceMappingURL=permissions.js.map

/***/ }),

/***/ 5691:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationCommandType = void 0;
__exportStar(__webpack_require__(2289), exports);
__exportStar(__webpack_require__(6415), exports);
__exportStar(__webpack_require__(1463), exports);
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */
var ApplicationCommandType;
(function (ApplicationCommandType) {
    ApplicationCommandType[ApplicationCommandType["ChatInput"] = 1] = "ChatInput";
    ApplicationCommandType[ApplicationCommandType["User"] = 2] = "User";
    ApplicationCommandType[ApplicationCommandType["Message"] = 3] = "Message";
})(ApplicationCommandType || (exports.ApplicationCommandType = ApplicationCommandType = {}));
//# sourceMappingURL=applicationCommands.js.map

/***/ }),

/***/ 899:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=autocomplete.js.map

/***/ }),

/***/ 5438:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=base.js.map

/***/ }),

/***/ 7960:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=messageComponents.js.map

/***/ }),

/***/ 3709:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=modalSubmit.js.map

/***/ }),

/***/ 199:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=ping.js.map

/***/ }),

/***/ 1235:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionResponseType = exports.InteractionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type
 */
var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["Ping"] = 1] = "Ping";
    InteractionType[InteractionType["ApplicationCommand"] = 2] = "ApplicationCommand";
    InteractionType[InteractionType["MessageComponent"] = 3] = "MessageComponent";
    InteractionType[InteractionType["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
    InteractionType[InteractionType["ModalSubmit"] = 5] = "ModalSubmit";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
 */
var InteractionResponseType;
(function (InteractionResponseType) {
    /**
     * ACK a `Ping`
     */
    InteractionResponseType[InteractionResponseType["Pong"] = 1] = "Pong";
    /**
     * Respond to an interaction with a message
     */
    InteractionResponseType[InteractionResponseType["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
    /**
     * ACK an interaction and edit to a response later, the user sees a loading state
     */
    InteractionResponseType[InteractionResponseType["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
    /**
     * ACK a button interaction and update it to a loading state
     */
    InteractionResponseType[InteractionResponseType["DeferredMessageUpdate"] = 6] = "DeferredMessageUpdate";
    /**
     * ACK a button interaction and edit the message to which the button was attached
     */
    InteractionResponseType[InteractionResponseType["UpdateMessage"] = 7] = "UpdateMessage";
    /**
     * For autocomplete interactions
     */
    InteractionResponseType[InteractionResponseType["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
    /**
     * Respond to an interaction with an modal for a user to fill-out
     */
    InteractionResponseType[InteractionResponseType["Modal"] = 9] = "Modal";
    /**
     * Respond to an interaction with an upgrade button, only available for apps with monetization enabled
     */
    InteractionResponseType[InteractionResponseType["PremiumRequired"] = 10] = "PremiumRequired";
})(InteractionResponseType || (exports.InteractionResponseType = InteractionResponseType = {}));
//# sourceMappingURL=responses.js.map

/***/ }),

/***/ 6414:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/application
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationRoleConnectionMetadataType = exports.ApplicationFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
var ApplicationFlags;
(function (ApplicationFlags) {
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedReleased"] = 2] = "EmbeddedReleased";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["ManagedEmoji"] = 4] = "ManagedEmoji";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedIAP"] = 8] = "EmbeddedIAP";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["GroupDMCreate"] = 16] = "GroupDMCreate";
    /**
     * Indicates if an app uses the Auto Moderation API
     */
    ApplicationFlags[ApplicationFlags["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["RPCHasConnected"] = 2048] = "RPCHasConnected";
    /**
     * Intent required for bots in 100 or more servers to receive `presence_update` events
     */
    ApplicationFlags[ApplicationFlags["GatewayPresence"] = 4096] = "GatewayPresence";
    /**
     * Intent required for bots in under 100 servers to receive `presence_update` events, found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
    /**
     * Intent required for bots in 100 or more servers to receive member-related events like `guild_member_add`.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
    /**
     * Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
    /**
     * Indicates unusual growth of an app that prevents verification
     */
    ApplicationFlags[ApplicationFlags["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
    /**
     * Indicates if an app is embedded within the Discord client (currently unavailable publicly)
     */
    ApplicationFlags[ApplicationFlags["Embedded"] = 131072] = "Embedded";
    /**
     * Intent required for bots in 100 or more servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
    /**
     * Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055),
     * found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
    /**
     * Indicates if an app has registered global [application commands](https://discord.com/developers/docs/interactions/application-commands)
     */
    ApplicationFlags[ApplicationFlags["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
})(ApplicationFlags || (exports.ApplicationFlags = ApplicationFlags = {}));
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type
 */
var ApplicationRoleConnectionMetadataType;
(function (ApplicationRoleConnectionMetadataType) {
    /**
     * The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
    /**
     * The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerEqual"] = 3] = "IntegerEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerNotEqual"] = 4] = "IntegerNotEqual";
    /**
     * The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
    /**
     * The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanEqual"] = 7] = "BooleanEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanNotEqual"] = 8] = "BooleanNotEqual";
})(ApplicationRoleConnectionMetadataType || (exports.ApplicationRoleConnectionMetadataType = ApplicationRoleConnectionMetadataType = {}));
//# sourceMappingURL=application.js.map

/***/ }),

/***/ 4877:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/audit-log
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogOptionsType = exports.AuditLogEvent = void 0;
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
 */
var AuditLogEvent;
(function (AuditLogEvent) {
    AuditLogEvent[AuditLogEvent["GuildUpdate"] = 1] = "GuildUpdate";
    AuditLogEvent[AuditLogEvent["ChannelCreate"] = 10] = "ChannelCreate";
    AuditLogEvent[AuditLogEvent["ChannelUpdate"] = 11] = "ChannelUpdate";
    AuditLogEvent[AuditLogEvent["ChannelDelete"] = 12] = "ChannelDelete";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteCreate"] = 13] = "ChannelOverwriteCreate";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteUpdate"] = 14] = "ChannelOverwriteUpdate";
    AuditLogEvent[AuditLogEvent["ChannelOverwriteDelete"] = 15] = "ChannelOverwriteDelete";
    AuditLogEvent[AuditLogEvent["MemberKick"] = 20] = "MemberKick";
    AuditLogEvent[AuditLogEvent["MemberPrune"] = 21] = "MemberPrune";
    AuditLogEvent[AuditLogEvent["MemberBanAdd"] = 22] = "MemberBanAdd";
    AuditLogEvent[AuditLogEvent["MemberBanRemove"] = 23] = "MemberBanRemove";
    AuditLogEvent[AuditLogEvent["MemberUpdate"] = 24] = "MemberUpdate";
    AuditLogEvent[AuditLogEvent["MemberRoleUpdate"] = 25] = "MemberRoleUpdate";
    AuditLogEvent[AuditLogEvent["MemberMove"] = 26] = "MemberMove";
    AuditLogEvent[AuditLogEvent["MemberDisconnect"] = 27] = "MemberDisconnect";
    AuditLogEvent[AuditLogEvent["BotAdd"] = 28] = "BotAdd";
    AuditLogEvent[AuditLogEvent["RoleCreate"] = 30] = "RoleCreate";
    AuditLogEvent[AuditLogEvent["RoleUpdate"] = 31] = "RoleUpdate";
    AuditLogEvent[AuditLogEvent["RoleDelete"] = 32] = "RoleDelete";
    AuditLogEvent[AuditLogEvent["InviteCreate"] = 40] = "InviteCreate";
    AuditLogEvent[AuditLogEvent["InviteUpdate"] = 41] = "InviteUpdate";
    AuditLogEvent[AuditLogEvent["InviteDelete"] = 42] = "InviteDelete";
    AuditLogEvent[AuditLogEvent["WebhookCreate"] = 50] = "WebhookCreate";
    AuditLogEvent[AuditLogEvent["WebhookUpdate"] = 51] = "WebhookUpdate";
    AuditLogEvent[AuditLogEvent["WebhookDelete"] = 52] = "WebhookDelete";
    AuditLogEvent[AuditLogEvent["EmojiCreate"] = 60] = "EmojiCreate";
    AuditLogEvent[AuditLogEvent["EmojiUpdate"] = 61] = "EmojiUpdate";
    AuditLogEvent[AuditLogEvent["EmojiDelete"] = 62] = "EmojiDelete";
    AuditLogEvent[AuditLogEvent["MessageDelete"] = 72] = "MessageDelete";
    AuditLogEvent[AuditLogEvent["MessageBulkDelete"] = 73] = "MessageBulkDelete";
    AuditLogEvent[AuditLogEvent["MessagePin"] = 74] = "MessagePin";
    AuditLogEvent[AuditLogEvent["MessageUnpin"] = 75] = "MessageUnpin";
    AuditLogEvent[AuditLogEvent["IntegrationCreate"] = 80] = "IntegrationCreate";
    AuditLogEvent[AuditLogEvent["IntegrationUpdate"] = 81] = "IntegrationUpdate";
    AuditLogEvent[AuditLogEvent["IntegrationDelete"] = 82] = "IntegrationDelete";
    AuditLogEvent[AuditLogEvent["StageInstanceCreate"] = 83] = "StageInstanceCreate";
    AuditLogEvent[AuditLogEvent["StageInstanceUpdate"] = 84] = "StageInstanceUpdate";
    AuditLogEvent[AuditLogEvent["StageInstanceDelete"] = 85] = "StageInstanceDelete";
    AuditLogEvent[AuditLogEvent["StickerCreate"] = 90] = "StickerCreate";
    AuditLogEvent[AuditLogEvent["StickerUpdate"] = 91] = "StickerUpdate";
    AuditLogEvent[AuditLogEvent["StickerDelete"] = 92] = "StickerDelete";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventCreate"] = 100] = "GuildScheduledEventCreate";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventUpdate"] = 101] = "GuildScheduledEventUpdate";
    AuditLogEvent[AuditLogEvent["GuildScheduledEventDelete"] = 102] = "GuildScheduledEventDelete";
    AuditLogEvent[AuditLogEvent["ThreadCreate"] = 110] = "ThreadCreate";
    AuditLogEvent[AuditLogEvent["ThreadUpdate"] = 111] = "ThreadUpdate";
    AuditLogEvent[AuditLogEvent["ThreadDelete"] = 112] = "ThreadDelete";
    AuditLogEvent[AuditLogEvent["ApplicationCommandPermissionUpdate"] = 121] = "ApplicationCommandPermissionUpdate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleCreate"] = 140] = "AutoModerationRuleCreate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleUpdate"] = 141] = "AutoModerationRuleUpdate";
    AuditLogEvent[AuditLogEvent["AutoModerationRuleDelete"] = 142] = "AutoModerationRuleDelete";
    AuditLogEvent[AuditLogEvent["AutoModerationBlockMessage"] = 143] = "AutoModerationBlockMessage";
    AuditLogEvent[AuditLogEvent["AutoModerationFlagToChannel"] = 144] = "AutoModerationFlagToChannel";
    AuditLogEvent[AuditLogEvent["AutoModerationUserCommunicationDisabled"] = 145] = "AutoModerationUserCommunicationDisabled";
    AuditLogEvent[AuditLogEvent["CreatorMonetizationRequestCreated"] = 150] = "CreatorMonetizationRequestCreated";
    AuditLogEvent[AuditLogEvent["CreatorMonetizationTermsAccepted"] = 151] = "CreatorMonetizationTermsAccepted";
    AuditLogEvent[AuditLogEvent["OnboardingPromptCreate"] = 163] = "OnboardingPromptCreate";
    AuditLogEvent[AuditLogEvent["OnboardingPromptUpdate"] = 164] = "OnboardingPromptUpdate";
    AuditLogEvent[AuditLogEvent["OnboardingPromptDelete"] = 165] = "OnboardingPromptDelete";
    AuditLogEvent[AuditLogEvent["OnboardingCreate"] = 166] = "OnboardingCreate";
    AuditLogEvent[AuditLogEvent["OnboardingUpdate"] = 167] = "OnboardingUpdate";
})(AuditLogEvent || (exports.AuditLogEvent = AuditLogEvent = {}));
var AuditLogOptionsType;
(function (AuditLogOptionsType) {
    AuditLogOptionsType["Role"] = "0";
    AuditLogOptionsType["Member"] = "1";
})(AuditLogOptionsType || (exports.AuditLogOptionsType = AuditLogOptionsType = {}));
//# sourceMappingURL=auditLog.js.map

/***/ }),

/***/ 9825:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/auto-moderation
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoModerationActionType = exports.AutoModerationRuleEventType = exports.AutoModerationRuleKeywordPresetType = exports.AutoModerationRuleTriggerType = void 0;
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types
 */
var AutoModerationRuleTriggerType;
(function (AutoModerationRuleTriggerType) {
    /**
     * Check if content contains words from a user defined list of keywords (Maximum of 6 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Keyword"] = 1] = "Keyword";
    /**
     * Check if content represents generic spam (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Spam"] = 3] = "Spam";
    /**
     * Check if content contains words from internal pre-defined wordsets (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["KeywordPreset"] = 4] = "KeywordPreset";
    /**
     * Check if content contains more mentions than allowed (Maximum of 1 per guild)
     */
    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MentionSpam"] = 5] = "MentionSpam";
})(AutoModerationRuleTriggerType || (exports.AutoModerationRuleTriggerType = AutoModerationRuleTriggerType = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types
 */
var AutoModerationRuleKeywordPresetType;
(function (AutoModerationRuleKeywordPresetType) {
    /**
     * Words that may be considered forms of swearing or cursing
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Profanity"] = 1] = "Profanity";
    /**
     * Words that refer to sexually explicit behavior or activity
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["SexualContent"] = 2] = "SexualContent";
    /**
     * Personal insults or words that may be considered hate speech
     */
    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Slurs"] = 3] = "Slurs";
})(AutoModerationRuleKeywordPresetType || (exports.AutoModerationRuleKeywordPresetType = AutoModerationRuleKeywordPresetType = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types
 */
var AutoModerationRuleEventType;
(function (AutoModerationRuleEventType) {
    /**
     * When a member sends or edits a message in the guild
     */
    AutoModerationRuleEventType[AutoModerationRuleEventType["MessageSend"] = 1] = "MessageSend";
})(AutoModerationRuleEventType || (exports.AutoModerationRuleEventType = AutoModerationRuleEventType = {}));
/**
 * https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types
 */
var AutoModerationActionType;
(function (AutoModerationActionType) {
    /**
     * Blocks a member's message and prevents it from being posted.
     * A custom explanation can be specified and shown to members whenever their message is blocked
     */
    AutoModerationActionType[AutoModerationActionType["BlockMessage"] = 1] = "BlockMessage";
    /**
     * Logs user content to a specified channel
     */
    AutoModerationActionType[AutoModerationActionType["SendAlertMessage"] = 2] = "SendAlertMessage";
    /**
     * Timeout user for specified duration, this action type can be set if the bot has `MODERATE_MEMBERS` permission
     */
    AutoModerationActionType[AutoModerationActionType["Timeout"] = 3] = "Timeout";
})(AutoModerationActionType || (exports.AutoModerationActionType = AutoModerationActionType = {}));
//# sourceMappingURL=autoModeration.js.map

/***/ }),

/***/ 9763:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/channel
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelFlags = exports.SelectMenuDefaultValueType = exports.TextInputStyle = exports.ButtonStyle = exports.ComponentType = exports.AllowedMentionsTypes = exports.AttachmentFlags = exports.EmbedType = exports.ThreadMemberFlags = exports.ThreadAutoArchiveDuration = exports.OverwriteType = exports.MessageFlags = exports.MessageActivityType = exports.MessageType = exports.VideoQualityMode = exports.ChannelType = exports.ForumLayoutType = exports.SortOrderType = void 0;
/**
 * https://discord.com/developers/docs/resources/channel/#channel-object-sort-order-types
 */
var SortOrderType;
(function (SortOrderType) {
    /**
     * Sort forum posts by activity
     */
    SortOrderType[SortOrderType["LatestActivity"] = 0] = "LatestActivity";
    /**
     * Sort forum posts by creation time (from most recent to oldest)
     */
    SortOrderType[SortOrderType["CreationDate"] = 1] = "CreationDate";
})(SortOrderType || (exports.SortOrderType = SortOrderType = {}));
/**
 * https://discord.com/developers/docs/resources/channel/#channel-object-forum-layout-types
 */
var ForumLayoutType;
(function (ForumLayoutType) {
    /**
     * No default has been set for forum channel
     */
    ForumLayoutType[ForumLayoutType["NotSet"] = 0] = "NotSet";
    /**
     * Display posts as a list
     */
    ForumLayoutType[ForumLayoutType["ListView"] = 1] = "ListView";
    /**
     * Display posts as a collection of tiles
     */
    ForumLayoutType[ForumLayoutType["GalleryView"] = 2] = "GalleryView";
})(ForumLayoutType || (exports.ForumLayoutType = ForumLayoutType = {}));
/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 */
var ChannelType;
(function (ChannelType) {
    /**
     * A text channel within a guild
     */
    ChannelType[ChannelType["GuildText"] = 0] = "GuildText";
    /**
     * A direct message between users
     */
    ChannelType[ChannelType["DM"] = 1] = "DM";
    /**
     * A voice channel within a guild
     */
    ChannelType[ChannelType["GuildVoice"] = 2] = "GuildVoice";
    /**
     * A direct message between multiple users
     */
    ChannelType[ChannelType["GroupDM"] = 3] = "GroupDM";
    /**
     * An organizational category that contains up to 50 channels
     *
     * See https://support.discord.com/hc/articles/115001580171
     */
    ChannelType[ChannelType["GuildCategory"] = 4] = "GuildCategory";
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    ChannelType[ChannelType["GuildAnnouncement"] = 5] = "GuildAnnouncement";
    /**
     * A temporary sub-channel within a Guild Announcement channel
     */
    ChannelType[ChannelType["AnnouncementThread"] = 10] = "AnnouncementThread";
    /**
     * A temporary sub-channel within a Guild Text or Guild Forum channel
     */
    ChannelType[ChannelType["PublicThread"] = 11] = "PublicThread";
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     */
    ChannelType[ChannelType["PrivateThread"] = 12] = "PrivateThread";
    /**
     * A voice channel for hosting events with an audience
     *
     * See https://support.discord.com/hc/articles/1500005513722
     */
    ChannelType[ChannelType["GuildStageVoice"] = 13] = "GuildStageVoice";
    /**
     * The channel in a Student Hub containing the listed servers
     *
     * See https://support.discord.com/hc/articles/4406046651927
     */
    ChannelType[ChannelType["GuildDirectory"] = 14] = "GuildDirectory";
    /**
     * A channel that can only contain threads
     */
    ChannelType[ChannelType["GuildForum"] = 15] = "GuildForum";
    /**
     * A channel like forum channels but contains media for server subscriptions
     *
     * See https://creator-support.discord.com/hc/articles/14346342766743
     */
    ChannelType[ChannelType["GuildMedia"] = 16] = "GuildMedia";
    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * @deprecated This is the old name for {@apilink ChannelType#GuildAnnouncement}
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    ChannelType[ChannelType["GuildNews"] = 5] = "GuildNews";
    /**
     * A temporary sub-channel within a Guild Announcement channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#AnnouncementThread}
     */
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ChannelType[ChannelType["GuildNewsThread"] = 10] = "GuildNewsThread";
    /**
     * A temporary sub-channel within a Guild Text channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#PublicThread}
     */
    ChannelType[ChannelType["GuildPublicThread"] = 11] = "GuildPublicThread";
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     *
     * @deprecated This is the old name for {@apilink ChannelType#PrivateThread}
     */
    ChannelType[ChannelType["GuildPrivateThread"] = 12] = "GuildPrivateThread";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
var VideoQualityMode;
(function (VideoQualityMode) {
    /**
     * Discord chooses the quality for optimal performance
     */
    VideoQualityMode[VideoQualityMode["Auto"] = 1] = "Auto";
    /**
     * 720p
     */
    VideoQualityMode[VideoQualityMode["Full"] = 2] = "Full";
})(VideoQualityMode || (exports.VideoQualityMode = VideoQualityMode = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-types
 */
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Default"] = 0] = "Default";
    MessageType[MessageType["RecipientAdd"] = 1] = "RecipientAdd";
    MessageType[MessageType["RecipientRemove"] = 2] = "RecipientRemove";
    MessageType[MessageType["Call"] = 3] = "Call";
    MessageType[MessageType["ChannelNameChange"] = 4] = "ChannelNameChange";
    MessageType[MessageType["ChannelIconChange"] = 5] = "ChannelIconChange";
    MessageType[MessageType["ChannelPinnedMessage"] = 6] = "ChannelPinnedMessage";
    MessageType[MessageType["UserJoin"] = 7] = "UserJoin";
    MessageType[MessageType["GuildBoost"] = 8] = "GuildBoost";
    MessageType[MessageType["GuildBoostTier1"] = 9] = "GuildBoostTier1";
    MessageType[MessageType["GuildBoostTier2"] = 10] = "GuildBoostTier2";
    MessageType[MessageType["GuildBoostTier3"] = 11] = "GuildBoostTier3";
    MessageType[MessageType["ChannelFollowAdd"] = 12] = "ChannelFollowAdd";
    MessageType[MessageType["GuildDiscoveryDisqualified"] = 14] = "GuildDiscoveryDisqualified";
    MessageType[MessageType["GuildDiscoveryRequalified"] = 15] = "GuildDiscoveryRequalified";
    MessageType[MessageType["GuildDiscoveryGracePeriodInitialWarning"] = 16] = "GuildDiscoveryGracePeriodInitialWarning";
    MessageType[MessageType["GuildDiscoveryGracePeriodFinalWarning"] = 17] = "GuildDiscoveryGracePeriodFinalWarning";
    MessageType[MessageType["ThreadCreated"] = 18] = "ThreadCreated";
    MessageType[MessageType["Reply"] = 19] = "Reply";
    MessageType[MessageType["ChatInputCommand"] = 20] = "ChatInputCommand";
    MessageType[MessageType["ThreadStarterMessage"] = 21] = "ThreadStarterMessage";
    MessageType[MessageType["GuildInviteReminder"] = 22] = "GuildInviteReminder";
    MessageType[MessageType["ContextMenuCommand"] = 23] = "ContextMenuCommand";
    MessageType[MessageType["AutoModerationAction"] = 24] = "AutoModerationAction";
    MessageType[MessageType["RoleSubscriptionPurchase"] = 25] = "RoleSubscriptionPurchase";
    MessageType[MessageType["InteractionPremiumUpsell"] = 26] = "InteractionPremiumUpsell";
    MessageType[MessageType["StageStart"] = 27] = "StageStart";
    MessageType[MessageType["StageEnd"] = 28] = "StageEnd";
    MessageType[MessageType["StageSpeaker"] = 29] = "StageSpeaker";
    /**
     * @unstable https://github.com/discord/discord-api-docs/pull/5927#discussion_r1107678548
     */
    MessageType[MessageType["StageRaiseHand"] = 30] = "StageRaiseHand";
    MessageType[MessageType["StageTopic"] = 31] = "StageTopic";
    MessageType[MessageType["GuildApplicationPremiumSubscription"] = 32] = "GuildApplicationPremiumSubscription";
})(MessageType || (exports.MessageType = MessageType = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
 */
var MessageActivityType;
(function (MessageActivityType) {
    MessageActivityType[MessageActivityType["Join"] = 1] = "Join";
    MessageActivityType[MessageActivityType["Spectate"] = 2] = "Spectate";
    MessageActivityType[MessageActivityType["Listen"] = 3] = "Listen";
    MessageActivityType[MessageActivityType["JoinRequest"] = 5] = "JoinRequest";
})(MessageActivityType || (exports.MessageActivityType = MessageActivityType = {}));
/**
 * https://discord.com/developers/docs/resources/channel#message-object-message-flags
 */
var MessageFlags;
(function (MessageFlags) {
    /**
     * This message has been published to subscribed channels (via Channel Following)
     */
    MessageFlags[MessageFlags["Crossposted"] = 1] = "Crossposted";
    /**
     * This message originated from a message in another channel (via Channel Following)
     */
    MessageFlags[MessageFlags["IsCrosspost"] = 2] = "IsCrosspost";
    /**
     * Do not include any embeds when serializing this message
     */
    MessageFlags[MessageFlags["SuppressEmbeds"] = 4] = "SuppressEmbeds";
    /**
     * The source message for this crosspost has been deleted (via Channel Following)
     */
    MessageFlags[MessageFlags["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
    /**
     * This message came from the urgent message system
     */
    MessageFlags[MessageFlags["Urgent"] = 16] = "Urgent";
    /**
     * This message has an associated thread, which shares its id
     */
    MessageFlags[MessageFlags["HasThread"] = 32] = "HasThread";
    /**
     * This message is only visible to the user who invoked the Interaction
     */
    MessageFlags[MessageFlags["Ephemeral"] = 64] = "Ephemeral";
    /**
     * This message is an Interaction Response and the bot is "thinking"
     */
    MessageFlags[MessageFlags["Loading"] = 128] = "Loading";
    /**
     * This message failed to mention some roles and add their members to the thread
     */
    MessageFlags[MessageFlags["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
    /**
     * @unstable This message flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    MessageFlags[MessageFlags["ShouldShowLinkNotDiscordWarning"] = 1024] = "ShouldShowLinkNotDiscordWarning";
    /**
     * This message will not trigger push and desktop notifications
     */
    MessageFlags[MessageFlags["SuppressNotifications"] = 4096] = "SuppressNotifications";
    /**
     * This message is a voice message
     */
    MessageFlags[MessageFlags["IsVoiceMessage"] = 8192] = "IsVoiceMessage";
})(MessageFlags || (exports.MessageFlags = MessageFlags = {}));
var OverwriteType;
(function (OverwriteType) {
    OverwriteType[OverwriteType["Role"] = 0] = "Role";
    OverwriteType[OverwriteType["Member"] = 1] = "Member";
})(OverwriteType || (exports.OverwriteType = OverwriteType = {}));
var ThreadAutoArchiveDuration;
(function (ThreadAutoArchiveDuration) {
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneHour"] = 60] = "OneHour";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneDay"] = 1440] = "OneDay";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["ThreeDays"] = 4320] = "ThreeDays";
    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneWeek"] = 10080] = "OneWeek";
})(ThreadAutoArchiveDuration || (exports.ThreadAutoArchiveDuration = ThreadAutoArchiveDuration = {}));
var ThreadMemberFlags;
(function (ThreadMemberFlags) {
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["HasInteracted"] = 1] = "HasInteracted";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["AllMessages"] = 2] = "AllMessages";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["OnlyMentions"] = 4] = "OnlyMentions";
    /**
     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ThreadMemberFlags[ThreadMemberFlags["NoMessages"] = 8] = "NoMessages";
})(ThreadMemberFlags || (exports.ThreadMemberFlags = ThreadMemberFlags = {}));
/**
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 *
 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
 */
var EmbedType;
(function (EmbedType) {
    /**
     * Generic embed rendered from embed attributes
     */
    EmbedType["Rich"] = "rich";
    /**
     * Image embed
     */
    EmbedType["Image"] = "image";
    /**
     * Video embed
     */
    EmbedType["Video"] = "video";
    /**
     * Animated gif image embed rendered as a video embed
     */
    EmbedType["GIFV"] = "gifv";
    /**
     * Article embed
     */
    EmbedType["Article"] = "article";
    /**
     * Link embed
     */
    EmbedType["Link"] = "link";
    /**
     * Auto moderation alert embed
     *
     * @unstable This embed type is currently not documented by Discord, but it is returned in the auto moderation system messages.
     */
    EmbedType["AutoModerationMessage"] = "auto_moderation_message";
})(EmbedType || (exports.EmbedType = EmbedType = {}));
/**
 * https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure-attachment-flags
 */
var AttachmentFlags;
(function (AttachmentFlags) {
    /**
     * This attachment has been edited using the remix feature on mobile
     */
    AttachmentFlags[AttachmentFlags["IsRemix"] = 4] = "IsRemix";
})(AttachmentFlags || (exports.AttachmentFlags = AttachmentFlags = {}));
/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types
 */
var AllowedMentionsTypes;
(function (AllowedMentionsTypes) {
    /**
     * Controls @everyone and @here mentions
     */
    AllowedMentionsTypes["Everyone"] = "everyone";
    /**
     * Controls role mentions
     */
    AllowedMentionsTypes["Role"] = "roles";
    /**
     * Controls user mentions
     */
    AllowedMentionsTypes["User"] = "users";
})(AllowedMentionsTypes || (exports.AllowedMentionsTypes = AllowedMentionsTypes = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#component-object-component-types
 */
var ComponentType;
(function (ComponentType) {
    /**
     * Action Row component
     */
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    /**
     * Button component
     */
    ComponentType[ComponentType["Button"] = 2] = "Button";
    /**
     * Select menu for picking from defined text options
     */
    ComponentType[ComponentType["StringSelect"] = 3] = "StringSelect";
    /**
     * Text Input component
     */
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
    /**
     * Select menu for users
     */
    ComponentType[ComponentType["UserSelect"] = 5] = "UserSelect";
    /**
     * Select menu for roles
     */
    ComponentType[ComponentType["RoleSelect"] = 6] = "RoleSelect";
    /**
     * Select menu for users and roles
     */
    ComponentType[ComponentType["MentionableSelect"] = 7] = "MentionableSelect";
    /**
     * Select menu for channels
     */
    ComponentType[ComponentType["ChannelSelect"] = 8] = "ChannelSelect";
    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
    /**
     * Select menu for picking from defined text options
     *
     * @deprecated This is the old name for {@apilink ComponentType#StringSelect}
     */
    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
 */
var ButtonStyle;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
})(ButtonStyle || (exports.ButtonStyle = ButtonStyle = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles
 */
var TextInputStyle;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle || (exports.TextInputStyle = TextInputStyle = {}));
/**
 * https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure
 */
var SelectMenuDefaultValueType;
(function (SelectMenuDefaultValueType) {
    SelectMenuDefaultValueType["Channel"] = "channel";
    SelectMenuDefaultValueType["Role"] = "role";
    SelectMenuDefaultValueType["User"] = "user";
})(SelectMenuDefaultValueType || (exports.SelectMenuDefaultValueType = SelectMenuDefaultValueType = {}));
/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-flags
 */
var ChannelFlags;
(function (ChannelFlags) {
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["GuildFeedRemoved"] = 1] = "GuildFeedRemoved";
    /**
     * This thread is pinned to the top of its parent forum channel
     */
    ChannelFlags[ChannelFlags["Pinned"] = 2] = "Pinned";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["ActiveChannelsRemoved"] = 4] = "ActiveChannelsRemoved";
    /**
     * Whether a tag is required to be specified when creating a thread in a forum channel.
     * Tags are specified in the `applied_tags` field
     */
    ChannelFlags[ChannelFlags["RequireTag"] = 16] = "RequireTag";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsSpam"] = 32] = "IsSpam";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsGuildResourceChannel"] = 128] = "IsGuildResourceChannel";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["ClydeAI"] = 256] = "ClydeAI";
    /**
     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ChannelFlags[ChannelFlags["IsScheduledForDeletion"] = 512] = "IsScheduledForDeletion";
    /**
     * Whether media download options are hidden.
     */
    ChannelFlags[ChannelFlags["HideMediaDownloadOptions"] = 32768] = "HideMediaDownloadOptions";
})(ChannelFlags || (exports.ChannelFlags = ChannelFlags = {}));
//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 6462:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/emoji
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=emoji.js.map

/***/ }),

/***/ 1130:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from
 *  - https://discord.com/developers/docs/topics/gateway
 *  - https://discord.com/developers/docs/topics/gateway-events
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityFlags = exports.ActivityType = exports.ActivityPlatform = exports.PresenceUpdateStatus = void 0;
/**
 * https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types
 */
var PresenceUpdateStatus;
(function (PresenceUpdateStatus) {
    PresenceUpdateStatus["Online"] = "online";
    PresenceUpdateStatus["DoNotDisturb"] = "dnd";
    PresenceUpdateStatus["Idle"] = "idle";
    /**
     * Invisible and shown as offline
     */
    PresenceUpdateStatus["Invisible"] = "invisible";
    PresenceUpdateStatus["Offline"] = "offline";
})(PresenceUpdateStatus || (exports.PresenceUpdateStatus = PresenceUpdateStatus = {}));
/**
 * @unstable This enum is currently not documented by Discord but has known values which we will try to keep up to date.
 * Values might be added or removed without a major version bump.
 */
var ActivityPlatform;
(function (ActivityPlatform) {
    ActivityPlatform["Desktop"] = "desktop";
    ActivityPlatform["Xbox"] = "xbox";
    ActivityPlatform["Samsung"] = "samsung";
    ActivityPlatform["IOS"] = "ios";
    ActivityPlatform["Android"] = "android";
    ActivityPlatform["Embedded"] = "embedded";
    ActivityPlatform["PS4"] = "ps4";
    ActivityPlatform["PS5"] = "ps5";
})(ActivityPlatform || (exports.ActivityPlatform = ActivityPlatform = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 */
var ActivityType;
(function (ActivityType) {
    /**
     * Playing {game}
     */
    ActivityType[ActivityType["Playing"] = 0] = "Playing";
    /**
     * Streaming {details}
     */
    ActivityType[ActivityType["Streaming"] = 1] = "Streaming";
    /**
     * Listening to {name}
     */
    ActivityType[ActivityType["Listening"] = 2] = "Listening";
    /**
     * Watching {details}
     */
    ActivityType[ActivityType["Watching"] = 3] = "Watching";
    /**
     * {emoji} {state}
     */
    ActivityType[ActivityType["Custom"] = 4] = "Custom";
    /**
     * Competing in {name}
     */
    ActivityType[ActivityType["Competing"] = 5] = "Competing";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags
 */
var ActivityFlags;
(function (ActivityFlags) {
    ActivityFlags[ActivityFlags["Instance"] = 1] = "Instance";
    ActivityFlags[ActivityFlags["Join"] = 2] = "Join";
    ActivityFlags[ActivityFlags["Spectate"] = 4] = "Spectate";
    ActivityFlags[ActivityFlags["JoinRequest"] = 8] = "JoinRequest";
    ActivityFlags[ActivityFlags["Sync"] = 16] = "Sync";
    ActivityFlags[ActivityFlags["Play"] = 32] = "Play";
    ActivityFlags[ActivityFlags["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
    ActivityFlags[ActivityFlags["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
    ActivityFlags[ActivityFlags["Embedded"] = 256] = "Embedded";
})(ActivityFlags || (exports.ActivityFlags = ActivityFlags = {}));
//# sourceMappingURL=gateway.js.map

/***/ }),

/***/ 8487:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/guild
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GuildOnboardingPromptType = exports.GuildOnboardingMode = exports.MembershipScreeningFieldType = exports.GuildWidgetStyle = exports.IntegrationExpireBehavior = exports.GuildMemberFlags = exports.GuildFeature = exports.GuildSystemChannelFlags = exports.GuildHubType = exports.GuildPremiumTier = exports.GuildVerificationLevel = exports.GuildNSFWLevel = exports.GuildMFALevel = exports.GuildExplicitContentFilter = exports.GuildDefaultMessageNotifications = void 0;
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
var GuildDefaultMessageNotifications;
(function (GuildDefaultMessageNotifications) {
    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["AllMessages"] = 0] = "AllMessages";
    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["OnlyMentions"] = 1] = "OnlyMentions";
})(GuildDefaultMessageNotifications || (exports.GuildDefaultMessageNotifications = GuildDefaultMessageNotifications = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
var GuildExplicitContentFilter;
(function (GuildExplicitContentFilter) {
    GuildExplicitContentFilter[GuildExplicitContentFilter["Disabled"] = 0] = "Disabled";
    GuildExplicitContentFilter[GuildExplicitContentFilter["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
    GuildExplicitContentFilter[GuildExplicitContentFilter["AllMembers"] = 2] = "AllMembers";
})(GuildExplicitContentFilter || (exports.GuildExplicitContentFilter = GuildExplicitContentFilter = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
 */
var GuildMFALevel;
(function (GuildMFALevel) {
    GuildMFALevel[GuildMFALevel["None"] = 0] = "None";
    GuildMFALevel[GuildMFALevel["Elevated"] = 1] = "Elevated";
})(GuildMFALevel || (exports.GuildMFALevel = GuildMFALevel = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level
 */
var GuildNSFWLevel;
(function (GuildNSFWLevel) {
    GuildNSFWLevel[GuildNSFWLevel["Default"] = 0] = "Default";
    GuildNSFWLevel[GuildNSFWLevel["Explicit"] = 1] = "Explicit";
    GuildNSFWLevel[GuildNSFWLevel["Safe"] = 2] = "Safe";
    GuildNSFWLevel[GuildNSFWLevel["AgeRestricted"] = 3] = "AgeRestricted";
})(GuildNSFWLevel || (exports.GuildNSFWLevel = GuildNSFWLevel = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-verification-level
 */
var GuildVerificationLevel;
(function (GuildVerificationLevel) {
    /**
     * Unrestricted
     */
    GuildVerificationLevel[GuildVerificationLevel["None"] = 0] = "None";
    /**
     * Must have verified email on account
     */
    GuildVerificationLevel[GuildVerificationLevel["Low"] = 1] = "Low";
    /**
     * Must be registered on Discord for longer than 5 minutes
     */
    GuildVerificationLevel[GuildVerificationLevel["Medium"] = 2] = "Medium";
    /**
     * Must be a member of the guild for longer than 10 minutes
     */
    GuildVerificationLevel[GuildVerificationLevel["High"] = 3] = "High";
    /**
     * Must have a verified phone number
     */
    GuildVerificationLevel[GuildVerificationLevel["VeryHigh"] = 4] = "VeryHigh";
})(GuildVerificationLevel || (exports.GuildVerificationLevel = GuildVerificationLevel = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
 */
var GuildPremiumTier;
(function (GuildPremiumTier) {
    GuildPremiumTier[GuildPremiumTier["None"] = 0] = "None";
    GuildPremiumTier[GuildPremiumTier["Tier1"] = 1] = "Tier1";
    GuildPremiumTier[GuildPremiumTier["Tier2"] = 2] = "Tier2";
    GuildPremiumTier[GuildPremiumTier["Tier3"] = 3] = "Tier3";
})(GuildPremiumTier || (exports.GuildPremiumTier = GuildPremiumTier = {}));
var GuildHubType;
(function (GuildHubType) {
    GuildHubType[GuildHubType["Default"] = 0] = "Default";
    GuildHubType[GuildHubType["HighSchool"] = 1] = "HighSchool";
    GuildHubType[GuildHubType["College"] = 2] = "College";
})(GuildHubType || (exports.GuildHubType = GuildHubType = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
 */
var GuildSystemChannelFlags;
(function (GuildSystemChannelFlags) {
    /**
     * Suppress member join notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
    /**
     * Suppress server boost notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
    /**
     * Suppress server setup tips
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
    /**
     * Hide member join sticker reply buttons
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
    /**
     * Suppress role subscription purchase and renewal notifications
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
    /**
     * Hide role subscription sticker reply buttons
     */
    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotificationReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationReplies";
})(GuildSystemChannelFlags || (exports.GuildSystemChannelFlags = GuildSystemChannelFlags = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
var GuildFeature;
(function (GuildFeature) {
    /**
     * Guild has access to set an animated guild banner image
     */
    GuildFeature["AnimatedBanner"] = "ANIMATED_BANNER";
    /**
     * Guild has access to set an animated guild icon
     */
    GuildFeature["AnimatedIcon"] = "ANIMATED_ICON";
    /**
     * Guild is using the old permissions configuration behavior
     *
     * See https://discord.com/developers/docs/change-log#upcoming-application-command-permission-changes
     */
    GuildFeature["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
    /**
     * Guild has set up auto moderation rules
     */
    GuildFeature["AutoModeration"] = "AUTO_MODERATION";
    /**
     * Guild has access to set a guild banner image
     */
    GuildFeature["Banner"] = "BANNER";
    /**
     * Guild can enable welcome screen, Membership Screening and discovery, and receives community updates
     */
    GuildFeature["Community"] = "COMMUNITY";
    /**
     * Guild has enabled monetization
     */
    GuildFeature["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
    /**
     * Guild has enabled the role subscription promo page
     */
    GuildFeature["CreatorStorePage"] = "CREATOR_STORE_PAGE";
    /**
     * Guild has been set as a support server on the App Directory
     */
    GuildFeature["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
    /**
     * Guild is able to be discovered in the directory
     */
    GuildFeature["Discoverable"] = "DISCOVERABLE";
    /**
     * Guild is able to be featured in the directory
     */
    GuildFeature["Featurable"] = "FEATURABLE";
    /**
     * Guild is listed in a directory channel
     */
    GuildFeature["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
    /**
     * Guild is a Student Hub
     *
     * See https://support.discord.com/hc/articles/4406046651927
     *
     * @unstable This feature is currently not documented by Discord, but has known value
     */
    GuildFeature["Hub"] = "HUB";
    /**
     * Guild has disabled invite usage, preventing users from joining
     */
    GuildFeature["InvitesDisabled"] = "INVITES_DISABLED";
    /**
     * Guild has access to set an invite splash background
     */
    GuildFeature["InviteSplash"] = "INVITE_SPLASH";
    /**
     * Guild is in a Student Hub
     *
     * See https://support.discord.com/hc/articles/4406046651927
     *
     * @unstable This feature is currently not documented by Discord, but has known value
     */
    GuildFeature["LinkedToHub"] = "LINKED_TO_HUB";
    /**
     * Guild has enabled Membership Screening
     */
    GuildFeature["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    /**
     * Guild has enabled monetization
     *
     * @unstable This feature is no longer documented by Discord
     */
    GuildFeature["MonetizationEnabled"] = "MONETIZATION_ENABLED";
    /**
     * Guild has increased custom sticker slots
     */
    GuildFeature["MoreStickers"] = "MORE_STICKERS";
    /**
     * Guild has access to create news channels
     */
    GuildFeature["News"] = "NEWS";
    /**
     * Guild is partnered
     */
    GuildFeature["Partnered"] = "PARTNERED";
    /**
     * Guild can be previewed before joining via Membership Screening or the directory
     */
    GuildFeature["PreviewEnabled"] = "PREVIEW_ENABLED";
    /**
     * Guild has access to create private threads
     */
    GuildFeature["PrivateThreads"] = "PRIVATE_THREADS";
    /**
     * Guild has disabled alerts for join raids in the configured safety alerts channel
     */
    GuildFeature["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
    GuildFeature["RelayEnabled"] = "RELAY_ENABLED";
    /**
     * Guild is able to set role icons
     */
    GuildFeature["RoleIcons"] = "ROLE_ICONS";
    /**
     * Guild has role subscriptions that can be purchased
     */
    GuildFeature["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
    /**
     * Guild has enabled role subscriptions
     */
    GuildFeature["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
    /**
     * Guild has enabled ticketed events
     */
    GuildFeature["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
    /**
     * Guild has access to set a vanity URL
     */
    GuildFeature["VanityURL"] = "VANITY_URL";
    /**
     * Guild is verified
     */
    GuildFeature["Verified"] = "VERIFIED";
    /**
     * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
     */
    GuildFeature["VIPRegions"] = "VIP_REGIONS";
    /**
     * Guild has enabled the welcome screen
     */
    GuildFeature["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
})(GuildFeature || (exports.GuildFeature = GuildFeature = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags
 */
var GuildMemberFlags;
(function (GuildMemberFlags) {
    /**
     * Member has left and rejoined the guild
     */
    GuildMemberFlags[GuildMemberFlags["DidRejoin"] = 1] = "DidRejoin";
    /**
     * Member has completed onboarding
     */
    GuildMemberFlags[GuildMemberFlags["CompletedOnboarding"] = 2] = "CompletedOnboarding";
    /**
     * Member bypasses guild verification requirements
     */
    GuildMemberFlags[GuildMemberFlags["BypassesVerification"] = 4] = "BypassesVerification";
    /**
     * Member has started onboarding
     */
    GuildMemberFlags[GuildMemberFlags["StartedOnboarding"] = 8] = "StartedOnboarding";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["StartedHomeActions"] = 32] = "StartedHomeActions";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["CompletedHomeActions"] = 64] = "CompletedHomeActions";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedUsernameOrGuildNickname"] = 128] = "AutomodQuarantinedUsernameOrGuildNickname";
    /**
     * @unstable This guild member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedBio"] = 256] = "AutomodQuarantinedBio";
})(GuildMemberFlags || (exports.GuildMemberFlags = GuildMemberFlags = {}));
/**
 * https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
 */
var IntegrationExpireBehavior;
(function (IntegrationExpireBehavior) {
    IntegrationExpireBehavior[IntegrationExpireBehavior["RemoveRole"] = 0] = "RemoveRole";
    IntegrationExpireBehavior[IntegrationExpireBehavior["Kick"] = 1] = "Kick";
})(IntegrationExpireBehavior || (exports.IntegrationExpireBehavior = IntegrationExpireBehavior = {}));
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
 */
var GuildWidgetStyle;
(function (GuildWidgetStyle) {
    /**
     * Shield style widget with Discord icon and guild members online count
     */
    GuildWidgetStyle["Shield"] = "shield";
    /**
     * Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
     */
    GuildWidgetStyle["Banner1"] = "banner1";
    /**
     * Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
     */
    GuildWidgetStyle["Banner2"] = "banner2";
    /**
     * Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
     */
    GuildWidgetStyle["Banner3"] = "banner3";
    /**
     * Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget
     * and a "JOIN MY SERVER" button at the bottom
     */
    GuildWidgetStyle["Banner4"] = "banner4";
})(GuildWidgetStyle || (exports.GuildWidgetStyle = GuildWidgetStyle = {}));
var MembershipScreeningFieldType;
(function (MembershipScreeningFieldType) {
    /**
     * Server Rules
     */
    MembershipScreeningFieldType["Terms"] = "TERMS";
})(MembershipScreeningFieldType || (exports.MembershipScreeningFieldType = MembershipScreeningFieldType = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode
 */
var GuildOnboardingMode;
(function (GuildOnboardingMode) {
    /**
     * Counts only Default Channels towards constraints
     */
    GuildOnboardingMode[GuildOnboardingMode["OnboardingDefault"] = 0] = "OnboardingDefault";
    /**
     * Counts Default Channels and Questions towards constraints
     */
    GuildOnboardingMode[GuildOnboardingMode["OnboardingAdvanced"] = 1] = "OnboardingAdvanced";
})(GuildOnboardingMode || (exports.GuildOnboardingMode = GuildOnboardingMode = {}));
/**
 * https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types
 */
var GuildOnboardingPromptType;
(function (GuildOnboardingPromptType) {
    GuildOnboardingPromptType[GuildOnboardingPromptType["MultipleChoice"] = 0] = "MultipleChoice";
    GuildOnboardingPromptType[GuildOnboardingPromptType["Dropdown"] = 1] = "Dropdown";
})(GuildOnboardingPromptType || (exports.GuildOnboardingPromptType = GuildOnboardingPromptType = {}));
//# sourceMappingURL=guild.js.map

/***/ }),

/***/ 8946:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GuildScheduledEventPrivacyLevel = exports.GuildScheduledEventStatus = exports.GuildScheduledEventEntityType = void 0;
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types
 */
var GuildScheduledEventEntityType;
(function (GuildScheduledEventEntityType) {
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["StageInstance"] = 1] = "StageInstance";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["Voice"] = 2] = "Voice";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["External"] = 3] = "External";
})(GuildScheduledEventEntityType || (exports.GuildScheduledEventEntityType = GuildScheduledEventEntityType = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status
 */
var GuildScheduledEventStatus;
(function (GuildScheduledEventStatus) {
    GuildScheduledEventStatus[GuildScheduledEventStatus["Scheduled"] = 1] = "Scheduled";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Active"] = 2] = "Active";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Completed"] = 3] = "Completed";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Canceled"] = 4] = "Canceled";
})(GuildScheduledEventStatus || (exports.GuildScheduledEventStatus = GuildScheduledEventStatus = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level
 */
var GuildScheduledEventPrivacyLevel;
(function (GuildScheduledEventPrivacyLevel) {
    /**
     * The scheduled event is only accessible to guild members
     */
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(GuildScheduledEventPrivacyLevel || (exports.GuildScheduledEventPrivacyLevel = GuildScheduledEventPrivacyLevel = {}));
//# sourceMappingURL=guildScheduledEvent.js.map

/***/ }),

/***/ 2672:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3363), exports);
__exportStar(__webpack_require__(6414), exports);
__exportStar(__webpack_require__(4877), exports);
__exportStar(__webpack_require__(9825), exports);
__exportStar(__webpack_require__(9763), exports);
__exportStar(__webpack_require__(6462), exports);
__exportStar(__webpack_require__(1130), exports);
__exportStar(__webpack_require__(8487), exports);
__exportStar(__webpack_require__(8946), exports);
__exportStar(__webpack_require__(4711), exports);
__exportStar(__webpack_require__(6143), exports);
__exportStar(__webpack_require__(941), exports);
__exportStar(__webpack_require__(1647), exports);
__exportStar(__webpack_require__(464), exports);
__exportStar(__webpack_require__(8269), exports);
__exportStar(__webpack_require__(7259), exports);
__exportStar(__webpack_require__(8766), exports);
__exportStar(__webpack_require__(2656), exports);
__exportStar(__webpack_require__(7893), exports);
__exportStar(__webpack_require__(4626), exports);
__exportStar(__webpack_require__(617), exports);
__exportStar(__webpack_require__(4111), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4711:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5691), exports);
__exportStar(__webpack_require__(899), exports);
__exportStar(__webpack_require__(5438), exports);
__exportStar(__webpack_require__(7960), exports);
__exportStar(__webpack_require__(3709), exports);
__exportStar(__webpack_require__(199), exports);
__exportStar(__webpack_require__(1235), exports);
//# sourceMappingURL=interactions.js.map

/***/ }),

/***/ 6143:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/invite
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InviteTargetType = exports.InviteType = void 0;
/**
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-types
 */
var InviteType;
(function (InviteType) {
    InviteType[InviteType["Guild"] = 0] = "Guild";
    InviteType[InviteType["GroupDM"] = 1] = "GroupDM";
    InviteType[InviteType["Friend"] = 2] = "Friend";
})(InviteType || (exports.InviteType = InviteType = {}));
/**
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types
 */
var InviteTargetType;
(function (InviteTargetType) {
    InviteTargetType[InviteTargetType["Stream"] = 1] = "Stream";
    InviteTargetType[InviteTargetType["EmbeddedApplication"] = 2] = "EmbeddedApplication";
})(InviteTargetType || (exports.InviteTargetType = InviteTargetType = {}));
//# sourceMappingURL=invite.js.map

/***/ }),

/***/ 4111:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SKUType = exports.SKUFlags = exports.EntitlementType = void 0;
/**
 * https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types
 */
var EntitlementType;
(function (EntitlementType) {
    /**
     * Entitlement was purchased by user
     */
    EntitlementType[EntitlementType["Purchase"] = 1] = "Purchase";
    /**
     * Entitlement for Discord Nitro subscription
     */
    EntitlementType[EntitlementType["PremiumSubscription"] = 2] = "PremiumSubscription";
    /**
     * Entitlement was gifted by developer
     */
    EntitlementType[EntitlementType["DeveloperGift"] = 3] = "DeveloperGift";
    /**
     * Entitlement was purchased by a dev in application test mode
     */
    EntitlementType[EntitlementType["TestModePurchase"] = 4] = "TestModePurchase";
    /**
     * Entitlement was granted when the SKU was free
     */
    EntitlementType[EntitlementType["FreePurchase"] = 5] = "FreePurchase";
    /**
     * Entitlement was gifted by another user
     */
    EntitlementType[EntitlementType["UserGift"] = 6] = "UserGift";
    /**
     * Entitlement was claimed by user for free as a Nitro Subscriber
     */
    EntitlementType[EntitlementType["PremiumPurchase"] = 7] = "PremiumPurchase";
    /**
     * Entitlement was purchased as an app subscription
     */
    EntitlementType[EntitlementType["ApplicationSubscription"] = 8] = "ApplicationSubscription";
})(EntitlementType || (exports.EntitlementType = EntitlementType = {}));
/**
 * https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags
 */
var SKUFlags;
(function (SKUFlags) {
    /**
     * SKU is available for purchase
     */
    SKUFlags[SKUFlags["Available"] = 4] = "Available";
    /**
     * Recurring SKU that can be purchased by a user and applied to a single server.
     * Grants access to every user in that server.
     */
    SKUFlags[SKUFlags["GuildSubscription"] = 128] = "GuildSubscription";
    /**
     * Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.
     */
    SKUFlags[SKUFlags["UserSubscription"] = 256] = "UserSubscription";
})(SKUFlags || (exports.SKUFlags = SKUFlags = {}));
var SKUType;
(function (SKUType) {
    /**
     * Durable one-time purchase
     */
    SKUType[SKUType["Durable"] = 2] = "Durable";
    /**
     * Consumable one-time purchase
     */
    SKUType[SKUType["Consumable"] = 3] = "Consumable";
    /**
     * Represents a recurring subscription
     */
    SKUType[SKUType["Subscription"] = 5] = "Subscription";
    /**
     * System-generated group for each Subscription SKU created
     */
    SKUType[SKUType["SubscriptionGroup"] = 6] = "SubscriptionGroup";
})(SKUType || (exports.SKUType = SKUType = {}));
//# sourceMappingURL=monetization.js.map

/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/topics/oauth2
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OAuth2Scopes = void 0;
var OAuth2Scopes;
(function (OAuth2Scopes) {
    /**
     * For oauth2 bots, this puts the bot in the user's selected guild by default
     */
    OAuth2Scopes["Bot"] = "bot";
    /**
     * Allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections)
     * to return linked third-party accounts
     *
     * See https://discord.com/developers/docs/resources/user#get-user-connections
     */
    OAuth2Scopes["Connections"] = "connections";
    /**
     * Allows your app to see information about the user's DMs and group DMs - requires Discord approval
     */
    OAuth2Scopes["DMChannelsRead"] = "dm_channels.read";
    /**
     * Enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email`
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user
     */
    OAuth2Scopes["Email"] = "email";
    /**
     * Allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email`
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user
     */
    OAuth2Scopes["Identify"] = "identify";
    /**
     * Allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds)
     * to return basic information about all of a user's guilds
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user-guilds
     */
    OAuth2Scopes["Guilds"] = "guilds";
    /**
     * Allows [/guilds/{guild.id}/members/{user.id}](https://discord.com/developers/docs/resources/guild#add-guild-member)
     * to be used for joining users to a guild
     *
     * See https://discord.com/developers/docs/resources/guild#add-guild-member
     */
    OAuth2Scopes["GuildsJoin"] = "guilds.join";
    /**
     * Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild
     *
     * See https://discord.com/developers/docs/resources/user#get-current-user-guild-member
     */
    OAuth2Scopes["GuildsMembersRead"] = "guilds.members.read";
    /**
     * Allows your app to join users to a group dm
     *
     * See https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
     */
    OAuth2Scopes["GroupDMJoins"] = "gdm.join";
    /**
     * For local rpc server api access, this allows you to read messages from all client channels
     * (otherwise restricted to channels/guilds your app creates)
     */
    OAuth2Scopes["MessagesRead"] = "messages.read";
    /**
     * Allows your app to update a user's connection and metadata for the app
     */
    OAuth2Scopes["RoleConnectionsWrite"] = "role_connections.write";
    /**
     * For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
     */
    OAuth2Scopes["RPC"] = "rpc";
    /**
     * For local rpc server api access, this allows you to receive notifications pushed out to the user - requires Discord approval
     */
    OAuth2Scopes["RPCNotificationsRead"] = "rpc.notifications.read";
    /**
     * This generates a webhook that is returned in the oauth token response for authorization code grants
     */
    OAuth2Scopes["WebhookIncoming"] = "webhook.incoming";
    /**
     * Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
     */
    OAuth2Scopes["Voice"] = "voice";
    /**
     * Allows your app to upload/update builds for a user's applications - requires Discord approval
     */
    OAuth2Scopes["ApplicationsBuildsUpload"] = "applications.builds.upload";
    /**
     * Allows your app to read build data for a user's applications
     */
    OAuth2Scopes["ApplicationsBuildsRead"] = "applications.builds.read";
    /**
     * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications
     */
    OAuth2Scopes["ApplicationsStoreUpdate"] = "applications.store.update";
    /**
     * Allows your app to read entitlements for a user's applications
     */
    OAuth2Scopes["ApplicationsEntitlements"] = "applications.entitlements";
    /**
     * Allows your app to know a user's friends and implicit relationships - requires Discord approval
     */
    OAuth2Scopes["RelationshipsRead"] = "relationships.read";
    /**
     * Allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval
     */
    OAuth2Scopes["ActivitiesRead"] = "activities.read";
    /**
     * Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)
     *
     * See https://discord.com/developers/docs/game-sdk/activities
     */
    OAuth2Scopes["ActivitiesWrite"] = "activities.write";
    /**
     * Allows your app to use Application Commands in a guild
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationsCommands"] = "applications.commands";
    /**
     * Allows your app to update its Application Commands via this bearer token - client credentials grant only
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationsCommandsUpdate"] = "applications.commands.update";
    /**
     * Allows your app to update permissions for its commands using a Bearer token - client credentials grant only
     *
     * See https://discord.com/developers/docs/interactions/application-commands
     */
    OAuth2Scopes["ApplicationCommandsPermissionsUpdate"] = "applications.commands.permissions.update";
})(OAuth2Scopes || (exports.OAuth2Scopes = OAuth2Scopes = {}));
//# sourceMappingURL=oauth2.js.map

/***/ }),

/***/ 464:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/topics/permissions
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleFlags = void 0;
/**
 * https://discord.com/developers/docs/topics/permissions#role-object-role-flags
 */
var RoleFlags;
(function (RoleFlags) {
    /**
     * Role can be selected by members in an onboarding prompt
     */
    RoleFlags[RoleFlags["InPrompt"] = 1] = "InPrompt";
})(RoleFlags || (exports.RoleFlags = RoleFlags = {}));
//# sourceMappingURL=permissions.js.map

/***/ }),

/***/ 1647:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/poll
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PollLayoutType = void 0;
/**
 * https://discord.com/developers/docs/resources/poll#layout-type
 */
var PollLayoutType;
(function (PollLayoutType) {
    /**
     * The, uhm, default layout type
     */
    PollLayoutType[PollLayoutType["Default"] = 1] = "Default";
})(PollLayoutType || (exports.PollLayoutType = PollLayoutType = {}));
//# sourceMappingURL=poll.js.map

/***/ }),

/***/ 8269:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StageInstancePrivacyLevel = void 0;
/**
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
 */
var StageInstancePrivacyLevel;
(function (StageInstancePrivacyLevel) {
    /**
     * The stage instance is visible publicly, such as on stage discovery
     *
     * @deprecated
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["Public"] = 1] = "Public";
    /**
     * The stage instance is visible to only guild members
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(StageInstancePrivacyLevel || (exports.StageInstancePrivacyLevel = StageInstancePrivacyLevel = {}));
//# sourceMappingURL=stageInstance.js.map

/***/ }),

/***/ 7259:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/sticker
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StickerFormatType = exports.StickerType = void 0;
/**
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types
 */
var StickerType;
(function (StickerType) {
    /**
     * An official sticker in a pack
     */
    StickerType[StickerType["Standard"] = 1] = "Standard";
    /**
     * A sticker uploaded to a guild for the guild's members
     */
    StickerType[StickerType["Guild"] = 2] = "Guild";
})(StickerType || (exports.StickerType = StickerType = {}));
/**
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types
 */
var StickerFormatType;
(function (StickerFormatType) {
    StickerFormatType[StickerFormatType["PNG"] = 1] = "PNG";
    StickerFormatType[StickerFormatType["APNG"] = 2] = "APNG";
    StickerFormatType[StickerFormatType["Lottie"] = 3] = "Lottie";
    StickerFormatType[StickerFormatType["GIF"] = 4] = "GIF";
})(StickerFormatType || (exports.StickerFormatType = StickerFormatType = {}));
//# sourceMappingURL=sticker.js.map

/***/ }),

/***/ 8766:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/topics/teams
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamMemberRole = exports.TeamMemberMembershipState = void 0;
/**
 * https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum
 */
var TeamMemberMembershipState;
(function (TeamMemberMembershipState) {
    TeamMemberMembershipState[TeamMemberMembershipState["Invited"] = 1] = "Invited";
    TeamMemberMembershipState[TeamMemberMembershipState["Accepted"] = 2] = "Accepted";
})(TeamMemberMembershipState || (exports.TeamMemberMembershipState = TeamMemberMembershipState = {}));
/**
 * https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types
 */
var TeamMemberRole;
(function (TeamMemberRole) {
    TeamMemberRole["Admin"] = "admin";
    TeamMemberRole["Developer"] = "developer";
    TeamMemberRole["ReadOnly"] = "read_only";
})(TeamMemberRole || (exports.TeamMemberRole = TeamMemberRole = {}));
//# sourceMappingURL=teams.js.map

/***/ }),

/***/ 2656:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/guild-template
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=template.js.map

/***/ }),

/***/ 7893:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/user
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionVisibility = exports.ConnectionService = exports.UserPremiumType = exports.UserFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/user#user-object-user-flags
 */
var UserFlags;
(function (UserFlags) {
    /**
     * Discord Employee
     */
    UserFlags[UserFlags["Staff"] = 1] = "Staff";
    /**
     * Partnered Server Owner
     */
    UserFlags[UserFlags["Partner"] = 2] = "Partner";
    /**
     * HypeSquad Events Member
     */
    UserFlags[UserFlags["Hypesquad"] = 4] = "Hypesquad";
    /**
     * Bug Hunter Level 1
     */
    UserFlags[UserFlags["BugHunterLevel1"] = 8] = "BugHunterLevel1";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["MFASMS"] = 16] = "MFASMS";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["PremiumPromoDismissed"] = 32] = "PremiumPromoDismissed";
    /**
     * House Bravery Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
    /**
     * House Brilliance Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
    /**
     * House Balance Member
     */
    UserFlags[UserFlags["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
    /**
     * Early Nitro Supporter
     */
    UserFlags[UserFlags["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
    /**
     * User is a [team](https://discord.com/developers/docs/topics/teams)
     */
    UserFlags[UserFlags["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["HasUnreadUrgentMessages"] = 8192] = "HasUnreadUrgentMessages";
    /**
     * Bug Hunter Level 2
     */
    UserFlags[UserFlags["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
    /**
     * Verified Bot
     */
    UserFlags[UserFlags["VerifiedBot"] = 65536] = "VerifiedBot";
    /**
     * Early Verified Bot Developer
     */
    UserFlags[UserFlags["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
    /**
     * Moderator Programs Alumni
     */
    UserFlags[UserFlags["CertifiedModerator"] = 262144] = "CertifiedModerator";
    /**
     * Bot uses only [HTTP interactions](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) and is shown in the online member list
     */
    UserFlags[UserFlags["BotHTTPInteractions"] = 524288] = "BotHTTPInteractions";
    /**
     * User has been identified as spammer
     *
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["Spammer"] = 1048576] = "Spammer";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    UserFlags[UserFlags["DisablePremium"] = 2097152] = "DisablePremium";
    /**
     * User is an [Active Developer](https://support-dev.discord.com/hc/articles/10113997751447)
     */
    UserFlags[UserFlags["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
    /**
     * User's account has been [quarantined](https://support.discord.com/hc/articles/6461420677527) based on recent activity
     *
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 44, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["Quarantined"] = 17592186044416] = "Quarantined";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 50, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["Collaborator"] = 1125899906842624] = "Collaborator";
    /**
     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     * @privateRemarks
     *
     * This value would be 1 << 51, but bit shifting above 1 << 30 requires bigints
     */
    UserFlags[UserFlags["RestrictedCollaborator"] = 2251799813685248] = "RestrictedCollaborator";
})(UserFlags || (exports.UserFlags = UserFlags = {}));
/**
 * https://discord.com/developers/docs/resources/user#user-object-premium-types
 */
var UserPremiumType;
(function (UserPremiumType) {
    UserPremiumType[UserPremiumType["None"] = 0] = "None";
    UserPremiumType[UserPremiumType["NitroClassic"] = 1] = "NitroClassic";
    UserPremiumType[UserPremiumType["Nitro"] = 2] = "Nitro";
    UserPremiumType[UserPremiumType["NitroBasic"] = 3] = "NitroBasic";
})(UserPremiumType || (exports.UserPremiumType = UserPremiumType = {}));
var ConnectionService;
(function (ConnectionService) {
    ConnectionService["BattleNet"] = "battlenet";
    ConnectionService["BungieNet"] = "bungie";
    ConnectionService["Domain"] = "domain";
    ConnectionService["eBay"] = "ebay";
    ConnectionService["EpicGames"] = "epicgames";
    ConnectionService["Facebook"] = "facebook";
    ConnectionService["GitHub"] = "github";
    ConnectionService["Instagram"] = "instagram";
    ConnectionService["LeagueOfLegends"] = "leagueoflegends";
    ConnectionService["PayPal"] = "paypal";
    ConnectionService["PlayStationNetwork"] = "playstation";
    ConnectionService["Reddit"] = "reddit";
    ConnectionService["RiotGames"] = "riotgames";
    ConnectionService["Spotify"] = "spotify";
    ConnectionService["Skype"] = "skype";
    ConnectionService["Steam"] = "steam";
    ConnectionService["TikTok"] = "tiktok";
    ConnectionService["Twitch"] = "twitch";
    ConnectionService["X"] = "twitter";
    /**
     * @deprecated This is the old name for {@apilink ConnectionService#X}
     */
    ConnectionService["Twitter"] = "twitter";
    ConnectionService["Xbox"] = "xbox";
    ConnectionService["YouTube"] = "youtube";
})(ConnectionService || (exports.ConnectionService = ConnectionService = {}));
var ConnectionVisibility;
(function (ConnectionVisibility) {
    /**
     * Invisible to everyone except the user themselves
     */
    ConnectionVisibility[ConnectionVisibility["None"] = 0] = "None";
    /**
     * Visible to everyone
     */
    ConnectionVisibility[ConnectionVisibility["Everyone"] = 1] = "Everyone";
})(ConnectionVisibility || (exports.ConnectionVisibility = ConnectionVisibility = {}));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 4626:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/voice
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=voice.js.map

/***/ }),

/***/ 617:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Types extracted from https://discord.com/developers/docs/resources/webhook
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookType = void 0;
var WebhookType;
(function (WebhookType) {
    /**
     * Incoming Webhooks can post messages to channels with a generated token
     */
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    /**
     * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
     */
    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
    /**
     * Application webhooks are webhooks used with Interactions
     */
    WebhookType[WebhookType["Application"] = 3] = "Application";
})(WebhookType || (exports.WebhookType = WebhookType = {}));
//# sourceMappingURL=webhook.js.map

/***/ }),

/***/ 7172:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Locale = exports.RESTJSONErrorCodes = void 0;
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes
 */
var RESTJSONErrorCodes;
(function (RESTJSONErrorCodes) {
    RESTJSONErrorCodes[RESTJSONErrorCodes["GeneralError"] = 0] = "GeneralError";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownAccount"] = 10001] = "UnknownAccount";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplication"] = 10002] = "UnknownApplication";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownChannel"] = 10003] = "UnknownChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuild"] = 10004] = "UnknownGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownIntegration"] = 10005] = "UnknownIntegration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInvite"] = 10006] = "UnknownInvite";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMember"] = 10007] = "UnknownMember";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMessage"] = 10008] = "UnknownMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPermissionOverwrite"] = 10009] = "UnknownPermissionOverwrite";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownProvider"] = 10010] = "UnknownProvider";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRole"] = 10011] = "UnknownRole";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownToken"] = 10012] = "UnknownToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownUser"] = 10013] = "UnknownUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEmoji"] = 10014] = "UnknownEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhook"] = 10015] = "UnknownWebhook";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhookService"] = 10016] = "UnknownWebhookService";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSession"] = 10020] = "UnknownSession";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBan"] = 10026] = "UnknownBan";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSKU"] = 10027] = "UnknownSKU";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreListing"] = 10028] = "UnknownStoreListing";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEntitlement"] = 10029] = "UnknownEntitlement";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBuild"] = 10030] = "UnknownBuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownLobby"] = 10031] = "UnknownLobby";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBranch"] = 10032] = "UnknownBranch";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreDirectoryLayout"] = 10033] = "UnknownStoreDirectoryLayout";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRedistributable"] = 10036] = "UnknownRedistributable";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGiftCode"] = 10038] = "UnknownGiftCode";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStream"] = 10049] = "UnknownStream";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPremiumServerSubscribeCooldown"] = 10050] = "UnknownPremiumServerSubscribeCooldown";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildTemplate"] = 10057] = "UnknownGuildTemplate";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownDiscoverableServerCategory"] = 10059] = "UnknownDiscoverableServerCategory";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSticker"] = 10060] = "UnknownSticker";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInteraction"] = 10062] = "UnknownInteraction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommand"] = 10063] = "UnknownApplicationCommand";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownVoiceState"] = 10065] = "UnknownVoiceState";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommandPermissions"] = 10066] = "UnknownApplicationCommandPermissions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStageInstance"] = 10067] = "UnknownStageInstance";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildMemberVerificationForm"] = 10068] = "UnknownGuildMemberVerificationForm";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildWelcomeScreen"] = 10069] = "UnknownGuildWelcomeScreen";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEvent"] = 10070] = "UnknownGuildScheduledEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEventUser"] = 10071] = "UnknownGuildScheduledEventUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownTag"] = 10087] = "UnknownTag";
    RESTJSONErrorCodes[RESTJSONErrorCodes["BotsCannotUseThisEndpoint"] = 20001] = "BotsCannotUseThisEndpoint";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyBotsCanUseThisEndpoint"] = 20002] = "OnlyBotsCanUseThisEndpoint";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ExplicitContentCannotBeSentToTheDesiredRecipient"] = 20009] = "ExplicitContentCannotBeSentToTheDesiredRecipient";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NotAuthorizedToPerformThisActionOnThisApplication"] = 20012] = "NotAuthorizedToPerformThisActionOnThisApplication";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ActionCannotBePerformedDueToSlowmodeRateLimit"] = 20016] = "ActionCannotBePerformedDueToSlowmodeRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheMazeIsntMeantForYou"] = 20017] = "TheMazeIsntMeantForYou";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyTheOwnerOfThisAccountCanPerformThisAction"] = 20018] = "OnlyTheOwnerOfThisAccountCanPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["AnnouncementEditLimitExceeded"] = 20022] = "AnnouncementEditLimitExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UnderMinimumAge"] = 20024] = "UnderMinimumAge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelSendRateLimit"] = 20028] = "ChannelSendRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerSendRateLimit"] = 20029] = "ServerSendRateLimit";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords"] = 20031] = "StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildPremiumSubscriptionLevelTooLow"] = 20035] = "GuildPremiumSubscriptionLevelTooLow";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildsReached"] = 30001] = "MaximumNumberOfGuildsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfFriendsReached"] = 30002] = "MaximumNumberOfFriendsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinsReachedForTheChannel"] = 30003] = "MaximumNumberOfPinsReachedForTheChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfRecipientsReached"] = 30004] = "MaximumNumberOfRecipientsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildRolesReached"] = 30005] = "MaximumNumberOfGuildRolesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksReached"] = 30007] = "MaximumNumberOfWebhooksReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEmojisReached"] = 30008] = "MaximumNumberOfEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfReactionsReached"] = 30010] = "MaximumNumberOfReactionsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGroupDMsReached"] = 30011] = "MaximumNumberOfGroupDMsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildChannelsReached"] = 30013] = "MaximumNumberOfGuildChannelsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAttachmentsInAMessageReached"] = 30015] = "MaximumNumberOfAttachmentsInAMessageReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfInvitesReached"] = 30016] = "MaximumNumberOfInvitesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAnimatedEmojisReached"] = 30018] = "MaximumNumberOfAnimatedEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerMembersReached"] = 30019] = "MaximumNumberOfServerMembersReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerCategoriesReached"] = 30030] = "MaximumNumberOfServerCategoriesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildAlreadyHasTemplate"] = 30031] = "GuildAlreadyHasTemplate";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfApplicationCommandsReached"] = 30032] = "MaximumNumberOfApplicationCommandsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumThreadParticipantsReached"] = 30033] = "MaximumThreadParticipantsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumDailyApplicationCommandCreatesReached"] = 30034] = "MaximumDailyApplicationCommandCreatesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfNonGuildMemberBansHasBeenExceeded"] = 30035] = "MaximumNumberOfNonGuildMemberBansHasBeenExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfBanFetchesHasBeenReached"] = 30037] = "MaximumNumberOfBanFetchesHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfUncompletedGuildScheduledEventsReached"] = 30038] = "MaximumNumberOfUncompletedGuildScheduledEventsReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfStickersReached"] = 30039] = "MaximumNumberOfStickersReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPruneRequestsHasBeenReached"] = 30040] = "MaximumNumberOfPruneRequestsHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached"] = 30042] = "MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEditsToMessagesOlderThanOneHourReached"] = 30046] = "MaximumNumberOfEditsToMessagesOlderThanOneHourReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinnedThreadsInForumHasBeenReached"] = 30047] = "MaximumNumberOfPinnedThreadsInForumHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfTagsInForumHasBeenReached"] = 30048] = "MaximumNumberOfTagsInForumHasBeenReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["BitrateIsTooHighForChannelOfThisType"] = 30052] = "BitrateIsTooHighForChannelOfThisType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPremiumEmojisReached"] = 30056] = "MaximumNumberOfPremiumEmojisReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksPerGuildReached"] = 30058] = "MaximumNumberOfWebhooksPerGuildReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfChannelPermissionOverwritesReached"] = 30060] = "MaximumNumberOfChannelPermissionOverwritesReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheChannelsForThisGuildAreTooLarge"] = 30061] = "TheChannelsForThisGuildAreTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["Unauthorized"] = 40001] = "Unauthorized";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VerifyYourAccount"] = 40002] = "VerifyYourAccount";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OpeningDirectMessagesTooFast"] = 40003] = "OpeningDirectMessagesTooFast";
    RESTJSONErrorCodes[RESTJSONErrorCodes["SendMessagesHasBeenTemporarilyDisabled"] = 40004] = "SendMessagesHasBeenTemporarilyDisabled";
    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestEntityTooLarge"] = 40005] = "RequestEntityTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FeatureTemporarilyDisabledServerSide"] = 40006] = "FeatureTemporarilyDisabledServerSide";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UserBannedFromThisGuild"] = 40007] = "UserBannedFromThisGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ConnectionHasBeenRevoked"] = 40012] = "ConnectionHasBeenRevoked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TargetUserIsNotConnectedToVoice"] = 40032] = "TargetUserIsNotConnectedToVoice";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThisMessageWasAlreadyCrossposted"] = 40033] = "ThisMessageWasAlreadyCrossposted";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationCommandWithThatNameAlreadyExists"] = 40041] = "ApplicationCommandWithThatNameAlreadyExists";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationInteractionFailedToSend"] = 40043] = "ApplicationInteractionFailedToSend";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAMessageInAForumChannel"] = 40058] = "CannotSendAMessageInAForumChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InteractionHasAlreadyBeenAcknowledged"] = 40060] = "InteractionHasAlreadyBeenAcknowledged";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TagNamesMustBeUnique"] = 40061] = "TagNamesMustBeUnique";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServiceResourceIsBeingRateLimited"] = 40062] = "ServiceResourceIsBeingRateLimited";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThereAreNoTagsAvailableThatCanBeSetByNonModerators"] = 40066] = "ThereAreNoTagsAvailableThatCanBeSetByNonModerators";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TagRequiredToCreateAForumPostInThisChannel"] = 40067] = "TagRequiredToCreateAForumPostInThisChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["AnEntitlementHasAlreadyBeenGrantedForThisResource"] = 40074] = "AnEntitlementHasAlreadyBeenGrantedForThisResource";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingAccess"] = 50001] = "MissingAccess";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAccountType"] = 50002] = "InvalidAccountType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnDMChannel"] = 50003] = "CannotExecuteActionOnDMChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildWidgetDisabled"] = 50004] = "GuildWidgetDisabled";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditMessageAuthoredByAnotherUser"] = 50005] = "CannotEditMessageAuthoredByAnotherUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAnEmptyMessage"] = 50006] = "CannotSendAnEmptyMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesToThisUser"] = 50007] = "CannotSendMessagesToThisUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesInNonTextChannel"] = 50008] = "CannotSendMessagesInNonTextChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelVerificationLevelTooHighForYouToGainAccess"] = 50009] = "ChannelVerificationLevelTooHighForYouToGainAccess";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationDoesNotHaveBot"] = 50010] = "OAuth2ApplicationDoesNotHaveBot";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationLimitReached"] = 50011] = "OAuth2ApplicationLimitReached";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2State"] = 50012] = "InvalidOAuth2State";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingPermissions"] = 50013] = "MissingPermissions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidToken"] = 50014] = "InvalidToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NoteWasTooLong"] = 50015] = "NoteWasTooLong";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedTooFewOrTooManyMessagesToDelete"] = 50016] = "ProvidedTooFewOrTooManyMessagesToDelete";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMFALevel"] = 50017] = "InvalidMFALevel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageCanOnlyBePinnedInTheChannelItWasSentIn"] = 50019] = "MessageCanOnlyBePinnedInTheChannelItWasSentIn";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteCodeInvalidOrTaken"] = 50020] = "InviteCodeInvalidOrTaken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnSystemMessage"] = 50021] = "CannotExecuteActionOnSystemMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnThisChannelType"] = 50024] = "CannotExecuteActionOnThisChannelType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2AccessToken"] = 50025] = "InvalidOAuth2AccessToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingRequiredOAuth2Scope"] = 50026] = "MissingRequiredOAuth2Scope";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidWebhookToken"] = 50027] = "InvalidWebhookToken";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRole"] = 50028] = "InvalidRole";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRecipients"] = 50033] = "InvalidRecipients";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OneOfTheMessagesProvidedWasTooOldForBulkDelete"] = 50034] = "OneOfTheMessagesProvidedWasTooOldForBulkDelete";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFormBodyOrContentType"] = 50035] = "InvalidFormBodyOrContentType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteAcceptedToGuildWithoutTheBotBeingIn"] = 50036] = "InviteAcceptedToGuildWithoutTheBotBeingIn";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActivityAction"] = 50039] = "InvalidActivityAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAPIVersion"] = 50041] = "InvalidAPIVersion";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FileUploadedExceedsMaximumSize"] = 50045] = "FileUploadedExceedsMaximumSize";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFileUploaded"] = 50046] = "InvalidFileUploaded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSelfRedeemThisGift"] = 50054] = "CannotSelfRedeemThisGift";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidGuild"] = 50055] = "InvalidGuild";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidSKU"] = 50057] = "InvalidSKU";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRequestOrigin"] = 50067] = "InvalidRequestOrigin";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMessageType"] = 50068] = "InvalidMessageType";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PaymentSourceRequiredToRedeemGift"] = 50070] = "PaymentSourceRequiredToRedeemGift";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotModifyASystemWebhook"] = 50073] = "CannotModifyASystemWebhook";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteChannelRequiredForCommunityGuilds"] = 50074] = "CannotDeleteChannelRequiredForCommunityGuilds";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditStickersWithinMessage"] = 50080] = "CannotEditStickersWithinMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidStickerSent"] = 50081] = "InvalidStickerSent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActionOnArchivedThread"] = 50083] = "InvalidActionOnArchivedThread";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidThreadNotificationSettings"] = 50084] = "InvalidThreadNotificationSettings";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ParameterEarlierThanCreation"] = 50085] = "ParameterEarlierThanCreation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CommunityServerChannelsMustBeTextChannels"] = 50086] = "CommunityServerChannelsMustBeTextChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor"] = 50091] = "TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNotAvailableInYourLocation"] = 50095] = "ServerNotAvailableInYourLocation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMonetizationEnabledToPerformThisAction"] = 50097] = "ServerNeedsMonetizationEnabledToPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMoreBoostsToPerformThisAction"] = 50101] = "ServerNeedsMoreBoostsToPerformThisAction";
    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestBodyContainsInvalidJSON"] = 50109] = "RequestBodyContainsInvalidJSON";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnerCannotBePendingMember"] = 50131] = "OwnerCannotBePendingMember";
    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnershipCannotBeMovedToABotUser"] = 50132] = "OwnershipCannotBeMovedToABotUser";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToResizeAssetBelowTheMinimumSize"] = 50138] = "FailedToResizeAssetBelowTheMinimumSize";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji"] = 50144] = "CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotConvertBetweenPremiumEmojiAndNormalEmoji"] = 50145] = "CannotConvertBetweenPremiumEmojiAndNormalEmoji";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedFileNotFound"] = 50146] = "UploadedFileNotFound";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesDoNotSupportAdditionalContent"] = 50159] = "VoiceMessagesDoNotSupportAdditionalContent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveASingleAudioAttachment"] = 50160] = "VoiceMessagesMustHaveASingleAudioAttachment";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveSupportingMetadata"] = 50161] = "VoiceMessagesMustHaveSupportingMetadata";
    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesCannotBeEdited"] = 50162] = "VoiceMessagesCannotBeEdited";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteGuildSubscriptionIntegration"] = 50163] = "CannotDeleteGuildSubscriptionIntegration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouCannotSendVoiceMessagesInThisChannel"] = 50173] = "YouCannotSendVoiceMessagesInThisChannel";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheUserAccountMustFirstBeVerified"] = 50178] = "TheUserAccountMustFirstBeVerified";
    RESTJSONErrorCodes[RESTJSONErrorCodes["YouDoNotHavePermissionToSendThisSticker"] = 50600] = "YouDoNotHavePermissionToSendThisSticker";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TwoFactorAuthenticationIsRequired"] = 60003] = "TwoFactorAuthenticationIsRequired";
    RESTJSONErrorCodes[RESTJSONErrorCodes["NoUsersWithDiscordTagExist"] = 80004] = "NoUsersWithDiscordTagExist";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ReactionWasBlocked"] = 90001] = "ReactionWasBlocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UserCannotUseBurstReactions"] = 90002] = "UserCannotUseBurstReactions";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationNotYetAvailable"] = 110001] = "ApplicationNotYetAvailable";
    RESTJSONErrorCodes[RESTJSONErrorCodes["APIResourceOverloaded"] = 130000] = "APIResourceOverloaded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TheStageIsAlreadyOpen"] = 150006] = "TheStageIsAlreadyOpen";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotReplyWithoutPermissionToReadMessageHistory"] = 160002] = "CannotReplyWithoutPermissionToReadMessageHistory";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadAlreadyCreatedForMessage"] = 160004] = "ThreadAlreadyCreatedForMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadLocked"] = 160005] = "ThreadLocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveThreads"] = 160006] = "MaximumActiveThreads";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveAnnouncementThreads"] = 160007] = "MaximumActiveAnnouncementThreads";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidJSONForUploadedLottieFile"] = 170001] = "InvalidJSONForUploadedLottieFile";
    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedLottiesCannotContainRasterizedImages"] = 170002] = "UploadedLottiesCannotContainRasterizedImages";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerMaximumFramerateExceeded"] = 170003] = "StickerMaximumFramerateExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFrameCountExceedsMaximumOf1000Frames"] = 170004] = "StickerFrameCountExceedsMaximumOf1000Frames";
    RESTJSONErrorCodes[RESTJSONErrorCodes["LottieAnimationMaximumDimensionsExceeded"] = 170005] = "LottieAnimationMaximumDimensionsExceeded";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFramerateIsTooSmallOrTooLarge"] = 170006] = "StickerFramerateIsTooSmallOrTooLarge";
    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerAnimationDurationExceedsMaximumOf5Seconds"] = 170007] = "StickerAnimationDurationExceedsMaximumOf5Seconds";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateAFinishedEvent"] = 180000] = "CannotUpdateAFinishedEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToCreateStageNeededForStageEvent"] = 180002] = "FailedToCreateStageNeededForStageEvent";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageWasBlockedByAutomaticModeration"] = 200000] = "MessageWasBlockedByAutomaticModeration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["TitleWasBlockedByAutomaticModeration"] = 200001] = "TitleWasBlockedByAutomaticModeration";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId"] = 220001] = "WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId"] = 220002] = "WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksCanOnlyCreateThreadsInForumChannels"] = 220003] = "WebhooksCanOnlyCreateThreadsInForumChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhookServicesCannotBeUsedInForumChannels"] = 220004] = "WebhookServicesCannotBeUsedInForumChannels";
    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageBlockedByHarmfulLinksFilter"] = 240000] = "MessageBlockedByHarmfulLinksFilter";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEnableOnboardingRequirementsAreNotMet"] = 350000] = "CannotEnableOnboardingRequirementsAreNotMet";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateOnboardingWhileBelowRequirements"] = 350001] = "CannotUpdateOnboardingWhileBelowRequirements";
    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToBanUsers"] = 500000] = "FailedToBanUsers";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PollVotingBlocked"] = 520000] = "PollVotingBlocked";
    RESTJSONErrorCodes[RESTJSONErrorCodes["PollExpired"] = 520001] = "PollExpired";
    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidChannelTypeForPollCreation"] = 520002] = "InvalidChannelTypeForPollCreation";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditAPollMessage"] = 520003] = "CannotEditAPollMessage";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUseAnEmojiIncludedWithThePoll"] = 520004] = "CannotUseAnEmojiIncludedWithThePoll";
    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExpireANonPollMessage"] = 520006] = "CannotExpireANonPollMessage";
})(RESTJSONErrorCodes || (exports.RESTJSONErrorCodes = RESTJSONErrorCodes = {}));
/**
 * https://discord.com/developers/docs/reference#locales
 */
var Locale;
(function (Locale) {
    Locale["Indonesian"] = "id";
    Locale["EnglishUS"] = "en-US";
    Locale["EnglishGB"] = "en-GB";
    Locale["Bulgarian"] = "bg";
    Locale["ChineseCN"] = "zh-CN";
    Locale["ChineseTW"] = "zh-TW";
    Locale["Croatian"] = "hr";
    Locale["Czech"] = "cs";
    Locale["Danish"] = "da";
    Locale["Dutch"] = "nl";
    Locale["Finnish"] = "fi";
    Locale["French"] = "fr";
    Locale["German"] = "de";
    Locale["Greek"] = "el";
    Locale["Hindi"] = "hi";
    Locale["Hungarian"] = "hu";
    Locale["Italian"] = "it";
    Locale["Japanese"] = "ja";
    Locale["Korean"] = "ko";
    Locale["Lithuanian"] = "lt";
    Locale["Norwegian"] = "no";
    Locale["Polish"] = "pl";
    Locale["PortugueseBR"] = "pt-BR";
    Locale["Romanian"] = "ro";
    Locale["Russian"] = "ru";
    Locale["SpanishES"] = "es-ES";
    Locale["SpanishLATAM"] = "es-419";
    Locale["Swedish"] = "sv-SE";
    Locale["Thai"] = "th";
    Locale["Turkish"] = "tr";
    Locale["Ukrainian"] = "uk";
    Locale["Vietnamese"] = "vi";
})(Locale || (exports.Locale = Locale = {}));
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 6015:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=application.js.map

/***/ }),

/***/ 8218:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=auditLog.js.map

/***/ }),

/***/ 2030:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=autoModeration.js.map

/***/ }),

/***/ 8422:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 1611:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=emoji.js.map

/***/ }),

/***/ 3603:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=gateway.js.map

/***/ }),

/***/ 8574:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=guild.js.map

/***/ }),

/***/ 9887:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=guildScheduledEvent.js.map

/***/ }),

/***/ 4569:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OAuth2Routes = exports.RouteBases = exports.CDNRoutes = exports.ImageFormat = exports.StickerPackApplicationId = exports.Routes = exports.APIVersion = void 0;
__exportStar(__webpack_require__(7172), exports);
__exportStar(__webpack_require__(6015), exports);
__exportStar(__webpack_require__(8218), exports);
__exportStar(__webpack_require__(2030), exports);
__exportStar(__webpack_require__(8422), exports);
__exportStar(__webpack_require__(1611), exports);
__exportStar(__webpack_require__(3603), exports);
__exportStar(__webpack_require__(8574), exports);
__exportStar(__webpack_require__(9887), exports);
__exportStar(__webpack_require__(2032), exports);
__exportStar(__webpack_require__(2320), exports);
__exportStar(__webpack_require__(3634), exports);
__exportStar(__webpack_require__(5056), exports);
__exportStar(__webpack_require__(3356), exports);
__exportStar(__webpack_require__(7870), exports);
__exportStar(__webpack_require__(1859), exports);
__exportStar(__webpack_require__(6750), exports);
__exportStar(__webpack_require__(8275), exports);
__exportStar(__webpack_require__(5400), exports);
__exportStar(__webpack_require__(9092), exports);
exports.APIVersion = '10';
exports.Routes = {
    /**
     * Route for:
     * - GET `/applications/{application.id}/role-connections/metadata`
     * - PUT `/applications/{application.id}/role-connections/metadata`
     */
    applicationRoleConnectionMetadata(applicationId) {
        return `/applications/${applicationId}/role-connections/metadata`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/auto-moderation/rules`
     * - POST `/guilds/{guild.id}/auto-moderation/rules`
     */
    guildAutoModerationRules(guildId) {
        return `/guilds/${guildId}/auto-moderation/rules`;
    },
    /**
     * Routes for:
     * - GET    `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
     * - PATCH  `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
     * - DELETE `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
     */
    guildAutoModerationRule(guildId, ruleId) {
        return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/audit-logs`
     */
    guildAuditLog(guildId) {
        return `/guilds/${guildId}/audit-logs`;
    },
    /**
     * Route for:
     * - GET    `/channels/{channel.id}`
     * - PATCH  `/channels/{channel.id}`
     * - DELETE `/channels/{channel.id}`
     */
    channel(channelId) {
        return `/channels/${channelId}`;
    },
    /**
     * Route for:
     * - GET  `/channels/{channel.id}/messages`
     * - POST `/channels/{channel.id}/messages`
     */
    channelMessages(channelId) {
        return `/channels/${channelId}/messages`;
    },
    /**
     * Route for:
     * - GET    `/channels/{channel.id}/messages/{message.id}`
     * - PATCH  `/channels/{channel.id}/messages/{message.id}`
     * - DELETE `/channels/{channel.id}/messages/{message.id}`
     */
    channelMessage(channelId, messageId) {
        return `/channels/${channelId}/messages/${messageId}`;
    },
    /**
     * Route for:
     * - POST `/channels/{channel.id}/messages/{message.id}/crosspost`
     */
    channelMessageCrosspost(channelId, messageId) {
        return `/channels/${channelId}/messages/${messageId}/crosspost`;
    },
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
     *
     * **Note**: You need to URL encode the emoji yourself
     */
    channelMessageOwnReaction(channelId, messageId, emoji) {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
    },
    /**
     * Route for:
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
     *
     * **Note**: You need to URL encode the emoji yourself
     */
    channelMessageUserReaction(channelId, messageId, emoji, userId) {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
    },
    /**
     * Route for:
     * - GET    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
     *
     * **Note**: You need to URL encode the emoji yourself
     */
    channelMessageReaction(channelId, messageId, emoji) {
        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
    },
    /**
     * Route for:
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions`
     */
    channelMessageAllReactions(channelId, messageId) {
        return `/channels/${channelId}/messages/${messageId}/reactions`;
    },
    /**
     * Route for:
     * - POST `/channels/{channel.id}/messages/bulk-delete`
     */
    channelBulkDelete(channelId) {
        return `/channels/${channelId}/messages/bulk-delete`;
    },
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/permissions/{overwrite.id}`
     * - DELETE `/channels/{channel.id}/permissions/{overwrite.id}`
     */
    channelPermission(channelId, overwriteId) {
        return `/channels/${channelId}/permissions/${overwriteId}`;
    },
    /**
     * Route for:
     * - GET  `/channels/{channel.id}/invites`
     * - POST `/channels/{channel.id}/invites`
     */
    channelInvites(channelId) {
        return `/channels/${channelId}/invites`;
    },
    /**
     * Route for:
     * - POST `/channels/{channel.id}/followers`
     */
    channelFollowers(channelId) {
        return `/channels/${channelId}/followers`;
    },
    /**
     * Route for:
     * - POST `/channels/{channel.id}/typing`
     */
    channelTyping(channelId) {
        return `/channels/${channelId}/typing`;
    },
    /**
     * Route for:
     * - GET `/channels/{channel.id}/pins`
     */
    channelPins(channelId) {
        return `/channels/${channelId}/pins`;
    },
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/pins/{message.id}`
     * - DELETE `/channels/{channel.id}/pins/{message.id}`
     */
    channelPin(channelId, messageId) {
        return `/channels/${channelId}/pins/${messageId}`;
    },
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/recipients/{user.id}`
     * - DELETE `/channels/{channel.id}/recipients/{user.id}`
     */
    channelRecipient(channelId, userId) {
        return `/channels/${channelId}/recipients/${userId}`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/emojis`
     * - POST `/guilds/{guild.id}/emojis`
     */
    guildEmojis(guildId) {
        return `/guilds/${guildId}/emojis`;
    },
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/emojis/{emoji.id}`
     * - PATCH  `/guilds/{guild.id}/emojis/{emoji.id}`
     * - DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
     */
    guildEmoji(guildId, emojiId) {
        return `/guilds/${guildId}/emojis/${emojiId}`;
    },
    /**
     * Route for:
     * - POST `/guilds`
     */
    guilds() {
        return '/guilds';
    },
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}`
     * - PATCH  `/guilds/{guild.id}`
     * - DELETE `/guilds/{guild.id}`
     */
    guild(guildId) {
        return `/guilds/${guildId}`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/preview`
     */
    guildPreview(guildId) {
        return `/guilds/${guildId}/preview`;
    },
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/channels`
     * - POST  `/guilds/{guild.id}/channels`
     * - PATCH `/guilds/{guild.id}/channels`
     */
    guildChannels(guildId) {
        return `/guilds/${guildId}/channels`;
    },
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/members/{user.id}`
     * - PUT    `/guilds/{guild.id}/members/{user.id}`
     * - PATCH  `/guilds/{guild.id}/members/@me`
     * - PATCH  `/guilds/{guild.id}/members/{user.id}`
     * - DELETE `/guilds/{guild.id}/members/{user.id}`
     */
    guildMember(guildId, userId = '@me') {
        return `/guilds/${guildId}/members/${userId}`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/members`
     */
    guildMembers(guildId) {
        return `/guilds/${guildId}/members`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/members/search`
     */
    guildMembersSearch(guildId) {
        return `/guilds/${guildId}/members/search`;
    },
    /**
     * Route for:
     * - PATCH `/guilds/{guild.id}/members/@me/nick`
     *
     * @deprecated Use {@link Routes.guildMember} instead.
     */
    guildCurrentMemberNickname(guildId) {
        return `/guilds/${guildId}/members/@me/nick`;
    },
    /**
     * Route for:
     * - PUT    `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
     * - DELETE `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
     */
    guildMemberRole(guildId, memberId, roleId) {
        return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
    },
    /**
     * Route for:
     * - POST `/guilds/{guild.id}/mfa`
     */
    guildMFA(guildId) {
        return `/guilds/${guildId}/mfa`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/bans`
     */
    guildBans(guildId) {
        return `/guilds/${guildId}/bans`;
    },
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/bans/{user.id}`
     * - PUT    `/guilds/{guild.id}/bans/{user.id}`
     * - DELETE `/guilds/{guild.id}/bans/{user.id}`
     */
    guildBan(guildId, userId) {
        return `/guilds/${guildId}/bans/${userId}`;
    },
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/roles`
     * - POST  `/guilds/{guild.id}/roles`
     * - PATCH `/guilds/{guild.id}/roles`
     */
    guildRoles(guildId) {
        return `/guilds/${guildId}/roles`;
    },
    /**
     * Route for:
     * - PATCH  `/guilds/{guild.id}/roles/{role.id}`
     * - DELETE `/guilds/{guild.id}/roles/{role.id}`
     */
    guildRole(guildId, roleId) {
        return `/guilds/${guildId}/roles/${roleId}`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/prune`
     * - POST `/guilds/{guild.id}/prune`
     */
    guildPrune(guildId) {
        return `/guilds/${guildId}/prune`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/regions`
     */
    guildVoiceRegions(guildId) {
        return `/guilds/${guildId}/regions`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/invites`
     */
    guildInvites(guildId) {
        return `/guilds/${guildId}/invites`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/integrations`
     */
    guildIntegrations(guildId) {
        return `/guilds/${guildId}/integrations`;
    },
    /**
     * Route for:
     * - DELETE `/guilds/{guild.id}/integrations/{integration.id}`
     */
    guildIntegration(guildId, integrationId) {
        return `/guilds/${guildId}/integrations/${integrationId}`;
    },
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/widget`
     * - PATCH `/guilds/{guild.id}/widget`
     */
    guildWidgetSettings(guildId) {
        return `/guilds/${guildId}/widget`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/widget.json`
     */
    guildWidgetJSON(guildId) {
        return `/guilds/${guildId}/widget.json`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/vanity-url`
     */
    guildVanityUrl(guildId) {
        return `/guilds/${guildId}/vanity-url`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/widget.png`
     */
    guildWidgetImage(guildId) {
        return `/guilds/${guildId}/widget.png`;
    },
    /**
     * Route for:
     * - GET    `/invites/{invite.code}`
     * - DELETE `/invites/{invite.code}`
     */
    invite(code) {
        return `/invites/${code}`;
    },
    /**
     * Route for:
     * - GET  `/guilds/templates/{template.code}`
     * - POST `/guilds/templates/{template.code}`
     */
    template(code) {
        return `/guilds/templates/${code}`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/templates`
     * - POST `/guilds/{guild.id}/templates`
     */
    guildTemplates(guildId) {
        return `/guilds/${guildId}/templates`;
    },
    /**
     * Route for:
     * - PUT    `/guilds/{guild.id}/templates/{template.code}`
     * - PATCH  `/guilds/{guild.id}/templates/{template.code}`
     * - DELETE `/guilds/{guild.id}/templates/{template.code}`
     */
    guildTemplate(guildId, code) {
        return `/guilds/${guildId}/templates/${code}`;
    },
    /**
     * Route for:
     * - GET `/channels/{channel.id}/polls/{message.id}/answers/{answer_id}`
     */
    pollAnswerVoters(channelId, messageId, answerId) {
        return `/channels/${channelId}/polls/${messageId}/answers/${answerId}`;
    },
    /**
     * Route for:
     * - POST `/channels/{channel.id}/polls/{message.id}/expire`
     */
    expirePoll(channelId, messageId) {
        return `/channels/${channelId}/polls/${messageId}/expire`;
    },
    /**
     * Route for:
     * - POST `/channels/{channel.id}/threads`
     * - POST `/channels/{channel.id}/messages/{message.id}/threads`
     */
    threads(parentId, messageId) {
        const parts = ['', 'channels', parentId];
        if (messageId)
            parts.push('messages', messageId);
        parts.push('threads');
        return parts.join('/');
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/threads/active`
     */
    guildActiveThreads(guildId) {
        return `/guilds/${guildId}/threads/active`;
    },
    /**
     * Route for:
     * - GET `/channels/{channel.id}/threads/archived/public`
     * - GET `/channels/{channel.id}/threads/archived/private`
     */
    channelThreads(channelId, archivedStatus) {
        return `/channels/${channelId}/threads/archived/${archivedStatus}`;
    },
    /**
     * Route for:
     * - GET `/channels/{channel.id}/users/@me/threads/archived/private`
     */
    channelJoinedArchivedThreads(channelId) {
        return `/channels/${channelId}/users/@me/threads/archived/private`;
    },
    /**
     * Route for:
     * - GET    `/channels/{thread.id}/thread-members`
     * - GET    `/channels/{thread.id}/thread-members/{user.id}`
     * - PUT    `/channels/{thread.id}/thread-members/@me`
     * - PUT    `/channels/{thread.id}/thread-members/{user.id}`
     * - DELETE `/channels/{thread.id}/thread-members/@me`
     * - DELETE `/channels/{thread.id}/thread-members/{user.id}`
     */
    threadMembers(threadId, userId) {
        const parts = ['', 'channels', threadId, 'thread-members'];
        if (userId)
            parts.push(userId);
        return parts.join('/');
    },
    /**
     * Route for:
     * - GET   `/users/@me`
     * - GET   `/users/{user.id}`
     * - PATCH `/users/@me`
     *
     * @param [userId] The user ID, defaulted to `@me`
     */
    user(userId = '@me') {
        return `/users/${userId}`;
    },
    /**
     * Route for:
     * - GET `/users/@me/applications/{application.id}/role-connection`
     * - PUT `/users/@me/applications/{application.id}/role-connection`
     */
    userApplicationRoleConnection(applicationId) {
        return `/users/@me/applications/${applicationId}/role-connection`;
    },
    /**
     * Route for:
     * - GET `/users/@me/guilds`
     */
    userGuilds() {
        return `/users/@me/guilds`;
    },
    /**
     * Route for:
     * - GET `/users/@me/guilds/{guild.id}/member`
     */
    userGuildMember(guildId) {
        return `/users/@me/guilds/${guildId}/member`;
    },
    /**
     * Route for:
     * - DELETE `/users/@me/guilds/{guild.id}`
     */
    userGuild(guildId) {
        return `/users/@me/guilds/${guildId}`;
    },
    /**
     * Route for:
     * - POST `/users/@me/channels`
     */
    userChannels() {
        return `/users/@me/channels`;
    },
    /**
     * Route for:
     * - GET `/users/@me/connections`
     */
    userConnections() {
        return `/users/@me/connections`;
    },
    /**
     * Route for:
     * - GET `/voice/regions`
     */
    voiceRegions() {
        return `/voice/regions`;
    },
    /**
     * Route for:
     * - GET  `/channels/{channel.id}/webhooks`
     * - POST `/channels/{channel.id}/webhooks`
     */
    channelWebhooks(channelId) {
        return `/channels/${channelId}/webhooks`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/webhooks`
     */
    guildWebhooks(guildId) {
        return `/guilds/${guildId}/webhooks`;
    },
    /**
     * Route for:
     * - GET    `/webhooks/{webhook.id}`
     * - GET    `/webhooks/{webhook.id}/{webhook.token}`
     * - PATCH  `/webhooks/{webhook.id}`
     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}`
     * - DELETE `/webhooks/{webhook.id}`
     * - DELETE `/webhooks/{webhook.id}/{webhook.token}`
     * - POST   `/webhooks/{webhook.id}/{webhook.token}`
     *
     * - POST   `/webhooks/{application.id}/{interaction.token}`
     */
    webhook(webhookId, webhookToken) {
        const parts = ['', 'webhooks', webhookId];
        if (webhookToken)
            parts.push(webhookToken);
        return parts.join('/');
    },
    /**
     * Route for:
     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
     *
     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/@original`
     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
     * - DELETE `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
     */
    webhookMessage(webhookId, webhookToken, messageId = '@original') {
        return `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
    },
    /**
     * Route for:
     * - POST `/webhooks/{webhook.id}/{webhook.token}/github`
     * - POST `/webhooks/{webhook.id}/{webhook.token}/slack`
     */
    webhookPlatform(webhookId, webhookToken, platform) {
        return `/webhooks/${webhookId}/${webhookToken}/${platform}`;
    },
    /**
     * Route for:
     * - GET `/gateway`
     */
    gateway() {
        return `/gateway`;
    },
    /**
     * Route for:
     * - GET `/gateway/bot`
     */
    gatewayBot() {
        return `/gateway/bot`;
    },
    /**
     * Route for:
     * - GET `/oauth2/applications/@me`
     */
    oauth2CurrentApplication() {
        return `/oauth2/applications/@me`;
    },
    /**
     * Route for:
     * - GET `/oauth2/@me`
     */
    oauth2CurrentAuthorization() {
        return `/oauth2/@me`;
    },
    /**
     * Route for:
     * - GET `/oauth2/authorize`
     */
    oauth2Authorization() {
        return `/oauth2/authorize`;
    },
    /**
     * Route for:
     * - POST `/oauth2/token`
     */
    oauth2TokenExchange() {
        return `/oauth2/token`;
    },
    /**
     * Route for:
     * - POST `/oauth2/token/revoke`
     */
    oauth2TokenRevocation() {
        return `/oauth2/token/revoke`;
    },
    /**
     * Route for:
     * - GET  `/applications/{application.id}/commands`
     * - PUT  `/applications/{application.id}/commands`
     * - POST `/applications/{application.id}/commands`
     */
    applicationCommands(applicationId) {
        return `/applications/${applicationId}/commands`;
    },
    /**
     * Route for:
     * - GET    `/applications/{application.id}/commands/{command.id}`
     * - PATCH  `/applications/{application.id}/commands/{command.id}`
     * - DELETE `/applications/{application.id}/commands/{command.id}`
     */
    applicationCommand(applicationId, commandId) {
        return `/applications/${applicationId}/commands/${commandId}`;
    },
    /**
     * Route for:
     * - GET  `/applications/{application.id}/guilds/{guild.id}/commands`
     * - PUT  `/applications/{application.id}/guilds/{guild.id}/commands`
     * - POST `/applications/{application.id}/guilds/{guild.id}/commands`
     */
    applicationGuildCommands(applicationId, guildId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands`;
    },
    /**
     * Route for:
     * - GET    `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     * - PATCH  `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     * - DELETE `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     */
    applicationGuildCommand(applicationId, guildId, commandId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
    },
    /**
     * Route for:
     * - POST `/interactions/{interaction.id}/{interaction.token}/callback`
     */
    interactionCallback(interactionId, interactionToken) {
        return `/interactions/${interactionId}/${interactionToken}/callback`;
    },
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/member-verification`
     * - PATCH `/guilds/{guild.id}/member-verification`
     */
    guildMemberVerification(guildId) {
        return `/guilds/${guildId}/member-verification`;
    },
    /**
     * Route for:
     * - PATCH `/guilds/{guild.id}/voice-states/@me`
     * - PATCH `/guilds/{guild.id}/voice-states/{user.id}`
     */
    guildVoiceState(guildId, userId = '@me') {
        return `/guilds/${guildId}/voice-states/${userId}`;
    },
    /**
     * Route for:
     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
     */
    guildApplicationCommandsPermissions(applicationId, guildId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
    },
    /**
     * Route for:
     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
     */
    applicationCommandPermissions(applicationId, guildId, commandId) {
        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
    },
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/welcome-screen`
     * - PATCH `/guilds/{guild.id}/welcome-screen`
     */
    guildWelcomeScreen(guildId) {
        return `/guilds/${guildId}/welcome-screen`;
    },
    /**
     * Route for:
     * - POST `/stage-instances`
     */
    stageInstances() {
        return `/stage-instances`;
    },
    /**
     * Route for:
     * - GET `/stage-instances/{channel.id}`
     * - PATCH `/stage-instances/{channel.id}`
     * - DELETE `/stage-instances/{channel.id}`
     */
    stageInstance(channelId) {
        return `/stage-instances/${channelId}`;
    },
    /**
     * Route for:
     * - GET `/stickers/{sticker.id}`
     */
    sticker(stickerId) {
        return `/stickers/${stickerId}`;
    },
    /**
     * Route for:
     * - GET `/sticker-packs`
     */
    stickerPacks() {
        return '/sticker-packs';
    },
    /**
     * Route for:
     * - GET `/sticker-packs`
     *
     * @deprecated Use {@link Routes.stickerPacks} instead.
     */
    nitroStickerPacks() {
        return '/sticker-packs';
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/stickers`
     * - POST `/guilds/{guild.id}/stickers`
     */
    guildStickers(guildId) {
        return `/guilds/${guildId}/stickers`;
    },
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/stickers/{sticker.id}`
     * - PATCH  `/guilds/{guild.id}/stickers/{sticker.id}`
     * - DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
     */
    guildSticker(guildId, stickerId) {
        return `/guilds/${guildId}/stickers/${stickerId}`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/scheduled-events`
     * - POST `/guilds/{guild.id}/scheduled-events`
     */
    guildScheduledEvents(guildId) {
        return `/guilds/${guildId}/scheduled-events`;
    },
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
     * - PATCH `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
     * - DELETE `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
     */
    guildScheduledEvent(guildId, guildScheduledEventId) {
        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users`
     */
    guildScheduledEventUsers(guildId, guildScheduledEventId) {
        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`;
    },
    /**
     * Route for:
     * - GET `/guilds/${guild.id}/onboarding`
     * - PUT `/guilds/${guild.id}/onboarding`
     */
    guildOnboarding(guildId) {
        return `/guilds/${guildId}/onboarding`;
    },
    /**
     * Route for:
     * - GET `/applications/@me`
     * - PATCH `/applications/@me`
     */
    currentApplication() {
        return '/applications/@me';
    },
    /**
     * Route for:
     * - GET `/applications/{application.id}/entitlements`
     * - POST `/applications/{application.id}/entitlements`
     */
    entitlements(applicationId) {
        return `/applications/${applicationId}/entitlements`;
    },
    /**
     * Route for:
     * - DELETE `/applications/{application.id}/entitlements/{entitlement.id}`
     */
    entitlement(applicationId, entitlementId) {
        return `/applications/${applicationId}/entitlements/${entitlementId}`;
    },
    /**
     * Route for:
     * - GET `/applications/{application.id}/skus`
     */
    skus(applicationId) {
        return `/applications/${applicationId}/skus`;
    },
    /**
     * Route for:
     * - POST `/guilds/{guild.id}/bulk-ban`
     */
    guildBulkBan(guildId) {
        return `/guilds/${guildId}/bulk-ban`;
    },
    /**
     * Route for:
     * - POST `/applications/${application.id}/entitlements/${entitlement.id}/consume`
     */
    consumeEntitlement(applicationId, entitlementId) {
        return `/applications/${applicationId}/entitlements/${entitlementId}/consume`;
    },
};
exports.StickerPackApplicationId = '710982414301790216';
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["JPEG"] = "jpeg";
    ImageFormat["PNG"] = "png";
    ImageFormat["WebP"] = "webp";
    ImageFormat["GIF"] = "gif";
    ImageFormat["Lottie"] = "json";
})(ImageFormat || (exports.ImageFormat = ImageFormat = {}));
exports.CDNRoutes = {
    /**
     * Route for:
     * - GET `/emojis/{emoji.id}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    emoji(emojiId, format) {
        return `/emojis/${emojiId}.${format}`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/icons/{guild.id}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildIcon(guildId, guildIcon, format) {
        return `icons/${guildId}/${guildIcon}.${format}`;
    },
    /**
     * Route for:
     * - GET `/splashes/{guild.id}/{guild.splash}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    guildSplash(guildId, guildSplash, format) {
        return `/splashes/${guildId}/${guildSplash}.${format}`;
    },
    /**
     * Route for:
     * - GET `/discovery-splashes/{guild.id}/{guild.discovery_splash}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    guildDiscoverySplash(guildId, guildDiscoverySplash, format) {
        return `/discovery-splashes/${guildId}/${guildDiscoverySplash}.${format}`;
    },
    /**
     * Route for:
     * - GET `/banners/{guild.id}/{guild.banner}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildBanner(guildId, guildBanner, format) {
        return `/banners/${guildId}/${guildBanner}.${format}`;
    },
    /**
     * Route for:
     * - GET `/banners/{user.id}/{user.banner}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    userBanner(userId, userBanner, format) {
        return `/banners/${userId}/${userBanner}.${format}`;
    },
    /**
     * Route for:
     * - GET `/embed/avatars/{index}.png`
     *
     * The value for `index` parameter depends on whether the user is [migrated to the new username system](https://discord.com/developers/docs/change-log#unique-usernames-on-discord).
     * For users on the new username system, `index` will be `(user.id >> 22) % 6`.
     * For users on the legacy username system, `index` will be `user.discriminator % 5`.
     *
     * This route supports the extension: PNG
     */
    defaultUserAvatar(index) {
        return `/embed/avatars/${index}.png`;
    },
    /**
     * Route for:
     * - GET `/avatars/{user.id}/{user.avatar}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    userAvatar(userId, userAvatar, format) {
        return `/avatars/${userId}/${userAvatar}.${format}`;
    },
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/users/{user.id}/{guild_member.avatar}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildMemberAvatar(guildId, userId, memberAvatar, format) {
        return `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
    },
    /**
     * Route for:
     * - GET `/avatar-decorations/{user.id}/{user.avatar_decoration}.png`
     *
     * This route supports the extension: PNG
     */
    userAvatarDecoration(userId, userAvatarDecoration) {
        return `/avatar-decorations/${userId}/${userAvatarDecoration}.png`;
    },
    /**
     * Route for:
     * - GET `/app-icons/{application.id}/{application.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    applicationIcon(applicationId, applicationIcon, format) {
        return `/app-icons/${applicationId}/${applicationIcon}.${format}`;
    },
    /**
     * Route for:
     * - GET `/app-icons/{application.id}/{application.cover_image}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    applicationCover(applicationId, applicationCoverImage, format) {
        return `/app-icons/${applicationId}/${applicationCoverImage}.${format}`;
    },
    /**
     * Route for:
     * - GET `/app-assets/{application.id}/{application.asset_id}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    applicationAsset(applicationId, applicationAssetId, format) {
        return `/app-assets/${applicationId}/${applicationAssetId}.${format}`;
    },
    /**
     * Route for:
     * - GET `/app-assets/{application.id}/achievements/{achievement.id}/icons/{achievement.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    achievementIcon(applicationId, achievementId, achievementIconHash, format) {
        return `/app-assets/${applicationId}/achievements/${achievementId}/icons/${achievementIconHash}.${format}`;
    },
    /**
     * Route for:
     * - GET `/app-assets/710982414301790216/store/{sticker_pack.banner.asset_id}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    stickerPackBanner(stickerPackBannerAssetId, format) {
        return `/app-assets/${exports.StickerPackApplicationId}/store/${stickerPackBannerAssetId}.${format}`;
    },
    /**
     * Route for:
     * - GET `/app-assets/${application.id}/store/${asset.id}.{png|jpeg|webp}}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    storePageAsset(applicationId, assetId, format = ImageFormat.PNG) {
        return `/app-assets/${applicationId}/store/${assetId}.${format}`;
    },
    /**
     * Route for:
     * - GET `team-icons/{team.id}/{team.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    teamIcon(teamId, teamIcon, format) {
        return `/team-icons/${teamId}/${teamIcon}.${format}`;
    },
    /**
     * Route for:
     * - GET `/stickers/{sticker.id}.{png|json}`
     *
     * This route supports the extensions: PNG, Lottie, GIF
     */
    sticker(stickerId, format) {
        return `/stickers/${stickerId}.${format}`;
    },
    /**
     * Route for:
     * - GET `/role-icons/{role.id}/{role.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    roleIcon(roleId, roleIcon, format) {
        return `/role-icons/${roleId}/${roleIcon}.${format}`;
    },
    /**
     * Route for:
     * - GET `/guild-events/{guild_scheduled_event.id}/{guild_scheduled_event.image}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    guildScheduledEventCover(guildScheduledEventId, guildScheduledEventCoverImage, format) {
        return `/guild-events/${guildScheduledEventId}/${guildScheduledEventCoverImage}.${format}`;
    },
    /**
     * Route for:
     * - GET `/guilds/${guild.id}/users/${user.id}/banners/${guild_member.banner}.{png|jpeg|webp|gif}`
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildMemberBanner(guildId, userId, guildMemberBanner, format) {
        return `/guilds/${guildId}/users/${userId}/banners/${guildMemberBanner}.${format}`;
    },
};
exports.RouteBases = {
    api: `https://discord.com/api/v${exports.APIVersion}`,
    cdn: 'https://cdn.discordapp.com',
    invite: 'https://discord.gg',
    template: 'https://discord.new',
    gift: 'https://discord.gift',
    scheduledEvent: 'https://discord.com/events',
};
// Freeze bases object
Object.freeze(exports.RouteBases);
exports.OAuth2Routes = {
    authorizationURL: `${exports.RouteBases.api}${exports.Routes.oauth2Authorization()}`,
    tokenURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenExchange()}`,
    /**
     * See https://tools.ietf.org/html/rfc7009
     */
    tokenRevocationURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenRevocation()}`,
};
// Freeze OAuth2 route object
Object.freeze(exports.OAuth2Routes);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2032:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interactions.js.map

/***/ }),

/***/ 2320:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=invite.js.map

/***/ }),

/***/ 9092:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntitlementOwnerType = void 0;
/**
 * https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement
 */
var EntitlementOwnerType;
(function (EntitlementOwnerType) {
    EntitlementOwnerType[EntitlementOwnerType["Guild"] = 1] = "Guild";
    EntitlementOwnerType[EntitlementOwnerType["User"] = 2] = "User";
})(EntitlementOwnerType || (exports.EntitlementOwnerType = EntitlementOwnerType = {}));
//# sourceMappingURL=monetization.js.map

/***/ }),

/***/ 3634:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=oauth2.js.map

/***/ }),

/***/ 5056:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=poll.js.map

/***/ }),

/***/ 3356:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=stageInstance.js.map

/***/ }),

/***/ 7870:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=sticker.js.map

/***/ }),

/***/ 1859:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=template.js.map

/***/ }),

/***/ 6750:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 8275:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=voice.js.map

/***/ }),

/***/ 5400:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=webhook.js.map

/***/ }),

/***/ 9429:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RPCCloseEventCodes = exports.RPCErrorCodes = void 0;
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes
 */
var RPCErrorCodes;
(function (RPCErrorCodes) {
    RPCErrorCodes[RPCErrorCodes["UnknownError"] = 1000] = "UnknownError";
    RPCErrorCodes[RPCErrorCodes["InvalidPayload"] = 4000] = "InvalidPayload";
    RPCErrorCodes[RPCErrorCodes["InvalidCommand"] = 4002] = "InvalidCommand";
    RPCErrorCodes[RPCErrorCodes["InvalidGuild"] = 4003] = "InvalidGuild";
    RPCErrorCodes[RPCErrorCodes["InvalidEvent"] = 4004] = "InvalidEvent";
    RPCErrorCodes[RPCErrorCodes["InvalidChannel"] = 4005] = "InvalidChannel";
    RPCErrorCodes[RPCErrorCodes["InvalidPermissions"] = 4006] = "InvalidPermissions";
    RPCErrorCodes[RPCErrorCodes["InvalidClientId"] = 4007] = "InvalidClientId";
    RPCErrorCodes[RPCErrorCodes["InvalidOrigin"] = 4008] = "InvalidOrigin";
    RPCErrorCodes[RPCErrorCodes["InvalidToken"] = 4009] = "InvalidToken";
    RPCErrorCodes[RPCErrorCodes["InvalidUser"] = 4010] = "InvalidUser";
    RPCErrorCodes[RPCErrorCodes["OAuth2Error"] = 5000] = "OAuth2Error";
    RPCErrorCodes[RPCErrorCodes["SelectChannelTimedOut"] = 5001] = "SelectChannelTimedOut";
    RPCErrorCodes[RPCErrorCodes["GetGuildTimedOut"] = 5002] = "GetGuildTimedOut";
    RPCErrorCodes[RPCErrorCodes["SelectVoiceForceRequired"] = 5003] = "SelectVoiceForceRequired";
    RPCErrorCodes[RPCErrorCodes["CaptureShortcutAlreadyListening"] = 5004] = "CaptureShortcutAlreadyListening";
})(RPCErrorCodes || (exports.RPCErrorCodes = RPCErrorCodes = {}));
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes
 */
var RPCCloseEventCodes;
(function (RPCCloseEventCodes) {
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidClientId"] = 4000] = "InvalidClientId";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidOrigin"] = 4001] = "InvalidOrigin";
    RPCCloseEventCodes[RPCCloseEventCodes["RateLimited"] = 4002] = "RateLimited";
    RPCCloseEventCodes[RPCCloseEventCodes["TokenRevoked"] = 4003] = "TokenRevoked";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidVersion"] = 4004] = "InvalidVersion";
    RPCCloseEventCodes[RPCCloseEventCodes["InvalidEncoding"] = 4005] = "InvalidEncoding";
})(RPCCloseEventCodes || (exports.RPCCloseEventCodes = RPCCloseEventCodes = {}));
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 737:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9429), exports);
//# sourceMappingURL=v10.js.map

/***/ }),

/***/ 5411:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isContextMenuApplicationCommandInteraction = exports.isChatInputApplicationCommandInteraction = exports.isMessageComponentSelectMenuInteraction = exports.isMessageComponentButtonInteraction = exports.isMessageComponentInteraction = exports.isInteractionButton = exports.isLinkButton = exports.isMessageComponentGuildInteraction = exports.isMessageComponentDMInteraction = exports.isApplicationCommandGuildInteraction = exports.isApplicationCommandDMInteraction = exports.isGuildInteraction = exports.isDMInteraction = void 0;
const index_1 = __webpack_require__(2672);
// Interactions
/**
 * A type-guard check for DM interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a DM channel
 */
function isDMInteraction(interaction) {
    return Reflect.has(interaction, 'user');
}
exports.isDMInteraction = isDMInteraction;
/**
 * A type-guard check for guild interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a guild
 */
function isGuildInteraction(interaction) {
    return Reflect.has(interaction, 'guild_id');
}
exports.isGuildInteraction = isGuildInteraction;
// ApplicationCommandInteractions
/**
 * A type-guard check for DM application command interactions
 *
 * @param interaction The application command interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a DM channel
 */
function isApplicationCommandDMInteraction(interaction) {
    return isDMInteraction(interaction);
}
exports.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction;
/**
 * A type-guard check for guild application command interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a guild
 */
function isApplicationCommandGuildInteraction(interaction) {
    return isGuildInteraction(interaction);
}
exports.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction;
// MessageComponentInteractions
/**
 * A type-guard check for DM message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a DM channel
 */
function isMessageComponentDMInteraction(interaction) {
    return isDMInteraction(interaction);
}
exports.isMessageComponentDMInteraction = isMessageComponentDMInteraction;
/**
 * A type-guard check for guild message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a guild
 */
function isMessageComponentGuildInteraction(interaction) {
    return isGuildInteraction(interaction);
}
exports.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction;
// Buttons
/**
 * A type-guard check for buttons that have a `url` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `url` attached to it
 */
function isLinkButton(component) {
    return component.style === index_1.ButtonStyle.Link;
}
exports.isLinkButton = isLinkButton;
/**
 * A type-guard check for buttons that have a `custom_id` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `custom_id` attached to it
 */
function isInteractionButton(component) {
    return component.style !== index_1.ButtonStyle.Link;
}
exports.isInteractionButton = isInteractionButton;
// Message Components
/**
 * A type-guard check for message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a message component
 */
function isMessageComponentInteraction(interaction) {
    return interaction.type === index_1.InteractionType.MessageComponent;
}
exports.isMessageComponentInteraction = isMessageComponentInteraction;
/**
 * A type-guard check for button message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a button
 */
function isMessageComponentButtonInteraction(interaction) {
    return interaction.data.component_type === index_1.ComponentType.Button;
}
exports.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction;
/**
 * A type-guard check for select menu message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a select menu
 */
function isMessageComponentSelectMenuInteraction(interaction) {
    return [
        index_1.ComponentType.StringSelect,
        index_1.ComponentType.UserSelect,
        index_1.ComponentType.RoleSelect,
        index_1.ComponentType.MentionableSelect,
        index_1.ComponentType.ChannelSelect,
    ].includes(interaction.data.component_type);
}
exports.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction;
// Application Commands
/**
 * A type-guard check for chat input application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a chat input application command
 */
function isChatInputApplicationCommandInteraction(interaction) {
    return interaction.data.type === index_1.ApplicationCommandType.ChatInput;
}
exports.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction;
/**
 * A type-guard check for context menu application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a context menu application command
 */
function isContextMenuApplicationCommandInteraction(interaction) {
    return (interaction.data.type === index_1.ApplicationCommandType.Message ||
        interaction.data.type === index_1.ApplicationCommandType.User);
}
exports.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction;
//# sourceMappingURL=v10.js.map

/***/ }),

/***/ 2489:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
__exportStar(__webpack_require__(8388), exports);
__exportStar(__webpack_require__(6690), exports);
__exportStar(__webpack_require__(2672), exports);
__exportStar(__webpack_require__(4569), exports);
__exportStar(__webpack_require__(737), exports);
exports.Utils = __webpack_require__(5411);
//# sourceMappingURL=v10.js.map

/***/ }),

/***/ 3805:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VoiceCloseCodes = exports.VoiceOpcodes = exports.VoiceGatewayVersion = void 0;
exports.VoiceGatewayVersion = '4';
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes
 */
var VoiceOpcodes;
(function (VoiceOpcodes) {
    /**
     * Begin a voice websocket connection
     */
    VoiceOpcodes[VoiceOpcodes["Identify"] = 0] = "Identify";
    /**
     * Select the voice protocol
     */
    VoiceOpcodes[VoiceOpcodes["SelectProtocol"] = 1] = "SelectProtocol";
    /**
     * Complete the websocket handshake
     */
    VoiceOpcodes[VoiceOpcodes["Ready"] = 2] = "Ready";
    /**
     * Keep the websocket connection alive
     */
    VoiceOpcodes[VoiceOpcodes["Heartbeat"] = 3] = "Heartbeat";
    /**
     * Describe the session
     */
    VoiceOpcodes[VoiceOpcodes["SessionDescription"] = 4] = "SessionDescription";
    /**
     * Indicate which users are speaking
     */
    VoiceOpcodes[VoiceOpcodes["Speaking"] = 5] = "Speaking";
    /**
     * Sent to acknowledge a received client heartbeat
     */
    VoiceOpcodes[VoiceOpcodes["HeartbeatAck"] = 6] = "HeartbeatAck";
    /**
     * Resume a connection
     */
    VoiceOpcodes[VoiceOpcodes["Resume"] = 7] = "Resume";
    /**
     * Time to wait between sending heartbeats in milliseconds
     */
    VoiceOpcodes[VoiceOpcodes["Hello"] = 8] = "Hello";
    /**
     * Acknowledge a successful session resume
     */
    VoiceOpcodes[VoiceOpcodes["Resumed"] = 9] = "Resumed";
    /**
     * A client has connected to the voice channel
     */
    VoiceOpcodes[VoiceOpcodes["ClientConnect"] = 12] = "ClientConnect";
    /**
     * A client has disconnected from the voice channel
     */
    VoiceOpcodes[VoiceOpcodes["ClientDisconnect"] = 13] = "ClientDisconnect";
})(VoiceOpcodes || (exports.VoiceOpcodes = VoiceOpcodes = {}));
/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
 */
var VoiceCloseCodes;
(function (VoiceCloseCodes) {
    /**
     * You sent an invalid opcode
     */
    VoiceCloseCodes[VoiceCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
    /**
     * You sent a invalid payload in your identifying to the Gateway
     */
    VoiceCloseCodes[VoiceCloseCodes["FailedToDecode"] = 4002] = "FailedToDecode";
    /**
     * You sent a payload before identifying with the Gateway
     */
    VoiceCloseCodes[VoiceCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
    /**
     * The token you sent in your identify payload is incorrect
     */
    VoiceCloseCodes[VoiceCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
    /**
     * You sent more than one identify payload. Stahp
     */
    VoiceCloseCodes[VoiceCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
    /**
     * Your session is no longer valid
     */
    VoiceCloseCodes[VoiceCloseCodes["SessionNoLongerValid"] = 4006] = "SessionNoLongerValid";
    /**
     * Your session has timed out
     */
    VoiceCloseCodes[VoiceCloseCodes["SessionTimeout"] = 4009] = "SessionTimeout";
    /**
     * We can't find the server you're trying to connect to
     */
    VoiceCloseCodes[VoiceCloseCodes["ServerNotFound"] = 4011] = "ServerNotFound";
    /**
     * We didn't recognize the protocol you sent
     */
    VoiceCloseCodes[VoiceCloseCodes["UnknownProtocol"] = 4012] = "UnknownProtocol";
    /**
     * Either the channel was deleted, you were kicked, or the main gateway session was dropped. Should not reconnect
     */
    VoiceCloseCodes[VoiceCloseCodes["Disconnected"] = 4014] = "Disconnected";
    /**
     * The server crashed. Our bad! Try resuming
     */
    VoiceCloseCodes[VoiceCloseCodes["VoiceServerCrashed"] = 4015] = "VoiceServerCrashed";
    /**
     * We didn't recognize your encryption
     */
    VoiceCloseCodes[VoiceCloseCodes["UnknownEncryptionMode"] = 4016] = "UnknownEncryptionMode";
})(VoiceCloseCodes || (exports.VoiceCloseCodes = VoiceCloseCodes = {}));
//# sourceMappingURL=v4.js.map

/***/ }),

/***/ 1624:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module Client */
const RESTManager_1 = tslib_1.__importDefault(__webpack_require__(4943));
const TypedCollection_1 = tslib_1.__importDefault(__webpack_require__(5288));
const PrivateChannel_1 = tslib_1.__importDefault(__webpack_require__(6338));
const GroupChannel_1 = tslib_1.__importDefault(__webpack_require__(5470));
const User_1 = tslib_1.__importDefault(__webpack_require__(4199));
const Guild_1 = tslib_1.__importDefault(__webpack_require__(281));
const TypedEmitter_1 = tslib_1.__importDefault(__webpack_require__(984));
const ShardManager_1 = tslib_1.__importDefault(__webpack_require__(663));
const UnavailableGuild_1 = tslib_1.__importDefault(__webpack_require__(3237));
const Util_1 = tslib_1.__importDefault(__webpack_require__(9810));
const Errors_1 = __webpack_require__(3961);
// @ts-ignore
let DiscordJSVoice;
try {
    DiscordJSVoice = __webpack_require__(9312);
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
/** The primary class for interfacing with Discord. See {@link ClientEvents | Client Events} for a list of events. */
class Client extends TypedEmitter_1.default {
    _application;
    _user;
    /** A key-value mapping of channel IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#channels | channels collection}. */
    channelGuildMap;
    groupChannels;
    guildShardMap;
    guilds;
    options;
    privateChannels;
    ready;
    rest;
    shards;
    startTime = 0;
    /** A key-value mapping of thread IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#threads | threads collection}. */
    threadGuildMap;
    unavailableGuilds;
    users;
    util;
    voiceAdapters;
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options) {
        super();
        this.util = new Util_1.default(this);
        const disableCache = options?.disableCache === true || options?.disableCache === "no-warning";
        const colZero = {
            auditLogEntries: 0,
            autoModerationRules: 0,
            channels: 0,
            emojis: 0,
            groupChannels: 0,
            guilds: 0,
            guildThreads: 0,
            integrations: 0,
            invites: 0,
            members: 0,
            messages: 0,
            privateChannels: 0,
            roles: 0,
            scheduledEvents: 0,
            stageInstances: 0,
            stickers: 0,
            unavailableGuilds: 0,
            users: 0,
            voiceMembers: 0,
            voiceStates: 0
        };
        this.options = {
            allowedMentions: options?.allowedMentions ?? {
                everyone: false,
                repliedUser: false,
                users: true,
                roles: true
            },
            auth: options?.auth ?? null,
            collectionLimits: disableCache ? colZero : {
                auditLogEntries: this.util._setLimit(options?.collectionLimits?.auditLogEntries, 50),
                autoModerationRules: this.util._setLimit(options?.collectionLimits?.autoModerationRules, Infinity),
                channels: this.util._setLimit(options?.collectionLimits?.channels, Infinity),
                emojis: this.util._setLimit(options?.collectionLimits?.emojis, Infinity),
                groupChannels: options?.collectionLimits?.groupChannels ?? 10,
                guilds: options?.collectionLimits?.guilds ?? Infinity,
                guildThreads: this.util._setLimit(options?.collectionLimits?.guildThreads, Infinity),
                integrations: this.util._setLimit(options?.collectionLimits?.integrations, Infinity),
                invites: this.util._setLimit(options?.collectionLimits?.invites, Infinity),
                members: this.util._setLimit(options?.collectionLimits?.members, Infinity),
                messages: this.util._setLimit(options?.collectionLimits?.messages, 100),
                privateChannels: options?.collectionLimits?.privateChannels ?? 25,
                roles: this.util._setLimit(options?.collectionLimits?.roles, Infinity),
                scheduledEvents: this.util._setLimit(options?.collectionLimits?.scheduledEvents, Infinity),
                stageInstances: this.util._setLimit(options?.collectionLimits?.stageInstances, Infinity),
                stickers: this.util._setLimit(options?.collectionLimits?.stickers, Infinity),
                unavailableGuilds: options?.collectionLimits?.unavailableGuilds ?? Infinity,
                users: options?.collectionLimits?.users ?? Infinity,
                voiceMembers: this.util._setLimit(options?.collectionLimits?.voiceMembers, Infinity),
                voiceStates: this.util._setLimit(options?.collectionLimits?.voiceStates, Infinity)
            },
            defaultImageFormat: options?.defaultImageFormat ?? "png",
            defaultImageSize: options?.defaultImageSize ?? 4096,
            disableMemberLimitScaling: options?.disableMemberLimitScaling ?? false,
            restMode: false,
            disableCache
        };
        if (options?.disableCache === true) {
            process.emitWarning("Enabling the disableCache option is not recommended. This will break many aspects of the library, as it is not designed to function without cache.", {
                code: "OCEANIC_CACHE_DISABLED",
                detail: "Set the disableCache option to the literal string \"no-warning\" to disable this warning."
            });
        }
        if (disableCache && options?.collectionLimits !== undefined && JSON.stringify(options.collectionLimits) !== JSON.stringify(colZero)) {
            process.emitWarning("Providing the collectionsLimit option when the disableCache option has been enabled is redundant. Any provided values will be ignored.", {
                code: "OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED",
                detail: "Remove the collectionsLimit option, or zero out all of the possible options to disable this warning."
            });
        }
        this.voiceAdapters = new Map();
        this.channelGuildMap = {};
        this.groupChannels = new TypedCollection_1.default(GroupChannel_1.default, this, this.options.collectionLimits.groupChannels);
        this.guilds = new TypedCollection_1.default(Guild_1.default, this, this.options.collectionLimits.guilds);
        this.privateChannels = new TypedCollection_1.default(PrivateChannel_1.default, this, this.options.collectionLimits.privateChannels);
        this.ready = false;
        this.guildShardMap = {};
        this.rest = new RESTManager_1.default(this, options?.rest);
        this.shards = new ShardManager_1.default(this, options?.gateway);
        this.threadGuildMap = {};
        this.unavailableGuilds = new TypedCollection_1.default(UnavailableGuild_1.default, this, this.options.collectionLimits.unavailableGuilds);
        this.users = new TypedCollection_1.default(User_1.default, this, this.options.collectionLimits.users);
    }
    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get application() {
        if (this._application) {
            return this._application;
        }
        else {
            throw new Errors_1.UncachedError(`${this.constructor.name}#application is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client, or enable rest mode.`);
        }
    }
    get uptime() {
        return this.startTime ? Date.now() - this.startTime : 0;
    }
    /** The client's user. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get user() {
        if (this._user) {
            return this._user;
        }
        else {
            throw new Errors_1.UncachedError(`${this.constructor.name}#user is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client, or enable rest mode.`);
        }
    }
    /** The active voice connections of this client. */
    get voiceConnections() {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return DiscordJSVoice.getVoiceConnections();
    }
    /** Connect the client to Discord. */
    async connect() {
        if (this.options.restMode) {
            throw new TypeError("Rest mode has been enabled on this client. You cannot connect to the gateway.");
        }
        if (!this.options.auth || !this.options.auth.startsWith("Bot ")) {
            throw new TypeError("You must provide a bot token to connect. Make sure it has been prefixed with `Bot `.");
        }
        await this.shards.connect();
    }
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.shards.options.autoReconnect) {
        return this.shards.disconnect(reconnect);
    }
    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status, activities = []) {
        for (const [, shard] of this.shards)
            await shard.editStatus(status, activities);
    }
    /**
     * Get a channel from an ID. This will return undefined if the channel is not cached.
     * @param channelID The id of the channel.
     */
    getChannel(channelID) {
        if (this.channelGuildMap[channelID]) {
            return this.guilds.get(this.channelGuildMap[channelID])?.channels.get(channelID);
        }
        else if (this.threadGuildMap[channelID]) {
            return this.guilds.get(this.threadGuildMap[channelID])?.threads.get(channelID);
        }
        return (this.privateChannels.get(channelID) ?? this.groupChannels.get(channelID));
    }
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getOAuthHelper(accessToken) {
        return this.rest.oauth.getHelper(accessToken);
    }
    /**
     * Get a voice connection.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    getVoiceConnection(guildID) {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        return DiscordJSVoice.getVoiceConnection(guildID);
    }
    /**
     * Join a voice channel.
     * @param options The options to join the channel with.
     * */
    joinVoiceChannel(options) {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return DiscordJSVoice.joinVoiceChannel({
            channelId: options.channelID,
            guildId: options.guildID,
            debug: options.debug,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            adapterCreator: options.voiceAdapterCreator,
            selfDeaf: options.selfDeaf,
            selfMute: options.selfMute
        });
    }
    /**
     * Leave a voice channel.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    leaveVoiceChannel(guildID) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return this.getVoiceConnection(guildID)?.destroy();
    }
    /**
     * Initialize this client for rest only use. Currently, this sets both the `application` and `user` properties (if not already present), as would happen with a gateway connection.
     * @param fakeReady If the client should emit a ready event. Defaults to true.
     */
    async restMode(fakeReady = true) {
        this._application ??= await this.rest.applications.getCurrent();
        this._user ??= await this.rest.oauth.getCurrentUser();
        this.options.restMode = true;
        if (fakeReady) {
            this.emit("ready");
        }
        return this;
    }
}
exports["default"] = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQkFBcUI7QUFDckIsNkVBQTZDO0FBQzdDLHFGQUFxRDtBQUNyRCx5RkFBeUQ7QUFDekQscUZBQXFEO0FBQ3JELHFFQUFxQztBQUNyQyx1RUFBdUM7QUFLdkMsK0VBQStDO0FBRS9DLGtGQUFrRDtBQUVsRCw2RkFBNkQ7QUFFN0QsK0RBQStCO0FBRy9CLDBDQUErRDtBQU8vRCxhQUFhO0FBQ2IsSUFBSSxjQUE2RCxDQUFDO0FBQ2xFLElBQUksQ0FBQztJQUNELGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztBQUNWLDRNQUE0TTtBQUU1TSxxSEFBcUg7QUFDckgsTUFBcUIsTUFBOEMsU0FBUSxzQkFBZTtJQUM5RSxZQUFZLENBQXFCO0lBQ2pDLEtBQUssQ0FBZ0I7SUFDN0IsMkxBQTJMO0lBQzNMLGVBQWUsQ0FBeUI7SUFDeEMsYUFBYSxDQUFpRDtJQUM5RCxhQUFhLENBQXlCO0lBQ3RDLE1BQU0sQ0FBcUQ7SUFDM0QsT0FBTyxDQUF3QjtJQUMvQixlQUFlLENBQXFEO0lBQ3BFLEtBQUssQ0FBVTtJQUNmLElBQUksQ0FBYztJQUNsQixNQUFNLENBQWU7SUFDckIsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNkLHdMQUF3TDtJQUN4TCxjQUFjLENBQXlCO0lBQ3ZDLGlCQUFpQixDQUF5RDtJQUMxRSxLQUFLLENBQWlDO0lBQ3RDLElBQUksQ0FBTztJQUNYLGFBQWEsQ0FBbUQ7SUFDaEU7OztPQUdHO0lBQ0gsWUFBWSxPQUF1QjtRQUMvQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsTUFBTSxZQUFZLEdBQUcsT0FBTyxFQUFFLFlBQVksS0FBSyxJQUFJLElBQUksT0FBTyxFQUFFLFlBQVksS0FBSyxZQUFZLENBQUM7UUFDOUYsTUFBTSxPQUFPLEdBQUc7WUFDWixlQUFlLEVBQU0sQ0FBQztZQUN0QixtQkFBbUIsRUFBRSxDQUFDO1lBQ3RCLFFBQVEsRUFBYSxDQUFDO1lBQ3RCLE1BQU0sRUFBZSxDQUFDO1lBQ3RCLGFBQWEsRUFBUSxDQUFDO1lBQ3RCLE1BQU0sRUFBZSxDQUFDO1lBQ3RCLFlBQVksRUFBUyxDQUFDO1lBQ3RCLFlBQVksRUFBUyxDQUFDO1lBQ3RCLE9BQU8sRUFBYyxDQUFDO1lBQ3RCLE9BQU8sRUFBYyxDQUFDO1lBQ3RCLFFBQVEsRUFBYSxDQUFDO1lBQ3RCLGVBQWUsRUFBTSxDQUFDO1lBQ3RCLEtBQUssRUFBZ0IsQ0FBQztZQUN0QixlQUFlLEVBQU0sQ0FBQztZQUN0QixjQUFjLEVBQU8sQ0FBQztZQUN0QixRQUFRLEVBQWEsQ0FBQztZQUN0QixpQkFBaUIsRUFBSSxDQUFDO1lBQ3RCLEtBQUssRUFBZ0IsQ0FBQztZQUN0QixZQUFZLEVBQVMsQ0FBQztZQUN0QixXQUFXLEVBQVUsQ0FBQztTQUNtQixDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxlQUFlLEVBQUUsT0FBTyxFQUFFLGVBQWUsSUFBSTtnQkFDekMsUUFBUSxFQUFLLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixLQUFLLEVBQVEsSUFBSTtnQkFDakIsS0FBSyxFQUFRLElBQUk7YUFDcEI7WUFDRCxJQUFJLEVBQWMsT0FBTyxFQUFFLElBQUksSUFBSSxJQUFJO1lBQ3ZDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsZUFBZSxFQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDO2dCQUN4RixtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxDQUFDO2dCQUNsRyxRQUFRLEVBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQ3ZGLE1BQU0sRUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztnQkFDckYsYUFBYSxFQUFRLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLElBQUksRUFBRTtnQkFDbkUsTUFBTSxFQUFlLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLElBQUksUUFBUTtnQkFDbEUsWUFBWSxFQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDO2dCQUMzRixZQUFZLEVBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxRQUFRLENBQUM7Z0JBQzNGLE9BQU8sRUFBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDdEYsT0FBTyxFQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO2dCQUN0RixRQUFRLEVBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUM7Z0JBQ2xGLGVBQWUsRUFBTSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxJQUFJLEVBQUU7Z0JBQ3JFLEtBQUssRUFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7Z0JBQ3BGLGVBQWUsRUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLFFBQVEsQ0FBQztnQkFDOUYsY0FBYyxFQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDO2dCQUM3RixRQUFRLEVBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQ3ZGLGlCQUFpQixFQUFJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsSUFBSSxRQUFRO2dCQUM3RSxLQUFLLEVBQWdCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLElBQUksUUFBUTtnQkFDakUsWUFBWSxFQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDO2dCQUMzRixXQUFXLEVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUM7YUFDN0Y7WUFDRCxrQkFBa0IsRUFBUyxPQUFPLEVBQUUsa0JBQWtCLElBQUksS0FBSztZQUMvRCxnQkFBZ0IsRUFBVyxPQUFPLEVBQUUsZ0JBQWdCLElBQUksSUFBSTtZQUM1RCx5QkFBeUIsRUFBRSxPQUFPLEVBQUUseUJBQXlCLElBQUksS0FBSztZQUN0RSxRQUFRLEVBQW1CLEtBQUs7WUFDaEMsWUFBWTtTQUNmLENBQUM7UUFDRixJQUFJLE9BQU8sRUFBRSxZQUFZLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxvSkFBb0osRUFBRTtnQkFDdEssSUFBSSxFQUFJLHdCQUF3QjtnQkFDaEMsTUFBTSxFQUFFLDJGQUEyRjthQUN0RyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsSUFBSSxZQUFZLElBQUksT0FBTyxFQUFFLGdCQUFnQixLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNsSSxPQUFPLENBQUMsV0FBVyxDQUFDLHdJQUF3SSxFQUFFO2dCQUMxSixJQUFJLEVBQUksK0NBQStDO2dCQUN2RCxNQUFNLEVBQUUsc0dBQXNHO2FBQ2pILENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHlCQUFlLENBQUMsc0JBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkseUJBQWUsQ0FBQyxlQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHlCQUFlLENBQUMsd0JBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUkscUJBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUkseUJBQWUsQ0FBQywwQkFBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx5QkFBZSxDQUFDLGNBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsdUxBQXVMO0lBQ3ZMLElBQUksV0FBVztRQUNYLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLCtKQUErSixDQUFDLENBQUM7UUFDck4sQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHdLQUF3SztJQUN4SyxJQUFJLElBQUk7UUFDSixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdKQUF3SixDQUFDLENBQUM7UUFDOU0sQ0FBQztJQUNMLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsSUFBSSxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSx3QkFBZSxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDMUYsQ0FBQztRQUNELDhJQUE4STtRQUM5SSxPQUFPLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsS0FBSyxDQUFDLE9BQU87UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsTUFBTSxJQUFJLFNBQVMsQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO1FBQ3pHLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5RCxNQUFNLElBQUksU0FBUyxDQUFDLHNGQUFzRixDQUFDLENBQUM7UUFDaEgsQ0FBQztRQUVELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhO1FBQ3BELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQW9CLEVBQUUsYUFBaUMsRUFBRTtRQUN0RSxLQUFLLE1BQU0sQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFvQyxTQUFpQjtRQUMzRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBTSxDQUFDO1FBQzFGLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBTSxDQUFDO1FBQ3hGLENBQUM7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQU0sQ0FBQztJQUMzRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsY0FBYyxDQUFDLFdBQW1CO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQkFBa0IsQ0FBQyxPQUFlO1FBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksd0JBQWUsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQzFGLENBQUM7UUFDRCx5R0FBeUc7UUFDekcsT0FBTyxjQUFjLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7U0FHSztJQUNMLGdCQUFnQixDQUFDLE9BQWdDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksd0JBQWUsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQzFGLENBQUM7UUFDRCw4SUFBOEk7UUFDOUksT0FBTyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7WUFDbkMsU0FBUyxFQUFPLE9BQU8sQ0FBQyxTQUFTO1lBQ2pDLE9BQU8sRUFBUyxPQUFPLENBQUMsT0FBTztZQUMvQixLQUFLLEVBQVcsT0FBTyxDQUFDLEtBQUs7WUFDN0IsbUVBQW1FO1lBQ25FLGNBQWMsRUFBRSxPQUFPLENBQUMsbUJBQW1CO1lBQzNDLFFBQVEsRUFBUSxPQUFPLENBQUMsUUFBUTtZQUNoQyxRQUFRLEVBQVEsT0FBTyxDQUFDLFFBQVE7U0FDbkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILGlCQUFpQixDQUFDLE9BQWU7UUFDN0IsOElBQThJO1FBQzlJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJO1FBQzNCLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoRSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksU0FBUyxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF4UEQseUJBd1BDIn0=

/***/ }),

/***/ 3237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module UnavailableGuild */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
/** Represents a guild that is unavailable. */
class UnavailableGuild extends Base_1.default {
    unavailable;
    constructor(data, client) {
        super(data.id, client);
        this.unavailable = data.unavailable;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            unavailable: this.unavailable
        };
    }
}
exports["default"] = UnavailableGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5hdmFpbGFibGVHdWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VuYXZhaWxhYmxlR3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLDBEQUEwQjtBQUsxQiw4Q0FBOEM7QUFDOUMsTUFBcUIsZ0JBQWlCLFNBQVEsY0FBSTtJQUM5QyxXQUFXLENBQU87SUFDbEIsWUFBWSxJQUF5QixFQUFFLE1BQWM7UUFDakQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDaEMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWJELG1DQWFDIn0=

/***/ }),

/***/ 4455:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ChildProcess = __webpack_require__(5317);
const { Duplex } = __webpack_require__(2203);

let FFMPEG = {
  command: null,
  output: null,
};

const VERSION_REGEX = /version (.+) Copyright/mi;

Object.defineProperty(FFMPEG, 'version', {
  get() {
    return VERSION_REGEX.exec(FFMPEG.output)[1];
  },
  enumerable: true,
});

/**
 * An FFmpeg transform stream that provides an interface to FFmpeg.
 * @memberof core
 */
class FFmpeg extends Duplex {
  /**
   * Creates a new FFmpeg transform stream
   * @memberof core
   * @param {Object} options Options you would pass to a regular Transform stream, plus an `args` option
   * @param {Array<string>} options.args Arguments to pass to FFmpeg
   * @param {boolean} [options.shell=false] Whether FFmpeg should be spawned inside a shell
   * @example
   * // By default, if you don't specify an input (`-i ...`) prism will assume you're piping a stream into it.
   * const transcoder = new prism.FFmpeg({
   *  args: [
   *    '-analyzeduration', '0',
   *    '-loglevel', '0',
   *    '-f', 's16le',
   *    '-ar', '48000',
   *    '-ac', '2',
   *  ]
   * });
   * const s16le = mp3File.pipe(transcoder);
   * const opus = s16le.pipe(new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 }));
   */
  constructor(options = {}) {
    super();
    this.process = FFmpeg.create({ shell: false, ...options });
    const EVENTS = {
      readable: this._reader,
      data: this._reader,
      end: this._reader,
      unpipe: this._reader,
      finish: this._writer,
      drain: this._writer,
    };

    this._readableState = this._reader._readableState;
    this._writableState = this._writer._writableState;

    this._copy(['write', 'end'], this._writer);
    this._copy(['read', 'setEncoding', 'pipe', 'unpipe'], this._reader);

    for (const method of ['on', 'once', 'removeListener', 'removeListeners', 'listeners']) {
      this[method] = (ev, fn) => EVENTS[ev] ? EVENTS[ev][method](ev, fn) : Duplex.prototype[method].call(this, ev, fn);
    }

    const processError = error => this.emit('error', error);
    this._reader.on('error', processError);
    this._writer.on('error', processError);
  }

  get _reader() { return this.process.stdout; }
  get _writer() { return this.process.stdin; }

  _copy(methods, target) {
    for (const method of methods) {
      this[method] = target[method].bind(target);
    }
  }

  _destroy(err, cb) {
    this._cleanup();
    return cb ? cb(err) : undefined;
  }

  _final(cb) {
    this._cleanup();
    cb();
  }

  _cleanup() {
    if (this.process) {
      this.once('error', () => {});
      this.process.kill('SIGKILL');
      this.process = null;
    }
  }


  /**
   * The available FFmpeg information
   * @typedef {Object} FFmpegInfo
   * @memberof core
   * @property {string} command The command used to launch FFmpeg
   * @property {string} output The output from running `ffmpeg -h`
   * @property {string} version The version of FFmpeg being used, determined from `output`.
   */

  /**
   * Finds a suitable FFmpeg command and obtains the debug information from it.
   * @param {boolean} [force=false] If true, will ignore any cached results and search for the command again
   * @returns {FFmpegInfo}
   * @throws Will throw an error if FFmpeg cannot be found.
   * @example
   * const ffmpeg = prism.FFmpeg.getInfo();
   *
   * console.log(`Using FFmpeg version ${ffmpeg.version}`);
   *
   * if (ffmpeg.output.includes('--enable-libopus')) {
   *   console.log('libopus is available!');
   * } else {
   *   console.log('libopus is unavailable!');
   * }
   */
  static getInfo(force = false) {
    if (FFMPEG.command && !force) return FFMPEG;
    const sources = [() => {
      const ffmpegStatic = __webpack_require__(9956);
      return ffmpegStatic.path || ffmpegStatic;
    }, 'ffmpeg', 'avconv', './ffmpeg', './avconv'];
    for (let source of sources) {
      try {
        if (typeof source === 'function') source = source();
        const result = ChildProcess.spawnSync(source, ['-h'], { windowsHide: true });
        if (result.error) throw result.error;
        Object.assign(FFMPEG, {
          command: source,
          output: Buffer.concat(result.output.filter(Boolean)).toString(),
        });
        return FFMPEG;
      } catch (error) {
        // Do nothing
      }
    }
    throw new Error('FFmpeg/avconv not found!');
  }

  /**
   * Creates a new FFmpeg instance. If you do not include `-i ...` it will be assumed that `-i -` should be prepended
   * to the options and that you'll be piping data into the process.
   * @param {String[]} [args=[]] Arguments to pass to FFmpeg
   * @returns {ChildProcess}
   * @private
   * @throws Will throw an error if FFmpeg cannot be found.
   */
  static create({ args = [], shell = false } = {}) {
    if (!args.includes('-i')) args.unshift('-i', '-');
    return ChildProcess.spawn(FFmpeg.getInfo().command, args.concat(['pipe:1']), { windowsHide: true, shell });
  }
}

module.exports = FFmpeg;


/***/ }),

/***/ 1405:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Based on discord.js' old volume system

const { Transform } = __webpack_require__(2203);

/**
 * Transforms a stream of PCM volume.
 * @memberof core
 * @extends TransformStream
 */
class VolumeTransformer extends Transform {
  /**
   * @memberof core
   * @param {Object} options Any optional TransformStream options plus some extra:
   * @param {string} options.type The type of transformer: s16le (signed 16-bit little-endian), s16be, s32le, s32be
   * @param {number} [options.volume=1] The output volume of the stream
   * @example
   * // Half the volume of a signed 16-bit little-endian PCM stream
   * input
   *  .pipe(new prism.VolumeTransformer({ type: 's16le', volume: 0.5 }))
   *  .pipe(writeStream);
   */
  constructor(options = {}) {
    super(options);
    switch (options.type) {
      case 's16le':
        this._readInt = (buffer, index) => buffer.readInt16LE(index);
        this._writeInt = (buffer, int, index) => buffer.writeInt16LE(int, index);
        this._bits = 16;
        break;
      case 's16be':
        this._readInt = (buffer, index) => buffer.readInt16BE(index);
        this._writeInt = (buffer, int, index) => buffer.writeInt16BE(int, index);
        this._bits = 16;
        break;
      case 's32le':
        this._readInt = (buffer, index) => buffer.readInt32LE(index);
        this._writeInt = (buffer, int, index) => buffer.writeInt32LE(int, index);
        this._bits = 32;
        break;
      case 's32be':
        this._readInt = (buffer, index) => buffer.readInt32BE(index);
        this._writeInt = (buffer, int, index) => buffer.writeInt32BE(int, index);
        this._bits = 32;
        break;
      default:
        throw new Error('VolumeTransformer type should be one of s16le, s16be, s32le, s32be');
    }
    this._bytes = this._bits / 8;
    this._extremum = Math.pow(2, this._bits - 1);
    this.volume = typeof options.volume === 'undefined' ? 1 : options.volume;
    this._chunk = Buffer.alloc(0);
  }

  _readInt(buffer, index) { return index; }
  _writeInt(buffer, int, index) { return index; }

  _transform(chunk, encoding, done) {
    // If the volume is 1, act like a passthrough stream
    if (this.volume === 1) {
      this.push(chunk);
      return done();
    }

    const { _bytes, _extremum } = this;

    chunk = this._chunk = Buffer.concat([this._chunk, chunk]);
    if (chunk.length < _bytes) return done();

    const complete = Math.floor(chunk.length / _bytes) * _bytes;

    for (let i = 0; i < complete; i += _bytes) {
      const int = Math.min(_extremum - 1, Math.max(-_extremum, Math.floor(this.volume * this._readInt(chunk, i))));
      this._writeInt(chunk, int, i);
    }

    this._chunk = chunk.slice(complete);
    this.push(chunk.slice(0, complete));
    return done();
  }

  _destroy(err, cb) {
    super._destroy(err, cb);
    this._chunk = null;
  }

  /**
   * Sets the volume relative to the input stream - i.e. 1 is normal, 0.5 is half, 2 is double.
   * @param {number} volume The volume that you want to set
   */
  setVolume(volume) {
    this.volume = volume;
  }

  /**
   * Sets the volume in decibels.
   * @param {number} db The decibels
   */
  setVolumeDecibels(db) {
    this.setVolume(Math.pow(10, db / 20));
  }

  /**
   * Sets the volume so that a perceived value of 0.5 is half the perceived volume etc.
   * @param {number} value The value for the volume
   */
  setVolumeLogarithmic(value) {
    this.setVolume(Math.pow(value, 1.660964));
  }

  /**
   * The current volume of the stream in decibels
   * @readonly
   * @type {number}
   */
  get volumeDecibels() {
    return Math.log10(this.volume) * 20;
  }
  /**
   * The current volume of the stream from a logarithmic scale
   * @readonly
   * @type {number}
   */
  get volumeLogarithmic() {
    return Math.pow(this.volume, 1 / 1.660964);
  }
}

module.exports = VolumeTransformer;


/***/ }),

/***/ 3778:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(2203);

/**
 * Base class for WebmOpusDemuxer and WebmVorbisDemuxer.
 * **You shouldn't directly instantiate this class, use the opus.WebmDemuxer and vorbis.WebmDemuxer
 * implementations instead!**
 * @memberof core
 * @protected
 * @extends TransformStream
 */
class WebmBaseDemuxer extends Transform {
  /**
   * Creates a new Webm demuxer.
   * @private
   * @memberof core
   * @param {Object} [options] options that you would pass to a regular Transform stream.
   */
  constructor(options = {}) {
    super(Object.assign({ readableObjectMode: true }, options));
    this._remainder = null;
    this._length = 0;
    this._count = 0;
    this._skipUntil = null;
    this._track = null;
    this._incompleteTrack = {};
    this._ebmlFound = false;
  }

  _transform(chunk, encoding, done) {
    this._length += chunk.length;
    if (this._remainder) {
      chunk = Buffer.concat([this._remainder, chunk]);
      this._remainder = null;
    }
    let offset = 0;
    if (this._skipUntil && this._length > this._skipUntil) {
      offset = this._skipUntil - this._count;
      this._skipUntil = null;
    } else if (this._skipUntil) {
      this._count += chunk.length;
      done();
      return;
    }
    let result;
    while (result !== TOO_SHORT) {
      try {
        result = this._readTag(chunk, offset);
      } catch (error) {
        done(error);
        return;
      }
      if (result === TOO_SHORT) break;
      if (result._skipUntil) {
        this._skipUntil = result._skipUntil;
        break;
      }
      if (result.offset) offset = result.offset;
      else break;
    }
    this._count += offset;
    this._remainder = chunk.slice(offset);
    done();
    return;
  }

  /**
   * Reads an EBML ID from a buffer.
   * @private
   * @param {Buffer} chunk the buffer to read from.
   * @param {number} offset the offset in the buffer.
   * @returns {Object|Symbol} contains an `id` property (buffer) and the new `offset` (number).
   * Returns the TOO_SHORT symbol if the data wasn't big enough to facilitate the request.
   */
  _readEBMLId(chunk, offset) {
    const idLength = vintLength(chunk, offset);
    if (idLength === TOO_SHORT) return TOO_SHORT;
    return {
      id: chunk.slice(offset, offset + idLength),
      offset: offset + idLength,
    };
  }

  /**
   * Reads a size variable-integer to calculate the length of the data of a tag.
   * @private
   * @param {Buffer} chunk the buffer to read from.
   * @param {number} offset the offset in the buffer.
   * @returns {Object|Symbol} contains property `offset` (number), `dataLength` (number) and `sizeLength` (number).
   * Returns the TOO_SHORT symbol if the data wasn't big enough to facilitate the request.
   */
  _readTagDataSize(chunk, offset) {
    const sizeLength = vintLength(chunk, offset);
    if (sizeLength === TOO_SHORT) return TOO_SHORT;
    const dataLength = expandVint(chunk, offset, offset + sizeLength);
    return { offset: offset + sizeLength, dataLength, sizeLength };
  }

  /**
   * Takes a buffer and attempts to read and process a tag.
   * @private
   * @param {Buffer} chunk the buffer to read from.
   * @param {number} offset the offset in the buffer.
   * @returns {Object|Symbol} contains the new `offset` (number) and optionally the `_skipUntil` property,
   * indicating that the stream should ignore any data until a certain length is reached.
   * Returns the TOO_SHORT symbol if the data wasn't big enough to facilitate the request.
   */
  _readTag(chunk, offset) {
    const idData = this._readEBMLId(chunk, offset);
    if (idData === TOO_SHORT) return TOO_SHORT;
    const ebmlID = idData.id.toString('hex');
    if (!this._ebmlFound) {
      if (ebmlID === '1a45dfa3') this._ebmlFound = true;
      else throw Error('Did not find the EBML tag at the start of the stream');
    }
    offset = idData.offset;
    const sizeData = this._readTagDataSize(chunk, offset);
    if (sizeData === TOO_SHORT) return TOO_SHORT;
    const { dataLength } = sizeData;
    offset = sizeData.offset;
    // If this tag isn't useful, tell the stream to stop processing data until the tag ends
    if (typeof TAGS[ebmlID] === 'undefined') {
      if (chunk.length > offset + dataLength) {
        return { offset: offset + dataLength };
      }
      return { offset, _skipUntil: this._count + offset + dataLength };
    }

    const tagHasChildren = TAGS[ebmlID];
    if (tagHasChildren) {
      return { offset };
    }

    if (offset + dataLength > chunk.length) return TOO_SHORT;
    const data = chunk.slice(offset, offset + dataLength);
    if (!this._track) {
      if (ebmlID === 'ae') this._incompleteTrack = {};
      if (ebmlID === 'd7') this._incompleteTrack.number = data[0];
      if (ebmlID === '83') this._incompleteTrack.type = data[0];
      if (this._incompleteTrack.type === 2 && typeof this._incompleteTrack.number !== 'undefined') {
        this._track = this._incompleteTrack;
      }
    }
    if (ebmlID === '63a2') {
      this._checkHead(data);
      this.emit('head', data);
    } else if (ebmlID === 'a3') {
      if (!this._track) throw Error('No audio track in this webm!');
      if ((data[0] & 0xF) === this._track.number) {
        this.push(data.slice(4));
      }
    }
    return { offset: offset + dataLength };
  }

  _destroy(err, cb) {
    this._cleanup();
    return cb ? cb(err) : undefined;
  }

  _final(cb) {
    this._cleanup();
    cb();
  }

  /**
   * Cleans up the demuxer when it is no longer required.
   * @private
   */
  _cleanup() {
    this._remainder = null;
    this._incompleteTrack = {};
  }
}

/**
 * A symbol that is returned by some functions that indicates the buffer it has been provided is not large enough
 * to facilitate a request.
 * @name WebmBaseDemuxer#TOO_SHORT
 * @memberof core
 * @private
 * @type {Symbol}
 */
const TOO_SHORT = WebmBaseDemuxer.TOO_SHORT = Symbol('TOO_SHORT');

/**
 * A map that takes a value of an EBML ID in hex string form, with the value being a boolean that indicates whether
 * this tag has children.
 * @name WebmBaseDemuxer#TAGS
 * @memberof core
 * @private
 * @type {Object}
 */
const TAGS = WebmBaseDemuxer.TAGS = { // value is true if the element has children
  '1a45dfa3': true, // EBML
  '18538067': true, // Segment
  '1f43b675': true, // Cluster
  '1654ae6b': true, // Tracks
  'ae': true, // TrackEntry
  'd7': false, // TrackNumber
  '83': false, // TrackType
  'a3': false, // SimpleBlock
  '63a2': false,
};

module.exports = WebmBaseDemuxer;

function vintLength(buffer, index) {
  if (index < 0 || index > buffer.length - 1) {
    return TOO_SHORT;
  }
  let i = 0;
  for (; i < 8; i++) if ((1 << (7 - i)) & buffer[index]) break;
  i++;
  if (index + i > buffer.length) {
    return TOO_SHORT;
  }
  return i;
}

function expandVint(buffer, start, end) {
  const length = vintLength(buffer, start);
  if (end > buffer.length || length === TOO_SHORT) return TOO_SHORT;
  let mask = (1 << (8 - length)) - 1;
  let value = buffer[start] & mask;
  for (let i = start + 1; i < end; i++) {
    value = (value << 8) + buffer[i];
  }
  return value;
}


/***/ }),

/***/ 2184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Core features.
 * **You shouldn't prefix imports from this namespace with `core`.**
 * @namespace core
 */
module.exports = {
  FFmpeg: __webpack_require__(4455),
  VolumeTransformer: __webpack_require__(1405),
};


/***/ }),

/***/ 2122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  opus: __webpack_require__(7368),
  vorbis: __webpack_require__(1820),
  ...__webpack_require__(2184),
};


/***/ }),

/***/ 1047:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Transform } = __webpack_require__(2203);

const OGG_PAGE_HEADER_SIZE = 26;
const STREAM_STRUCTURE_VERSION = 0;

const charCode = x => x.charCodeAt(0);
const OGGS_HEADER = Buffer.from([...'OggS'].map(charCode));
const OPUS_HEAD = Buffer.from([...'OpusHead'].map(charCode));
const OPUS_TAGS = Buffer.from([...'OpusTags'].map(charCode));

/**
 * Demuxes an Ogg stream (containing Opus audio) to output an Opus stream.
 * @extends {TransformStream}
 * @memberof opus
 */
class OggDemuxer extends Transform {
  /**
   * Creates a new OggOpus demuxer.
   * @param {Object} [options] options that you would pass to a regular Transform stream.
   * @memberof opus
   */
  constructor(options = {}) {
    super(Object.assign({ readableObjectMode: true }, options));
    this._remainder = null;
    this._head = null;
    this._bitstream = null;
  }

  _transform(chunk, encoding, done) {
    if (this._remainder) {
      chunk = Buffer.concat([this._remainder, chunk]);
      this._remainder = null;
    }

    try {
      while (chunk) {
        const result = this._readPage(chunk);
        if (result) chunk = result;
        else break;
      }
    } catch (error) {
      done(error);
      return;
    }
    this._remainder = chunk;
    done();
  }

  /**
   * Reads a page from a buffer
   * @private
   * @param {Buffer} chunk the chunk containing the page
   * @returns {boolean|Buffer} if a buffer, it will be a slice of the excess data of the original, otherwise it will be
   * false and would indicate that there is not enough data to go ahead with reading this page.
   */
  _readPage(chunk) {
    if (chunk.length < OGG_PAGE_HEADER_SIZE) {
      return false;
    }
    if (!chunk.slice(0, 4).equals(OGGS_HEADER)) {
      throw Error(`capture_pattern is not ${OGGS_HEADER}`);
    }
    if (chunk.readUInt8(4) !== STREAM_STRUCTURE_VERSION) {
      throw Error(`stream_structure_version is not ${STREAM_STRUCTURE_VERSION}`);
    }

    if (chunk.length < 27) return false;
    const pageSegments = chunk.readUInt8(26);
    if (chunk.length < 27 + pageSegments) return false;
    const table = chunk.slice(27, 27 + pageSegments);
    const bitstream = chunk.readUInt32BE(14);

    let sizes = [], totalSize = 0;

    for (let i = 0; i < pageSegments;) {
      let size = 0, x = 255;
      while (x === 255) {
        if (i >= table.length) return false;
        x = table.readUInt8(i);
        i++;
        size += x;
      }
      sizes.push(size);
      totalSize += size;
    }

    if (chunk.length < 27 + pageSegments + totalSize) return false;

    let start = 27 + pageSegments;
    for (const size of sizes) {
      const segment = chunk.slice(start, start + size);
      const header = segment.slice(0, 8);
      if (this._head) {
        if (header.equals(OPUS_TAGS)) this.emit('tags', segment);
        else if (this._bitstream === bitstream) this.push(segment);
      } else if (header.equals(OPUS_HEAD)) {
        this.emit('head', segment);
        this._head = segment;
        this._bitstream = bitstream;
      } else {
        this.emit('unknownSegment', segment);
      }
      start += size;
    }
    return chunk.slice(start);
  }

  _destroy(err, cb) {
    this._cleanup();
    return cb ? cb(err) : undefined;
  }

  _final(cb) {
    this._cleanup();
    cb();
  }

  /**
   * Cleans up the demuxer when it is no longer required.
   * @private
   */
  _cleanup() {
    this._remainder = null;
    this._head = null;
    this._bitstream = null;
  }
}

/**
 * Emitted when the demuxer encounters the opus head.
 * @event OggDemuxer#head
 * @memberof opus
 * @param {Buffer} segment a buffer containing the opus head data.
 */

/**
 * Emitted when the demuxer encounters opus tags.
 * @event OggDemuxer#tags
 * @memberof opus
 * @param {Buffer} segment a buffer containing the opus tags.
 */

module.exports = OggDemuxer;


/***/ }),

/***/ 8981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Partly based on https://github.com/Rantanen/node-opus/blob/master/lib/Encoder.js

const { Transform } = __webpack_require__(2203);
const loader = __webpack_require__(9960);

const CTL = {
  BITRATE: 4002,
  FEC: 4012,
  PLP: 4014,
};

let Opus = {};

function loadOpus(refresh = false) {
  if (Opus.Encoder && !refresh) return Opus;

  Opus = loader.require([
    ['@discordjs/opus', opus => ({ Encoder: opus.OpusEncoder })],
    ['node-opus', opus => ({ Encoder: opus.OpusEncoder })],
    ['opusscript', opus => ({ Encoder: opus })],
  ]);
  return Opus;
}

const charCode = x => x.charCodeAt(0);
const OPUS_HEAD = Buffer.from([...'OpusHead'].map(charCode));
const OPUS_TAGS = Buffer.from([...'OpusTags'].map(charCode));

// frame size = (channels * rate * frame_duration) / 1000

/**
 * Takes a stream of Opus data and outputs a stream of PCM data, or the inverse.
 * **You shouldn't directly instantiate this class, see opus.Encoder and opus.Decoder instead!**
 * @memberof opus
 * @extends TransformStream
 * @protected
 */
class OpusStream extends Transform {
  /**
   * Creates a new Opus transformer.
   * @private
   * @memberof opus
   * @param {Object} [options] options that you would pass to a regular Transform stream
   */
  constructor(options = {}) {
    if (!loadOpus().Encoder) {
      throw Error('Could not find an Opus module! Please install @discordjs/opus, node-opus, or opusscript.');
    }
    super(Object.assign({ readableObjectMode: true }, options));
    if (Opus.name === 'opusscript') {
      options.application = Opus.Encoder.Application[options.application];
    }
    this.encoder = new Opus.Encoder(options.rate, options.channels, options.application);

    this._options = options;
    this._required = this._options.frameSize * this._options.channels * 2;
  }

  _encode(buffer) {
    return this.encoder.encode(buffer, this._options.frameSize);
  }

  _decode(buffer) {
    return this.encoder.decode(buffer, Opus.name === 'opusscript' ? null : this._options.frameSize);
  }

  /**
   * Returns the Opus module being used - `opusscript`, `node-opus`, or `@discordjs/opus`.
   * @type {string}
   * @readonly
   * @example
   * console.log(`Using Opus module ${prism.opus.Encoder.type}`);
   */
  static get type() {
    return Opus.name;
  }

  /**
   * Sets the bitrate of the stream.
   * @param {number} bitrate the bitrate to use use, e.g. 48000
   * @public
   */
  setBitrate(bitrate) {
    (this.encoder.applyEncoderCTL || this.encoder.encoderCTL)
      .apply(this.encoder, [CTL.BITRATE, Math.min(128e3, Math.max(16e3, bitrate))]);
  }

  /**
   * Enables or disables forward error correction.
   * @param {boolean} enabled whether or not to enable FEC.
   * @public
   */
  setFEC(enabled) {
    (this.encoder.applyEncoderCTL || this.encoder.encoderCTL)
      .apply(this.encoder, [CTL.FEC, enabled ? 1 : 0]);
  }

  /**
   * Sets the expected packet loss over network transmission.
   * @param {number} [percentage] a percentage (represented between 0 and 1)
   */
  setPLP(percentage) {
    (this.encoder.applyEncoderCTL || this.encoder.encoderCTL)
      .apply(this.encoder, [CTL.PLP, Math.min(100, Math.max(0, percentage * 100))]);
  }

  _final(cb) {
    this._cleanup();
    cb();
  }

  _destroy(err, cb) {
    this._cleanup();
    return cb ? cb(err) : undefined;
  }

  /**
   * Cleans up the Opus stream when it is no longer needed
   * @private
   */
  _cleanup() {
    if (Opus.name === 'opusscript' && this.encoder) this.encoder.delete();
    this.encoder = null;
  }
}

/**
 * An Opus encoder stream.
 *
 * Outputs opus packets in [object mode.](https://nodejs.org/api/stream.html#stream_object_mode)
 * @extends opus.OpusStream
 * @memberof opus
 * @example
 * const encoder = new prism.opus.Encoder({ frameSize: 960, channels: 2, rate: 48000 });
 * pcmAudio.pipe(encoder);
 * // encoder will now output Opus-encoded audio packets
 */
class Encoder extends OpusStream {
  /**
   * Creates a new Opus encoder stream.
   * @memberof opus
   * @param {Object} options options that you would pass to a regular OpusStream, plus a few more:
   * @param {number} options.frameSize the frame size in bytes to use (e.g. 960 for stereo audio at 48KHz with a frame
   * duration of 20ms)
   * @param {number} options.channels the number of channels to use
   * @param {number} options.rate the sampling rate in Hz
   */
  constructor(options) {
    super(options);
    this._buffer = Buffer.alloc(0);
  }

  _transform(chunk, encoding, done) {
    this._buffer = Buffer.concat([this._buffer, chunk]);
    let n = 0;
    while (this._buffer.length >= this._required * (n + 1)) {
      const buf = this._encode(this._buffer.slice(n * this._required, (n + 1) * this._required));
      this.push(buf);
      n++;
    }
    if (n > 0) this._buffer = this._buffer.slice(n * this._required);
    return done();
  }

  _destroy(err, cb) {
    super._destroy(err, cb);
    this._buffer = null;
  }
}

/**
 * An Opus decoder stream.
 *
 * Note that any stream you pipe into this must be in
 * [object mode](https://nodejs.org/api/stream.html#stream_object_mode) and should output Opus packets.
 * @extends opus.OpusStream
 * @memberof opus
 * @example
 * const decoder = new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
 * input.pipe(decoder);
 * // decoder will now output PCM audio
 */
class Decoder extends OpusStream {
  _transform(chunk, encoding, done) {
    const signature = chunk.slice(0, 8);
    if (chunk.length >= 8 && signature.equals(OPUS_HEAD)) {
      this.emit('format', {
        channels: this._options.channels,
        sampleRate: this._options.rate,
        bitDepth: 16,
        float: false,
        signed: true,
        version: chunk.readUInt8(8),
        preSkip: chunk.readUInt16LE(10),
        gain: chunk.readUInt16LE(16),
      });
      return done();
    }
    if (chunk.length >= 8 && signature.equals(OPUS_TAGS)) {
      this.emit('tags', chunk);
      return done();
    }
    try {
      this.push(this._decode(chunk));
    } catch (e) {
      return done(e);
    }
    return done();
  }
}

module.exports = { Decoder, Encoder };


/***/ }),

/***/ 8575:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const WebmBaseDemuxer = __webpack_require__(3778);

const OPUS_HEAD = Buffer.from([...'OpusHead'].map(x => x.charCodeAt(0)));

/**
 * Demuxes a Webm stream (containing Opus audio) to output an Opus stream.
 * @extends core.WebmBaseDemuxer
 * @memberof opus
 * @example
 * const fs = require('fs');
 * const file = fs.createReadStream('./audio.webm');
 * const demuxer = new prism.opus.WebmDemuxer();
 * const opus = file.pipe(demuxer);
 * // opus is now a ReadableStream in object mode outputting Opus packets
 */
class WebmDemuxer extends WebmBaseDemuxer {
  _checkHead(data) {
    if (!data.slice(0, 8).equals(OPUS_HEAD)) {
      throw Error('Audio codec is not Opus!');
    }
  }
}

module.exports = WebmDemuxer;


/***/ }),

/***/ 7368:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Opus features
 * @namespace opus
 */
module.exports = {
  // Encoder and Decoder
  ...__webpack_require__(8981),
  OggDemuxer: __webpack_require__(1047),
  WebmDemuxer: __webpack_require__(8575),
};


/***/ }),

/***/ 9960:
/***/ ((__unused_webpack_module, exports) => {

exports.require = function loader(list) {
  const errorLog = [];
  for (const [name, fn] of list) {
    try {
      const data = fn(__WEBPACK_EXTERNAL_createRequire(import.meta.url)(name));
      data.name = name;
      return data;
    } catch (e) {
      errorLog.push(e);
    }
  }
  throw new Error(errorLog.join('\n'));
};


/***/ }),

/***/ 2699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const WebmBaseDemuxer = __webpack_require__(3778);

const VORBIS_HEAD = Buffer.from([...'vorbis'].map(x => x.charCodeAt(0)));

/**
 * Demuxes a Webm stream (containing Vorbis audio) to output a Vorbis stream.
 * @memberof vorbis
 * @extends core.WebmBaseDemuxer
 */
class WebmDemuxer extends WebmBaseDemuxer {
  _checkHead(data) {
    if (data.readUInt8(0) !== 2 || !data.slice(4, 10).equals(VORBIS_HEAD)) {
      throw Error('Audio codec is not Vorbis!');
    }

    this.push(data.slice(3, 3 + data.readUInt8(1)));
    this.push(data.slice(3 + data.readUInt8(1), 3 + data.readUInt8(1) + data.readUInt8(2)));
    this.push(data.slice(3 + data.readUInt8(1) + data.readUInt8(2)));
  }
}

module.exports = WebmDemuxer;


/***/ }),

/***/ 1820:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Vorbis features
 * @namespace vorbis
 */

module.exports = {
  WebmDemuxer: __webpack_require__(2699),
};


/***/ }),

/***/ 9956:
/***/ ((module) => {

module.exports = eval("require")("ffmpeg-static");


/***/ })

};
