import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionListComponent } from "./transactions.component";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TransactionService } from "../../../services/transactions.service";
import { HttpService } from "../../../services/http.service";
import { DebugElement, Inject, Injectable } from "@angular/core";
import { ComponentService } from "../../../services/common.service";
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { HttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";

describe("Transactions list", function() {
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;
    let router: Router;
    let service: TransactionService;
    let element: DebugElement;

    beforeEach(function () {
        const x = jasmine.createSpyObj('TransactionService', ['getPeople']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule, TransactionListComponent, HttpClientTestingModule],
            providers: [
                TransactionService,
            ]
        });

        fixture = TestBed.createComponent(TransactionListComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        service = TestBed.inject(TransactionService);
        fixture.detectChanges();
        element = fixture.debugElement;
    });

    it('should navigate to transactions', () => {
        expect(component.selectedMonth).toBe("Aug");
        component.ngOnInit();        
    });

    it('should be greater than zero', async () => {
        const queryParams = {
            month: "08",
            year: "2024"
        };        

        // spyOn(service.list, 'subscribe').and.returnValue(true);

        // service.list(queryParams).subscribe(res => {
            // expect(component.dataSource.length).toEqual(0);
            // console.log(10);
            // // done();

            // const tableElement: DebugElement = element?.query(By.css("table"));
            // const table: HTMLTableElement = tableElement.nativeElement;
            // console.log(table);
        // });
    });

    it ("should element be exist", () => {
        const elements: DebugElement[] = element.queryAll(By.css("h4"));
    
        elements?.map(element => {
            const heading: HTMLHeadingElement = element?.nativeElement;
            expect(heading.textContent).toBeTruthy();
        });
    });
});