import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { openMapDirections } from "@/lib/openMap";
import { LocationConfig } from "@/config/locations";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: LocationConfig;
};

export function MapPickerSheet({ open, onOpenChange, location }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="mb-6 text-center">
          <SheetTitle className="font-title text-xl">
            Ouvrir l’itinéraire
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {location.title}
          </p>
        </SheetHeader>

        <div className="grid gap-3">
          <Button
            onClick={() => openMapDirections(location.lat, location.lng, "google")}
            variant="outline"
          >
            Google Maps
          </Button>

          <Button
            onClick={() => openMapDirections(location.lat, location.lng, "apple")}
            variant="outline"
          >
            Apple Maps
          </Button>

          <Button
            onClick={() => openMapDirections(location.lat, location.lng, "waze")}
            className="bg-accent text-white hover:bg-accent/90"
          >
            Waze
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
