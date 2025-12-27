import { State } from "@/utils.ts";
import { Context } from "fresh";
import { handler as rangeHandler } from "./[range].ts";

/**
 * Responds with the latest tag for the repo.
 */
export async function handler(ctx: Context<State>): Promise<Response> {
  ctx.params.range = "*";
  return await rangeHandler(ctx);
}
