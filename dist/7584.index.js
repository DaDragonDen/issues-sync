export const id = 7584;
export const ids = [7584];
export const modules = {

/***/ 7584:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module Util */
const Routes_1 = __webpack_require__(2222);
const Constants_1 = __webpack_require__(5660);
const Member_1 = tslib_1.__importDefault(__webpack_require__(1212));
const Channel_1 = tslib_1.__importDefault(__webpack_require__(5519));
const Message_1 = tslib_1.__importDefault(__webpack_require__(7023));
const Entitlement_1 = tslib_1.__importDefault(__webpack_require__(611));
const TestEntitlement_1 = tslib_1.__importDefault(__webpack_require__(2323));
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
class Util {
    _client;
    constructor(client) {
        this._client = client;
    }
    static rawEmbeds(embeds) {
        const data = Util.prototype.embedsToParsed(Array.isArray(embeds) ? embeds : [embeds]);
        return Array.isArray(embeds) ? data : data[0];
    }
    static rawMessageComponents(components) {
        const data = Util.prototype.componentsToParsed(Array.isArray(components) ? components : [components]);
        return Array.isArray(components) ? data : data[0];
    }
    static rawModalComponents(components) {
        const data = Util.prototype.componentsToParsed(Array.isArray(components) ? components : [components]);
        return Array.isArray(components) ? data : data[0];
    }
    /** @hidden intentionally not documented - this is an internal function */
    _convertImage(image, name) {
        try {
            return this.convertImage(image);
        }
        catch (err) {
            throw new TypeError(`Invalid ${name} provided. Ensure you are providing a valid, fully-qualified base64 url.`, { cause: err });
        }
    }
    /** @hidden intended for internal use only */
    _getLimit(name, id) {
        const opt = this._client.options.collectionLimits[name];
        if (typeof opt === "number") {
            return opt;
        }
        return (id === undefined ? undefined : opt[id]) ?? opt.default ?? Infinity;
    }
    /** @hidden intended for internal use only */
    _isModuleInstalled(name) {
        try {
            // eslint-disable-next-line unicorn/prefer-module
            __webpack_require__(8526)(name);
            return true;
        }
        catch {
            return false;
        }
    }
    _setLimit(values, defaultValue = Infinity) {
        if (values === undefined) {
            return defaultValue;
        }
        if (typeof values === "object") {
            return { default: defaultValue, ...values };
        }
        return values;
    }
    componentToParsed(component) {
        switch (component.type) {
            case Constants_1.ComponentTypes.BUTTON: {
                if (component.style === Constants_1.ButtonStyles.LINK)
                    return component;
                if (component.style === Constants_1.ButtonStyles.PREMIUM) {
                    return {
                        disabled: component.disabled,
                        skuID: component.sku_id,
                        style: component.style,
                        type: component.type
                    };
                }
                return {
                    customID: component.custom_id,
                    disabled: component.disabled,
                    emoji: component.emoji,
                    label: component.label,
                    style: component.style,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.TEXT_INPUT: {
                return {
                    customID: component.custom_id,
                    label: component.label,
                    maxLength: component.max_length,
                    minLength: component.min_length,
                    placeholder: component.placeholder,
                    required: component.required,
                    style: component.style,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT: {
                const parsedComponent = {
                    customID: component.custom_id,
                    disabled: component.disabled,
                    maxValues: component.max_values,
                    minValues: component.min_values,
                    placeholder: component.placeholder,
                    type: component.type
                };
                if (component.type !== Constants_1.ComponentTypes.STRING_SELECT && component.default_values !== undefined) {
                    parsedComponent.defaultValues = component.default_values;
                }
                if (component.type === Constants_1.ComponentTypes.STRING_SELECT) {
                    return { ...parsedComponent, options: component.options };
                }
                else if (component.type === Constants_1.ComponentTypes.CHANNEL_SELECT) {
                    return { ...parsedComponent, channelTypes: component.channel_types };
                }
                else {
                    return parsedComponent;
                }
            }
            default: {
                return component;
            }
        }
    }
    componentToRaw(component) {
        switch (component.type) {
            case Constants_1.ComponentTypes.BUTTON: {
                if (component.style === Constants_1.ButtonStyles.LINK)
                    return component;
                if (component.style === Constants_1.ButtonStyles.PREMIUM) {
                    return {
                        disabled: component.disabled,
                        sku_id: component.skuID,
                        style: component.style,
                        type: component.type
                    };
                }
                return {
                    custom_id: component.customID,
                    disabled: component.disabled,
                    emoji: component.emoji,
                    label: component.label,
                    style: component.style,
                    type: component.type
                };
            }
            case Constants_1.ComponentTypes.TEXT_INPUT: {
                return {
                    custom_id: component.customID,
                    label: component.label,
                    max_length: component.maxLength,
                    min_length: component.minLength,
                    placeholder: component.placeholder,
                    required: component.required,
                    style: component.style,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT: {
                const rawComponent = {
                    custom_id: component.customID,
                    disabled: component.disabled,
                    max_values: component.maxValues,
                    min_values: component.minValues,
                    placeholder: component.placeholder,
                    type: component.type
                };
                if (component.type !== Constants_1.ComponentTypes.STRING_SELECT && component.defaultValues !== undefined) {
                    rawComponent.default_values = component.defaultValues;
                }
                if (component.type === Constants_1.ComponentTypes.STRING_SELECT) {
                    return { ...rawComponent, options: component.options };
                }
                else if (component.type === Constants_1.ComponentTypes.CHANNEL_SELECT) {
                    return { ...rawComponent, channel_types: component.channelTypes };
                }
                else {
                    return rawComponent;
                }
            }
            default: {
                return component;
            }
        }
    }
    componentsToParsed(components) {
        return components.map(row => ({
            type: row.type,
            components: row.components.map(component => this.componentToParsed(component))
        }));
    }
    componentsToRaw(components) {
        return components.map(row => ({
            type: row.type,
            components: row.components.map(component => this.componentToRaw(component))
        }));
    }
    convertApplicationEmoji(raw) {
        return this.convertGuildEmoji(raw);
    }
    convertGuildEmoji(raw) {
        return {
            animated: raw.animated,
            available: raw.available,
            id: raw.id,
            managed: raw.managed,
            name: raw.name,
            requireColons: raw.require_colons,
            roles: raw.roles,
            user: raw.user ? this._client.users.update(raw.user) : undefined
        };
    }
    convertImage(img) {
        if (Buffer.isBuffer(img)) {
            const b64 = img.toString("base64");
            let mime;
            const magicMap = [
                // 47 49 46 38
                ["image/gif", /^47494638/],
                // 89 50 4E 47
                ["image/png", /^89504E47/],
                // FF D8 FF
                ["image/jpeg", /^FFD8FF/],
                // 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
                ["image/webp", /^52494646\d{8}57454250/],
                // 02 27 62 20 22 0 - lottie JSON (assuming all files will start with {"v":")
                ["application/json", /^02276220220/]
            ];
            for (const format of magicMap) {
                if (format[1].test(this.getMagic(img, 16))) {
                    mime = format[0];
                    break;
                }
            }
            if (!mime) {
                throw new TypeError(`Failed to determine image format. (magic: ${this.getMagic(img, 16)})`);
            }
            img = `data:${mime};base64,${b64}`;
        }
        return img;
    }
    convertSticker(raw) {
        return {
            asset: raw.asset,
            available: raw.available,
            description: raw.description,
            formatType: raw.format_type,
            guildID: raw.guild_id,
            id: raw.id,
            name: raw.name,
            packID: raw.pack_id,
            sortValue: raw.sort_value,
            tags: raw.tags,
            type: raw.type,
            user: raw.user ? this._client.users.update(raw.user) : undefined
        };
    }
    async detectMissingPrivilegedIntents(intents) {
        const application = this._client["_application"] || await this._client.rest.applications.getClient();
        intents ??= this._client.shards.options.intents;
        this._client["_application"] ??= application;
        const missing = [];
        const check = (intent, allowed) => {
            if ((intents & intent) === intent && !allowed.some(flag => (application.flags & flag) === flag)) {
                missing.push(Constants_1.Intents[intent]);
            }
        };
        for (const [intent, allowed] of Constants_1.PrivilegedIntentMapping) {
            check(intent, allowed);
        }
        return missing;
    }
    embedsToParsed(embeds) {
        return embeds.map(embed => ({
            author: embed.author === undefined ? undefined : {
                name: embed.author.name,
                iconURL: embed.author.icon_url,
                proxyIconURL: embed.author.proxy_icon_url
            },
            color: embed.color,
            description: embed.description,
            fields: embed.fields?.map(field => ({
                inline: field.inline,
                name: field.name,
                value: field.value
            })),
            footer: embed.footer === undefined ? undefined : {
                text: embed.footer.text,
                iconURL: embed.footer.icon_url,
                proxyIconURL: embed.footer.proxy_icon_url
            },
            timestamp: embed.timestamp,
            title: embed.title,
            image: embed.image === undefined ? undefined : {
                url: embed.image.url,
                height: embed.image.height,
                proxyURL: embed.image.proxy_url,
                width: embed.image.width
            },
            provider: embed.provider === undefined ? undefined : {
                name: embed.provider.name,
                url: embed.provider.url
            },
            thumbnail: embed.thumbnail === undefined ? undefined : {
                url: embed.thumbnail.url,
                height: embed.thumbnail.height,
                proxyURL: embed.thumbnail.proxy_url,
                width: embed.thumbnail.width
            },
            url: embed.url,
            type: embed.type,
            video: embed.video === undefined ? undefined : {
                height: embed.video.height,
                proxyURL: embed.video.proxy_url,
                url: embed.video.url,
                width: embed.video.width
            }
        }));
    }
    embedsToRaw(embeds) {
        return embeds.map(embed => ({
            author: embed.author === undefined ? undefined : {
                name: embed.author.name,
                icon_url: embed.author.iconURL,
                url: embed.author.url
            },
            color: embed.color,
            description: embed.description,
            fields: embed.fields?.map(field => ({
                inline: field.inline,
                name: field.name,
                value: field.value
            })),
            footer: embed.footer === undefined ? undefined : {
                text: embed.footer.text,
                icon_url: embed.footer.iconURL
            },
            timestamp: embed.timestamp,
            title: embed.title,
            image: embed.image === undefined ? undefined : { url: embed.image.url },
            thumbnail: embed.thumbnail === undefined ? undefined : { url: embed.thumbnail.url },
            url: embed.url
        }));
    }
    formatAllowedMentions(allowed) {
        const result = { parse: [] };
        if (!allowed) {
            return this.formatAllowedMentions(this._client.options.allowedMentions);
        }
        if (allowed.everyone === true) {
            result.parse.push("everyone");
        }
        if (allowed.roles === true) {
            result.parse.push("roles");
        }
        else if (Array.isArray(allowed.roles)) {
            result.roles = allowed.roles;
        }
        if (allowed.users === true) {
            result.parse.push("users");
        }
        else if (Array.isArray(allowed.users)) {
            result.users = allowed.users;
        }
        if (allowed.repliedUser === true) {
            result.replied_user = true;
        }
        return result;
    }
    formatImage(url, format, size) {
        if (!format || !Constants_1.ImageFormats.includes(format.toLowerCase())) {
            format = url.includes("/a_") ? "gif" : this._client.options.defaultImageFormat;
        }
        if (!size || !Constants_1.MEDIA_PROXY_SIZES.includes(size)) {
            size = this._client.options.defaultImageSize;
        }
        return `${Routes_1.CDN_URL}${url}.${format}?size=${size}`;
    }
    getMagic(file, len = 4) {
        return [...new Uint8Array(file.subarray(0, len))].map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    }
    modalSubmitComponentToParsed(component) {
        switch (component.type) {
            case Constants_1.ComponentTypes.TEXT_INPUT: {
                return {
                    customID: component.custom_id,
                    type: component.type,
                    value: component.value
                };
            }
            default: {
                return component;
            }
        }
    }
    modalSubmitComponentsToParsed(components) {
        return components.map(row => ({
            type: row.type,
            components: row.components.map(component => this.modalSubmitComponentToParsed(component))
        }));
    }
    optionToParsed(option) {
        return {
            autocomplete: option.autocomplete,
            channelTypes: option.channel_types,
            choices: option.choices,
            description: option.description,
            descriptionLocalizations: option.description_localizations,
            descriptionLocalized: option.description_localized,
            max_length: option.max_length,
            max_value: option.max_value,
            min_length: option.min_length,
            min_value: option.min_value,
            name: option.name,
            nameLocalizations: option.name_localizations,
            nameLocalized: option.name_localized,
            options: option.options?.map(o => this.optionToParsed(o)),
            required: option.required,
            type: option.type
        };
    }
    optionToRaw(option) {
        const opt = option;
        return {
            autocomplete: opt.autocomplete,
            channel_types: opt.channelTypes,
            choices: opt.choices?.map(choice => ({
                name: choice.name,
                name_localizations: choice.nameLocalizations,
                value: choice.value
            })),
            description: opt.description,
            description_localizations: opt.descriptionLocalizations,
            max_length: opt.maxLength,
            max_value: opt.maxValue,
            min_length: opt.minLength,
            min_value: opt.minValue,
            name: opt.name,
            name_localizations: opt.nameLocalizations,
            options: opt.options?.map(o => this.optionToRaw(o)),
            required: opt.required,
            type: opt.type
        };
    }
    /** @internal */
    replacePollAnswer(poll, answerID, count, users) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        if (!answerCount) {
            answerCount = {
                count,
                id: answerID,
                users: [],
                meVoted: false
            };
        }
        answerCount.count = count;
        if (users) {
            answerCount.users = users;
            answerCount.meVoted = (this._client["_user"] && users.includes(this._client["_user"]?.id)) ?? false;
        }
    }
    updateChannel(channelData) {
        guild: if (channelData.guild_id) {
            const guild = this._client.guilds.get(channelData.guild_id);
            if (guild) {
                if (Constants_1.ThreadChannelTypes.includes(channelData.type)) {
                    if (!channelData.parent_id) {
                        break guild;
                    }
                    return (guild.threads.has(channelData.id) ? guild.threads.update(channelData) : guild.threads.add(Channel_1.default.from(channelData, this._client)));
                }
                else {
                    return guild.channels.update(channelData);
                }
            }
        }
        switch (channelData.type) {
            case Constants_1.ChannelTypes.DM: return this._client.privateChannels.update(channelData);
            case Constants_1.ChannelTypes.GROUP_DM: return this._client.groupChannels.update(channelData);
            default: return Channel_1.default.from(channelData, this._client);
        }
    }
    /** @internal */
    updateEntitlement(data) {
        if (this._client["_application"] === undefined) {
            return "subscription_id" in data && data.subscription_id ?
                new Entitlement_1.default(data, this._client) :
                new TestEntitlement_1.default(data, this._client);
        }
        else {
            return this._client.application.entitlements.update(data);
        }
    }
    /** @internal */
    updateMember(guildID, memberID, member) {
        const guild = this._client.guilds.get(guildID);
        if (guild && this._client["_user"] && this._client.user.id === memberID) {
            if (guild["_clientMember"]) {
                guild["_clientMember"]["update"](member);
            }
            else {
                guild["_clientMember"] = guild.members.update({ ...member, id: memberID }, guildID);
            }
            return guild["_clientMember"];
        }
        return guild ? guild.members.update({ ...member, id: memberID }, guildID) : new Member_1.default({ ...member, id: memberID }, this._client, guildID);
    }
    /** @internal */
    updateMessage(data) {
        const channel = this._client.getChannel(data.channel_id);
        if (channel && "messages" in channel) {
            return channel.messages.update(data);
        }
        return new Message_1.default(data, this._client);
    }
    /** @internal */
    updatePollAnswer(poll, answerID, count, user) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        if (!answerCount) {
            if (count === -1) {
                return;
            }
            answerCount = {
                count,
                id: answerID,
                users: user ? [user] : [],
                meVoted: user === this._client["_user"]?.id
            };
            poll.results.answerCounts.push(answerCount);
            return;
        }
        answerCount.count += count;
        if (user) {
            if (count === 1 && !answerCount.users.includes(user)) {
                answerCount.users.push(user);
                answerCount.meVoted = user === this._client["_user"]?.id;
            }
            else if (count === -1 && answerCount.users.includes(user)) {
                answerCount.users.splice(answerCount.users.indexOf(user), 1);
                if (user === this._client["_user"]?.id) {
                    answerCount.meVoted = false;
                }
            }
        }
    }
    /** @internal */
    updateThread(threadData) {
        const guild = this._client.guilds.get(threadData.guild_id);
        if (guild) {
            return guild.threads.update(threadData);
        }
        return Channel_1.default.from(threadData, this._client);
    }
}
exports["default"] = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLHFDQUFtQztBQUduQyw0Q0FZc0I7QUF3QnRCLDBFQUEwQztBQUMxQyw0RUFBNEM7QUEyQjVDLDRFQUE0QztBQUM1QyxvRkFBb0Q7QUFDcEQsNEZBQTREO0FBRzVELHVJQUF1STtBQUN2SSxNQUFxQixJQUFJO0lBQ2IsT0FBTyxDQUFTO0lBRXhCLFlBQVksTUFBYztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBSUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFrQztRQUMvQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFJRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBNEQ7UUFDcEYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFJ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

/***/ })

};
