import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormatter',
    standalone: true,    
})
export class DateFormatterPipe implements PipeTransform {    
    transform(value: string, ...args: unknown[]): string {        
        if (this._isToday(value)) return "Today";
        return this._format(value);
    }

    private _format(date: string): string {
        const OPTIONS: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const DATE: Date = new Date(date);

        return DATE.toLocaleDateString("en-US", OPTIONS);
    }

    private _isToday(date: string): boolean {
        const CURRENT_DATE: string = new Date().toDateString();
        const GIVEN_DATE: string = new Date(date).toDateString();

        return CURRENT_DATE === GIVEN_DATE;
    }
}
