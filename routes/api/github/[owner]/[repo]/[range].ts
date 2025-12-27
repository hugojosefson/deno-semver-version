import { maxSatisfying, Range } from "semver";
import { createGetVersions } from "@/src/providers/github.ts";
import { VersionsResponse } from "@/src/providers/versions-response.ts";
import { State } from "@/utils.ts";
import { Context } from "fresh";

const RELEASE_REPOS = [
  "denoland/deno",
  "docker/compose",
];

/**
 * Responds with the latest tag for the repo.
 */
export async function handler(ctx: Context<State>): Promise<Response> {
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
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Unknown error", { status: 500 });
  }
}
