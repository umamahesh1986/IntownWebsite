# IntownWebsite — PRD / Work Log

## Overview
React 18 SPA (CRACO + Framer Motion) marketing/registration site for INtown, a hyperlocal commerce platform. Pulled from GitHub `github.com/umamahesh1986/IntownWebsite` (main). FastAPI backend scaffold exists but registration/payment use external LIVE APIs at `api.intownlocal.com`.

## Architecture
- Frontend: CRA/CRACO, per-component CSS, react-router-dom v7, framer-motion. Served HTTPS via `REACT_APP_BACKEND_URL`.
- Backend (`/app/backend/server.py`): FastAPI `/api` scaffold (status endpoints) + MongoDB. NOT used for merchant/customer registration.
- External LIVE integrations (not Emergent-managed):
  - Registration: `https://api.intownlocal.com/IN/merchant/` and `/customer/`
  - Payment: Razorpay (LIVE key `rzp_live_...`) via `https://api.intownlocal.com/IN/payment/create-order` + `/verify`
  - Categories/products: `https://api.intownlocal.com/IN/...`
  - Image upload (BROKEN host, unresolved DNS): `in-town-dev...elasticbeanstalk.com/in-town/v1/s3/upload`

## Work done
- 2026-06: Pulled latest `main` from GitHub, mirrored into /app (preserved .env + node_modules), installed deps, ran dev server. Site renders and runs.
- 2026-06: **Bug fix — Merchant Registration failing after payment.** Root cause: registration/upload called over `http://` from an HTTPS page → browser blocked as **Mixed Content** → fetch failed after successful payment. Fix: switched `merchant/`, `customer/`, and S3 upload URLs to `https://` in `frontend/src/components/Modal.js`. Verified by testing agent (iteration_1): HTTPS POST reaches API with CORS, old http:// is Chrome-blocked.
- 2026-06: Fixed dead 409 handling in `handleSubmit` — duplicate phone (HTTP 409) now shows a clear "phone already registered" message instead of generic "Registration failed".

## Known issues / backlog
- P1: Payment is taken BEFORE duplicate-phone check → user can pay then hit 409 ("paid but not registered"). Add a pre-payment phone check before opening Razorpay (needs a check endpoint from API owner).
- P2: S3 image-upload host does not resolve; store images never upload (registration still succeeds). Needs a working https upload endpoint under api.intownlocal.com.
- P2: Hardcoded URLs should derive from `INTOWN_API_BASE`/env to avoid protocol drift.
- P3: Modal.js (~1700 lines) could be split; console.log prints PII/payment ids in prod.
- Data: category->products mapping returns wrong items for some categories (external data).

## Notes
- Payment uses a LIVE Razorpay gateway and LIVE production DB — full end-to-end payment→registration cannot be automated in testing.
