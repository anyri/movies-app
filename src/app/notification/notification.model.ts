export class Notification {
    type?: string;
    message?: string;
    closeBtn?: boolean;

    constructor(notification?: Notification) {
        if(notification)
            Object.assign(this, notification);
    };

}
