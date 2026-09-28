/*
  Artwork for a service that no project photo shows well. Drop an image named
  ev-charging.jpg (jpg/png/webp) into src/assets/services/ and it replaces the
  fallback photo on the home page and Areas of Expertise.
*/
const files = import.meta.glob<string>("/src/assets/services/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export type ServiceArt = "ev-charging";

export function serviceImage(name: ServiceArt): string | undefined {
  const hit = Object.entries(files).find(([path]) => {
    const file = path.split("/").pop() ?? "";
    return file.slice(0, file.lastIndexOf(".")) === name;
  });
  return hit?.[1];
}
