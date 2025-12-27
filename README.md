# semver-version

Web service API for finding the latest release of a repo, from a semver range.

Similar to Matt Andrews'
[semver-as-a-service](https://github.com/matthew-andrews/semver-as-a-service).

## Usage

Make an HTTP `GET` request to an API endpoint, and get the relevant version as a
`text/plain` response.

### API Endpoints

#### Latest version

`GET https://semver-version.deno.dev/api/github/:owner/:repo`

Finds the latest git tag for a Github repo.

Examples:

```sh
curl -f https://semver-version.deno.dev/api/github/ziglang/zig
curl -f https://semver-version.deno.dev/api/github/denoland/fresh
```

#### Range

`GET https://semver-version.deno.dev/api/github/:owner/:repo/:range`

Finds the latest git tag for a Github repo, that satisfies a specified
[semantic Versioning range](https://devhints.io/semver).

Examples:

```sh
curl -f https://semver-version.deno.dev/api/github/ziglang/zig/0.8
curl -f https://semver-version.deno.dev/api/github/denoland/fresh/1
```

> When specifying a range, the range must be a valid semver range. It must also
> be correctly URI encoded.
>
> For example, the URI encoding of `>=0.7 <0.8` is `%3E%3D0.7%20%3C0.8`:
>
> ```js
> encodeURIComponent(">=0.7 <0.8");
> // "%3E%3D0.7%20%3C0.8"
> ```
>
> So to get the version of `ziglang/zig` that satisfies the range `>=0.7 <0.8`,
> you would do:
>
> ```sh
> curl -f https://semver-version.deno.dev/api/github/ziglang/zig/"%3E%3D0.7%20%3C0.8"
> ```
>
> ...and get:
>
> ```
> 0.7.1
> ```

## Contributing

### Local development

Start the project:

```
deno task dev
```

This will watch the project directory and restart as necessary.
