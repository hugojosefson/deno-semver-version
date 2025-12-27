import { define } from "../utils.ts";

const HOUR = 60 * 60;
const DAY = 24 * HOUR;

export default define.middleware(async (ctx) => {
  const response = await ctx.next();
  response.headers.set("Cache-Control", `max-age=${DAY}`);
  return response;
});
