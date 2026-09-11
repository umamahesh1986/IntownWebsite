# IntownWebsite (Web SPA) — PRD

## Overview
React 18 SPA (CRA + CRACO + Framer Motion) for INtown, a hyperlocal commerce platform.
Frontend-only in this container; it calls the client's LIVE backend at `https://api.intownlocal.com/IN`.
No local backend / DB is used. Runs via supervisor `yarn start` (craco) on port 3000.

## Source
Pulled from `https://gitlab.com/uma.menda/intownwebsite` (public) into `/app/frontend`.
API base URLs are hardcoded in `src` (no `.env` needed for data).

## Architecture
- Routes (react-router v7): /, /formerchants, /forcustomers, /upgrades, /howitworks, /about, etc.
- Merchant & Customer registration via `src/components/Modal.js`.
- Live external APIs: categories, products, S3 upload, merchant/customer registration, payment (Razorpay).

## Implemented
- 2026-06: Repo pulled in and running in dev mode (screenshot verified home + merchant modal).
- 2026-06: **Merchant Growth Pack + Razorpay joining-fee payment** added to Merchant Registration
  (`Modal.js` + new `GrowthPack.css`), ported 1:1 from the INtown mobile app:
  - Two one-time plans: START ₹499 (+18% GST → ₹588.82), LAUNCH ₹999 (+GST → ₹1178.82, recommended/default).
  - Pay flow: `POST /payment/create-order` → dynamic `checkout.js` Razorpay web checkout → `POST /payment/verify`.
  - Gating: Pay button enables after Business Name + Contact + Category; on successful verify,
    the "I agree to terms" checkbox unlocks and "Register Merchant" enables.
  - Registration payload extended with growthPack, joiningFee, joiningFeePaid, razorpay{PaymentId,OrderId,Signature}.
  - Razorpay key comes from backend `keyId`; live fallback `rzp_live_RrNfvARmKIkZ7C` (LIVE — real charges).

## Notes / Risks
- Uses a LIVE Razorpay key + live backend; end-to-end payment was NOT auto-tested to avoid real charges.
- Registration/category APIs are called directly from the browser (depend on backend CORS for this origin).

## Backlog / Next
- P1: Manual real-money smoke test of pay → verify → register on staging or with a test key.
- P2: Show selected plan + payment id on the success modal.
- P2: Handle backend `subscriptionPlan` enum mapping if backend later requires it for joining fee.

## 2026-06 — Location Picker map fix
- Bug: Google Map in the merchant "Select Business Location" picker not loading.
- Root cause: `BillingNotEnabledMapError` — hardcoded Maps API key had no billing.
- Fix: key moved to `REACT_APP_GOOGLE_MAPS_API_KEY` (frontend/.env), referenced via
  `%REACT_APP_GOOGLE_MAPS_API_KEY%` in public/index.html; new billing-enabled key supplied by user.
- Verified by testing_agent (iteration_1.json): map + tiles render, marker/confirm work, no map errors. 100% pass.
- Optional follow-ups: show formatted address (not lat/lng) on confirm; migrate deprecated Marker/SearchBox; add HTTP-referrer restrictions to the key.

## 2026-06 — /download store redirect (QR target)
- QR code points to www.intownlocal.com/download.
- Download.js: added APP_STORE_URL; getMobileStoreUrl() detects iOS/Android from userAgent;
  useEffect auto-redirects mobile visitors (window.location.replace) — iOS->App Store, Android->Play.
- Fixed App Store button (was href="/Home") -> App Store URL; fixed Play Store rel typo; CTA is device-aware.
- Store URLs: App Store https://apps.apple.com/in/app/intownlocal/id6766092424 ; Play https://play.google.com/store/search?q=intown&c=apps&hl=en_IN
- Verified by testing_agent iteration_2.json: 100% (desktop no-redirect + correct hrefs; iOS/Android emulated redirects). 
- NOTE: QR uses the PRODUCTION domain, so this must be deployed/committed to production for the QR to use the new behavior.

## 2026-06 — Location map broke on local (regression) — fixed
- Cause: Maps key was read from %REACT_APP_GOOGLE_MAPS_API_KEY% (frontend/.env). .env is NOT committed to git,
  so on the user's local `git clone` + npm start the key was empty -> "Oops! This page didn't load Google Maps correctly".
- Fix: hardcoded the billing-enabled key (AIzaSyBTPqSDYbyIbJZetJ8Shd_DOqywUJN55AA) directly in public/index.html
  so it works on any clone with no .env.
- Verified by testing_agent iteration_3.json: 100% — map loads in BOTH merchant (/formerchants) and customer (/forcustomers) pickers.
- Follow-up (recommended): add HTTP-referrer restrictions to the key in Google Cloud (allow localhost:3000 + www.intownlocal.com);
  migrate deprecated SearchBox/Marker to PlaceAutocompleteElement/AdvancedMarkerElement.
