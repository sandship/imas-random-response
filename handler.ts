import { listenAndServe, Handler } from "https://deno.land/std@0.111.0/http/server.ts";

const handler: Handler = (req: Request) => {

  const payload = "hello world"

  return new Response(JSON.stringify({payload}));
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);