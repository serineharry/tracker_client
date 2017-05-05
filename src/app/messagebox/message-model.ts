export class MessageModel {
    title: string;
    operation: string;
    message: string;
    carryOver?: any;

    constructor(title?: string, operation?: string, message?: string) {
        this.title = title;
        this.operation = operation;
        this.message = message;
    }
}
