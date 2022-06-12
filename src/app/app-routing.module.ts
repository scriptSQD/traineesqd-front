import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegComponent } from "./reg/reg.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "reg", component: RegComponent },
    { path: "", pathMatch: "full", redirectTo: "/home" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
