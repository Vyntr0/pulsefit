# PulseFit

A free, offline-first fitness app for iOS and Android (plus web), built with Expo / React Native.
All data is stored on the device. There are no accounts, no servers and no tracking.

## Features

- **Lift**: log sets (exercise, weight, reps), see today's volume, a 7-day volume chart, personal records and history.
- **Routines**: four guided routines (full body, core, cardio, stretch) with a work/rest interval timer. Pause, skip or stop at any time; finished routines are logged.
- **Run**: log distance, time and steps. Shows daily step goal progress, weekly totals, average pace and a 7-day distance chart.
- **Body**: log weight and waist, see the trend, BMI (rough guide only) and progress toward a goal weight.

## 1. Run it on your phone (free)

You need Node.js 20 or newer.

```bash
cd fitness-app
npm install
npx expo install --fix     # aligns package versions with the latest Expo SDK
npx expo start
```

Install **Expo Go** from the App Store / Google Play, then scan the QR code shown in the terminal.
Phone and computer must be on the same Wi-Fi.

To try it in a browser instead: `npx expo start --web`.

## 2. Publish for free: as a web app (no fees)

```bash
npx expo export --platform web
```

This creates a `dist/` folder. Upload it to any free static host:

- **Netlify**: drag and drop the `dist` folder at app.netlify.com/drop
- **Vercel**, **Cloudflare Pages** or **GitHub Pages** also work

People open the link on their phone and use "Add to Home Screen" for an app-like icon.

## 3. Publish to the app stores (not free)

Store listings need a developer account. These fees are set by Apple and Google, not by Expo:

| Store | Cost |
| --- | --- |
| Google Play | one-time US$25 |
| Apple App Store | US$99 per year |

Building the store files is free using Expo's EAS service (it has a limited free tier of builds):

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android   # makes an .aab for Google Play
eas build --platform ios       # needs the Apple developer account
eas submit --platform android
eas submit --platform ios
```

Before submitting:

1. In `app.json`, change `com.yourname.pulsefit` (both iOS `bundleIdentifier` and Android `package`) to your own unique ID.
2. Add an app icon (1024×1024 PNG) and set `"icon": "./assets/icon.png"` in `app.json`.
3. Write a short privacy policy (it can say the app stores data only on the device) and host it at a public URL. Both stores ask for one.
4. Prepare screenshots and a description for the store listing.

## Notes

- Units are metric (kg, cm, km).
- Steps are entered by hand. Automatic step counting would need Apple Health / Health Connect integration, which is a good next feature.
- This app is not medical advice. Check with a doctor before starting a new exercise program.
