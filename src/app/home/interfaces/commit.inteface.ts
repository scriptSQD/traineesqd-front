interface ICommitUser {
	name: string;
	email: string;
	date: Date;
}

interface IAuthor {
	login: string;
	id: number;
	avatar_url: string;
	url: string;
}

export interface ICommit {
	sha: string;

	commit: {
		author: ICommitUser;
		committer: ICommitUser;

		message: string;
		comment_count: number;

		varification: {
			verified: boolean;
		};
	};

	author: IAuthor;
	committer: IAuthor;

	html_url: string;

	stats: {
		additions: number;
		deletions: number;
	};
}
