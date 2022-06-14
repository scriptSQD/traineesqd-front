import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: "ValidationIndicator",
    template: `
        <span *ngIf="control.getError(uve)" class="flex gap-2">
            <div
                class="bg-transparent border-4  animate-spin rounded-full my-1"
                [ngClass]="{
                    'border-gray-300 border-t-gray-800': !invertColors,
                    'border-t-gray-300 border-gray-800': invertColors
                }"
                [ngStyle]="{
                    width: d,
                    height: d
                }"
            >
                {{ placeholder }}
            </div>
        </span>
    `,
    styles: [],
})
export class ValidationIndicatorComponent implements OnInit {
    constructor() {}

    @Input("vi-control") control!: AbstractControl;
    @Input("vi-uniqueness-validation-error") uve: string =
        "validatingUniqueness";
    @Input("vi-placeholder") placeholder: string = "Checking availability...";

    @Input("styling-colors-invert") invertColors: boolean = false;
    @Input("styling-diameter") d: string = "1.25rem";

    ngOnInit(): void {}
}
