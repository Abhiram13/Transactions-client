import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AppDirective } from '../../directives/directives';
import { TestPipe, SecondPipe, ObservableService } from '../../pipes/test.pipe';

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [MatListModule, MatDividerModule, AppDirective, TestPipe, SecondPipe],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    constructor(private readonly ROUTER: Router, private readonly observer: ObservableService) {}

    ngOnInit(): void {
        // async subject
        // this.observer.asyncSubject.subscribe(res => console.log(`#1 ${res}`));
        // this.observer.asyncSubject.next(123);
        // this.observer.asyncSubject.subscribe(res => console.log(`#2 ${res}`));
        // this.observer.asyncSubject.next(456);
        // this.observer.asyncSubject.subscribe(res => console.log(`#3 ${res}`));
        // this.observer.asyncSubject.next(789);
        // this.observer.asyncSubject.complete();
        // async subject

        // replay subject
        // this.observer.replaySubject.next(123);
        // this.observer.replaySubject.subscribe(res => console.log(`replay 1: ${res}`));
        // this.observer.replaySubject.next(456);
        // this.observer.replaySubject.subscribe(res => console.log(`replay 2: ${res}`));
        // this.observer.replaySubject.next(789);
        // this.observer.replaySubject.next(845);
        // this.observer.replaySubject.subscribe(res => console.log(`replay 3: ${res}`));
        // this.observer.replaySubject.subscribe(res => console.log(`replay 4: ${res}`));
        // this.observer.replaySubject.subscribe(res => console.log(`replay 5: ${res}`));
        // this.observer.replaySubject.subscribe(res => console.log(`replay 6: ${res}`));
        // this.observer.replaySubject.next(987);
        // replay subject

        // subject
        // this.observer.subject.next(123);
        // this.observer.subject.subscribe(res => console.log(`subject: ${res}`));
        // this.observer.subject.next(456);
    }

    toTransactions(): void {
        this.ROUTER.navigateByUrl("/transactions");
    }

    toCategories(): void {
        this.ROUTER.navigateByUrl("/categories");
    }

    toBanks(): void {
        this.ROUTER.navigateByUrl("/banks");
    }
}

@Component({
    selector: 'test',
    standalone: true,
    template: `<h1>This is a test</h1>`
})
class TestComponent {}
