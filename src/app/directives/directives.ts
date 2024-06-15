import { Directive, ElementRef, HostListener, AfterViewInit, Input } from '@angular/core';
import { TransactionListComponent } from '../routes/transactions/list/transactions.component';

@Directive({
    selector: '[matField]',
    standalone: true,
})
export class MatFieldDirective implements AfterViewInit {
    public value: string = "";

    constructor(private e: ElementRef<HTMLElement>) { }

    ngAfterViewInit(): void {
        this.nativeElement();
    }

    private nativeElement() {
        const element: HTMLDivElement = this.e.nativeElement as HTMLDivElement;
        const childElements: HTMLElement[] = element?.children as unknown as HTMLElement[];
        // (childElements[0].querySelector("mat-label") as HTMLElement).style.color = "green";
        // childElements[0].style.background = "green";
    }

    @HostListener("input", ["$event"])
    onChange(event: any) {
        this.value = event.target.value || "";
    }
}

@Directive({
    selector: '[margin]',
    standalone: true,
})
export class MarginDirective implements AfterViewInit {
    @Input() margin: string = "";

    constructor(private readonly ref: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        this.setMargins();
    }

    private setMargins(): void {
        const margin = this.margin;
        const length: number = margin?.split(" ")?.length;
        const marginMap: Map<string, string> = new Map();

        if (!length) return;

        if (length === 1) {
            const trbl = margin

            marginMap.set("marginTop", trbl?.toString());
            marginMap.set("marginRight", trbl?.toString());
            marginMap.set("marginBottom", trbl?.toString());
            marginMap.set("marginLeft", trbl?.toString());
        }

        if (length === 2) {
            const [tb, rl] = margin?.split(" ");

            marginMap.set("marginTop", tb?.toString());
            marginMap.set("marginRight", rl?.toString());
            marginMap.set("marginBottom", tb?.toString());
            marginMap.set("marginLeft", rl?.toString());
        }

        if (length === 4) {
            const [t, r, b, l] = margin?.split(" ");

            marginMap.set("marginTop", t?.toString());
            marginMap.set("marginRight", r?.toString());
            marginMap.set("marginBottom", b?.toString());
            marginMap.set("marginLeft", l?.toString());
        }

        marginMap?.forEach((unit, key) => {
            this.ref.nativeElement.style[key as any] = unit;
        });
    }
}

// greyish - #333333

@Directive({
    // selector: 'th, tr, p, h4, h1',
    standalone: true
})
export class TextDirective implements AfterViewInit {
    constructor(private readonly ref: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        this.ref.nativeElement.style.color = 'green';
    }
}

@Directive({
    selector: '#root',
    standalone: true
})
export class AppDirective implements AfterViewInit {
    constructor(private readonly ref: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        console.log("HEY");
        this.ref.nativeElement.style.backgroundColor = '#333333';
    }
}