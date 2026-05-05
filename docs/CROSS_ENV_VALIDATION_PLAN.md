# GoxStream Cross-Environment API Validation Protocol

Objective: Perform a side-by-side comparison of API responses between Local (http://localhost:3000) and Production (https://GoxStream.pages.dev) to validate the effectiveness of the SSL/CA translation layer and build optimizations.

## Target Endpoints
The following endpoints will be verified for status code, content integrity, and database connectivity:

| Feature | Endpoint | Expected Result |
| :--- | :--- | :--- |
| **Database** | `/api/anime/trending` | List of anime from PostgreSQL |
| **Search** | `/api/anime/search?q=solo` | Search results for "solo" |
| **Config** | `/api/settings/public` | Public app settings JSON |
| **Auth** | `/api/auth/me` | User status (401 or null user) |
| **Slugs** | `/api/anime/solo-leveling` | Full detail for Solo Leveling |

## Execution Strategy
1. **Environment A (Local)**: Utilize the running Nuxt dev server on port 3000.
2. **Environment B (Production)**: Access the live `GoxStream.pages.dev` deployment.
3. **Observation**: Compare if the Production environment still suffers from the 500 handshake error or if it has been stabilized by the new translator.

## Success Criteria
- [x] `localhost:3000` returns valid data for all endpoints.
- [/] `GoxStream.pages.dev` (Waiting for redeployment of latest code).
- [x] No SSL/CA malformation errors are visible in logs/responses.
