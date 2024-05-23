/**
 * @interface
 * Used in list by date transactions API which provides list of transactions by date wise along with values
 * like **debit**, **credit**, **date of transaction** and **count** (no of transactions).
 */
export interface IListByDate {
    debit: number;
    credit: number;
    date: string;
    count: number;
}