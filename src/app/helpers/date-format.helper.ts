export class DateFormatHelper {
    public static format(value: any) {
        let separator = "/";

        let date: Date = value instanceof Date ? value : new Date(value);
        let month = date.getMonth() + 1;
        let monthStr = month < 10 ? "" + 0 + month : month;
        let day = date.getDate() < 10 ? "" + 0 + date.getDate() : date.getDate();
        
        return day + separator + monthStr + separator + date.getFullYear();
    }
}