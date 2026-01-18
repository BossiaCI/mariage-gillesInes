import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, MapPin, Users, Camera, Gift, Phone, Info, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import Navigation from "@/components/Navigation";
import { useAccueilBackgroundPhotos } from "@/hooks/useWeddingPhotos";
import Galerie from './Galerie';
const Index = () => {
  usePageTracking('accueil');
  const {
    photos: backgroundPhotos,
    getPhotoUrl
  } = useAccueilBackgroundPhotos();

  // Photo de background par défaut ou depuis la base de données
  const heroBackground = backgroundPhotos.find(photo => photo.is_featured) || backgroundPhotos[0];
  const defaultBackground = '';
  const backgroundImageUrl = heroBackground ? getPhotoUrl(heroBackground.file_path) : defaultBackground;
  return <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <Navigation currentPage="/" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('${backgroundImageUrl}')`
      }} />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-elegant max-w-4xl mx-auto">
            <h1 className="wedding-title text-primary mr-0 ml-0 mt-8 mb-8">Gilles Cédric</h1>
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-accent flex-1 max-w-20"></div>
              <Heart className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-20"></div>
            </div>
            <h1 className="wedding-title text-primary mb-8">Joëlle Inès</h1>
            
            <h2 className="wedding-subtitle text-accent mb-6">
              Mariage Civil & Religieux
            </h2>
            
            <div className="flex items-center justify-center mb-8">
              <MapPin className="mr-2 text-accent" size={20} />
              <span className="font-elegant text-xl">Assinie – Côte d'Ivoire</span>
            </div>
            
            <div className="flex items-center justify-center mb-8">
              <Calendar className="mr-2 text-accent" size={20} />
              <span className="font-elegant text-xl">14 Février 2026</span>
            </div>
            
            <p className="wedding-text max-w-3xl mx-auto mb-8 text-muted-foreground mr-3 ml-3 text-center">
              C'est avec reconnaissance envers Dieu que nous vous invitons à partager avec nous 
              un moment de grâce et de bénédiction à l'occasion de notre mariage civil et religieux, 
              qui se déroulera à Assinie. Nous rendrons grâce pour l'union que le Seigneur scelle 
              dans nos vies et serions honorés de votre présence à nos côtés.
            </p>
            
            <Link to="/rsvp">
              <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 elegant-gradient text-white font-body text-lg px-8 py-4 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 mr-0 ml-0">
                👉 Confirmer ma présence (RSVP)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="wedding-section bg-white/50">
        <div className="wedding-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/histoire">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Heart className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Notre Histoire</h3>
                  <p className="font-body text-sm text-muted-foreground">Découvrez notre parcours</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/programme">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Programme</h3>
                  <p className="font-body text-sm text-muted-foreground">Détail des célébrations</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/lieux">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MapPin className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Lieux & Accès</h3>
                  <p className="font-body text-sm text-muted-foreground">Comment nous rejoindre</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/hebergement">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Building2 className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Hébergement</h3>
                  <p className="font-body text-sm text-muted-foreground">Où séjourner à Assinie</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/infos">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Info className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Infos Pratiques</h3>
                  <p className="font-body text-sm text-muted-foreground">Bon à savoir</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/cadeaux">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Gift className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Cadeaux</h3>
                  <p className="font-body text-sm text-muted-foreground">Votre présence, est inestimable</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/galerie">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Camera className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Galerie</h3>
                  <p className="font-body text-sm text-muted-foreground">Notre bonheur partagé</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/contact">
              <Card className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Phone className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-title text-xl mb-2">Contacts</h3>
                  <p className="font-body text-sm text-muted-foreground">Nous contacter</p>
                </CardContent>
              </Card>
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
export default Index;