export async function onRequest(context) {
  function withCORS(res) {
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "*");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers
    });
  }

  try {
    const { request } = context;
    const url = new URL(request.url);

    const INVIDIOUS = "https://inv.truehosting.net";

    const alt = url.searchParams.get("alt") || "xml";
    const callback = url.searchParams.get("callback");
    const query = (url.searchParams.get("q") || "").toLowerCase();

    const startIndex = Math.max(
      parseInt(url.searchParams.get("start-index") || "1", 10),
      1
    );

    const maxResults = Math.min(
      Math.max(
        parseInt(url.searchParams.get("max-results") || "25", 10),
        1
      ),
      100
    );

    const parts = url.pathname.split("/").filter(Boolean);
    const feedIndex = parts.indexOf("feeds");

    if (
      feedIndex === -1 ||
      parts[feedIndex + 1] !== "api"
    ) {
      return withCORS(
        new Response("Not Found", { status: 404 })
      );
    }

    const route = parts.slice(feedIndex + 2);

    /*
     * ---------------------------------------------------------
     * GDATA COMPATIBILITY HELPERS
     * ---------------------------------------------------------
     */

    function makeGDataVideo(v) {
      if (!v) return null;

      const id = v.videoId || "";

      const title =
        v.title ||
        "Untitled video";

      const description =
        v.description ||
        "";

      const author =
        v.author ||
        "Unknown";

      const authorId =
        v.authorId ||
        null;

      const duration =
        Number.isFinite(Number(v.lengthSeconds))
          ? Number(v.lengthSeconds)
          : 0;

      const published =
        v.publishedText && v.published
          ? new Date(v.published).toISOString()
          : new Date().toISOString();

      const category =
        v.genre ||
        "";

      const views =
        Number.isFinite(Number(v.viewCount))
          ? Number(v.viewCount)
          : 0;

      const thumbnail =
        v.videoThumbnails?.find(
          x => x.quality === "medium"
        )?.url ||
        v.videoThumbnails?.[0]?.url ||
        "";

      /*
       * This produces the same general structure as the
       * old GData objects your code was consuming.
       */

      return {
        author: {
          name: {
            "$t": author
          },
          uri: {
            "$t": authorId
              ? `${INVIDIOUS}/channel/${authorId}`
              : ""
          },
          "yt$userId": {
            "$t": authorId || "null"
          }
        },

        category: [
          {
            scheme:
              "http://schemas.google.com/g/2005#kind",
            term:
              "http://gdata.youtube.com/schemas/2007#video"
          },
          ...(category
            ? [{
                label: category,
                scheme:
                  "http://gdata.youtube.com/schemas/2007/categories.cat",
                term: category
              }]
            : [])
        ],

        content: {
          src:
            `${INVIDIOUS}/watch?v=${encodeURIComponent(id)}`,
          type:
            "text/html"
        },

        "gd$comments": {
          "gd$feedLink":
            `${INVIDIOUS}/api/v1/comments/${encodeURIComponent(id)}`,
          rel:
            "http://gdata.youtube.com/schemas/2007#comments",
          countHint:
            0
        },

        id: {
          "$t":
            `tag:youtube.com,2008:video:${id}`
        },

        link: [
          {
            href:
              `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
            rel:
              "alternate",
            type:
              "text/html"
          },
          {
            href:
              `${INVIDIOUS}/watch?v=${encodeURIComponent(id)}`,
            rel:
              "http://gdata.youtube.com/schemas/2007#video.related",
            type:
              "text/html"
          }
        ],

        "media$group": {
          "media$category": {
            label:
              category,
            scheme:
              "http://gdata.youtube.com/schemas/2007/categories.cat",
            term:
              category
          },

          "media$content": [
            {
              duration,
              medium:
                "video",
              "yt$format":
                18,
              url:
                `${INVIDIOUS}/latest_version?id=${encodeURIComponent(id)}`
            }
          ],

          "media$credit": [
            {
              "$t":
                author,
              role:
                "uploader",
              scheme:
                "urn:youtube",
              "yt$display":
                author
            }
          ],

          "media$description": {
            "$t":
              description
          },

          "media$title": {
            "$t":
              title,
            type:
              "plain"
          },

          "yt$duration": {
            seconds:
              String(duration)
          },

          "yt$uploaded": {
            "$t":
              published
          },

          "yt$videoid": {
            "$t":
              id
          },

          "yt$uploaderId": {
            "$t":
              authorId || "null"
          },

          "media$player": {
            url:
              `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`
          },

          "media$thumbnail": {
            url:
              thumbnail
          },

          "yt$statistics": {
            viewCount:
              String(views)
          }
        },

        published: {
          "$t":
            published
        },

        updated: {
          "$t":
            published
        },

        title: {
          "$t":
            title
        },

        "yt$hd": {}
      };
    }

    /*
     * ---------------------------------------------------------
     * FETCH INVIDIOUS
     * ---------------------------------------------------------
     */

    async function fetchInvidious(path) {
      const response = await fetch(
        `${INVIDIOUS}${path}`,
        {
          headers: {
            "Accept":
              "application/json"
          },
          cf: {
            cacheTtl: 60
          }
        }
      );

      if (!response.ok) {
        throw new Error(
          `Invidious returned HTTP ${response.status}`
        );
      }

      return await response.json();
    }

    /*
     * ---------------------------------------------------------
     * LOAD VIDEOS
     * ---------------------------------------------------------
     */

    async function loadVideos() {
      let data;

      /*
       * If q= is supplied, use Invidious search directly.
       */

      if (query) {
        data = await fetchInvidious(
          `/api/v1/search?q=${encodeURIComponent(query)}&type=video`
        );
      } else {
        data = await fetchInvidious(
          "/api/v1/popular?region=US"
        );
      }

      if (!Array.isArray(data)) {
        return [];
      }

      return data
        .filter(v => v && v.videoId)
        .map(makeGDataVideo)
        .filter(Boolean);
    }

    /*
     * ---------------------------------------------------------
     * GETTERS
     * ---------------------------------------------------------
     */

    function getId(v) {
      return (
        v?.media$group?.["yt$videoid"]?.$t ||
        ""
      );
    }

    function getTitle(v) {
      return (
        v?.title?.$t ||
        ""
      );
    }

    function getDescription(v) {
      return (
        v?.media$group?.["media$description"]?.$t ||
        ""
      );
    }

    function getAuthor(v) {
      return (
        v?.author?.name?.$t ||
        "unknown"
      );
    }

    function getAuthorId(v) {
      return (
        v?.author?.["yt$userId"]?.$t ||
        null
      );
    }

    function getCategory(v) {
      return (
        v?.media$group?.["media$category"]?.term ||
        ""
      );
    }

    function getVideoURL(v) {
      return (
        v?.media$group?.["media$content"]?.[0]?.url ||
        ""
      );
    }

    function getViews(v) {
      const value =
        v?.["media$group"]?.["yt$statistics"]?.viewCount;

      const parsed =
        parseInt(
          String(value ?? "0").replace(/,/g, ""),
          10
        );

      return Number.isFinite(parsed)
        ? parsed
        : 0;
    }

    /*
     * ---------------------------------------------------------
     * SEARCH FILTER
     * ---------------------------------------------------------
     */

    function filter(list) {
      if (!query) {
        return list;
      }

      /*
       * Search is already performed by Invidious.
       * This extra filter keeps compatibility with the
       * original GData implementation.
       */

      return list.filter(v =>
        getTitle(v)
          .toLowerCase()
          .includes(query) ||

        getDescription(v)
          .toLowerCase()
          .includes(query) ||

        getAuthor(v)
          .toLowerCase()
          .includes(query)
      );
    }

    /*
     * ---------------------------------------------------------
     * PAGINATION
     * ---------------------------------------------------------
     */

    function paginate(list) {
      const start =
        Math.max(startIndex - 1, 0);

      return list.slice(
        start,
        start + maxResults
      );
    }

    /*
     * ---------------------------------------------------------
     * GDATA FEED
     * ---------------------------------------------------------
     */

    function buildFeed(page, total, title) {
      return {
        version:
          "1.0",

        encoding:
          "UTF-8",

        feed: {
          entry:
            page,

          title: {
            "$t":
              title
          },

          "openSearch$totalResults": {
            "$t":
              String(total)
          },

          "openSearch$startIndex": {
            "$t":
              String(startIndex)
          },

          "openSearch$itemsPerPage": {
            "$t":
              String(maxResults)
          },

          updated: {
            "$t":
              new Date().toISOString()
          }
        }
      };
    }

    /*
     * ---------------------------------------------------------
     * JSON RESPONSE
     * ---------------------------------------------------------
     */

    function respondJSON(data) {
      let body =
        JSON.stringify(data);

      if (callback) {
        body =
          `${callback}(${body})`;
      }

      return withCORS(
        new Response(body, {
          headers: {
            "content-type":
              callback
                ? "application/javascript; charset=UTF-8"
                : "application/json; charset=UTF-8"
          }
        })
      );
    }

    /*
     * ---------------------------------------------------------
     * XML
     * ---------------------------------------------------------
     */

    function escapeXML(str) {
      return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    }

    function entryXML(v) {
      const id =
        getId(v);

      const videoURL =
        getVideoURL(v);

      const title =
        getTitle(v);

      const description =
        getDescription(v);

      const author =
        getAuthor(v);

      const duration =
        v?.media$group?.["yt$duration"]?.seconds ||
        "0";

      const published =
        v?.published?.$t ||
        new Date().toISOString();

      const views =
        getViews(v);

      return `
<entry>
  <id>${escapeXML(
    `tag:youtube.com,2008:video:${id}`
  )}</id>

  <title>${escapeXML(title)}</title>

  <content>${escapeXML(description)}</content>

  <author>
    <name>${escapeXML(author)}</name>
  </author>

  <published>${escapeXML(published)}</published>

  <updated>${escapeXML(published)}</updated>

  <media:group>

    <media:title>
      ${escapeXML(title)}
    </media:title>

    <media:description>
      ${escapeXML(description)}
    </media:description>

    <media:content
      url="${escapeXML(videoURL)}"
      type="video/mp4"
      duration="${escapeXML(duration)}"
    />

    <media:thumbnail
      url="${escapeXML(
        v?.["media$group"]?.["media$thumbnail"]?.url || ""
      )}"
    />

    <yt:videoid>
      ${escapeXML(id)}
    </yt:videoid>

    <yt:statistics
      viewCount="${escapeXML(String(views))}"
    />

  </media:group>

  <link
    href="https://www.youtube.com/watch?v=${encodeURIComponent(id)}"
    rel="alternate"
    type="text/html"
  />

</entry>`;
    }

    function buildXML(page, total, title) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<feed
  xmlns="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:yt="http://gdata.youtube.com/schemas/2007"
  xmlns:openSearch="http://a9.com/-/spec/opensearch/1.1/"
>

<title>${escapeXML(title)}</title>

<updated>
${new Date().toISOString()}
</updated>

<openSearch:totalResults>
${total}
</openSearch:totalResults>

<openSearch:startIndex>
${startIndex}
</openSearch:startIndex>

<openSearch:itemsPerPage>
${maxResults}
</openSearch:itemsPerPage>

${page.map(entryXML).join("\n")}

</feed>`;
    }

    /*
     * ---------------------------------------------------------
     * STANDARD FEEDS
     * ---------------------------------------------------------
     */

    const STANDARD_FEEDS = {
      most_popular:
        "Most Popular",

      most_popular_Music:
        "Music",

      most_popular_Games:
        "Gaming",

      most_popular_Sports:
        "Sports",

      most_popular_Film:
        "Film & Animation",

      most_popular_Entertainment:
        "Entertainment",

      most_popular_Comedy:
        "Comedy",

      most_popular_News:
        "News & Politics",

      most_popular_People:
        "People & Blogs",

      most_popular_Tech:
        "Science & Technology",

      most_popular_Howto:
        "Howto & Style",

      most_popular_Education:
        "Education",

      most_popular_Animals:
        "Pets & Animals"
    };

    /*
     * ---------------------------------------------------------
     * SPECIAL REDIRECTS
     * ---------------------------------------------------------
     */

    if (
      route[0] === "users" &&
      route[1] === "trends" &&
      route[2] === "favorites"
    ) {
      const redirectURL =
        new URL(
          url.origin +
          "/feeds/api/standardfeeds/most_popular"
        );

      redirectURL.search =
        url.search;

      return withCORS(
        Response.redirect(
          redirectURL.toString(),
          302
        )
      );
    }

    if (
      route[0] === "users" &&
      route[1] === "default" &&
      route[2] === "recommendations"
    ) {
      const redirectURL =
        new URL(
          url.origin +
          "/feeds/api/videos"
        );

      redirectURL.search =
        url.search;

      return withCORS(
        Response.redirect(
          redirectURL.toString(),
          302
        )
      );
    }

    if (
      route[0] === "playlists"
    ) {
      const redirectURL =
        new URL(
          url.origin +
          "/feeds/api/videos"
        );

      redirectURL.search =
        url.search;

      return withCORS(
        Response.redirect(
          redirectURL.toString(),
          302
        )
      );
    }

    if (
      route[0] === "users" &&
      route[1] === "HaloHash" &&
      route[2] === "favorites"
    ) {
      const redirectURL =
        new URL(
          url.origin +
          "/feeds/api/videos"
      );

      redirectURL.search =
        url.search;

      return withCORS(
        Response.redirect(
          redirectURL.toString(),
          302
        )
      );
    }

    /*
     * ---------------------------------------------------------
     * FETCH VIDEOS
     * ---------------------------------------------------------
     */

    const videos =
      await loadVideos();

    /*
     * ---------------------------------------------------------
     * RELATED VIDEOS
     * ---------------------------------------------------------
     */

    if (
      route[0] === "videos" &&
      route[2] === "related"
    ) {
      const id =
        route[1];

      const base =
        videos.find(
          v => getId(v) === id
        );

      if (!base) {
        return withCORS(
          new Response(
            "Not Found",
            { status: 404 }
          )
        );
      }

      /*
       * Use Invidious' actual related endpoint
       * when possible.
       */

      let related = [];

      try {
        const relatedData =
          await fetchInvidious(
            `/api/v1/related/${encodeURIComponent(id)}`
          );

        if (Array.isArray(relatedData)) {
          related =
            relatedData
              .filter(v => v.videoId)
              .map(makeGDataVideo)
              .filter(Boolean);
        }
      } catch {
        related =
          videos.filter(
            v => getId(v) !== id
          );
      }

      const page =
        paginate(
          filter(related)
        );

      return alt === "json"
        ? respondJSON(
            buildFeed(
              page,
              related.length,
              "Related"
            )
          )
        : withCORS(
            new Response(
              buildXML(
                page,
                related.length,
                "Related"
              ),
              {
                headers: {
                  "content-type":
                    "application/xml; charset=UTF-8"
                }
              }
            )
          );
    }

    /*
     * ---------------------------------------------------------
     * SINGLE VIDEO
     * ---------------------------------------------------------
     */

    if (
      route[0] === "videos" &&
      route[1]
    ) {
      const id =
        route[1];

      let v =
        videos.find(
          x => getId(x) === id
        );

      /*
       * The video may not be in /popular.
       * Ask Invidious directly.
       */

      if (!v) {
        try {
          const data =
            await fetchInvidious(
              `/api/v1/videos/${encodeURIComponent(id)}`
            );

          v =
            makeGDataVideo(data);
        } catch {
          v =
            null;
        }
      }

      if (!v) {
        return withCORS(
          new Response(
            "Not Found",
            { status: 404 }
          )
        );
      }

      return alt === "json"
        ? respondJSON({
            entry:
              v
          })
        : withCORS(
            new Response(
              entryXML(v),
              {
                headers: {
                  "content-type":
                    "application/xml; charset=UTF-8"
                }
              }
            )
          );
    }

    /*
     * ---------------------------------------------------------
     * STANDARD FEEDS
     * ---------------------------------------------------------
     */

    if (
      route[0] === "standardfeeds"
    ) {
      const id =
        route[1];

      if (!id) {
        return respondJSON({
          sets:
            Object.entries(
              STANDARD_FEEDS
            ).map(
              ([k, t]) => ({
                title:
                  t,

                gdata_list_id:
                  k,

                gdata_url:
                  `${url.origin}/feeds/api/standardfeeds/${k}`
              })
            )
        });
      }

      /*
       * Invidious does not expose the old
       * GData category feed names directly.
       *
       * Start with popular and filter by
       * genre/category where possible.
       */

      let list =
        videos;

      const mapped =
        STANDARD_FEEDS[id];

      if (
        mapped &&
        mapped !== "Most Popular"
      ) {
        list =
          videos.filter(
            v =>
              getCategory(v)
                .toLowerCase() ===
              mapped.toLowerCase()
          );
      }

      const page =
        paginate(
          filter(list)
        );

      return alt === "json"
        ? respondJSON(
            buildFeed(
              page,
              list.length,
              mapped || "Most Popular"
            )
          )
        : withCORS(
            new Response(
              buildXML(
                page,
                list.length,
                mapped || "Most Popular"
              ),
              {
                headers: {
                  "content-type":
                    "application/xml; charset=UTF-8"
                }
              }
            )
          );
    }

    /*
     * ---------------------------------------------------------
     * USER UPLOADS
     * ---------------------------------------------------------
     */

    if (
  route[0] === "users" &&
  route[1] &&
  route[2] === "uploads"
) {
  const userId = route[1];

  let list = [];

  try {
    const pageNumber = Math.max(
      Math.floor((startIndex - 1) / maxResults) + 1,
      1
    );



    const data = await fetchInvidious(
      `/api/v1/channels/UC${encodeURIComponent(userId)}/videos?page=${pageNumber}&sort_by=newest`
    );

    /*
     * Current Invidious versions return:
     *
     * {
     *   videos: [...],
     *   continuation: "..."
     * }
     *
     * Older versions may return the array directly.
     */

    const channelVideos =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.videos)
          ? data.videos
          : [];

    list = channelVideos
      .filter(v => v && v.videoId)
      .map(makeGDataVideo)
      .filter(Boolean);

  } catch (error) {
    console.error(
      "Failed to fetch channel uploads:",
      error
    );

    return withCORS(
      new Response(
        "Unable to fetch channel uploads",
        {
          status: 502,
          headers: {
            "content-type":
              "text/plain; charset=UTF-8"
          }
        }
      )
    );
  }

  /*
   * Apply the old GData pagination.
   */
  const page = paginate(list);

  return alt === "json"
    ? respondJSON(
        buildFeed(
          page,
          list.length,
          `${userId} uploads`
        )
      )
    : withCORS(
        new Response(
          buildXML(
            page,
            list.length,
            `${userId} uploads`
          ),
          {
            headers: {
              "content-type":
                "application/xml; charset=UTF-8"
            }
          }
        )
      );
}

    /*
     * ---------------------------------------------------------
     * ALL VIDEOS
     * ---------------------------------------------------------
     */

    if (
      route[0] === "videos"
    ) {
      const list =
        filter(videos);

      const page =
        paginate(list);

      return alt === "json"
        ? respondJSON(
            buildFeed(
              page,
              list.length,
              "Videos"
            )
          )
        : withCORS(
            new Response(
              buildXML(
                page,
                list.length,
                "Videos"
              ),
              {
                headers: {
                  "content-type":
                    "application/xml; charset=UTF-8"
                }
              }
            )
          );
    }

    return withCORS(
      new Response(
        "Not Found",
        { status: 404 }
      )
    );

  } catch (e) {
    return withCORS(
      new Response(
        e?.stack ||
        String(e),
        {
          status: 500,
          headers: {
            "content-type":
              "text/plain; charset=UTF-8"
          }
        }
      )
    );
  }
}
