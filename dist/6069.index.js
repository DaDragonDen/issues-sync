export const id = 6069;
export const ids = [6069,6207];
export const modules = {

/***/ 6207:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
const DefaultDispatchEvents = tslib_1.__importStar(__webpack_require__(8467));
class Dispatcher {
    manager;
    events = new Map();
    constructor(manager) {
        Object.defineProperty(this, "manager", {
            value: manager,
            writable: false,
            enumerable: false,
            configurable: false
        });
        const type = this.manager.options.dispatcher.blacklist === null ? "blacklist" :
            (this.manager.options.dispatcher.whitelist === null ? "whitelist" : "none");
        for (const [event, fn] of Object.entries(DefaultDispatchEvents)) {
            if (type === "none" ||
                (type === "whitelist" && this.manager.options.dispatcher.whitelist?.includes(event)) ||
                (type === "blacklist" && !this.manager.options.dispatcher.blacklist?.includes(event))) {
                this.register(event, fn);
            }
        }
    }
    handle(data, shard) {
        const event = data.t;
        if (!this.events.has(event))
            return;
        const arr = this.events.get(event);
        for (const fn of arr)
            fn(data.d, shard);
    }
    register(event, fn, replace = false) {
        if (!this.events.has(event))
            this.events.set(event, []);
        const arr = this.events.get(event);
        if (replace && arr.length !== 0)
            arr.splice(0, arr.length);
        arr.push(fn);
    }
    unregister(event, fn) {
        if (!this.events.has(event))
            return;
        const arr = this.events.get(event);
        if (fn) {
            const index = arr.indexOf(fn);
            if (index !== -1)
                arr.splice(index, 1);
        }
        else
            arr.splice(0, arr.length);
    }
}
exports["default"] = Dispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9nYXRld2F5L0Rpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0Esd0VBQWtEO0FBUWxELE1BQXFCLFVBQVU7SUFDbkIsT0FBTyxDQUFnQjtJQUMvQixNQUFNLEdBQWdELElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEUsWUFBWSxPQUFxQjtRQUM3QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbkMsS0FBSyxFQUFTLE9BQU87WUFDckIsUUFBUSxFQUFNLEtBQUs7WUFDbkIsVUFBVSxFQUFJLEtBQUs7WUFDbkIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEYsS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQTZDLEVBQUUsQ0FBQztZQUMxRyxJQUFJLElBQUksS0FBSyxNQUFNO2dCQUNmLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEYsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBdUIsRUFBRSxLQUFZO1FBQ2hELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU87UUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFFLENBQUM7UUFDcEMsS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHO1lBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFFBQVEsQ0FBMEIsS0FBUSxFQUFFLEVBQXVCLEVBQUUsT0FBTyxHQUFHLEtBQUs7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUNwQyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFXLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsVUFBVSxDQUEwQixLQUFRLEVBQUUsRUFBd0I7UUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU87UUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFFLENBQUM7UUFDcEMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNMLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBVyxDQUFDLENBQUM7WUFDdkMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7O1lBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQTdDRCw2QkE2Q0MifQ==

/***/ }),

/***/ 6069:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module ShardManager */
const Shard_1 = tslib_1.__importDefault(__webpack_require__(3472));
const Dispatcher_1 = tslib_1.__importDefault(__webpack_require__(6207));
const Constants_1 = __webpack_require__(5660);
const Collection_1 = tslib_1.__importDefault(__webpack_require__(2124));
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
// @ts-ignore
let Erlpack;
try {
    Erlpack = __webpack_require__(1767);
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
let __compressionTrueDeprecationWarning = 0;
/** A manager for all the client's shards. */
class ShardManager extends Collection_1.default {
    _buckets;
    _connectQueue;
    _connectTimeout;
    _gatewayURL;
    client;
    connected = false;
    dispatcher;
    options;
    constructor(client, options = {}) {
        super();
        this._buckets = {};
        this._connectQueue = [];
        this._connectTimeout = null;
        this.options = {
            autoReconnect: options.autoReconnect ?? true,
            compress: options.compress === true ? (__compressionTrueDeprecationWarning++, "zlib-stream") : options.compress ?? false,
            connectionProperties: {
                browser: options.connectionProperties?.browser ?? "Oceanic",
                device: options.connectionProperties?.device ?? "Oceanic",
                os: options.connectionProperties?.os ?? process.platform
            },
            concurrency: options.concurrency === "auto" || options.concurrency && options.concurrency < 1 ? -1 : options.concurrency ?? -1,
            connectionTimeout: options.connectionTimeout ?? 30000,
            dispatcher: {
                blacklist: options.dispatcher?.blacklist === undefined ? null : options.dispatcher.blacklist,
                whitelist: options.dispatcher?.whitelist === undefined ? null : options.dispatcher.whitelist
            },
            firstShardID: options.firstShardID && options.firstShardID < 0 ? 0 : options.firstShardID ?? 0,
            getAllUsers: options.getAllUsers ?? false,
            override: options.override ?? {
                appendQuery: true,
                gatewayURLIsResumeURL: false,
                timeBetweenShardConnects: 5000
            },
            guildCreateTimeout: options.guildCreateTimeout ?? 2000,
            intents: typeof options.intents === "number" ? options.intents : 0,
            largeThreshold: options.largeThreshold ?? 250,
            lastShardID: options.lastShardID ?? -1,
            lookupDisallowedIntents: options.lookupDisallowedIntents ?? false,
            maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
            maxResumeAttempts: options.maxResumeAttempts ?? 10,
            maxShards: options.maxShards === "auto" || options.maxShards && options.maxShards < 1 ? -1 : options.maxShards ?? -1,
            presence: {
                activities: options.presence?.activities ?? [],
                afk: options.presence?.afk ?? false,
                status: options.presence?.status ?? "online"
            },
            reconnectDelay: options.reconnectDelay ?? ((lastDelay, attempts) => Math.pow(attempts + 1, 0.7) * 20000),
            removeDisallowedIntents: options.removeDisallowedIntents ?? false,
            seedVoiceConnections: options.seedVoiceConnections ?? false,
            shardIDs: options.shardIDs ?? [],
            ws: options.ws ?? {}
        };
        if (__compressionTrueDeprecationWarning === 1) {
            process.emitWarning("Using `compress: true` is deprecated and will be removed in a future version. Please use `compress: \"zlib-stream\"` instead.", {
                code: "OCEANIC_GATEWAY_COMPRESSION_TRUE_DEPRECATION"
            });
        }
        this.options.override.appendQuery ??= (this.options.override.getBot === undefined && this.options.override.url === undefined);
        this.options.override.gatewayURLIsResumeURL ??= (this.options.override.getBot !== undefined || this.options.override.url !== undefined);
        this.options.override.timeBetweenShardConnects ??= 5000;
        if (this.options.lastShardID === -1 && this.options.maxShards !== -1) {
            this.options.lastShardID = this.options.maxShards - 1;
        }
        if (!Array.isArray(this.options.shardIDs)) {
            this.options.shardIDs = [];
        }
        if (Object.hasOwn(options, "intents")) {
            if (Array.isArray(options.intents)) {
                let bitmask = 0;
                for (const intent of options.intents) {
                    if (typeof intent === "number") {
                        bitmask |= intent;
                    }
                    else if (Constants_1.Intents[intent]) {
                        bitmask |= Constants_1.Intents[intent];
                    }
                    else {
                        if (intent === "ALL") {
                            bitmask = Constants_1.AllIntents;
                            break;
                        }
                        else if (intent === "ALL_NON_PRIVILEGED") {
                            bitmask = Constants_1.AllNonPrivilegedIntents;
                            continue;
                        }
                        client.emit("warn", `Unknown intent: ${intent}`);
                    }
                }
                this.options.intents = bitmask;
            }
        }
        else {
            this.options.intents = Constants_1.AllNonPrivilegedIntents;
        }
        if (this.options.getAllUsers && !(this.options.intents & Constants_1.Intents.GUILD_MEMBERS)) {
            throw new TypeError("Guild members cannot be requested without the GUILD_MEMBERS intent");
        }
        Object.defineProperties(this, {
            client: {
                value: client,
                writable: false,
                enumerable: false,
                configurable: false
            },
            dispatcher: {
                value: new Dispatcher_1.default(this),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });
    }
    _connect(shard) {
        this._connectQueue.push(shard);
        this.tryConnect();
    }
    _forGuild(guild) {
        if (this.options.maxShards === -1) {
            return undefined;
        }
        return this.get((this.client.guildShardMap[guild] ??= Number((BigInt(guild) >> 22n) % BigInt(this.options.maxShards))));
    }
    async _gatewayURLForShard(shard) {
        if (this.options.override.url !== undefined) {
            return this.options.override.url(shard, this.options.shardIDs.length);
        }
        if (this._gatewayURL) {
            return this._gatewayURL;
        }
        // how did we manage to get all the way to connecting without gatewayURL being set?
        return (this._gatewayURL = (await (this.options.override.getBot?.() ?? this.client.rest.getBotGateway())).url);
    }
    _ready(id) {
        const rateLimitKey = (id % this.options.concurrency) ?? 0;
        this._buckets[rateLimitKey] = Date.now();
        this.tryConnect();
    }
    _resetConnectQueue() {
        this._connectQueue = [];
    }
    async connect() {
        if (this.connected) {
            throw new Error("Already connected.");
        }
        let url, data;
        const overrideURL = (this.options.override.getBot || this.options.override.url) !== undefined;
        try {
            if (this.options.maxShards === -1 || this.options.concurrency === -1) {
                data = await (this.options.override.getBot?.() ?? this.client.rest.getBotGateway());
                url = data.url;
            }
            else {
                url = overrideURL ? null : (await this.client.rest.getGateway()).url;
            }
        }
        catch (err) {
            throw new TypeError("Failed to get gateway information.", { cause: err });
        }
        if (url && this.options.override.appendQuery) {
            if (url.includes("?")) {
                url = url.slice(0, url.indexOf("?"));
            }
            if (!url.endsWith("/")) {
                url += "/";
            }
        }
        /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
        if (this.options.removeDisallowedIntents && Constants_1.PrivilegedIntentMapping.some(([intent]) => (this.options.intents & intent) === intent)) {
            const { flags } = await this.client.rest.applications.getCurrent();
            const check = (intent, allowed) => {
                if ((this.options.intents & intent) === intent && !allowed.some(flag => (flags & flag) === flag)) {
                    this.client.emit("warn", `removeDisallowedIntents is enabled, and ${Constants_1.Intents[intent]} was included but not found to be allowed. It has been removed.`);
                    this.options.intents &= ~intent;
                }
            };
            for (const [intent, allowed] of Constants_1.PrivilegedIntentMapping) {
                check(intent, allowed);
            }
        }
        /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */
        if (url && this.options.override.appendQuery) {
            url += `?v=${Constants_1.GATEWAY_VERSION}&encoding=${Erlpack ? "etf" : "json"}`;
            if (this.options.compress) {
                const type = this.options.compress === "zstd-stream" ? "zstd-stream" : "zlib-stream";
                url += `&compress=${type}`;
            }
            this._gatewayURL = url;
        }
        if (this.options.maxShards === -1) {
            if (!data || !data.shards) {
                throw new TypeError("AutoSharding failed, missing required information from Discord.");
            }
            this.options.maxShards = data.shards;
            if (this.options.lastShardID === -1) {
                this.options.lastShardID = data.shards - 1;
            }
        }
        if (this.options.concurrency === -1) {
            if (!data) {
                throw new TypeError("AutoConcurrency failed, missing required information from Discord.");
            }
            this.options.concurrency = data.sessionStartLimit.maxConcurrency;
        }
        if (this.options.shardIDs.length === 0 && this.options.firstShardID !== undefined && this.options.lastShardID !== undefined) {
            for (let i = this.options.firstShardID; i <= this.options.lastShardID; i++) {
                this.options.shardIDs.push(i);
            }
        }
        this.connected = true;
        for (const id of this.options.shardIDs) {
            this.spawn(id);
        }
    }
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.options.autoReconnect) {
        if (!reconnect) {
            this.connected = false;
        }
        this.client.ready = false;
        for (const [, shard] of this)
            shard.disconnect(reconnect);
        this._resetConnectQueue();
    }
    spawn(id) {
        let shard = this.get(id);
        if (!shard) {
            shard = new Shard_1.default(id, this);
            this.set(id, shard);
            shard
                .on("ready", () => {
                this.client.emit("shardReady", id);
                if (this.client.ready) {
                    return;
                }
                for (const other of this.values()) {
                    if (!other.ready) {
                        return;
                    }
                }
                this.client.ready = true;
                this.client.startTime = Date.now();
                this.client.emit("ready");
            })
                .on("resume", () => {
                this.client.emit("shardResume", id);
                if (this.client.ready) {
                    return;
                }
                for (const other of this.values()) {
                    if (!other.ready) {
                        return;
                    }
                }
                this.client.ready = true;
                this.client.startTime = Date.now();
                this.client.emit("ready");
            })
                .on("disconnect", error => {
                this.client.emit("shardDisconnect", error, id);
                for (const other of this.values()) {
                    if (other.ready) {
                        return;
                    }
                }
                this.client.ready = false;
                this.client.startTime = 0;
                this.client.emit("disconnect");
            })
                .on("preReady", () => {
                this.client.emit("shardPreReady", id);
            });
        }
        if (shard.status === "disconnected") {
            this._connect(shard);
        }
    }
    tryConnect() {
        if (this._connectQueue.length === 0) {
            return;
        }
        for (const shard of this._connectQueue) {
            const rateLimitKey = (shard.id % this.options.concurrency) ?? 0;
            const lastConnect = this._buckets[rateLimitKey] ?? 0;
            if (!shard.sessionID && Date.now() - lastConnect < this.options.override.timeBetweenShardConnects) {
                continue;
            }
            if (this.some(s => s.connecting && ((s.id % this.options.concurrency) || 0) === rateLimitKey)) {
                continue;
            }
            void shard.connect();
            this._buckets[rateLimitKey] = Date.now();
            this._connectQueue.splice(this._connectQueue.findIndex(s => s.id === shard.id), 1);
        }
        if (!this._connectTimeout && this._connectQueue.length !== 0) {
            this._connectTimeout = setTimeout(() => {
                this._connectTimeout = null;
                this.tryConnect();
            }, 500);
        }
    }
}
exports["default"] = ShardManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvU2hhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiw0REFBNEI7QUFDNUIsc0VBQXNDO0FBRXRDLDRDQU9zQjtBQUV0Qiw0RUFBNEM7QUFFNUMsNk1BQTZNO0FBQzdNLGFBQWE7QUFDYixJQUFJLE9BQTZDLENBQUM7QUFDbEQsSUFBSSxDQUFDO0lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztBQUNWLDRNQUE0TTtBQUc1TSxJQUFJLG1DQUFtQyxHQUFHLENBQUMsQ0FBQztBQUM1Qyw2Q0FBNkM7QUFDN0MsTUFBcUIsWUFBYSxTQUFRLG9CQUF5QjtJQUN2RCxRQUFRLENBQXlCO0lBQ2pDLGFBQWEsQ0FBZTtJQUM1QixlQUFlLENBQXdCO0lBQ3ZDLFdBQVcsQ0FBVTtJQUM3QixNQUFNLENBQVU7SUFDaEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixVQUFVLENBQWM7SUFDeEIsT0FBTyxDQUE4QjtJQUNyQyxZQUFZLE1BQWMsRUFBRSxVQUEwQixFQUFFO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBUyxPQUFPLENBQUMsYUFBYSxJQUFJLElBQUk7WUFDbkQsUUFBUSxFQUFjLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFtQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxR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

/***/ })

};
