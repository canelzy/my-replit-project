# Domain Configuration - Canada Access Hub

## Current Domain
**Primary Domain**: `https://canada-services-hub-canelzy.replit.app`

## Updated References
✅ **Privacy Policy**: Updated to new domain  
✅ **Android Manifest**: Updated for TWA deep linking  
✅ **Documentation**: Domain references updated

## Domain Changes Made

### From:
- `canadaaccesshub.giolynx.org` 
- `your-domain.replit.app` (placeholder)

### To:
- `canada-services-hub-canelzy.replit.app`

## Files Updated
1. `client/src/pages/privacy.tsx` - Privacy policy contact information
2. `android/app/src/main/AndroidManifest.xml` - Android deep linking configuration

## Automatic Domain Handling
Most app functionality uses relative URLs and `window.location.origin`, so it automatically adapts to any domain where the app is deployed.

## For Deployment
- **Replit**: App will automatically work on the new domain
- **Custom Domain**: Can be configured in Replit settings
- **Android TWA**: Configured for deep linking to the primary domain

## Notes
- Service worker and other components use relative URLs
- No hardcoded domains in core functionality
- PWA manifest uses relative paths for maximum portability