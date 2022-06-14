import { HttpClient } from "@angular/common/http";
import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";
import { delay, lastValueFrom, map, of, switchMap } from "rxjs";
import { RegService } from "./services/reg.service";

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

/**
 * Validates value's uniqueness with debounce time. Sends POST request to defined API route in form of object: { value: control.value }.
 * @param {number} dt "Debounce time", sets the delay before Validator reaches the server to do actions.
 * @param {HttpClient} http Http client to deal with. This is required, as validators aren't injectables and can't have their dependencies injected through class' constructor.
 * @param {string} apiRoute Router of the API to get response of whther the uniqe value is available or not.
 * @returns {AsyncValidatorFn} Asynchronous validator function
 */
export function UniqueFieldValueAvailable(
    dt: number,
    http: HttpClient,
    apiRoute: string
): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return of(control.value).pipe(
            delay(dt),
            switchMap(val => {
                control.setErrors({ validatingUniqueness: true });

                return http
                    .post<boolean>(`${apiRoute}`, {
                        value: val,
                    })
                    .pipe(
                        map(isAvail =>
                            isAvail ? null : { uniqueValueAlreadyTaken: true }
                        )
                    );
            })
        );
    };
}
