import { checkGithubRepoExists, getLatestReleaseInfo } from "./utils/mod.ts";
import { parseVersion } from "./utils/mod.ts";

export interface PluginResolver {
  versionPattern: URLPattern;
  getRedirectUrl(version: string): string;
  schemaVersionUrlPattern?: URLPattern;
  getSchemaUrl?(version: string): string;
}

// todo: this is very bad. We should deprecate this and standardize everything.
// Basically the plan would be to standardize to `plugin.wasm` in all the release assets
// then genenerate a file that has all the old mapping to new mapping urls based on the previous
// github releases. Then get rid of this complicated logic
export const pluginResolvers: PluginResolver[] = [{
  versionPattern: new URLPattern({ pathname: "/typescript-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    const parsedVersion = parseVersion(version);
    if (parsedVersion.lessThanEqual(parseVersion("0.44.0"))) {
      return `https://github.com/dprint/dprint-plugin-typescript/releases/download/${version}/typescript-${version}.wasm`;
    } else if (parsedVersion.lessThanEqual(parseVersion("0.62.1"))) {
      return `https://github.com/dprint/dprint-plugin-typescript/releases/download/${version}/typescript.wasm`;
    } else {
      return `https://github.com/dprint/dprint-plugin-typescript/releases/download/${version}/plugin.wasm`;
    }
  },
  schemaVersionUrlPattern: new URLPattern({ pathname: "/schemas/typescript-([0-9]+\.[0-9]+\.[0-9]+).json" }),
  getSchemaUrl(version) {
    return `https://github.com/dprint/dprint-plugin-typescript/releases/download/${version}/schema.json`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/json-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    const parsedVersion = parseVersion(version);
    if (parsedVersion.lessThanEqual(parseVersion("0.10.1"))) {
      return `https://github.com/dprint/dprint-plugin-json/releases/download/${version}/json-${version}.wasm`;
    } else if (parsedVersion.lessThanEqual(parseVersion("0.14.0"))) {
      return `https://github.com/dprint/dprint-plugin-json/releases/download/${version}/json.wasm`;
    } else {
      return `https://github.com/dprint/dprint-plugin-json/releases/download/${version}/plugin.wasm`;
    }
  },
  schemaVersionUrlPattern: new URLPattern({ pathname: "/schemas/json-([0-9]+\.[0-9]+\.[0-9]+).json" }),
  getSchemaUrl(version) {
    return `https://github.com/dprint/dprint-plugin-json/releases/download/${version}/schema.json`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/markdown-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    if (parseVersion(version).lessThanEqual(parseVersion("0.7.0"))) {
      return `https://github.com/dprint/dprint-plugin-markdown/releases/download/${version}/markdown-${version}.wasm`;
    } else {
      return `https://github.com/dprint/dprint-plugin-markdown/releases/download/${version}/markdown.wasm`;
    }
  },
  schemaVersionUrlPattern: new URLPattern({ pathname: "/schemas/markdown-([0-9]+\.[0-9]+\.[0-9]+).json" }),
  getSchemaUrl(version) {
    return `https://github.com/dprint/dprint-plugin-markdown/releases/download/${version}/schema.json`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/toml-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-toml/releases/download/${version}/toml.wasm`;
  },
  schemaVersionUrlPattern: new URLPattern({ pathname: "/schemas/toml-([0-9]+\.[0-9]+\.[0-9]+).json" }),
  getSchemaUrl(version) {
    return `https://github.com/dprint/dprint-plugin-toml/releases/download/${version}/schema.json`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/dockerfile-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-dockerfile/releases/download/${version}/dockerfile.wasm`;
  },
  schemaVersionUrlPattern: new URLPattern({ pathname: "/schemas/dockerfile-([0-9]+\.[0-9]+\.[0-9]+).json" }),
  getSchemaUrl(version) {
    return `https://github.com/dprint/dprint-plugin-dockerfile/releases/download/${version}/schema.json`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/sql-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-sql/releases/download/${version}/sql.wasm`;
  },
  schemaVersionUrlPattern: new URLPattern({ pathname: "/schemas/sql-([0-9]+\.[0-9]+\.[0-9]+).json" }),
  getSchemaUrl(version) {
    return `https://github.com/dprint/dprint-plugin-sql/releases/download/${version}/schema.json`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/rustfmt-([0-9]+\.[0-9]+\.[0-9]+).wasm" }),
  getRedirectUrl(version) {
    if (parseVersion(version).lessThanEqual(parseVersion("0.3.0"))) {
      return `https://github.com/dprint/dprint-plugin-rustfmt/releases/download/${version}/rustfmt-${version}.wasm`;
    } else {
      return `https://github.com/dprint/dprint-plugin-rustfmt/releases/download/${version}/rustfmt.wasm`;
    }
  },
}, {
  versionPattern: new URLPattern({ pathname: "/rustfmt-([0-9]+\.[0-9]+\.[0-9]+).exe-plugin" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-rustfmt/releases/download/${version}/rustfmt.exe-plugin`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/prettier-([0-9]+\.[0-9]+\.[0-9]+).exe-plugin" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-prettier/releases/download/${version}/prettier.exe-plugin`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/roslyn-([0-9]+\.[0-9]+\.[0-9]+).exe-plugin" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-roslyn/releases/download/${version}/roslyn.exe-plugin`;
  },
}, {
  versionPattern: new URLPattern({ pathname: "/yapf-([0-9]+\.[0-9]+\.[0-9]+).exe-plugin" }),
  getRedirectUrl(version) {
    return `https://github.com/dprint/dprint-plugin-yapf/releases/download/${version}/yapf.exe-plugin`;
  },
}];

export async function tryResolvePluginUrl(url: URL) {
  for (const plugin of pluginResolvers) {
    const version = plugin.versionPattern.exec(url)?.pathname.groups[0];
    if (version != null) {
      return plugin.getRedirectUrl(version);
    }
  }
  return await tryResolveUserWasmPlugin(url);
}

export async function tryResolveSchemaUrl(url: URL) {
  for (const plugin of pluginResolvers) {
    const version = plugin.schemaVersionUrlPattern?.exec(url)?.pathname.groups[0];
    if (version != null) {
      return plugin.getSchemaUrl?.(version);
    }
  }
  return await tryResolveUserSchemaJson(url);
}

// usernames may only contain alphanumeric and hypens
// repos may only contain alphanumeric, underscores, hyphens, and period
const userRepoPattern = "([A-Za-z0-9\-]+)/([A-Za-z0-9\-\._]+)";
const tagPattern = "([A-Za-z0-9\._]+)";
const userWasmPluginPattern = new URLPattern({
  pathname: `/${userRepoPattern}-${tagPattern}.wasm`,
});
const userSchemaPattern = new URLPattern({
  pathname: `/${userRepoPattern}/${tagPattern}/schema.json`,
});

function tryResolveUserWasmPlugin(url: URL) {
  return userRepoTagPatternMapper(userWasmPluginPattern, url, "plugin.wasm");
}

function tryResolveUserSchemaJson(url: URL) {
  return userRepoTagPatternMapper(userSchemaPattern, url, "schema.json");
}

const userLatestPattern = new URLPattern({
  pathname: `/${userRepoPattern}/latest.json`,
});
export async function tryResolveLatestJson(url: URL) {
  const result = userLatestPattern.exec(url);
  if (!result) {
    return undefined;
  }
  const username = result.pathname.groups[0];
  const shortRepoName = result.pathname.groups[1];
  const latestInfo = await getLatestInfo(username, shortRepoName);
  if (latestInfo == null) {
    return 404;
  }

  // include the bare minimum in case someone else wants to implement
  // this behaviour on their server
  return {
    schemaVersion: 1,
    url: latestInfo.url,
    version: latestInfo.version,
    checksum: latestInfo.checksum,
  };
}

export async function getLatestInfo(username: string, repoName: string) {
  repoName = await getFullRepoName(username, repoName);
  const releaseInfo = await getLatestReleaseInfo(username, repoName);
  if (releaseInfo == null) {
    return undefined;
  }
  const displayRepoName = repoName.replace(/^dprint-plugin-/, "");
  const extension = releaseInfo.kind === "wasm" ? "wasm" : "exe-plugin";

  // include the bare minimum in case someone else wants to implement
  // this behaviour on their server
  return {
    schemaVersion: 1,
    url: username === "dprint"
      ? `https://plugins.dprint.dev/${displayRepoName}-${releaseInfo.tagName}.${extension}`
      : `https://plugins.dprint.dev/${username}/${displayRepoName}-${releaseInfo.tagName}.${extension}`,
    version: releaseInfo.tagName.replace(/^v/, ""),
    checksum: releaseInfo.checksum,
  };
}

async function userRepoTagPatternMapper(
  pattern: URLPattern,
  url: URL,
  fileName: string,
) {
  const result = pattern.exec(url);
  if (result) {
    const username = result.pathname.groups[0];
    const repo = await getFullRepoName(username, result.pathname.groups[1]);
    const tag = result.pathname.groups[2];
    if (tag === "latest") {
      return `https://github.com/${username}/${repo}/releases/latest/download/${fileName}`;
    } else {
      return `https://github.com/${username}/${repo}/releases/download/${tag}/${fileName}`;
    }
  }
  return undefined;
}

async function getFullRepoName(username: string, repoName: string) {
  if (repoName.startsWith("dprint-plugin-")) {
    return repoName;
  }
  const fullName = `dprint-plugin-${repoName}`;
  if (await checkGithubRepoExists(username, fullName)) {
    return fullName;
  } else {
    return repoName;
  }
}
