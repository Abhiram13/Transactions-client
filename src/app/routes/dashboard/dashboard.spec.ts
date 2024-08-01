import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from "./dashboard.component";
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, DashboardComponent],            
        });

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should navigate to transactions', () => {
        const navigateSpy = spyOn(router, 'navigateByUrl');

        component.toTransactions();
        fixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('/transactions');
    });
});