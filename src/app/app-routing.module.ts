import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AccountGuard } from "./account/guards/account.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegComponent } from "./reg/reg.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "reg", component: RegComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    {
        path: "account",
        component: AccountComponent,
        canActivate: [AccountGuard],
    },
    { path: "", pathMatch: "full", redirectTo: "/home" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
