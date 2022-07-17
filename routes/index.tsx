/** @jsx h */
import { h } from "preact";
import { HandlerContext } from "$fresh/src/server/types.ts";
import { css } from "../src/css.ts";

export default function Home() {
  return [
    <style
      dangerouslySetInnerHTML={{ __html: css }}
    />,
    <main>
      <a href="https://github.com/hugojosefson/deno-semver-version/#readme">
        semver-version readme
      </a>
    </main>,
  ];
}

const HOUR = 60 * 60;

export async function handler(
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const response: Response = await ctx.render();
  response.headers.set("Cache-Control", `max-age=${HOUR}`);
  return response;
}
