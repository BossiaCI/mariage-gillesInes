import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, ArrowLeft, Phone, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleNavigation from "@/components/SimpleNavigation";

const Hebergement = () => {


  const lodges: string[] = [
                            "AFRICAN QUEEN LODGE",
                            "ASSINIE LODGE",
                            "COUCOUE LODGE",
                            "HOTEL VILLA BLANCA",
                            "PAMPA BEACH",
                            "JADE-ASSINIE",
                            "MAISON D’AKOULA",
                            "EHOTILE LODGE",
                            "BLUE SKY ABISSA LODGE",
                            "SWEET HOME HOTEL",
                          ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/hebergement" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Hébergement à Assinie
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Hotel className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            <p className="wedding-text text-muted-foreground max-w-3xl mx-auto">
              Afin de faciliter votre séjour, nous vous proposons ci-dessous quelques options 
              d'hébergement à Assinie et dans ses environs. Les réservations restent à la charge des invités.
            </p>
          </div>
        </div>
      </section>

      {/* Accommodation Options */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Hôtels recommandés */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Hotel className="text-accent" size={24} />
                </div>
                <CardTitle className="font-title text-xl text-primary text-center">
                  Hôtels Recommandés
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="p-4 bg-sand/30 rounded-lg">
                  <h4 className="font-elegant text-lg mb-2">
                    <ul className="space-y-2">
                      {lodges.map((lodge: string) => (
                        <li key={lodge} className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span className="font-elegant text-lg">{lodge}</span>
                        </li>
                      ))}
                    </ul>
                  </h4>

                </div>
              </CardContent>
            </Card>

            {/* Villas / Résidences */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="text-accent" size={24} />
                </div>
                <CardTitle className="font-title text-xl text-primary text-center">
                  Villas / Résidences
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="p-4 bg-sand/30 rounded-lg">
                  {/*<h4 className="font-elegant text-lg mb-2">Villas privées</h4>*/}
                  <p className="wedding-text text-sm text-muted-foreground mb-2">
                    Pour toutes informations sur les villas, résidences et appartements privées à louer,
                  </p>
                  <p className="wedding-text text-xs text-accent">
                    Idéal pour familles nombreuses
                  </p>
                </div>
                
                <div className="p-4 bg-sand/30 rounded-lg">
                  <h4 className="font-elegant text-lg mb-2">Contactez M. SACKO :</h4>
                  <p className="wedding-text text-sm text-muted-foreground mb-2">
                    (+225) 07 87 22 22 59
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contacts utiles */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="text-accent" size={24} />
                </div>
                <CardTitle className="font-title text-xl text-primary text-center">
                  Contacts Utiles
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="p-4 bg-sand/30 rounded-lg">
                  <h4 className="font-elegant text-lg mb-2">KOSSONOU SYDNEY</h4>
                  <p className="wedding-text text-sm text-muted-foreground">
                    (+225) 07 88 32 37 54
                  </p>
                </div>
                
                <div className="p-4 bg-sand/30 rounded-lg">
                  <h4 className="font-elegant text-lg mb-2">KOSSONOU FRANCK</h4>
                  <p className="wedding-text text-sm text-muted-foreground">
                    (+225) 07 88 32 04 07
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Note */}
          <Card className="shadow-elegant bg-accent/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="font-title text-xl text-primary mb-4">
                ⚠️ Note Importante
              </h3>
              <p className="wedding-text text-muted-foreground">
                Les capacités étant limitées en période de weekend, nous vous conseillons 
                de <strong>réserver le plus tôt possible</strong> pour garantir votre hébergement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="wedding-section bg-white/50">
        <div className="wedding-container text-center">
          <h2 className="wedding-subtitle text-primary mb-8">
            Hébergement réservé ?
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

export default Hebergement;