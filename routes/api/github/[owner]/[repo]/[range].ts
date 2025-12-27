import { HandlerContext } from "$fresh/src/server/types.ts";
import { maxSatisfying, Range } from "semver";
import { createGetVersions } from "@src/providers/github.ts";
import { VersionsResponse } from "@src/providers/versions-response.ts";

const RELEASE_REPOS = [
  "denoland/deno",
  "docker/compose",
];

/**
 * Responds with the latest tag for the repo.
 */
export async function handler(
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const { owner, repo, range } = ctx.params;

  const getVersions = RELEASE_REPOS.includes(`${owner}/${repo}`)
    ? createGetVersions("releases")
    : createGetVersions("tags");

  const versionsOrResponse = await getVersions(owner, repo);
  if (versionsOrResponse instanceof Response) {
    return versionsOrResponse;
  }
  const { versions, headers }: VersionsResponse = versionsOrResponse;

  try {
    const semverRange = new Range(decodeURIComponent(range), { loose: true });
    const version: string | null = maxSatisfying(
      versions,
      semverRange,
      { loose: true },
    );
    if (typeof version === "string") {
      return new Response(version, { headers });
    }

    return new Response(null, { status: 404, headers });
  } catch (error) {
    if (error instanceof TypeError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(error.message, { status: 500 });
  }
}
