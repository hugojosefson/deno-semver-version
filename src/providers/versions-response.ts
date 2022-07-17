export interface VersionsResponseHeaders {
  "cache-control": null | string;
  "last-modified": null | string;
}

export interface VersionsResponse {
  versions: string[];
  headers: VersionsResponseHeaders;
}
