import Conf, { type Schema } from "conf"; // Import Schema type

export interface ConfigData {
  apiBaseUrl: string;
  apiToken?: string; // Make token optional if it can be empty or not set
}

// Define a schema for your configuration
const schema: Schema<ConfigData> = {
  apiBaseUrl: {
    type: "string",
    format: "url",
    default: "https://api.drylab.bio", // Set a sensible default or leave empty
  },
  apiToken: {
    type: "string",
    default: "",
  },
} as const; // Use 'as const' for better type inference with conf

// The project name will determine the config file's location
// e.g., on macOS: ~/Library/Application Support/drylab-nodejs/config.json
const config = new Conf<ConfigData>({ projectName: "drylab", schema });

export function getConfig(): Conf<ConfigData> {
  return config; // This should now work
}

export function setConfigValue<Key extends keyof ConfigData>(
  key: Key,
  value: ConfigData[Key],
): void {
  config.set(key, value);
}

export function getConfigValue<Key extends keyof ConfigData>(
  key: Key,
): ConfigData[Key] {
  return config.get(key);
}

export function clearConfig(): void {
  config.clear();
}

// Export the schema if needed by other parts (like the configure command for options)
export { schema as configSchema };
