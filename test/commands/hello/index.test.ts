import { runCommand } from "@oclif/test";
import { expect } from "chai";
// import { expect, test } from "@oclif/test";

describe("hello", () => {
  it("runs hello", async () => {
    const { stdout } = await runCommand("hello friend --from oclif");
    expect(stdout).to.contain("hello friend from oclif!");
  });
});

// describe("init", () => {
//   test
//     .stdout()
//     .command(["init", "my-proj", "--doi", "10.1234/foo"])
//     .it("creates a config file with DOI", (ctx) => {
//       expect(ctx.stdout).to.include("my-proj");
//     });
// });
