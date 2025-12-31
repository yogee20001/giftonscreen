export async function onRequest({ params, env }) {
  const id = params.id;
  const data = await env.GREETINGS_KV.get(id);

  if (!data) return new Response("Not found", { status: 404 });

  return new Response(data, {
    headers: { "Content-Type": "application/json" }
  });
}
