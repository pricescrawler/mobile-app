# Prices Crawler - Mobile App

## 💻 Description

Android application for the [prices-crawler](https://github.com/prices-crawler)
ecosystem. It wraps the deployed
[web-app](https://github.com/prices-crawler/web-app) in a native WebView with
connectivity handling (offline detection + retry screen).

- **Application id:** `io.github.pricescrawler.mobile`
- **Min SDK:** 26 (Android 8.0) · **Target SDK:** 36

## 📁 Requirements

| # | Name                | Value        |
|---|---------------------|--------------|
| 1 | `JDK`               | `17+`        |
| 2 | `Android SDK`       | API 36       |
| 3 | `Gradle` (wrapper)  | included     |

## 🕹️ Getting Started

```bash
# Debug build
./gradlew assembleDebug

# Release bundle (requires signing configuration, see below)
./gradlew bundleRelease
```

### Build Configuration

The server URL is injected at build time:

| # | Name                                | Type   | Description                        |
|---|-------------------------------------|--------|------------------------------------|
| 1 | `PRICES_CRAWLER_SERVER_URL_DEBUG`   | env    | Web app URL for debug builds       |
| 2 | `PRICES_CRAWLER_SERVER_URL_RELEASE` | env    | Web app URL for release builds     |
| 3 | `prices.crawler.server.url.debug`   | Gradle property | Fallback for #1           |
| 4 | `prices.crawler.server.url.release` | Gradle property | Fallback for #2           |

### Release Signing

Release builds are signed with a keystore resolved from the environment:

| # | Name                | Description                              |
|---|---------------------|------------------------------------------|
| 1 | `KEYSTORE_PASSWORD` | Keystore password                        |
| 2 | `KEY_ALIAS`         | Signing key alias                        |
| 3 | `KEY_PASSWORD`      | Signing key password                     |

The keystore file is expected at `$HOME/keystore/upload-keystore.jks`.

## 🔗 Related Documentation

- [Ecosystem documentation](https://github.com/prices-crawler/documentation) —
  architecture, operations and roadmap.
