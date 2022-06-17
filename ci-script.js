const { dir } = require("console");
const fs = require("fs");
const path = require("path");

const envDir = "src/environments";
const envFile = "environment.ts";
const envFileProd = "environment.prod.ts";

const envContents = String.raw`import { IEnvironment } from "./env.interface";

export const environment: IEnvironment = {
	production: ${process.env["PRODUCTION"] === "true"}
	cipher_key: ${String.raw`${process.env["CIPHER_KEY"]}`},
	backend_url: ${process.env["BACKEND_URL"]},
};
`;

fs.access(envDir, fs.constants.F_OK, err => {
	if (err) {
		console.log(`${envDir} doesn't exist, creating one.`);
		fs.mkdir(envDir, e => {
			if (e) throw e;
		});
	}

	try {
		fs.writeFileSync(`${envDir}/${envFile}`, "");
		fs.writeFileSync(`${envDir}/${envFileProd}`, envContents);

		console.log(`Created env and env.prod files in ${envDir}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
});
