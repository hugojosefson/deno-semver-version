Deno.addSignalListener("SIGINT", () => {
  try {
    globalThis.close();
  } catch {
    Deno.exit(0);
  }
});

export default {
  fetch(req: Request): Response {
    const url = new URL(req.url);
    return Response.redirect(
      `https://semver.se.deno.net${url.pathname}${url.search}`,
      301,
    );
  },
};
