# Original image assets

All raster artwork in `public/assets/images` was created for this implementation with OpenAI's built-in ImageGen workflow. It does not reproduce manufacturer badges, text, license plates, or watermarks.

## Final generation briefs

### Hero vehicle

> Photorealistic charcoal late-1960s grand touring coupe, elegant long hood and low fastback silhouette, three-quarter front view, subtle chrome, premium automotive studio lighting, isolated on a perfectly flat solid magenta chroma-key background, no driver, no logos, no badges, no license-plate text, no watermark.

The magenta background was removed locally to produce the transparent `hero-car.webp` fallback.

### Collection vehicles

> Create three distinct, unbranded late-1960s collector cars in black, deep red, and forest green. Editorial studio photograph, dramatic three-quarter angle, authentic period proportions, soft directional light, subtle floor reflection, clean dark-to-neutral background, no people, logos, badges, readable plate text, captions, or watermark.

Outputs: `car-black.webp`, `car-red.webp`, and `car-green.webp`.

### Service imagery

> Create a cohesive set of cinematic, premium classic-car service photographs: an enclosed transporter carrying a vintage coupe at golden hour; a careful specialist inspection of a classic car in a refined workshop; and discreet collector-car financing represented by documents and keys on a dark desk. Warm vintage palette, documentary editorial lighting, no visible brands, readable text, captions, or watermark.

Outputs: `service-shipping.webp`, `service-warranty.webp`, and `service-financing.webp`.

Mode: new image generation, followed by local transparency cleanup for the hero fallback only.

The final delivery uses high-quality WebP encoding to reduce the complete image set from roughly 14 MB to under 1 MB while retaining the original dimensions and transparency.
