import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AccountGuard } from "./account/guards/account.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegComponent } from "./reg/reg.component";

const routes: Routes = [
    { path: "home", component: HomeComponent, title: "Home" },
    { path: "reg", component: RegComponent, title: "Reg" },
    { path: "login", component: LoginComponent, title: "Login" },
    { path: "logout", component: LogoutComponent, title: "Logout" },
    {
        path: "account",
        component: AccountComponent,
        canActivate: [AccountGuard],
        title: "Account",
    },
    { path: "", pathMatch: "full", redirectTo: "/home" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
