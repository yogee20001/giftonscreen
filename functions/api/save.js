export async function onRequest(context) {
  try {
    const { request, env } = context;

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await request.json();

    const id = crypto.randomUUID();
    const unlockCode = Math.floor(100000 + Math.random() * 900000).toString();

    const data = {
      mobile: body.mobile,
      to: body.to,
      from: body.from,
      template: body.template,
      media: body.media || "",
      unlocked: false,
      unlockCode,
      createdAt: Date.now(),
      previewExpiresAt: Date.now() + 60 * 60 * 1000
    };

    if (!env.GREETINGS_KV) {
      throw new Error("KV binding GREETINGS_KV not found");
    }

    await env.GREETINGS_KV.put(id, JSON.stringify(data));

    return new Response(
      JSON.stringify({ id, unlockCode }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

