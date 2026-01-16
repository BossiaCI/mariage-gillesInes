// src/lib/openMap.ts

export const openMapDirections = (
  lat: number,
  lng: number,
  provider: "auto" | "google" | "apple" | "waze" = "auto"
) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  let url = "";

  if (provider === "waze") {
    url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  } else if (provider === "google") {
    url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  } else if (provider === "apple" || isIOS) {
    url = `http://maps.apple.com/?daddr=${lat},${lng}`;
  } else {
    url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  window.open(url, "_blank");
};
