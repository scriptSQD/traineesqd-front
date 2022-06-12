import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";

export function FormControlsMatch(
    controlName: string,
    matchingControlName: string,
    error: ValidationErrors
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const c1 = control.get(controlName);
        const c2 = control.get(matchingControlName);

        if (c1?.value !== c2?.value) return error;
        else return null;
    };
}
