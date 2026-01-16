import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, Car, Clock, Navigation, CameraIcon, ChurchIcon, Building2Icon, CakeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleNavigation from "@/components/SimpleNavigation";
import { useLieuxPhotos } from "@/hooks/useWeddingPhotos";
import { locations } from "@/config/locations";
import { LocationCard } from "@/components/LocationCard";

const Lieux = () => {
  const { photos: lieuxPhotos, getPhotoUrl } = useLieuxPhotos();
  
  // Photo pour la page Lieux & Accès
  const lieuxPhoto = lieuxPhotos[0]; // Premier résultat de la sous-catégorie lieux
  
  const defaultLieuxImage = '';
  const lieuxImageUrl = lieuxPhoto ? getPhotoUrl(lieuxPhoto.file_path) : defaultLieuxImage;
  return <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/lieux" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Lieux & Accès
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <MapPin className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            <p className="wedding-subtitle text-accent">Assinie KM 17.5</p>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-full rounded-2xl mb-8 overflow-hidden">
                  <img
                    src={lieuxImageUrl}
                    alt="Couple"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="wedding-text text-lg text-muted-foreground mb-4">
                  Assinie est située à environ 100 km d'Abidjan.
                </p>
                <p className="wedding-text text-muted-foreground">
                  Nous vous recommandons de prévoir votre déplacement à l'avance 
                  afin d'arriver sereinement le jour des cérémonies.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <LocationCard
              location={locations.find((l) => l.id === "civil")!}
              icon={<Building2Icon className="text-accent" size={24} />}
            />

            <LocationCard
              location={locations.find((l) => l.id === "photo")!}
              icon={<CameraIcon className="text-accent" size={24} />}
            />

            <LocationCard
              location={locations.find((l) => l.id === "religious")!}
              icon={<ChurchIcon className="text-accent" size={24} />}
            />

            <LocationCard
              location={locations.find((l) => l.id === "reception")!}
              icon={<CakeIcon className="text-accent" size={24} />}
            />
          </div>
          {/* Practical Advice */}
          <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="font-title text-2xl text-primary flex items-center justify-center">
                <Car className="mr-3 text-accent" size={28} />
                Conseil Pratique
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="mr-2 text-accent" size={20} />
                <span className="font-elegant text-lg">Départ recommandé</span>
              </div>
              <p className="wedding-text text-muted-foreground">
                Un départ tôt depuis Abidjan est conseillé, notamment le samedi matin, 
                pour arriver à temps pour la cérémonie civile à 10H.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="wedding-section bg-white/50">
        <div className="wedding-container text-center">
          <h2 className="wedding-subtitle text-primary mb-8">
            Prêt à nous rejoindre à Assinie ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hebergement">
              <Button variant="outline" className="font-body px-6 py-3">
                Voir l'hébergement
              </Button>
            </Link>
            <Link to="/rsvp">
              <Button className="elegant-gradient text-white font-body px-8 py-3 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                Confirmer ma présence
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="wedding-container text-center">
          <div className="font-title text-2xl mb-4">Gilles Cédric & Joelle Inès</div>
          <p className="font-body text-sm opacity-80">14 Février 2026 • Assinie, Côte d'Ivoire</p>
        </div>
      </footer>
    </div>;
};
export default Lieux;