import { config } from "@src/config.ts";

interface Tag {
  name: string;
}

function getRepoUrl(owner: string, repo: string): string {
  return [
    `https://api.github.com`,
    `repos`,
    encodeURIComponent(owner),
    encodeURIComponent(repo),
  ].join("/");
}

export async function getVersions(
  owner: string,
  repo: string,
): Promise<string[] | Response> {
  const url = `${getRepoUrl(owner, repo)}/tags`;

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

  const tags: Tag[] = await response.json();
  const names: string[] = tags.map((tag) => tag.name);
  return names;
}
