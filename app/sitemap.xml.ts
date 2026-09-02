import { getBaseUrl } from "@/lib/utils";

export async function GET() {
  const baseUrl = getBaseUrl();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/courses</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/category</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/become-instructor</loc>
    <priority>0.6</priority>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
