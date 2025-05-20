import { Command, Flags, Args } from "@oclif/core";
import { APIClient, type DoiResolutionResponse } from "./../api-client.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

type Config = {
  doi?: string;
  pdfPath?: string;
  apiKey?: string;
};

export default class Init extends Command {
  static description =
    "Initializes a new Drylab project, creating a new directory and config file."; // Updated description

  static examples = [
    `$ drylab init my-project --doi 10.1038/s41592-020-01005-z`,
    `$ drylab init my-project --pdf ./paper.pdf --api-key sk-abc123`,
  ];

  static args = {
    projectName: Args.string({ required: true }),
  };

  static flags = {
    doi: Flags.string({ description: "DOI to reproduce from" }),
    pdf: Flags.string({ description: "Local path to a paper PDF" }),
    apiKey: Flags.string({ description: "Your API key (optional)" }),
    overwrite: Flags.boolean({
      default: false,
      description: "Overwrite existing project dir",
    }),
  };

  // No flags needed for this basic version, but you could add them:
  // static flags = {
  //   verbose: Flags.boolean({char: 'v'}),
  // };

  async run(): Promise<void> {
    // const apiBaseUrl = getConfigValue("apiBaseUrl");
    // // IMPORTANT: Ensure this defaultApiUrl matches the actual default in your config-service.ts
    // const defaultApiUrl = "https://api.drylab.bio";
    // // It's better to get the default from your configService if possible, or ensure they are identical.
    // // For example, if your configService.ts has:
    // // const schema = { apiBaseUrl: { default: 'https://your-default-api.example.com' } }
    // // Then use that same default here.

    // if (!apiBaseUrl || apiBaseUrl === defaultApiUrl) {
    //   this.error(
    //     `API base URL is not configured or is set to the default. Please run 'drylab configure apiBaseUrl <YOUR_API_URL>' or 'drylab login'.\nYour current API base URL is: ${apiBaseUrl}`,
    //     { exit: 1 },
    //   );
    // }

    const { args, flags } = await this.parse(Init);

    const { projectName } = args;
    const { doi, pdf, apiKey, overwrite } = flags;

    if (!doi && !pdf) {
      this.error("You must provide either --doi or --pdf");
    }
    if (doi && pdf) {
      this.error("Please provide only one of --doi or --pdf, not both");
    }

    const targetDir = path.resolve(process.cwd(), projectName);
    if (existsSync(targetDir) && !overwrite) {
      this.error(
        `Directory "${projectName}" already exists. Use --overwrite to override.`,
      );
    }

    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
    mkdirSync(path.join(targetDir, "data"), { recursive: true });
    mkdirSync(path.join(targetDir, "output"), { recursive: true });
    mkdirSync(path.join(targetDir, "logs"), { recursive: true });

    const config: Config = {};
    if (doi) config.doi = doi;
    if (pdf) config.pdfPath = path.resolve(pdf);
    if (apiKey) config.apiKey = apiKey;

    writeFileSync(
      path.join(targetDir, "drylab.config.json"),
      JSON.stringify(config, null, 2),
    );

    this.log(`✅ Project "${projectName}" created at ${targetDir}`);
    this.log(`→ Config: ${doi ? "DOI" : "PDF"} mode`);
    this.log("→ You can now run `cd " + projectName + " && drylab reproduce`");
  }
}
