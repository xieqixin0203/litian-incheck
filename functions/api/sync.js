// Cloudflare Pages Function - KV 数据同步接口

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const project = url.searchParams.get('project') || 'proj-a';
  
  const key = `checklist_${project}`;
  const data = await env.CHECKLIST_KV.get(key, 'json');
  
  if (!data) {
    return new Response(JSON.stringify({ empty: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const project = url.searchParams.get('project') || 'proj-a';
  
  const body = await request.json();
  const key = `checklist_${project}`;
  
  await env.CHECKLIST_KV.put(key, JSON.stringify(body));
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
