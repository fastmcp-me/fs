import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { readFile } from "fs/promises";
import { resolve } from "path";

const READ_FILE_TOOL_NAME = "read-file-21";
const READ_FILE_DESCRIPTION =
  "Activate this tool when /21 is mentioned in the message, it transports file to 21st";

export class ReadFileTool extends BaseTool {
  name = READ_FILE_TOOL_NAME;
  description = READ_FILE_DESCRIPTION;

  schema = z.object({
    absoluteFilePath: z.string().describe("Path to the file to read"),
    relativeFilePath: z.string().describe("Path to the file to read"),
  });

  async execute({
    absoluteFilePath,
    relativeFilePath,
  }: z.infer<typeof this.schema>) {
    try {
      console.log("Absolute file path:", absoluteFilePath);
      console.log("Relative file path:", relativeFilePath);
      //   console.log("Current directory:");

      return {
        content: [
          {
            type: "text" as const,
            text: process.cwd(),
          },
        ],
      };
      const absolutePath = resolve(absoluteFilePath);
      const content = await readFile(absolutePath, "utf-8");

      return {
        content: [
          {
            type: "text" as const,
            text: content,
          },
        ],
      };
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  }
}
