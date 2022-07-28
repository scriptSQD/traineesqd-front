import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegComponent } from "./reg/reg.component";
import { HomeComponent } from "./home/home.component";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { FormValidationHandlerComponent } from "./components/form-validation-handler/form-validation-handler.component";
import { ValidationIndicatorComponent } from "./components/loading-indicator/loading-indicator.component";
import { LogoutComponent } from "./logout/logout.component";
import { AccountComponent } from "./account/account.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TitleStrategy } from "@angular/router";
import { TSQDTitleStrategy } from "./title.strategy";
import { UtilsComponent } from "./utils/utils.component";
import { TodosNgxsComponent } from "./utils/components/todos-ngxs/todos-ngxs.component";
import { NgxsModule } from "@ngxs/store";
import {
	TodosState,
	TODOS_STATE_TOKEN,
} from "./utils/components/todos-ngxs/states/todos.state";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";

import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { environment } from "src/environments/environment";
import { TodoCardComponent } from "./utils/components/todos-ngxs/components/todo-card/todo-card.component";
import { AuthInterceptor } from "./utils/interceptors/auth-interceptor.interceptor";
import { CloudTodosState } from "./utils/components/todos-ngxs/states/cloud-todos.state";

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
		UtilsComponent,
		TodosNgxsComponent,
		InputComponent,
		ButtonComponent,
		TodoCardComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NgxsModule.forRoot([TodosState, CloudTodosState]),
		NgxsStoragePluginModule.forRoot({
			key: [TODOS_STATE_TOKEN.getName()],
		}),
		NgxsReduxDevtoolsPluginModule.forRoot({
			disabled: environment.production,
		}),
		NgxsLoggerPluginModule.forRoot({
			disabled: environment.production,
		}),
	],
	providers: [
		{ provide: TitleStrategy, useClass: TSQDTitleStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
