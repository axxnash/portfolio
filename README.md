# Abinash Rajasagaram — Portfolio

A responsive, dark portfolio built with HTML, CSS, and JavaScript. No application dependencies or build step are required. All fonts, illustrations, the portrait, and the resume are included locally.

## Run locally

From this directory, run `npm run dev` and visit `http://127.0.0.1:4173`.

## Edit

- `dist/index.html`: page content, navigation, project cards, education, and contact links.
- `dist/styles.css`: layout, colors, typography, responsive styles, and animation.
- `dist/app.js`: project details, filters, dialogs, mobile navigation, and motion preferences.
- `dist/assets/`: portrait, original resume PDF, project illustrations, fonts, and licenses.

The `dist` directory can be served by any static web host. `.openai/hosting.json` identifies the private Sites publication.

## Content and assets

Portfolio facts come from the supplied resume. Project preview illustrations are clearly labeled interface or research concepts, not product screenshots. The mushroom forecasting project is marked in development. No professional employment, live project demos, or performance results are invented.

`dist/assets/abinash-3d.png` was created with built-in image generation using the supplied character sheet. It is a transparent 3D-style raster portrait with CSS depth and motion, not a rigged or rotatable 3D model.

Final portrait prompt: Preserve the reference portrait's likeness, wavy black hair, medium brown skin, facial hair, expression, folded-arm pose, clothing, camera angle and framing. Render as a premium stylized 3D character with sculpted facial forms, softly shaded skin, sculpted hair, rounded fabric, and Blender/Octane-style lighting. Maintain natural adult proportions, warm face lighting, and a subtle lime rim. Use a fully transparent background. Keep hair, shoulders, forearms and elbows visible. No text, floor, scenery, props, watermark, or UI.

Manrope and DM Sans are self-hosted under their included SIL Open Font Licenses.

## Interactions and accessibility

Includes project category filters, keyboard-accessible native dialogs, an accessible mobile menu, a resume download, email links, clipboard feedback with a selectable-text fallback, a skip link, visible focus styles, reduced-motion support, and a persistent motion toggle.
