import { AfterContentInit, Component, OnInit } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { HomeService } from "./home.service";
import { ICommit } from "./interfaces/commit.inteface";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterContentInit {
	latestCommit?: ICommit;
	latestCommitLoading = new ReplaySubject<boolean>();

	constructor(private readonly homeService: HomeService) {}

	ngOnInit(): void {
		this.latestCommitLoading.next(true);
	}

	ngAfterContentInit(): void {
		this.homeService.getLatestCommit().subscribe({
			next: commit => {
				this.latestCommit = commit;
				this.latestCommitLoading.next(false);
			},
			error: () => {
				this.latestCommitLoading.next(false);
			},
		});
	}
}
