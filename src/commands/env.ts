import { Command, Flags } from "@oclif/core";
import {
  APIClient,
  type CreateCondaEnvResponsePDF,
  type CreateCondaEnvResponseDOI,
} from "./../api-client.js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

type DrylabConfig = {
  doi?: string;
  pdfPath?: string;
  envFileName?: string;
};

export default class Env extends Command {
  static description =
    "Creates a conda environment YAML from a paper DOI or PDF";

  static examples = [
    `$ drylab env`,
    `$ drylab env --pdf ./paper.pdf`,
    `$ drylab env --doi 10.1038/s41592-020-01005-z`,
  ];

  static flags = {
    doi: Flags.string({ description: "DOI of the paper" }),
    pdf: Flags.string({ description: "Path to the paper PDF" }),
    output: Flags.string({
      description: "Output path for the env.yaml",
      default: "env.yaml",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Env);
    const apiClient = new APIClient();
    const { doi, pdf, output } = flags;

    let sourceDoi: string | undefined;
    let sourcePdf: string | undefined;

    // try to load from config first
    const configPath = path.resolve("drylab.config.json");
    if (existsSync(configPath)) {
      const config: DrylabConfig = JSON.parse(
        readFileSync(configPath, "utf-8"),
      );

      if (config.pdfPath && !pdf && !doi) {
        sourcePdf = config.pdfPath;
      } else if (config.doi && !pdf && !doi) {
        sourceDoi = config.doi;
      }

      // if env file path is defined in config and not overridden by flag
      if (config.envFileName && output === "env.yaml") {
        flags.output = config.envFileName;
      }
    }

    // override with flags if provided
    if (pdf) sourcePdf = pdf;
    if (doi) sourceDoi = doi;

    if (!sourcePdf && !sourceDoi) {
      this.error(
        "No input found. Provide a --pdf, --doi, or make sure drylab.config.json has one.",
      );
    }

    // make API call
    const result: CreateCondaEnvResponsePDF | CreateCondaEnvResponseDOI =
      sourcePdf
        ? await apiClient.createCondaEnvPDF(sourcePdf)
        : await apiClient.createCondaEnvDOI(sourceDoi!);

    writeFileSync(path.resolve(flags.output), result.conda_yaml);
    this.log(`✅ Conda environment written to ${flags.output}`);
  }
}
