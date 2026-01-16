import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ArrowLeft, MessageCircle, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleNavigation from "@/components/SimpleNavigation";
import { useContactPhotos } from "@/hooks/useWeddingPhotos";
const Contact = () => {
  const { photos: contactPhotos, getPhotoUrl } = useContactPhotos();
  
  // Photo pour la page contact (sous-catégorie 'contact')
  const contactPhoto = contactPhotos[0]; // Premier résultat de la sous-catégorie contact
  
  const defaultContactImage = '';
  const contactImageUrl = contactPhoto ? getPhotoUrl(contactPhoto.file_path) : defaultContactImage;
  return <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/contact" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Contact
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Phone className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            <p className="wedding-text text-muted-foreground max-w-2xl mx-auto">
              Pour toute question liée à l'organisation, vous pouvez nous contacter. 
              Nous serons ravis de vous aider et de répondre à vos interrogations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-4xl mx-auto">
            
            {/* Main Contact Card */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm mb-12">
              <CardHeader className="text-center">
                <div className="w-full h-48 bg-cover bg-center rounded-2xl mb-6" style={{
                backgroundImage: `url('${contactImageUrl}')`
              }} />
                <CardTitle className="font-title text-2xl text-primary">
                  Nous Contacter
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Contact Gilles */}
                  <div className="text-center">
                    <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="text-accent" size={24} />
                    </div>
                    <h3 className="font-title text-xl text-primary mb-4">Gilles Cédric</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="text-accent" size={16} />
                        <span className="wedding-text">(+225) 0747944946</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle className="text-accent" size={16} />
                        <span className="wedding-text">WhatsApp disponible</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="text-accent" size={16} />
                        <span className="wedding-text">Kossonougillescedric@yahoo.fr</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Joelle */}
                  <div className="text-center">
                    <div className="bg-accent/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="text-accent" size={24} />
                    </div>
                    <h3 className="font-title text-xl text-primary mb-4">
                      Joelle Inès
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="text-accent" size={16} />
                        <span className="wedding-text">(+225) 0708735312</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle className="text-accent" size={16} />
                        <span className="wedding-text">WhatsApp disponible</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="text-accent" size={16} />
                        <span className="wedding-text">joelleineslele@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Relais */}
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm mb-12">
              <CardHeader className="text-center">
                <CardTitle className="font-title text-xl text-primary">
                  Contact Relais Organisation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <div className="bg-accent/10 p-6 rounded-2xl">
                  <h4 className="font-elegant text-lg text-primary mb-3">Famille Kossonou & Famille Lele</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="text-accent" size={16} />
                      <span className="wedding-text">(+225) 0747944946</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MessageCircle className="text-accent" size={16} />
                      <span className="wedding-text">WhatsApp : (+225) 0747944946</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Times to Contact */}
            <Card className="shadow-elegant bg-accent/10 border-accent/20">
              <CardContent className="p-8 text-center">
                <h3 className="font-title text-xl text-primary mb-4">
                  📞 Meilleurs Moments pour Nous Joindre
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-elegant text-lg text-primary mb-2">En Semaine</h4>
                    <p className="wedding-text text-muted-foreground">
                      Lundi à Vendredi : 18h - 21h
                    </p>
                  </div>
                  <div>
                    <h4 className="font-elegant text-lg text-primary mb-2">Weekend</h4>
                    <p className="wedding-text text-muted-foreground">
                      Samedi & Dimanche : 10h - 20h
                    </p>
                  </div>
                </div>
                <p className="wedding-text text-sm text-muted-foreground mt-4">
                  N'hésitez pas à nous laisser un message si nous ne répondons pas immédiatement !
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
            Une question ? N'hésitez pas !
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/infos">
              <Button variant="outline" className="font-body px-6 py-3">
                Voir la FAQ
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
export default Contact;