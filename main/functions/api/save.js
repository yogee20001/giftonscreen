export async function onRequestPost({ request, env }) {
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
    previewExpiresAt: Date.now() + (60 * 60 * 1000) // 1 hour

  };

  await env.GREETINGS_KV.put(id, JSON.stringify(data));

  return new Response(JSON.stringify({ id, unlockCode }), {
    headers: { "Content-Type": "application/json" }
  });
}
