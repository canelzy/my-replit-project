# App Icon Update Guide - Canada Services Hub

## Current Icon Design
The app now uses a professional Canada Access Hub icon with:
- **Red background** with Canadian maple leaf
- **Clean white circle** design
- **"Canada Access Hub" text** for clear identification
- **Professional appearance** suitable for app stores

## Updated Icon Files

### PWA/Web Icons (client/public/icons/)
- `icon-192x192-updated.png` - Standard 192x192 icon
- `icon-512x512-updated.png` - High resolution 512x512 icon  
- `icon-192x192-maskable-updated.png` - Maskable 192x192 for adaptive icons
- `icon-512x512-maskable-updated.png` - Maskable 512x512 for adaptive icons

### Android Icons (android/app/src/main/res/)
Android requires multiple icon sizes for different screen densities:
- `mipmap-mdpi/` - 48x48px (baseline)
- `mipmap-hdpi/` - 72x72px (1.5x)
- `mipmap-xhdpi/` - 96x96px (2x)
- `mipmap-xxhdpi/` - 144x144px (3x)
- `mipmap-xxxhdpi/` - 192x192px (4x)

## Manifest Updates
Updated `manifest.webmanifest` to reference the new icon files for:
- PWA installation on mobile devices
- App icon in browser bookmarks
- Splash screen generation

## Android Configuration
The Android project is configured to use standard Android icon naming:
- `ic_launcher.png` - Standard app icon
- `ic_launcher_round.png` - Round app icon for newer Android versions

## Icon Generation Tools
Created `scripts/generate-icons.html` for:
- Viewing current icon design
- Generating additional icon sizes if needed
- Downloading icons in various formats

## Design Elements
The icon represents:
- **Canadian Identity** - Maple leaf and flag colors
- **Government Services** - Professional, trustworthy design
- **Accessibility** - High contrast, clear text
- **Brand Recognition** - Consistent with app name and purpose

## For Google Play Store
The updated icons are optimized for:
- **Play Store listing** - High resolution, clear design
- **Device compatibility** - Multiple density support
- **Android guidelines** - Proper sizing and format
- **User recognition** - Clear app identification

## Next Steps for Android
1. Open Android Studio with the `android/` project
2. Replace the generated icon placeholders with actual icon files
3. Use Android Studio's Image Asset Studio to generate all density versions
4. Build and test the app to verify icon appearance