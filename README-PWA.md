PWA & Play Store (TWA) instructions

What I added:
- manifest.json (points to icons/icon-192.png and icons/icon-512.png)
- sw.js (simple cache-first service worker)
- index.html updated to link the manifest and provide theme-color
- index.js registers the service worker on window load

Next steps to publish to Play Store (Trusted Web Activity / TWA):

Option A — Quick: use Bubblewrap (TWA)
1. Install bubblewrap CLI (requires Node.js and Java):
   npm install -g @bubblewrap/cli
2. Create a directory for the Android project and initialize:
   bubblewrap init --manifest https://your-site-url/manifest.json
   # when developing locally, you can host the project with a local server and use a temporary URL
3. Build the project and generate APK/AAB:
   bubblewrap build
4. Sign and publish the generated AAB/APK via Google Play Console.

Notes: Bubblewrap expects your site to be served over HTTPS and have a valid manifest + service worker.

Option B — Use Capacitor (bundles web assets into native app)
1. Install Capacitor in project (Node.js required):
   npm init -y
   npm install @capacitor/core @capacitor/cli --save
2. Initialize Capacitor:
   npx cap init
   # follow prompts (app id like com.example.todo, app name)
3. Add Android platform:
   npx cap add android
4. Copy web assets and open Android Studio:
   npx cap copy
   npx cap open android
5. Build an Android release APK/AAB in Android Studio and publish.

Notes on icons:
- Put two icon files in `icons/` (192x192 and 512x512). You can use online generators to create the icons.

Local testing
- Run a local server (from project root):
  python -m http.server 8000
  start http://localhost:8000
- Open Chrome DevTools -> Application -> Manifest to verify.

If you want, I can:
- Add placeholder SVG icons to `icons/` (as .svg) so you can test installs, or
- Walk you through bubblewrap commands and prepare the project manifest for TWA, or
- Implement the Capacitor setup files (package.json and Capacitor init) so you can run `npx cap add android` locally.

Which path do you prefer? Reply in Telugu if you like.