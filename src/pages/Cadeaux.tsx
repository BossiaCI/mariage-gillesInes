import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeft, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleNavigation from "@/components/SimpleNavigation";
import { useCadeauxPhotos } from "@/hooks/useWeddingPhotos";

const Cadeaux = () => {
  const { photos: cadeauxPhotos, getPhotoUrl } = useCadeauxPhotos();
  
  // Photo pour la page Cadeaux
  const cadeauxPhoto = cadeauxPhotos[0]; // Premier résultat de la sous-catégorie cadeaux
  
  const defaultCadeauxImage = '';
  const cadeauxImageUrl = cadeauxPhoto ? getPhotoUrl(cadeauxPhoto.file_path) : defaultCadeauxImage;
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/cadeaux" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Cadeaux
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Gift className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto">
            
            {/* Main Message */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm mb-12">
              <CardContent className="p-12 text-center">
                <div 
                  className="w-full h-64 bg-cover bg-center rounded-2xl mb-8"
                  style={{
                    backgroundImage: `url('${cadeauxImageUrl}')`
                  }}
                />
                
                <div className="flex items-center justify-center mb-8">
                  <Heart className="text-accent" size={32} />
                </div>
                
                <h2 className="wedding-subtitle text-primary mb-6">
                  Votre présence à nos côtés est déjà un immense cadeau
                </h2>
                
                <p className="wedding-text text-lg text-muted-foreground mb-8 leading-relaxed">
                  Le plus beau cadeau que vous puissiez nous offrir est de partager avec nous 
                  cette journée si spéciale. Votre amour, vos sourires et votre présence 
                  rendront ce moment encore plus précieux.
                </p>
                
                <div className="bg-accent/10 p-6 rounded-2xl">
                  <p className="font-elegant text-lg text-primary">
                    "L'amour ne se mesure pas aux cadeaux, mais aux moments partagés"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Optional Gift Options */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Liste de Mariage */}
              <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Gift className="text-accent" size={24} />
                  </div>
                  <CardTitle className="font-title text-xl text-primary">
                    Liste de Mariage
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <p className="wedding-text text-muted-foreground mb-6">
                    Pour toute personne souhaitant offrir un présent au couple, nous vous prions de bien vouloir vous signaler via cet espace, afin de permettre une meilleure prise en compte et une organisation harmonieuse.
                  </p>
                  <p>Nous vous remercions sincèrement pour votre attention et votre générosité.</p>
                  
                </CardContent>
              </Card>

              {/* Cagnotte */}
              <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="text-accent" size={24} />
                  </div>
                  <CardTitle className="font-title text-xl text-primary">
                    Don
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <p className="wedding-text text-muted-foreground mb-6">
                    Dans le cadre de l’organisation de notre union, toute personne désireuse d’apporter <strong>un don, qu’il soit physique ou financier</strong>, est cordialement invitée à prendre contact pour l’enregistrement et la coordination.
                  </p>
                  <p>Contact dédié :</p>
                  <strong>Lele Deborah - (+225) 07 09 77 79 61</strong>
                </CardContent>
              </Card>
            </div>

            {/* Thank You Message */}
            <Card className="shadow-elegant bg-accent/10 border-accent/20 mt-12">
              <CardContent className="p-8 text-center">
                <h3 className="font-title text-2xl text-primary mb-4">
                  Merci du fond du cœur
                </h3>
                <p className="wedding-text text-muted-foreground">
                  Votre geste, quel qu’il soit, sera accueilli avec une profonde reconnaissance et contribuera à rendre ce moment encore plus mémorable.
Merci du fond du cœur pour votre soutien et votre générosité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="wedding-section bg-white/50">
        <div className="wedding-container text-center">
          <h2 className="wedding-subtitle text-primary mb-8">
            Prêt à célébrer avec nous ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programme">
              <Button variant="outline" className="font-body px-6 py-3">
                Voir le programme
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
    </div>
  );
};

export default Cadeaux;