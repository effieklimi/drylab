import { Command, Flags, Args } from "@oclif/core";
import { APIClient, type GetDoiResponse } from "./../api-client.js";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

type Config = {
  doi?: string;
  pdfPath?: string;
  apiKey?: string;
  paperTitle?: string;
  paperJournal?: string;
  paperYear?: string;
  paperOaStatus?: string;
  paperLicense?: string;
  pdfSourceFilename?: string;
  pmcid?: string;
  dataDir?: string;
  codeDir?: string;
  outputDir?: string;
  logDir?: string;
  envFileName?: string;
};

export default class Init extends Command {
  static description =
    "Initializes a new Drylab project, creating a new directory and config file."; // Updated description

  static examples = [
    `$ drylab init my-project --doi 10.1038/s41592-020-01005-z`,
    `$ drylab init my-project --pdf ./paper.pdf --api-key GEMINI_API_KEY`,
  ];

  static args = {
    projectName: Args.string({ required: true }),
  };

  static flags = {
    doi: Flags.string({ description: "DOI to reproduce from" }),
    pdf: Flags.string({ description: "Local path to a paper PDF" }),
    apiKey: Flags.string({
      description:
        "The name of the viariable you have saved your Gemini API key under in your .env file (optional)",
    }),
    envFile: Flags.string({
      description: "The path to your .env file (optional)",
      default: ".env",
    }),
  };

  // No flags needed for this basic version, but you could add them:
  // static flags = {
  //   verbose: Flags.boolean({char: 'v'}),
  // };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Init);
    const apiClient = new APIClient();
    const { projectName } = args;
    const { doi, pdf, apiKey, envFile } = flags;

    // handle input validation and prioritization
    const config: Config = {};
    let source: "doi" | "pdf" | null = null;
    if (pdf) {
      source = "pdf";
      const result: GetDoiResponse = await apiClient.createConfigInit(pdf);
      config.doi = result.doi;
      config.pdfPath = pdf;
      //   config.paperTitle = result.paper_title;
      //   config.paperJournal = result.paper_journal;
      config.paperYear = result.paper_year;
      config.paperOaStatus = result.paper_oa_status;
      config.paperLicense = result.paper_license;
      //   config.pdfSourceFilename = result.pdf_source_filename;
      config.pmcid = result.pmcid;
    } else if (doi) {
      source = "doi";
      config.doi = doi;
    }

    const targetDir = path.resolve(process.cwd(), projectName);
    if (existsSync(targetDir)) {
      this.error(
        `Directory "${projectName}" already exists. Use --overwrite to override.`,
      );
    }

    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
    mkdirSync(path.join(targetDir, "paper"), { recursive: true });
    config.dataDir = "./paper";
    mkdirSync(path.join(targetDir, "data"), { recursive: true });
    config.dataDir = "./data";
    mkdirSync(path.join(targetDir, "code"), { recursive: true });
    config.codeDir = "./code";
    mkdirSync(path.join(targetDir, "output"), { recursive: true });
    config.outputDir = "./output";
    mkdirSync(path.join(targetDir, "logs"), { recursive: true });
    config.logDir = "./logs";

    config.apiKey = apiKey;
    config.envFileName = "env.yaml";

    if (source === "pdf" && pdf !== undefined)
      config.pdfPath = path.resolve(pdf);
    if (source === "doi" && doi !== undefined) config.doi = doi;
    if (apiKey) config.apiKey = apiKey;

    writeFileSync(
      path.join(targetDir, "drylab.config.json"),
      JSON.stringify(config, null, 2),
    );

    this.log(`✅ Project "${projectName}" created at ${targetDir}`);
    if (!source) {
      this.error("You must provide either --pdf or --doi...");
    }
    this.log("→ You can now run `cd " + projectName + " && drylab reproduce`");
  }
}
