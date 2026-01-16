import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowLeft, Church, Building, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleNavigation from "@/components/SimpleNavigation";

const Programme = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/programme" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Le Programme des Célébrations
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Calendar className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Content */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Vendredi 13 février */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-accent/10 to-primary-light/20 rounded-t-lg">
                <CardTitle className="font-title text-2xl text-primary">
                  Vendredi 13 Février 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <MapPin className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-title text-lg text-primary mb-2">Arrivée des invités</h3>
                      <p className="wedding-text text-muted-foreground">
                        • Arrivée des familles, ami(e)s, invités, prestataires à Assinie<br/>
                        • Installation libre
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Samedi 14 février */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-accent/10 to-primary-light/20 rounded-t-lg">
                <CardTitle className="font-title text-2xl text-primary">
                  Samedi 14 Février 2026
                </CardTitle>
                <p className="font-elegant text-accent">Le Grand Jour</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  
                  {/* Mariage Civil */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <Building className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-title text-xl text-primary mb-2">Mariage Civil</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="text-accent" size={16} />
                          <span className="wedding-text">10H à 10H30</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="text-accent" size={16} />
                          <span className="wedding-text">MAIRIE ASSINIE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Séance Photo */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <TreePine className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-title text-xl text-primary mb-2">Séance Photo</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="text-accent" size={16} />
                          <span className="wedding-text">10H50 à 12H10</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="text-accent" size={16} />
                          <span className="wedding-text">Jardin KM17</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mariage Religieux */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <Church className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-title text-xl text-primary mb-2">Mariage Religieux</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="text-accent" size={16} />
                          <span className="wedding-text">13H à 14H</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="text-accent" size={16} />
                          <span className="wedding-text">Église catholique d'Assinie</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Réception */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <TreePine className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-title text-xl text-primary mb-2">Réception</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="text-accent" size={16} />
                          <span className="wedding-text">14H</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="text-accent" size={16} />
                          <span className="wedding-text">Jardin KM17</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dimanche 15 février */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-accent/10 to-primary-light/20 rounded-t-lg">
                <CardTitle className="font-title text-2xl text-primary">
                  Dimanche 15 Février 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <Church className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-title text-lg text-primary mb-2">Messe d'Action de Grâce</h3>
                      <div className="flex items-center space-x-4 mb-2">
                        <Clock className="text-accent" size={16} />
                        <span className="wedding-text">10H</span>
                      </div>
                      <div className="flex items-center space-x-4 mb-4">
                        <MapPin className="text-accent" size={16} />
                        <span className="wedding-text">Saint Thérèse de l'Enfant Jésus d'Assinie</span>
                      </div>
                      <p className="wedding-text text-muted-foreground">
                        • Moment convivial / détente<br/>
                        • Départ progressif des invités
                      </p>
                    </div>
                  </div>
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
            Réservez ces dates dans votre agenda
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

export default Programme;