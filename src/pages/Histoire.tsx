import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleNavigation from "@/components/SimpleNavigation";
import { useCouplePhotos } from "@/hooks/useWeddingPhotos";

const Histoire = () => {
  const { photos: couplePhotos, getPhotoUrl } = useCouplePhotos();
  
  // Photo pour la page Notre Histoire
  const couplePhoto = couplePhotos[0]; // Premier résultat de la sous-catégorie couple
  
  const defaultCoupleImage = '';
  const coupleImageUrl = couplePhoto ? getPhotoUrl(couplePhoto.file_path) : defaultCoupleImage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/histoire" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Notre Histoire
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Heart className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="w-full rounded-2xl mb-8 overflow-hidden">
                  <img
                    src={coupleImageUrl}
                    alt="Couple"
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                <div className="text-center">
                  <p className="wedding-text text-lg leading-relaxed text-muted-foreground mb-8">
                    Guidés par la foi, nous avons appris à marcher ensemble, à nous soutenir 
                    et à grandir dans l'amour et le respect.
                  </p>
                  
                  <p className="wedding-text text-lg leading-relaxed text-muted-foreground">
                    Aujourd'hui, nous choisissons de nous engager devant Dieu, nos familles 
                    et nos proches, convaincus que l'amour véritable se construit dans la 
                    patience, la fidélité et la prière.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="wedding-section bg-white/50">
        <div className="wedding-container text-center">
          <h2 className="wedding-subtitle text-primary mb-8">
            Rejoignez-nous pour célébrer notre union
          </h2>
          <Link to="/rsvp">
            <Button className="elegant-gradient text-white font-body text-lg px-8 py-4 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              Confirmer ma présence
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="wedding-container text-center">
          <div className="font-title text-2xl mb-4">Gilles Cédric & Joelle Inès</div>
          <p className="font-body text-sm opacity-80">14 Février 2026 • Assinie, Côte d'Ivoire</p>
        </div>
      </footer>
    </div>
  );
};

export default Histoire;