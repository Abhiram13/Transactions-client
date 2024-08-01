import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amountFormatter',
    standalone: true
})
export class AmountFormatterPipe implements PipeTransform {
    transform(value: number | string, ...args: unknown[]): string {
        return this._format(value);
    }

    private _format(num: string | number): string {
        const NUMBER: number = Number(num);
        const OPTIONS: Intl.NumberFormatOptions = { style: "currency", currency: "INR" };

        if (NUMBER !== 0 && !NUMBER) return "Invalid value";
        return NUMBER.toLocaleString('en-In', OPTIONS).replace(/\.00$/, '');
    }
}
