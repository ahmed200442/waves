# WAVE Messenger

WAVE is an Android-first neon messenger prototype built with Expo and React Native.

## Build APK
A GitHub Actions workflow builds a release APK on pushes to `main` and through manual workflow dispatch. After a successful run, download `WAVE-Messenger-APK` from the workflow's Artifacts.

## Current scope
This repository currently provides a native UI prototype with local demo messages. Real multi-user messaging, Supabase persistence, voice rooms, push notifications, and production moderation must be integrated and tested before public release.

The Android splash resource was fixed in version 1.4.1 (versionCode 6); the next workflow run will verify the release build.
