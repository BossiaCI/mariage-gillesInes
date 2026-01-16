import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, ArrowLeft, Shirt, Sun, Baby, Car } from "lucide-react";
import SimpleNavigation from "@/components/SimpleNavigation";
import { Link } from "react-router-dom";

const Infos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/infos" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Informations Pratiques
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Info className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            <p className="wedding-subtitle text-accent">
              Questions Fréquentes
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="font-title text-2xl text-primary">
                  FAQ - Foire Aux Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  
                  {/* Dress Code */}
                  <AccordionItem value="dress-code" className="border border-accent/20 rounded-lg px-4">
                    <AccordionTrigger className="font-elegant text-lg text-primary hover:text-accent">
                      <div className="flex items-center">
                        <Shirt className="mr-3 text-accent" size={20} />
                        Y a-t-il un dress code ?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <p className="wedding-text text-muted-foreground">
                        Une tenue élégante est recommandée pour les cérémonies. 
                        Privilégiez des couleurs claires et des tissus légers adaptés au climat tropical. 
                        Des informations complémentaires seront communiquées si nécessaire.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Cérémonies extérieures */}
                  <AccordionItem value="outdoor" className="border border-accent/20 rounded-lg px-4">
                    <AccordionTrigger className="font-elegant text-lg text-primary hover:text-accent">
                      <div className="flex items-center">
                        <Sun className="mr-3 text-accent" size={20} />
                        Les cérémonies sont-elles en extérieur ?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <p className="wedding-text text-muted-foreground">
                        Certaines étapes se dérouleront en extérieur, notamment la réception dans le jardin. 
                        Merci de prévoir une tenue adaptée au soleil et éventuellement un chapeau ou une ombrelle. 
                        Des espaces ombragés seront disponibles.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Enfants */}
                  <AccordionItem value="children" className="border border-accent/20 rounded-lg px-4">
                    <AccordionTrigger className="font-elegant text-lg text-primary hover:text-accent">
                      <div className="flex items-center">
                        <Baby className="mr-3 text-accent" size={20} />
                        Les enfants sont-ils conviés ?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <p className="wedding-text text-muted-foreground">
                        Oui, les enfants sont les bienvenus ! Merci de nous prévenir à l'avance 
                        lors de votre confirmation de présence pour que nous puissions prendre 
                        les dispositions pratiques nécessaires (chaises hautes, menu enfant, etc.).
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Transport */}
                  <AccordionItem value="transport" className="border border-accent/20 rounded-lg px-4">
                    <AccordionTrigger className="font-elegant text-lg text-primary hover:text-accent">
                      <div className="flex items-center">
                        <Car className="mr-3 text-accent" size={20} />
                        Y aura-t-il un service de transport ?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <p className="wedding-text text-muted-foreground">
                        Oui, un service de transport sera organisé pour faciliter les déplacements 
                        entre les différents lieux (mairie, église, lieu de réception). 
                        Les détails vous seront communiqués plus près de la date.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Tips */}
      <section className="wedding-section bg-white/50">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="font-title text-2xl text-primary">
                  Conseils Supplémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Sun className="text-accent" size={24} />
                    </div>
                    <h3 className="font-elegant text-lg text-primary mb-2">Protection Solaire</h3>
                    <p className="wedding-text text-sm text-muted-foreground">
                      N'oubliez pas votre crème solaire et un chapeau pour la réception en extérieur.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Car className="text-accent" size={24} />
                    </div>
                    <h3 className="font-elegant text-lg text-primary mb-2">Arrivée</h3>
                    <p className="wedding-text text-sm text-muted-foreground">
                      Prévoyez d'arriver la veille pour profiter pleinement du weekend.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="wedding-section">
        <div className="wedding-container text-center">
          <h2 className="wedding-subtitle text-primary mb-8">
            D'autres questions ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline" className="font-body px-6 py-3">
                Nous contacter
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

export default Infos;