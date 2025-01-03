export const id = 1338;
export const ids = [1338];
export const modules = {

/***/ 1338:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MessageInteractionResponse {
    message;
    type;
    constructor(interaction, message, type) {
        this.interaction = interaction;
        this.message = message;
        this.type = type;
    }
    async deleteMessage() {
        if (this.hasMessage()) {
            return this.interaction.deleteFollowup(this.message.id);
        }
        return this.interaction.deleteOriginal();
    }
    async getMessage() {
        if (this.hasMessage()) {
            return this.message;
        }
        return this.interaction.getOriginal();
    }
    hasMessage() {
        return this.message !== null;
    }
}
exports["default"] = MessageInteractionResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUludGVyYWN0aW9uUmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbC9pbnRlcmFjdGlvbnMvTWVzc2FnZUludGVyYWN0aW9uUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSxNQUFxQiwwQkFBMEI7SUFFM0MsT0FBTyxDQUFvRDtJQUMzRCxJQUFJLENBQXlCO0lBQzdCLFlBQVksV0FBYyxFQUFFLE9BQTBELEVBQUUsSUFBNEI7UUFDaEgsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDWixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBeUQsQ0FBQztJQUNqRyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBN0JELDZDQTZCQyJ9

/***/ })

};
