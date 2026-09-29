export async function onRequest(context) {
  const url = new URL(context.request.url);

  const query = url.searchParams.get("q") || "";
  const jsonp = url.searchParams.get("jsonp");

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Missing q parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const invidiousURL =
      "https://inv.truehosting.net/api/v1/search?q=" +
      encodeURIComponent(query) +
      "&type=video";

    const response = await fetch(invidiousURL);

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "Invidious request failed",
          status: response.status
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const data = await response.json();

    const videos = data
      .filter(item => item.type === "video")
      .map(item => ({
        time_created: item.published
          ? Math.floor(new Date(item.published).getTime() / 1000)
          : 0,

        encrypted_id: item.videoId,

        views: item.viewCount != null
          ? item.viewCount.toLocaleString()
          : "0",

        description: item.description || "",

        length_seconds: item.lengthSeconds || 0,

        privacy: "public",

        cc_license: false,

        likes: item.likeCount || 0,

        dislikes: 0,

        title: item.title || "",

        is_hd: true,

        duration: formatDuration(item.lengthSeconds || 0),

        added: item.published
          ? new Date(item.published).toLocaleDateString("en-US")
          : "",

        comments: "0",

        thumbnail:
          item.videoThumbnails?.find(t => t.quality === "default")?.url ||
          item.videoThumbnails?.[0]?.url ||
          `https://i.ytimg.com/vi/${item.videoId}/default.jpg`,

        is_cc: false,

        author: item.author || "",

        category_id: 0,

        keywords: "",

        user_id: item.authorId || "",

        rating: 0
      }));

    const result = {
      hits: videos.length,
      video: videos
    };

    const output = JSON.stringify(result);

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


function formatDuration(seconds) {
  seconds = Number(seconds) || 0;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}
