## GitHub Copilot Chat

- Extension Version: 0.31.0 (prod)
- VS Code: vscode/1.104.0
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.116.6 (18 ms)
- DNS ipv6 Lookup: Error (13 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (180 ms)
- Node.js https: HTTP 200 (169 ms)
- Node.js fetch: HTTP 200 (149 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.21 (11 ms)
- DNS ipv6 Lookup: Error (26 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (8 ms)
- Electron fetch (configured): HTTP 200 (80 ms)
- Node.js https: HTTP 200 (260 ms)
- Node.js fetch: HTTP 200 (268 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).