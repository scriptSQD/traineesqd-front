import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { WithAuthGuard } from "./auth/guards/with-auth.guard";
import { WithoutAuthGuard } from "./auth/guards/without-auth.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegComponent } from "./reg/reg.component";
import { TodosNgxsComponent } from "./utils/components/todos-ngxs/todos-ngxs.component";
import { UtilsComponent } from "./utils/utils.component";

const routes: Routes = [
	{ path: "home", component: HomeComponent, title: "Home" },
	{
		path: "reg",
		component: RegComponent,
		title: "Reg",
		canActivate: [WithoutAuthGuard],
	},
	{
		path: "login",
		component: LoginComponent,
		title: "Login",
		canActivate: [WithoutAuthGuard],
	},
	{
		path: "logout",
		component: LogoutComponent,
		title: "Logout",
		canActivate: [WithAuthGuard],
	},
	{
		path: "utils",
		component: UtilsComponent,
		title: "Utils",
	},
	{ path: "ngxs-todos", component: TodosNgxsComponent },
	{
		path: "account",
		component: AccountComponent,
		canActivate: [WithAuthGuard],
		title: "Account",
	},
	{ path: "", pathMatch: "full", redirectTo: "/home" },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			onSameUrlNavigation: "reload",
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
