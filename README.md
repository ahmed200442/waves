# WAVE Messenger

WAVE is an Android-first native React Native / Expo messenger prototype with a dark neon visual identity and Arabic RTL interface.

## Build APK
GitHub Actions builds a release APK on pushes to `main` and through manual workflow dispatch. After a successful run, download the `WAVE-Messenger-APK` artifact from the workflow run.

## Prototype features in v1.5.0
- Local demo chat and BUZZ / MEGA BUZZ messages
- Friends discovery demo screen
- Eight interactive local room seats with simulated mic state
- Local anonymous-confession demo
- Local announcement and demo alarm controls

## Important limitations
These screens are client-side demonstrations. Messages, friends, seats, confessions, announcements, and alarm state are not synchronized across devices. The mic control does not capture or stream live audio. The demo admin screen is not an authenticated administrative console. Do not use this prototype to store sensitive or real user information.

The uploaded Python file was used as a feature reference only; its SQLite server and insecure authentication logic were not copied into the Android app. Production work still requires a secure backend, real authentication and authorization, persistent storage, moderation safeguards, and WebRTC/TURN for voice rooms.
