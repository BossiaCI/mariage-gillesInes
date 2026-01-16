import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationConfig } from "@/config/locations";
import { MapPickerSheet } from "@/components/MapPickerSheet";
import { MapPreview } from "@/components/MapPreview";
import { useToast } from "@/hooks/use-toast";

type Props = {
  location: LocationConfig;
  icon: React.ReactNode;
};

export function LocationCard({ location, icon }: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleOpen = () => {
    toast({
      title: "Ouvrir dans Maps",
      description: "Choisissez votre application de navigation",
    });
    setOpen(true);
  };

  return (
    <>
      <Card
        onClick={handleOpen}
        className="
          group cursor-pointer select-none
          shadow-elegant bg-white/80 backdrop-blur-sm
          transition-all duration-300
          hover:scale-[1.03] hover:shadow-xl
          gold-glow
        "
      >
        <CardHeader className="text-center">
          <div
            className="
              bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4
              flex items-center justify-center
              transition-transform duration-300
              group-hover:scale-110 group-hover:rotate-6
            "
          >
            {icon}
          </div>

          <CardTitle className="font-title text-xl">
            {location.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="font-elegant text-lg mb-2">
            {location.description}
          </p>
          <p className="text-sm text-muted-foreground">
            {location.time}
          </p>

          <MapPreview lat={location.lat} lng={location.lng} />

          <p className="mt-3 text-xs text-accent">
            📍 Appuyer pour l’itinéraire
          </p>
        </CardContent>
      </Card>

      <MapPickerSheet
        open={open}
        onOpenChange={setOpen}
        location={location}
      />
    </>
  );
}
