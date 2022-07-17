export const css = `
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    font-size: 2em;
    font-family: sans-serif;
  }

  a, a:visited {
    text-decoration: none;
  }

  a:active, a:hover {
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: #22272e;
    }
    a, a:visited, a:active, a:hover {
      color: rgb(83, 155, 245);
    }
  }

  @media (prefers-color-scheme: light) {
    body {
      background-color: #f9fbfc
    }
    a, a:visited, a:active, a:hover {
      color: rgb(9, 105, 218);
    }
  }
`.replaceAll(/\s/g, "");
