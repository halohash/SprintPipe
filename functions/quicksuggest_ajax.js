export async function onRequest(context) {
  const url = new URL(context.request.url);

  const query = url.searchParams.get("q") || "";
  const jsonp = url.searchParams.get("jsonp");

  if (!query) {
    return new Response("Missing q parameter", {
      status: 400,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }

  const invidiousUrl =
    `https://inv.truehosting.net/api/v1/search?q=${encodeURIComponent(query)}&type=video`;

  try {
    const response = await fetch(invidiousUrl);

    if (!response.ok) {
      return new Response(
        `Invidious returned ${response.status}`,
        {
          status: 502,
          headers: {
            "Content-Type": "text/plain"
          }
        }
      );
    }

    const data = await response.json();

    const results = data
      .filter(item => item.type === "video")
      .map(item => ({
        videoId: item.videoId,
        title: item.title,
        imageUrl: item.videoThumbnails?.[0]?.url || "",
        duration: item.lengthSeconds || 0,
        channel: {
          name: item.author || "",
          id: item.authorId || ""
        },
        description: item.description || "",
        source: "invidious"
      }));

    const output = JSON.stringify(results);

    const body = jsonp
      ? `${jsonp}(${output})`
      : output;

    return new Response(body, {
      headers: {
        "Content-Type": jsonp
          ? "application/javascript; charset=utf-8"
          : "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to contact Invidious",
        message: error.message
      }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}
