import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class TSQDTitleStrategy extends TitleStrategy {
    constructor(private readonly titleService: Title) {
        super();
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title) this.titleService.setTitle(`${title} - TraineeSQD`);
    }
}
