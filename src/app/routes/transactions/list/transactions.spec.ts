import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionListComponent } from "./transactions.component";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TransactionService } from "../../../services/transactions.service";
import { HttpService } from "../../../services/http.service";
import { Inject, Injectable } from "@angular/core";
import { ComponentService } from "../../../services/common.service";
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { HttpClient } from "@angular/common/http";

describe("Transactions list", function() {
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;
    let router: Router;
    let service: TransactionService;

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
    });

    it('should navigate to transactions', () => {
        expect(component.selectedMonth).toBe("");
        component.ngOnInit();
        expect(component.selectedMonth).toBe("Aug");
        component;
    });
});