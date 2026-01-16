type Props = {
  lat: number;
  lng: number;
};

export function MapPreview({ lat, lng }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border shadow-sm mt-4">
      <iframe
        title="Map preview"
        className="w-full h-48"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${lat},${lng}&hl=fr&z=15&output=embed`}
      />
    </div>
  );
}
