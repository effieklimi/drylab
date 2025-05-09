import { Command, Args } from "@oclif/core";
import { APIClient, type DoiResolutionResponse } from "./../api-client.js";

export default class Content extends Command {
  static description =
    "Retrieves content or triggers a workflow using a Digital Object Identifier (DOI)."; // Updated description

  static examples = [
    `$ drylab content 10.1371/journal.pone.0018882`,
    `$ drylab content "10.1000/some complex/doi with spaces"`,
  ];

  static args = {
    doiString: Args.string({
      name: "DOI_STRING",
      required: true,
      description: "The Digital Object Identifier (DOI) to use.",
    }),
  };

  // No flags needed for this basic version, but you could add them:
  // static flags = {
  //   verbose: Flags.boolean({char: 'v'}),
  // };

  async run(): Promise<void> {
    const { args } = await this.parse(Content); // 'this.parse(Content)' is correct here

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

    this.log(`Processing DOI for content: ${args.doiString}...`); // Updated log message

    try {
      const apiClient = new APIClient();
      const result: DoiResolutionResponse =
        await apiClient.triggerWorkflowWithDoi(args.doiString);

      this.log("Operation successful! ✅"); // More generic success message
      this.log("API Response:");
      this.logJson(result);
    } catch (error: any) {
      this.error(error.message, { exit: 1 });
    }
  }
}
