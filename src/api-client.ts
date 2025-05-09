import axios, { type AxiosInstance, AxiosError } from "axios";
import { getConfig } from "./config-service.js"; // We'll create this next

export interface DoiResolutionResponse {
  // Define what your API returns for a DOI resolution
  // Example:
  title?: string;
  url?: string;
  authors?: { given?: string; family?: string }[];
  [key: string]: any; // Allow other properties
}

export class APIClient {
  private client: AxiosInstance;

  constructor() {
    const config = getConfig();
    // Ensure you have a default or prompt user if not set
    const apiBaseUrlValue = config.get("apiBaseUrl");
    const baseURL =
      typeof apiBaseUrlValue === "string"
        ? apiBaseUrlValue
        : "https://api.drylab.bio";
    const apiTokenValue = config.get("apiToken");
    const authToken =
      typeof apiTokenValue === "string" ? apiTokenValue : undefined;

    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (authToken) {
      this.client.defaults.headers.common["Authorization"] =
        `Bearer ${authToken}`;
    }
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      let message = `API Request Failed: ${axiosError.message}`;
      if (axiosError.response) {
        message = `API Error ${axiosError.response.status} (${axiosError.response.statusText})`;
        const responseData = axiosError.response.data as any;
        if (responseData && (responseData.message || responseData.error)) {
          message += ` - ${responseData.message || responseData.error}`;
        } else if (responseData) {
          try {
            message += ` - ${JSON.stringify(responseData)}`;
          } catch (e) {
            /* ignore if can't stringify */
          }
        }
      }
      throw new Error(message);
    }
    throw new Error(`An unexpected error occurred: ${error.message || error}`);
  }

  async triggerWorkflowWithDoi(doi: string): Promise<DoiResolutionResponse> {
    // Renamed for clarity
    // *** THIS IS WHERE YOU SPECIFY YOUR API ENDPOINT ***
    // Example: if your API endpoint for running a workflow with a DOI is POST /workflows/run-by-doi
    const endpoint = `/api/v1/pub`; // ADJUST THIS
    const payload = { doi: doi }; // ADJUST PAYLOAD AS PER YOUR API

    // Ensure config is fresh for each call in case it changed
    const apiBaseUrlValue = getConfig().get("apiBaseUrl");
    this.client.defaults.baseURL =
      typeof apiBaseUrlValue === "string"
        ? apiBaseUrlValue
        : "https://api.drylab.bio";
    const tokenValue = getConfig().get("apiToken");
    const token = typeof tokenValue === "string" ? tokenValue : undefined;
    if (token) {
      this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common["Authorization"]; // Remove if no token
    }

    try {
      // Assuming your API expects a POST request with the DOI in the body
      //   const response = await this.client.post<DoiResolutionResponse>(
      //     endpoint,
      //     payload,
      //   );
      // If it's a GET request like /workflows/run-by-doi?doi=<DOI_STRING>
      const response = await this.client.get<DoiResolutionResponse>(
        `${endpoint}/${encodeURIComponent(doi)}/content`,
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
