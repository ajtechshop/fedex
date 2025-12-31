# Development Context | In-house Shipment Management

This project is a specialized utility for **AJ TECH** to generate FedEx-compatible shipment manifest CSVs.

## Architecture Overview
- **Vite & React (TypeScript)**: Modern, type-safe development environment.
- **Tailwind CSS & Radix UI**: Enterprise-grade components and styling.
- **Framer Motion**: Smooth, premium animations.
- **CSV Engine**: Custom logic in `client/src/lib/csv.ts` that handles escaping and formatting.

## Business Logic
- **Dimensions**: Input in inches (in). Logistics logic automatically rounds up (ceil) decimal dimensions to the next whole number for transport safety.
- **Weight**: Tracking in pounds (lbs).
- **Volume Calculation**: UI displays volume in **Cubic Feet (ft³)** to assist with load planning.
  - Formula: `(L * W * H) / 1728`
- **Global Reference**: A single SO/INV number is applied to all items in a batch.

## Deployment & URL Configuration
To achieve the requested URL structure:
1. **GitHub Repository**: Deploy these files to a repository named `ajtechshop.github.io`.
2. **Resulting URLs**:
   - Hub: `https://ajtechshop.github.io/`
   - FedEx: `https://ajtechshop.github.io/fedex`
3. **Deployment Command**:
   ```bash
   npm run deploy
   ```
   *Note: The `vite.config.ts` is set with `base: '/'` to support this root domain.*

## Special Handling: SPA Refresh Fix
Since GitHub Pages doesn't natively support Single Page Apps (SPAs) with sub-routing, we use a two-part fix:
1. `404.html`: A fallback page that captures the requested URL and redirects to the index.
2. `index.html`: A script in the `<head>` that parses the redirect and restores the correct route in the browser history.

## Future Development Notes (For Agents)
- **Persistence**: Consider adding IndexedDB support if multi-day sessions are required.
- **API Integration**: The backend endpoint structure exists in the repo but is currently unused, as the app is fully client-side for maximum speed and security.
- **Validation**: Strict logistics validation is handled in `validateForm` inside `Home.tsx`.
