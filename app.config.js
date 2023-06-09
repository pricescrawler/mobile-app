import 'dotenv/config';

export default {
  "expo": {
    "name": "Price Crawler",
    "slug": "price-crawler",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#5893D4"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": false,
      "userInterfaceStyle": "automatic",
      "bundleIdentifier": "com.fdc2001.pricecrawler"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "userInterfaceStyle": "automatic",
      "package": "io.github.pricescrawler.mobile"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "fcf8532c-6bb7-497a-9e48-63df35d87d11"
      },
        "api": {
            "domain": process.env.API_DOMAIN
        },
        "sentry": {
          "enabled": process.env.SENTRY_ENABLED,
          "dsn": process.env.SENTRY_DSN
        }
    },
    "plugins": [
      "expo-localization"
    ]
  }
}
