export const id = 411;
export const ids = [411,1602,8940,4345];
export const modules = {

/***/ 1602:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module DiscordHTTPError */
const DiscordRESTError_1 = tslib_1.__importDefault(__webpack_require__(8940));
/** An HTTP error received from Discord. */
class DiscordHTTPError extends Error {
    method;
    name = "DiscordHTTPError";
    resBody;
    response;
    constructor(res, resBody, method, stack) {
        // eslint-disable-next-line unicorn/custom-error-definition
        super();
        Object.defineProperties(this, {
            method: {
                value: method,
                enumerable: false
            },
            response: {
                value: res,
                enumerable: false
            },
            resBody: {
                value: resBody,
                enumerable: false
            }
        });
        let message = `${res.status} ${res.statusText} on ${this.method} ${this.path}`;
        const errors = DiscordRESTError_1.default.flattenErrors(resBody);
        if (errors.length !== 0) {
            message += `\n  ${errors.join("\n  ")}`;
        }
        this.message = message;
        if (stack) {
            this.stack = this.name + ": " + this.message + "\n" + stack;
        }
        else {
            Error.captureStackTrace(this, DiscordHTTPError);
        }
    }
    get headers() {
        return this.response.headers;
    }
    get path() {
        return new URL(this.response.url).pathname;
    }
    get status() {
        return this.response.status;
    }
    get statusText() {
        return this.response.statusText;
    }
    toJSON() {
        return {
            message: this.message,
            method: this.method,
            name: this.name,
            resBody: this.resBody,
            stack: this.stack ?? ""
        };
    }
}
exports["default"] = DiscordHTTPError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZEhUVFBFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yZXN0L0Rpc2NvcmRIVFRQRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLGtGQUFrRDtBQUlsRCwyQ0FBMkM7QUFDM0MsTUFBcUIsZ0JBQWlCLFNBQVEsS0FBSztJQUMvQyxNQUFNLENBQWM7SUFDWCxJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsT0FBTyxDQUFrQztJQUN6QyxRQUFRLENBQVk7SUFDcEIsWUFBWSxHQUFhLEVBQUUsT0FBZ0IsRUFBRSxNQUFrQixFQUFFLEtBQWM7UUFDM0UsMkRBQTJEO1FBQzNELEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtZQUMxQixNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFPLE1BQU07Z0JBQ2xCLFVBQVUsRUFBRSxLQUFLO2FBQ3BCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBTyxHQUFHO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBTyxPQUFPO2dCQUNuQixVQUFVLEVBQUUsS0FBSzthQUNwQjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsVUFBVSxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9FLE1BQU0sTUFBTSxHQUFHLDBCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFrQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2hFLENBQUM7YUFBTSxDQUFDO1lBQ0osS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFHLElBQUksQ0FBQyxNQUFNO1lBQ3BCLElBQUksRUFBSyxJQUFJLENBQUMsSUFBSTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsS0FBSyxFQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0RELG1DQTJEQyJ9

/***/ }),

/***/ 8940:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** A REST error received from Discord. */
class DiscordRESTError extends Error {
    code;
    method;
    name = "DiscordRESTError";
    resBody;
    response;
    constructor(res, resBody, method, stack) {
        // eslint-disable-next-line unicorn/custom-error-definition
        super();
        this.code = Number(resBody.code);
        Object.defineProperties(this, {
            method: {
                value: method,
                enumerable: false
            },
            response: {
                value: res,
                enumerable: false
            },
            resBody: {
                value: resBody,
                enumerable: false
            }
        });
        let message = "message" in resBody ? `${resBody.message} on ${this.method} ${this.path}` : `Unknown Error on ${this.method} ${this.path}`;
        if ("errors" in resBody) {
            message += `\n ${DiscordRESTError.flattenErrors(resBody.errors).join("\n ")}`;
        }
        else {
            const errors = DiscordRESTError.flattenErrors(resBody);
            if (errors.length !== 0) {
                message += `\n ${errors.join("\n ")}`;
            }
        }
        this.message = message;
        if (stack) {
            this.stack = `${this.name}: ${this.message}\n${stack}`;
        }
        else {
            Error.captureStackTrace(this, DiscordRESTError);
        }
    }
    static flattenErrors(errors, keyPrefix = "") {
        let messages = [];
        for (const fieldName in errors) {
            if (!Object.hasOwn(errors, fieldName) || fieldName === "message" || fieldName === "code") {
                continue;
            }
            if (typeof errors[fieldName] === "object" && errors[fieldName] !== null) {
                if ("_errors" in errors[fieldName]) {
                    messages = messages.concat(errors[fieldName]._errors.map((err) => `${`${keyPrefix}${fieldName}`}: ${err.message}`));
                }
                else if (Array.isArray(errors[fieldName])) {
                    messages = messages.concat(errors[fieldName].map(str => `${`${keyPrefix}${fieldName}`}: ${typeof str === "object" && "message" in str ? str.message : str}`));
                }
                else {
                    messages = messages.concat(DiscordRESTError.flattenErrors(errors[fieldName], `${keyPrefix}${fieldName}.`));
                }
            }
        }
        return messages;
    }
    get headers() {
        return this.response.headers;
    }
    get path() {
        return new URL(this.response.url).pathname;
    }
    get status() {
        return this.response.status;
    }
    get statusText() {
        return this.response.statusText;
    }
    toJSON() {
        return {
            message: this.message,
            method: this.method,
            name: this.name,
            resBody: this.resBody,
            stack: this.stack ?? ""
        };
    }
}
exports["default"] = DiscordRESTError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZFJFU1RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yZXN0L0Rpc2NvcmRSRVNURXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSwwQ0FBMEM7QUFDMUMsTUFBcUIsZ0JBQWlCLFNBQVEsS0FBSztJQUMvQyxJQUFJLENBQVM7SUFDYixNQUFNLENBQWM7SUFDWCxJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsT0FBTyxDQUFrQztJQUN6QyxRQUFRLENBQVk7SUFDcEIsWUFBWSxHQUFhLEVBQUUsT0FBZ0MsRUFBRSxNQUFrQixFQUFFLEtBQWM7UUFDM0YsMkRBQTJEO1FBQzNELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBTyxNQUFNO2dCQUNsQixVQUFVLEVBQUUsS0FBSzthQUNwQjtZQUNELFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQU8sR0FBRztnQkFDZixVQUFVLEVBQUUsS0FBSzthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQU8sT0FBTztnQkFDbkIsVUFBVSxFQUFFLEtBQUs7YUFDcEI7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sR0FBRyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFJLE9BQStCLENBQUMsT0FBTyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkssSUFBSSxRQUFRLElBQUksT0FBTyxFQUFFLENBQUM7WUFDdEIsT0FBTyxJQUFJLE1BQU0sZ0JBQWdC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

/***/ }),

/***/ 411:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module RequestHandler */
const SequentialBucket_1 = tslib_1.__importDefault(__webpack_require__(4345));
const DiscordRESTError_1 = tslib_1.__importDefault(__webpack_require__(8940));
const DiscordHTTPError_1 = tslib_1.__importDefault(__webpack_require__(1602));
const Constants_1 = __webpack_require__(146);
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
/**
 * Latency & ratelimit related things lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/rest/RequestHandler.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
/** The primary means of communicating with Discord via rest. */
class RequestHandler {
    _manager;
    globalBlock = false;
    latencyRef;
    options;
    ratelimits = {};
    readyQueue = [];
    constructor(manager, options = {}) {
        if (options && options.baseURL && options.baseURL.endsWith("/")) {
            options.baseURL = options.baseURL.slice(0, -1);
        }
        this._manager = manager;
        this.options = {
            agent: options.agent,
            baseURL: options.baseURL ?? Constants_1.API_URL,
            disableLatencyCompensation: !!options.disableLatencyCompensation,
            followRedirects: !!options.followRedirects,
            host: options.host ?? (options.baseURL ? new URL(options.baseURL).host : new URL(Constants_1.API_URL).host),
            latencyThreshold: options.latencyThreshold ?? 30000,
            ratelimiterOffset: options.ratelimiterOffset ?? 0,
            requestTimeout: options.requestTimeout ?? 15000,
            superProperties: options.superProperties ?? null,
            userAgent: options.userAgent ?? Constants_1.USER_AGENT
        };
        this.latencyRef = {
            lastTimeOffsetCheck: 0,
            latency: options.ratelimiterOffset ?? 0,
            raw: Array.from({ length: 10 }).fill(options.ratelimiterOffset ?? 0),
            timeOffsets: Array.from({ length: 10 }).fill(0),
            timeoffset: 0
        };
    }
    getRoute(path, method) {
        let route = path.replaceAll(/\/([a-z-]+)\/\d{15,21}/g, function (match, p) {
            return p === "channels" || p === "guilds" || p === "webhooks" ? match : `/${p}/:id`;
        }).replaceAll(/\/reactions\/[^/]+/g, "/reactions/:id").replaceAll(/\/reactions\/:id\/[^/]+/g, "/reactions/:id/:userID").replace(/^\/webhooks\/(\d+)\/[\w-]{64,}/, "/webhooks/$1/:token");
        if (method === "DELETE" && route.endsWith("/messages/:id")) {
            const messageID = path.slice(path.lastIndexOf("/") + 1);
            const createdAt = Base_1.default.getCreatedAt(messageID).getTime();
            if (Date.now() - this.latencyRef.latency - createdAt >= 1000 * 60 * 60 * 24 * 14) {
                method += "_OLD";
            }
            else if (Date.now() - this.latencyRef.latency - createdAt <= 1000 * 10) {
                method += "_NEW";
            }
            route = method + route;
        }
        else if (method === "GET" && /\/guilds\/\d+\/channels$/.test(route)) {
            route = "/guilds/:id/channels";
        }
        if (method === "PUT" || method === "DELETE") {
            const index = route.indexOf("/reactions");
            if (index !== -1) {
                route = "MODIFY" + route.slice(0, index + 10);
            }
        }
        return route;
    }
    globalUnblock() {
        this.globalBlock = false;
        while (this.readyQueue.length !== 0) {
            this.readyQueue.shift()();
        }
    }
    /** same as `request`, but with `auth` always set to `true`. */
    async authRequest(options) {
        return this.request({
            ...options,
            auth: true
        });
    }
    /**
     * Make a request. `null` will be returned if the request results in a `204 NO CONTENT`.
     * @param options The options for the request.
     */
    async request(options) {
        options.method = options.method.toUpperCase();
        if (!Constants_1.RESTMethods.includes(options.method)) {
            throw new TypeError(`Invalid method "${options.method}.`);
        }
        const _stackHolder = {};
        Error.captureStackTrace(_stackHolder);
        if (!options.path.startsWith("/")) {
            options.path = `/${options.path}`;
        }
        const route = options.route ?? this.getRoute(options.path, options.method);
        if (!this.ratelimits[route]) {
            this.ratelimits[route] = new SequentialBucket_1.default(1, this.latencyRef);
        }
        let attempts = 0;
        return new Promise((resolve, reject) => {
            async function attempt(cb) {
                const headers = options.headers ?? {};
                try {
                    if (typeof options.auth === "string") {
                        headers.Authorization = options.auth;
                    }
                    else if (options.auth && this._manager.client.options.auth) {
                        headers.Authorization = this._manager.client.options.auth;
                    }
                    if (options.reason) {
                        headers["X-Audit-Log-Reason"] = encodeURIComponent(options.reason);
                    }
                    let reqBody;
                    if (options.method !== "GET") {
                        let stringBody;
                        if (options.json) {
                            stringBody = JSON.stringify(options.json, (k, v) => typeof v === "bigint" ? v.toString() : v);
                        }
                        if (options.form || (options.files && options.files.length !== 0)) {
                            const data = options.form ?? new FormData();
                            let index = 0;
                            if (options.files)
                                for (const file of options.files.values()) {
                                    index++;
                                    if (file.index !== undefined) {
                                        index = file.index;
                                    }
                                    if (!file.contents) {
                                        continue;
                                    }
                                    data.set(`files[${index}]`, new Blob([file.contents]), file.name);
                                }
                            if (stringBody) {
                                data.set("payload_json", stringBody);
                            }
                            reqBody = data;
                        }
                        else if (options.json) {
                            reqBody = stringBody;
                            headers["Content-Type"] = "application/json";
                        }
                    }
                    if (this.options.host) {
                        headers.Host = this.options.host;
                    }
                    if (this.options.superProperties) {
                        headers["X-Super-Properties"] = typeof this.options.superProperties === "object" ? JSON.stringify(this.options.superProperties) : this.options.superProperties;
                    }
                    const url = `${this.options.baseURL}${options.path}${options.query && Array.from(options.query.keys()).length !== 0 ? `?${options.query.toString()}` : ""}`;
                    let latency = Date.now();
                    const controller = new AbortController();
                    let timeout;
                    if (this.options.requestTimeout > 0 && this.options.requestTimeout !== Infinity) {
                        timeout = setTimeout(() => controller.abort(), this.options.requestTimeout);
                    }
                    const res = await fetch(url, {
                        method: options.method,
                        headers,
                        body: reqBody,
                        dispatcher: this.options.agent || undefined,
                        signal: controller.signal,
                        redirect: this.options.followRedirects ? "follow" : "manual"
                    });
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    latency = Date.now() - latency;
                    if (!this.options.disableLatencyCompensation) {
                        this.latencyRef.raw.push(latency);
                        this.latencyRef.latency = this.latencyRef.latency - Math.trunc((this.latencyRef.raw.shift() ?? 0) / 10) + Math.trunc(latency / 10);
                    }
                    let resBody;
                    if (res.status === 204) {
                        resBody = null;
                    }
                    else {
                        if (res.headers.get("content-type") === "application/json") {
                            const b = await res.text();
                            try {
                                resBody = JSON.parse(b);
                            }
                            catch (err) {
                                this._manager.client.emit("error", err);
                                resBody = b;
                            }
                        }
                        else {
                            resBody = Buffer.from(await res.arrayBuffer());
                        }
                    }
                    this._manager.client.emit("request", {
                        method: options.method,
                        path: options.path,
                        route,
                        withAuth: !!options.auth,
                        requestBody: reqBody,
                        responseBody: resBody
                    });
                    const headerNow = Date.parse(res.headers.get("date"));
                    const now = Date.now();
                    if (this.latencyRef.lastTimeOffsetCheck < (Date.now() - 5000)) {
                        const timeOffset = headerNow + 500 - (this.latencyRef.lastTimeOffsetCheck = Date.now());
                        if (this.latencyRef.timeoffset - this.latencyRef.latency >= this.options.latencyThreshold && timeOffset - this.latencyRef.latency >= this.options.latencyThreshold) {
                            this._manager.client.emit("warn", `Your clock is ${this.latencyRef.timeoffset}ms behind Discord's server clock. Please check your connection and system time.`);
                        }
                        this.latencyRef.timeoffset = this.latencyRef.timeoffset - Math.trunc(this.latencyRef.timeOffsets.shift() / 10) + Math.trunc(timeOffset / 10);
                        this.latencyRef.timeOffsets.push(timeOffset);
                    }
                    if (res.headers.has("x-ratelimit-limit")) {
                        this.ratelimits[route].limit = Number(res.headers.get("x-ratelimit-limit"));
                    }
                    if (options.method !== "GET" && (!res.headers.has("x-ratelimit-remaining") || !res.headers.has("x-ratelimit-limit")) && this.ratelimits[route].limit !== 1) {
                        this._manager.client.emit("debug", [`Missing ratelimit headers for SequentialBucket(${this.ratelimits[route].remaining}/${this.ratelimits[route].limit}) with non-default limit\n`,
                            `${res.status} ${res.headers.get("content-type") ?? "null"}: ${options.method} ${route} | ${res.headers.get("cf-ray") ?? "null"}\n`,
                            `content-type = ${res.headers.get("content-type") ?? "null"}\n`,
                            `x-ratelimit-remaining = ${res.headers.get("x-ratelimit-remaining") ?? "null"}\n`,
                            `x-ratelimit-limit = ${res.headers.get("x-ratelimit-limit") ?? "null"}\n`,
                            `x-ratelimit-reset = ${res.headers.get("x-ratelimit-reset") ?? "null"}\n`,
                            `x-ratelimit-global = ${res.headers.get("x-ratelimit-global") ?? "null"}`].join("\n"));
                    }
                    this.ratelimits[route].remaining = res.headers.has("x-ratelimit-remaining") ? Number(res.headers.get("x-ratelimit-remaining")) ?? 0 : 1;
                    const retryAfter = Number(res.headers.get("x-ratelimit-reset-after") ?? res.headers.get("retry-after") ?? 0) * 1000;
                    if (retryAfter >= 0) {
                        if (res.headers.has("x-ratelimit-global")) {
                            this.globalBlock = true;
                            setTimeout(this.globalUnblock.bind(this), retryAfter ?? 1);
                        }
                        else {
                            this.ratelimits[route].reset = (retryAfter ?? 1) + now;
                        }
                    }
                    else if (res.headers.has("x-ratelimit-reset")) {
                        let resetTime = Number(res.headers.get("x-ratelimit-reset")) * 1000;
                        if (route.endsWith("/reactions/:id") && (resetTime - headerNow) === 1000) {
                            resetTime = now + 250;
                        }
                        this.ratelimits[route].reset = Math.max(resetTime - this.latencyRef.latency, now);
                    }
                    else {
                        this.ratelimits[route].reset = now;
                    }
                    if (res.status !== 429) {
                        this._manager.client.emit("debug", `${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${this.ratelimits[route].reset} (${this.ratelimits[route].reset - now}ms left)`);
                    }
                    if (res.status > 300) {
                        if (res.status === 429) {
                            let delay = retryAfter;
                            if (res.headers.get("x-ratelimit-scope") === "shared") {
                                try {
                                    delay = resBody.retry_after * 1000;
                                }
                                catch (err) {
                                    reject(err);
                                }
                            }
                            this._manager.client.emit("debug", `${res.headers.has("x-ratelimit-global") ? "Global" : "Unexpected"} RateLimit: ${JSON.stringify(resBody)}\n${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${delay} (${this.ratelimits[route].reset - now}ms left) | Scope ${res.headers.get("x-ratelimit-scope")}`);
                            if (delay) {
                                setTimeout(() => {
                                    cb();
                                    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, prefer-spread
                                    this.request(options).then(resolve).catch(reject);
                                }, delay);
                                return;
                            }
                            else {
                                cb();
                                this.request(options).then(resolve).catch(reject);
                                return;
                            }
                        }
                        else if (res.status === 502 && ++attempts < 4) {
                            this._manager.client.emit("debug", `Unexpected 502 on ${options.method} ${route}`);
                            setTimeout(() => {
                                this.request(options).then(resolve).catch(reject);
                            }, Math.floor(Math.random() * 1900 + 100));
                            return cb();
                        }
                        cb();
                        let { stack } = _stackHolder;
                        if (stack.startsWith("Error\n")) {
                            stack = stack.slice(6);
                        }
                        const err = resBody && typeof resBody === "object" && "code" in resBody ? new DiscordRESTError_1.default(res, resBody, options.method, stack) : new DiscordHTTPError_1.default(res, resBody, options.method, stack);
                        reject(err);
                        return;
                    }
                    cb();
                    resolve(resBody);
                }
                catch (err) {
                    cb();
                    if (err instanceof Error && err.constructor.name === "DOMException" && err.name === "AbortError") {
                        reject(new Error(`Request Timed Out (>${this.options.requestTimeout}ms) on ${options.method} ${options.path}`));
                    }
                    this._manager.client.emit("error", err);
                }
            }
            if (this.globalBlock && options.auth) {
                (options.priority ? this.readyQueue.unshift.bind(this.readyQueue) : this.readyQueue.push.bind(this.readyQueue))(() => {
                    this.ratelimits[route].queue(attempt.bind(this), options.priority);
                });
            }
            else {
                this.ratelimits[route].queue(attempt.bind(this), options.priority);
            }
        });
    }
}
exports["default"] = RequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SZXF1ZXN0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0Isa0ZBQWtEO0FBQ2xELGtGQUFrRDtBQUNsRCxrRkFBa0Q7QUFFbEQsNENBQWlGO0FBQ2pGLHNFQUFzQztBQUl0Qzs7O0dBR0c7QUFFSCxnRUFBZ0U7QUFDaEUsTUFBcUIsY0FBYztJQUN2QixRQUFRLENBQWM7SUFDOUIsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNwQixVQUFVLENBQWE7SUFDdkIsT0FBTyxDQUFnQztJQUN2QyxVQUFVLEdBQXFDLEVBQUUsQ0FBQztJQUNsRCxVQUFVLEdBQXNCLEVBQUUsQ0FBQztJQUNuQyxZQUFZLE9BQW9CLEVBQUUsVUFBdUIsRUFBRTtRQUN2RCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDOUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLEtBQUssRUFBdUIsT0FBTyxDQUFDLEtBQUs7WUFDekMsT0FBTyxFQUFxQixPQUFPLENBQUMsT0FBTyxJQUFJLG1CQUFPO1lBQ3RELDBCQUEwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCO1lBQ2hFLGVBQWUsRUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWU7WUFDckQsSUFBSSxFQUF3QixPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsbUJBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNySCxnQkFBZ0IsRUFBWSxPQUFPLENBQUMsZ0JBQWdCLElBQUksS0FBSztZQUM3RCxpQkFBaUIsRUFBVyxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQztZQUMxRCxjQUFjLEVBQWMsT0FBTyxDQUFDLGNBQWMsSUFBSSxLQUFLO1lBQzNELGVBQWUsRUFBYSxPQUFPLENBQUMsZUFBZSxJQUFJLElBQUk7WUFDM0QsU0FBUyxFQUFtQixPQUFPLENBQUMsU0FBUyxJQUFJLHNCQUFVO1NBQzlELENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsbUJBQW1CLEVBQUUsQ0FBQztZQUN0QixPQUFPLEVBQWMsT0FBTyxDQUFDLGlCQUFpQixJQUFJLENBQUM7WUFDbkQsR0FBRyxFQUFrQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQWtCO1lBQ3JHLFdBQVcsRUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBa0I7WUFDeEUsVUFBVSxFQUFXLENBQUM7U0FDekIsQ0FBQztJQUVOLENBQUM7SUFFTyxRQUFRLENBQUMsSUFBWSxFQUFFLE1BQWM7UUFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxVQUFTLEtBQUssRUFBRSxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFXLE1BQU0sQ0FBQztRQUNsRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUN6TCxJQUFJLE1BQU0sS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQ3pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNLFNBQVMsR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pELElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQy9FLE1BQU0sSUFBSSxNQUFNLENBQUM7WUFDckIsQ0FBQztpQkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUN2RSxNQUFNLElBQUksTUFBTSxDQUFDO1lBQ3JCLENBQUM7WUFDRCxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO2FBQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLDBCQUEwQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3BFLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztRQUNuQyxDQUFDO1FBRUQsSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMxQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2YsS0FBSyxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sYUFBYTtRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFHLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxLQUFLLENBQUMsV0FBVyxDQUFjLE9BQXFDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSTtZQUNuQixHQUFHLE9BQU87WUFDVixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFjLE9BQXVCO1FBQzlDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQWdCLENBQUM7UUFDNUQsSUFBSSxDQUFDLHVCQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUJBQW1CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFDRCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxLQUFLLFVBQVUsT0FBTyxDQUF1QixFQUFjO2dCQUN2RCxNQUFNLE9BQU8sR0FBMkIsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQzlELElBQUksQ0FBQztvQkFDRCxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQzt3QkFDbkMsT0FBTyxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN6QyxDQUFDO3lCQUFNLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzNELE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDOUQsQ0FBQztvQkFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDakIsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2RSxDQUFDO29CQUVELElBQUksT0FBc0MsQ0FBQztvQkFDM0MsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO3dCQUMzQixJQUFJLFVBQThCLENBQUM7d0JBQ25DLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNmLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNHLENBQUM7d0JBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUNoRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7NEJBQzVDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzs0QkFDZCxJQUFJLE9BQU8sQ0FBQyxLQUFLO2dDQUFFLEtBQUssTUFBTSxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO29DQUMzRCxLQUFLLEVBQUUsQ0FBQztvQ0FDUixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7d0NBQzNCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29DQUN2QixDQUFDO29DQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0NBQ2pCLFNBQVM7b0NBQ2IsQ0FBQztvQ0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsS0FBSyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3RFLENBQUM7NEJBQ0QsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQ0FDYixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQzs0QkFDekMsQ0FBQzs0QkFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixDQUFDOzZCQUFNLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUN0QixPQUFPLEdBQUcsVUFBVSxDQUFDOzRCQUNyQixPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7d0JBQ2pELENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3JDLENBQUM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUMvQixPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztvQkFDbkssQ0FBQztvQkFDRCxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzVKLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxPQUFtQyxDQUFDO29CQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUUsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDaEYsQ0FBQztvQkFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQ3pCLE1BQU0sRUFBTSxPQUFPLENBQUMsTUFBTTt3QkFDMUIsT0FBTzt3QkFDUCxJQUFJLEVBQVEsT0FBTzt3QkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLFNBQVM7d0JBQzNDLE1BQU0sRUFBTSxVQUFVLENBQUMsTUFBTTt3QkFDN0IsUUFBUSxFQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVE7cUJBQ2pFLENBQUMsQ0FBQztvQkFDSCxJQUFJLE9BQU8sRUFBRSxDQUFDO3dCQUNWLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztvQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3ZJLENBQUM7b0JBQ0QsSUFBSSxPQUF5RCxDQUFDO29CQUM5RCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ25CLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLGtCQUFrQixFQUFFLENBQUM7NEJBQ3pELE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUMzQixJQUFJLENBQUM7Z0NBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUE0QixDQUFDOzRCQUN2RCxDQUFDOzRCQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0NBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFZLENBQUMsQ0FBQztnQ0FDakQsT0FBTyxHQUFHLENBQUMsQ0FBQzs0QkFDaEIsQ0FBQzt3QkFDTCxDQUFDOzZCQUFNLENBQUM7NEJBQ0osT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQztvQkFDTCxDQUFDO29CQUVELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ2pDLE1BQU0sRUFBUSxPQUFPLENBQUMsTUFBTTt3QkFDNUIsSUFBSSxFQUFVLE9BQU8sQ0FBQyxJQUFJO3dCQUMxQixLQUFLO3dCQUNMLFFBQVEsRUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7d0JBQzVCLFdBQVcsRUFBRyxPQUFPO3dCQUNyQixZQUFZLEVBQUUsT0FBTztxQkFDeEIsQ0FBQyxDQUFDO29CQUNILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDNUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3hGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzRCQUNqSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGlCQUFpQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsaUZBQWlGLENBQUMsQ0FBQzt3QkFDcEssQ0FBQzt3QkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUM5SSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pELENBQUM7b0JBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7b0JBQ2hGLENBQUM7b0JBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDekosSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLGtEQUFrRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssNEJBQTRCOzRCQUM5SyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLElBQUksS0FBSyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sSUFBSTs0QkFDbkksa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sSUFBSTs0QkFDL0QsMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksTUFBTSxJQUFJOzRCQUNqRix1QkFBdUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxNQUFNLElBQUk7NEJBQ3pFLHVCQUF1QixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLE1BQU0sSUFBSTs0QkFDekUsd0JBQXdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDL0YsQ0FBQztvQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4SSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ3BILElBQUksVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNsQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQzs0QkFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7NEJBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQy9ELENBQUM7NkJBQU0sQ0FBQzs0QkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQzNELENBQUM7b0JBQ0wsQ0FBQzt5QkFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQzt3QkFDOUMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3BFLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOzRCQUN2RSxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQzt3QkFDMUIsQ0FBQzt3QkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdEYsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztvQkFDdkMsQ0FBQztvQkFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssT0FBTyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxhQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxpQkFBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQztvQkFDM1IsQ0FBQztvQkFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7d0JBQ25CLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQzs0QkFDckIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDOzRCQUN2QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7Z0NBQ3BELElBQUksQ0FBQztvQ0FDRCxLQUFLLEdBQUksT0FBb0MsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dDQUNyRSxDQUFDO2dDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7b0NBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNoQixDQUFDOzRCQUNMLENBQUM7NEJBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxlQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLE9BQU8sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sYUFBYSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssaUJBQWlCLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLG9CQUFvQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBRSxFQUFFLENBQUMsQ0FBQzs0QkFDM1osSUFBSSxLQUFLLEVBQUUsQ0FBQztnQ0FDUixVQUFVLENBQUMsR0FBRyxFQUFFO29DQUNaLEVBQUUsRUFBRSxDQUFDO29DQUNMLDRJQUE0STtvQ0FDNUksSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN6RCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQ1YsT0FBTzs0QkFDWCxDQUFDO2lDQUFNLENBQUM7Z0NBQ0osRUFBRSxFQUFFLENBQUM7Z0NBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNyRCxPQUFPOzRCQUNYLENBQUM7d0JBQ0wsQ0FBQzs2QkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHFCQUFxQixPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQ25GLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0NBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUN6RCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzNDLE9BQU8sRUFBRSxFQUFFLENBQUM7d0JBQ2hCLENBQUM7d0JBQ0QsRUFBRSxFQUFFLENBQUM7d0JBQ0wsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFlBQWtDLENBQUM7d0JBQ25ELElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOzRCQUM5QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQzt3QkFDRCxNQUFNLEdBQUcsR0FBRyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksMEJBQWdCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLDBCQUFnQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDaE0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNaLE9BQU87b0JBQ1gsQ0FBQztvQkFFRCxFQUFFLEVBQUUsQ0FBQztvQkFDTCxPQUFPLENBQUMsT0FBWSxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxFQUFFLEVBQUUsQ0FBQztvQkFDTCxJQUFJLEdBQUcsWUFBWSxLQUFLLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssY0FBYyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFLENBQUM7d0JBQy9GLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLFVBQVUsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNwSCxDQUFDO29CQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBWSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUNqSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBdlNELGlDQXVTQyJ9

/***/ }),

/***/ 4345:
/***/ ((__unused_webpack_module, exports) => {


/** @module SequentialBucket */
/**
 * Latency & ratelimit related things lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/util/SequentialBucket.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/** A ratelimit bucket. */
class SequentialBucket {
    _queue = [];
    last;
    latencyRef;
    limit;
    processing = false;
    remaining;
    reset;
    constructor(limit, latencyRef) {
        this.limit = this.remaining = limit;
        this.latencyRef = latencyRef;
        this.last = this.reset = 0;
    }
    check(force = false) {
        if (this._queue.length === 0) {
            if (this.processing) {
                if (typeof this.processing !== "boolean") {
                    clearTimeout(this.processing);
                }
                this.processing = false;
            }
            return;
        }
        if (this.processing && !force) {
            return;
        }
        const now = Date.now();
        const offset = this.latencyRef.latency;
        if (!this.reset || this.reset < now - offset) {
            this.reset = now - offset;
            this.remaining = this.limit;
        }
        this.last = now;
        if (this.remaining <= 0) {
            this.processing = setTimeout(() => {
                this.processing = false;
                this.check(true);
            }, Math.max(0, (this.reset ?? 0) - now + offset) + 1);
            return;
        }
        --this.remaining;
        this.processing = true;
        this._queue.shift()(() => {
            if (this._queue.length === 0) {
                this.processing = false;
            }
            else {
                this.check(true);
            }
        });
    }
    /**
     * Add an item to the queue.
     * @param func The function to queue.
     * @param priority- If true, the item will be added to the front of the queue/
     */
    queue(func, priority = false) {
        if (priority) {
            this._queue.unshift(func);
        }
        else {
            this._queue.push(func);
        }
        this.check();
    }
}
exports["default"] = SequentialBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VxdWVudGlhbEJ1Y2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yZXN0L1NlcXVlbnRpYWxCdWNrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQjs7O0dBR0c7O0FBSUgsMEJBQTBCO0FBQzFCLE1BQXFCLGdCQUFnQjtJQUN6QixNQUFNLEdBQW9DLEVBQUUsQ0FBQztJQUNyRCxJQUFJLENBQVM7SUFDYixVQUFVLENBQWE7SUFDdkIsS0FBSyxDQUFTO0lBQ2QsVUFBVSxHQUE2QixLQUFLLENBQUM7SUFDN0MsU0FBUyxDQUFTO0lBQ2xCLEtBQUssQ0FBUztJQUNkLFlBQVksS0FBYSxFQUFFLFVBQXNCO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRSxDQUFDO29CQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7WUFDRCxPQUFPO1FBQ1gsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLE9BQU87UUFDWCxDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE9BQU87UUFDWCxDQUFDO1FBQ0QsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFHLENBQUMsR0FBRyxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLElBQThCLEVBQUUsUUFBUSxHQUFHLEtBQUs7UUFDbEQsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFqRUQsbUNBaUVDIn0=

/***/ })

};
