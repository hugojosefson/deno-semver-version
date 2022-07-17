/** @jsx h */
import { h } from "preact";

const css = `
main {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  font-size: 1.5em;
  font-family: sans-serif;
}`;

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
