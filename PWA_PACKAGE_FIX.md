# PWA Package Name Fix
## Correcting PWABuilder Package Detection

### Problem
PWABuilder was detecting a generic package name instead of your custom identifier.

### Solution Applied
Updated Web Manifest with specific package identifier:

#### Changed Manifest Fields:
1. **App ID**: Changed from `"canada-services-hub"` to `"ca.canelzy.govservices"`
2. **Start URL**: Added PWA tracking parameter `"/?source=pwa"`
3. **Prefer Related Applications**: Set to `false` to force PWA generation
4. **Display Override**: Added `["standalone"]` for better PWA behavior

### PWA Package Detection Now:
**Expected Package**: `ca.canelzy.govservices`

The manifest `id` field directly controls how PWABuilder generates the package name. By setting it to `ca.canelzy.govservices`, PWABuilder should now detect and use this as the Android package identifier.

### Testing PWA Detection:
1. Visit PWABuilder: https://www.pwabuilder.com/
2. Enter URL: `https://canada-services-hub-canelzy.replit.app`
3. Check detected package name should now be: `ca.canelzy.govservices`

### Manifest Location:
- **File**: `client/public/manifest.webmanifest`
- **URL**: `https://canada-services-hub-canelzy.replit.app/manifest.webmanifest`

### Benefits:
- **Consistent Package**: Same package name across PWA and custom Android
- **Professional**: Your own package identifier instead of generic
- **Control**: Direct specification of package name in manifest
- **Tracking**: PWA source tracking with start URL parameter

PWABuilder should now correctly detect `ca.canelzy.govservices` as your package identifier.