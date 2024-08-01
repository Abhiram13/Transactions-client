import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionListComponent } from "./transactions.component";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("Transactions list", function() {
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;
    let router: Router;

    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, TransactionListComponent]
        });

        fixture = TestBed.createComponent(TransactionListComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    
});