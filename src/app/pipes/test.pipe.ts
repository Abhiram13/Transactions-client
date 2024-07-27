import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Pipe({
    name: 'test',
    standalone: true,
    pure: true
})
export class TestPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        console.log({ value });
        console.log({ args });
        return value?.toUpperCase();
    }
}

@Pipe({
    name: 'second',
    standalone: true
})
export class SecondPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        console.log('Second');
        console.log({ value });
        console.log({ args });
        return value;
    }
}

@Injectable({ providedIn: 'root' })
export class ObservableService {
    public SampleObserver = new BehaviorSubject<string | null>(null);
    public asyncSubject = new AsyncSubject<number>();
    public replaySubject = new ReplaySubject<number>();
    public subject = new Subject<number>();

    public trigger(): Observable<string | null> {
        return this.SampleObserver.asObservable();
    }
}
