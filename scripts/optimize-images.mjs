// Regenerates the favicons from the brand mark in assets-src/.
// Client logos for the work section live in public/images/work/logos/.
import sharp from "sharp";

await sharp("assets-src/favicon.png").resize(512).png().toFile("app/icon.png");
await sharp("assets-src/favicon.png").resize(180).png().toFile("app/apple-icon.png");
console.log("✓ favicons");
