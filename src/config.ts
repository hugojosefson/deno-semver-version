export const config = {
  github: {
    token: Deno.env.get("GITHUB_TOKEN") as string | undefined,
  },
} as const;
