# TODO

## CORS / Registration Failure
- [x] Identify registration flow:
  - Frontend calls `POST /api/auth/register`
  - Backend controller is `AuthController` at `/api/auth/register`
- [x] Identify likely cause from error: CORS preflight blocked missing `Access-Control-Allow-Origin`
- [x] Confirm Vite proxy exists:
  - `FrontEnd/vite.config.js` already proxies `/api` -> `http://localhost:8080`
- [ ] Run/verify steps:
  - [ ] Restart Vite dev server after confirming proxy config is active
  - [ ] Ensure browser devtools shows request URL is `/api/auth/register` (not `http://localhost:8080/api/auth/register`)
  - [ ] Re-attempt registration and confirm CORS error disappears

