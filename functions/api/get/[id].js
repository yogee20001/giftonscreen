export async function onRequest(context) {
  try {
    const { params, env } = context;

    if (!env.GREETINGS_KV) {
      throw new Error("KV binding GREETINGS_KV not found");
    }

    const data = await env.GREETINGS_KV.get(params.id);

    if (!data) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

