import { HandlerContext } from "$fresh/src/server/types.ts";
import { handler as rangeHandler } from "./[range].ts";

/**
 * Responds with the latest tag for the repo.
 */
export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  ctx.params.range = "*";
  return await rangeHandler(req, ctx);
}
