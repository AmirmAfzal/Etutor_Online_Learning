export async function GET() {
    const robots = `User-agent: *
  Disallow:
  Sitemap: https://yourdomain.com/sitemap.xml`;
  
    return new Response(robots, { headers: { "Content-Type": "text/plain" } });
  }
  