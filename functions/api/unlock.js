export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const raw = await env.GREETINGS_KV.get(body.id);

  if (!raw) return new Response("Not found", { status: 404 });

  const data = JSON.parse(raw);

  if (data.unlocked) return new Response("Already unlocked");
  if (body.code !== data.unlockCode)
    return new Response("Invalid code", { status: 403 });

  data.unlocked = true;
  delete data.unlockCode;

  await env.GREETINGS_KV.put(body.id, JSON.stringify(data));

  return new Response("Unlocked");
}
