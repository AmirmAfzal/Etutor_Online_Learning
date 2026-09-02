import { getBaseUrl } from "@/lib/utils";

export async function GET() {
  const baseUrl = getBaseUrl();

  const robots = `User-agent: *
Disallow:

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
