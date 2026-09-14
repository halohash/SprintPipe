export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const feedName = url.searchParams.get("feed_name") || "popular";

  const apiUrl = `https://inv.truehosting.net/api/v1/${encodeURIComponent(feedName)}?region=US`;

  let apiData;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "accept": "application/json"
      }
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: "Upstream fetch failed",
          status: res.status
        }),
        {
          status: 502,
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "access-control-allow-origin": "*"
          }
        }
      );
    }

    apiData = await res.json();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Fetch error"
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "access-control-allow-origin": "*"
        }
      }
    );
  }

  // Invidious returns an array for /popular, /trending, /search, etc.
  const entries = Array.isArray(apiData)
    ? apiData
    : Array.isArray(apiData?.videos)
      ? apiData.videos
      : Array.isArray(apiData?.results)
        ? apiData.results
        : [];

  function formatTime(sec) {
    sec = Number(sec) || 0;

    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = String(sec % 60).padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const items = entries
    .filter(entry => entry?.videoId)
    .map(entry => {
      const title = escapeHTML(entry.title || "");
      const author = escapeHTML(entry.author || "");
      const channelId = entry.authorId || "";
      const videoId = entry.videoId || "";
      const duration = Number(entry.lengthSeconds) || 0;
      const views = Number(entry.viewCount) || 0;
      const description = escapeHTML(entry.description || "");

      const videoThumb =
        `https://tv36.pages.dev/get_thumb?v=${encodeURIComponent(videoId)}`;

      const userThumb =
        channelId
          ? `https://tv36.pages.dev/get_thumb?v=${encodeURIComponent(channelId)}&t=1`
          : "";

      return `
<li class="feed-item-container">
  <div class="feed-item upload">
    <div class="feed-item-content">

      <h3 class="feed-item-title">
        <span class="feed-item-author">
          <a href="/user/${encodeURIComponent(entry.author || "")}" class="yt-user-photo">
            <span class="video-thumb ux-thumb ux-thumb-profile-24">
              <span class="clip">
                <span class="clip-inner">
                  ${
                    userThumb
                      ? `<img src="${userThumb}" alt="${author}">`
                      : ""
                  }
                  <span class="vertical-align"></span>
                </span>
              </span>
            </span>
          </a>
        </span>

        <span class="feed-item-owner">
          <a href="/user/${encodeURIComponent(entry.author || "")}"
             class="yt-user-name"
             dir="ltr">${author}</a>
        </span>

        uploaded

        <span class="time-created">
          ${escapeHTML(entry.publishedText || "")}
        </span>
      </h3>

      <div class="feed-item-visual">

        <div class="feed-item-visual-thumb">
          <a class="ux-thumb-wrap contains-addto yt-uix-sessionlink"
             href="/watch?v=${encodeURIComponent(videoId)}">

            <span class="video-thumb ux-thumb ux-thumb-288">
              <span class="clip">
                <span class="clip-inner">
                  <img src="${videoThumb}" alt="Thumbnail">
                  <span class="vertical-align"></span>
                </span>
              </span>
            </span>

            <span class="video-time">
              ${formatTime(duration)}
            </span>

          </a>
        </div>

        <div class="feed-item-visual-content">

          <div class="feed-item-visual-description">

            <h4>
              <a class="title yt-uix-sessionlink"
                 href="/watch?v=${encodeURIComponent(videoId)}"
                 dir="ltr">${title}</a>
            </h4>

            <div class="description" dir="ltr">
              <p>${description}</p>
            </div>

          </div>

          <p class="metadata">
            <span class="view-count">
              ${views.toLocaleString()} views
            </span>
          </p>

        </div>

      </div>

    </div>
  </div>
</li>`;
    })
    .join("");

  const responseData = {
    paging: null,

    feed_html: `
<div class="feed-container">
  <div class="feed-page">
    <ul class="context-data-container">
      ${items}
    </ul>
  </div>
</div>`
  };

  return new Response(JSON.stringify(responseData), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "*"
    }
  });
}