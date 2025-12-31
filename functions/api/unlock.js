export async function onRequest(context) {
  try {
    const { request, env } = context;

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await request.json();

    if (!env.GREETINGS_KV) {
      throw new Error("KV binding GREETINGS_KV not found");
    }

    const raw = await env.GREETINGS_KV.get(body.id);
    if (!raw) {
      return new Response("Not found", { status: 404 });
    }

    const data = JSON.parse(raw);

    if (data.unlocked) {
      return new Response("Already unlocked");
    }

    if (body.code !== data.unlockCode) {
      return new Response("Invalid code", { status: 403 });
    }

    data.unlocked = true;
    delete data.unlockCode;

    await env.GREETINGS_KV.put(body.id, JSON.stringify(data));

    return new Response("Unlocked");
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

