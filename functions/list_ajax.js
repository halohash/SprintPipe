export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const params = url.searchParams;

    const rawList = params.get("list");

    if (!rawList) {
        return new Response(JSON.stringify({
            error: "Missing list parameter"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    const listId = rawList.split(",")[0];

    const feedMap = {
        LBpop: "popular",
        "FLGNbesWrtvHPgtpTtfW4OhA": "popular",
        "FLeNZlh03MyUkjRlLFpVQxsg": "popular",
      "FLa-TCr366LR16OTaUrjb9bw":"popular",
"FLgPHCan3Xcw_ejiea7aXv4w":"popular?type=gaming",
"FLk2SIoe1jfycK09cBWiJyrA":"popular"
    };

    const feedPath = feedMap[listId];

    if (!feedPath) {
        return new Response(JSON.stringify({
            error: "Invalid list"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    const upstreamParams = new URLSearchParams();

    // Copy supported parameters to Invidious
    for (const [key, value] of params.entries()) {
        if (key !== "list") {
            upstreamParams.append(key, value);
        }
    }

    const apiUrl =
        `https://inv.truehosting.net/api/v1/${feedPath}?${upstreamParams.toString()}`;

    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!res.ok) {
            const text = await res.text();

            return new Response(JSON.stringify({
                error: "Failed to fetch Invidious feed",
                status: res.status,
                details: text
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }

        const data = await res.json();

        // Invidious returns an array directly
        const entries = Array.isArray(data) ? data : [];

        const items = entries
            .filter(e => e.type !== "channel")
            .map(e => ({
                id: e.videoId || "",
                encrypted_id: e.videoId || "",
                title: e.title || "",
                author: e.author || "",
                views: e.viewCount || 0,
                length_seconds: e.lengthSeconds || null,
                description: e.description || "",
                views: e.viewCount.toString() || "0",
                
                thumbnail:
                    e.videoThumbnails?.find(t => t.quality === "medium")?.url ||
                    e.videoThumbnails?.[0]?.url ||
                    "",
                uploaded: e.publishedText || "",
                likes: 0,
                dislikes: 0,
                time_created: 1735689600,
                is_hd: !!e.isUpcoming
                    ? false
                    : (e.videoThumbnails || []).some(t =>
                        t.quality === "maxres"
                    )
            }));

        const response = {
            list: rawList,
            title: "Popular",
            total_results: items.length,
            start_index: 1,
            items_per_page: items.length,
            video_count: items.length,
            videos: items
        };

        return new Response(JSON.stringify(response), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({
            error: "Server error",
            details: err.message
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}
