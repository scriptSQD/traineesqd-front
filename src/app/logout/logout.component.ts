import { AfterContentInit, Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "app-logout",
    template: `
        <div class="prose flex flex-col items-center justify-center gap-3">
            <h1 class="m-0">Logged out.</h1>
            <h3 class="m-0">You will now be redirected to the homepage.</h3>
            <p class="m-0">
                If you are not redirected, please click <a href="/">here</a>.
            </p>
        </div>
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                flex: 1;
            }
        `,
    ],
})
export class LogoutComponent implements AfterContentInit {
    constructor(private as: AuthService) {}

    ngAfterContentInit(): void {
        this.as.logout();
        setTimeout(() => {
            window.location.href = "/";
        }, 3500);
    }
}
