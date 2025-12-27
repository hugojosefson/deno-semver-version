import { config } from "@/src/config.ts";
import { VersionsResponse } from "./versions-response.ts";

interface TagOrRelease {
  name: string;
  tag_name?: string;
}

function getRepoUrl(owner: string, repo: string): string {
  return [
    "https://api.github.com",
    "repos",
    encodeURIComponent(owner),
    encodeURIComponent(repo),
  ].join("/");
}
export function createGetVersions(type: "tags" | "releases") {
  return async function getVersions(
    owner: string,
    repo: string,
  ): Promise<VersionsResponse | Response> {
    const url = `${getRepoUrl(owner, repo)}/${type}`;

    const token = config.github.token;
    const requestInit: RequestInit = {
      method: "GET",
      headers: token ? { authorization: `token ${token}` } : {},
    };

    const response = await fetch(url, requestInit);
    if (!response.ok) {
      if (response.status === 404) {
        return new Response(null, { status: 404 });
      }
      return response;
    }

    const tags: TagOrRelease[] = await response.json();
    const versions: string[] = tags.map((tag) => tag.tag_name ?? tag.name);
    const cacheControl = response.headers.get("cache-control");
    const lastModified = response.headers.get("last-modified");
    return {
      versions,
      headers: {
        ...(cacheControl ? { "cache-control": cacheControl } : {}),
        ...(lastModified ? { "last-modified": lastModified } : {}),
      },
    };
  };
}
