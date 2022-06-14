import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegComponent } from "./reg/reg.component";
import { HomeComponent } from "./home/home.component";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { FormValidationHandlerComponent } from "./components/form-validation-handler/form-validation-handler.component";
import { ValidationIndicatorComponent } from "./components/validation-indicator/validation-indicator.component";
import { LogoutComponent } from "./logout/logout.component";
import { AccountComponent } from "./account/account.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TitleStrategy } from "@angular/router";
import { TSQDTitleStrategy } from "./title.strategy";

@NgModule({
    declarations: [
        AppComponent,
        RegComponent,
        HomeComponent,
        LoginComponent,
        FormValidationHandlerComponent,
        ValidationIndicatorComponent,
        LogoutComponent,
        AccountComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [{ provide: TitleStrategy, useClass: TSQDTitleStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
