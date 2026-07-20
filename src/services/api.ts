export type HealthResponse = {
  status: string;
  message: string;
};

const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/api/health`);

  if (!response.ok) {
    throw new Error("Could not connect to the CareerOS API.");
  }

  return response.json();
}