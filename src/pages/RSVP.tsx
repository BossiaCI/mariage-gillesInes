import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Send, Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePageTracking } from "@/hooks/usePageTracking";
import SimpleNavigation from "@/components/SimpleNavigation";
import { useRSVPBackgroundPhotos } from "@/hooks/useWeddingPhotos";
const RSVP = () => {
  usePageTracking('rsvp');
  const {
    photos: backgroundPhotos,
    getPhotoUrl
  } = useRSVPBackgroundPhotos();

  // Photo de background pour RSVP (sous-catégorie 'rsvp')
  const rsvpBackground = backgroundPhotos[0]; // Premier résultat de la sous-catégorie RSVP

  const defaultBackground = '';
  const backgroundImageUrl = rsvpBackground ? getPhotoUrl(rsvpBackground.file_path) : defaultBackground;
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    nombrePersonnes: "",
    mariageCivil: false,
    mariageReligieux: false,
    reception: false,
    message: "",
    email: "",
    telephone: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Validation basique
      if (!formData.nom.trim() || !formData.nombrePersonnes) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
      if (!formData.mariageCivil && !formData.mariageReligieux && !formData.reception) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner au moins un événement.",
          variant: "destructive"
        });
        return;
      }

      // Insérer dans Supabase
      const {
        error
      } = await supabase.from('rsvp_confirmations_2026_01_07_15_22').insert({
        nom: formData.nom.trim(),
        nombre_personnes: parseInt(formData.nombrePersonnes),
        mariage_civil: formData.mariageCivil,
        mariage_religieux: formData.mariageReligieux,
        reception: formData.reception,
        message: formData.message.trim() || null,
        email: formData.email.trim() || null,
        telephone: formData.telephone.trim() || null
      });
      if (error) {
        console.error('Erreur Supabase:', error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
          variant: "destructive"
        });
        return;
      }

      // Succès
      toast({
        title: "Confirmation reçue !",
        description: "Merci pour votre confirmation ! Nous avons bien reçu votre réponse."
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        nombrePersonnes: "",
        mariageCivil: false,
        mariageReligieux: false,
        reception: false,
        message: "",
        email: "",
        telephone: ""
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/rsvp" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Confirmation de Présence
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Heart className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            <p className="wedding-subtitle text-accent mb-4">
              RSVP
            </p>
            <p className="wedding-text text-muted-foreground max-w-2xl mx-auto font-normal">
              Afin de nous permettre d’organiser les cérémonies dans les meilleures conditions, nous vous saurions gré de bien vouloir confirmer votre présence <strong>au plus tard le 7 Février 2026</strong>.
            </p>
            <p>Nous vous remercions sincèrement pour votre compréhension et votre collaboration.</p>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-full h-48 bg-cover bg-center rounded-2xl mb-6" style={{
                backgroundImage: `url('${backgroundImageUrl}')`
              }} />
                <CardTitle className="font-title text-2xl text-primary">
                  Formulaire de Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom et Prénom */}
                  <div>
                    <Label htmlFor="nom" className="font-body text-primary">
                      Nom et Prénom *
                    </Label>
                    <Input id="nom" type="text" required value={formData.nom} onChange={e => setFormData({
                    ...formData,
                    nom: e.target.value
                  })} className="mt-2" placeholder="Votre nom complet" />
                  </div>

                  {/* Nombre de personnes */}
                  <div>
                    <Label htmlFor="nombrePersonnes" className="font-body text-primary">
                      Nombre de personnes *
                    </Label>
                    <Input id="nombrePersonnes" type="number" min="1" required value={formData.nombrePersonnes} onChange={e => setFormData({
                    ...formData,
                    nombrePersonnes: e.target.value
                  })} className="mt-2" placeholder="Nombre total d'invités" />
                  </div>

                  {/* Email (optionnel) */}
                  <div>
                    <Label htmlFor="email" className="font-body text-primary">
                      Email (optionnel)
                    </Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} className="mt-2" placeholder="votre.email@exemple.com" />
                  </div>

                  {/* Téléphone (optionnel) */}
                  <div>
                    <Label htmlFor="telephone" className="font-body text-primary">
                      Téléphone (optionnel)
                    </Label>
                    <Input id="telephone" type="tel" value={formData.telephone} onChange={e => setFormData({
                    ...formData,
                    telephone: e.target.value
                  })} className="mt-2" placeholder="+225 XX XX XX XX XX" />
                  </div>

                  {/* Présence aux événements */}
                  <div>
                    <Label className="font-body text-primary mb-4 block">
                      Présence aux événements *
                    </Label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox id="mariageCivil" checked={formData.mariageCivil} onCheckedChange={checked => setFormData({
                        ...formData,
                        mariageCivil: checked as boolean
                      })} />
                        <Label htmlFor="mariageCivil" className="font-body">
                          Mariage Civil (10H - 10H30)
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Checkbox id="mariageReligieux" checked={formData.mariageReligieux} onCheckedChange={checked => setFormData({
                        ...formData,
                        mariageReligieux: checked as boolean
                      })} />
                        <Label htmlFor="mariageReligieux" className="font-body">
                          Mariage Religieux (13H - 14H)
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Checkbox id="reception" checked={formData.reception} onCheckedChange={checked => setFormData({
                        ...formData,
                        reception: checked as boolean
                      })} />
                        <Label htmlFor="reception" className="font-body">
                          Réception (à partir de 14H)
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Message libre */}
                  <div>
                    <Label htmlFor="message" className="font-body text-primary">
                      Message libre
                    </Label>
                    <Textarea id="message" value={formData.message} onChange={e => setFormData({
                    ...formData,
                    message: e.target.value
                  })} className="mt-2" placeholder="Vos félicitations, questions ou messages particuliers..." rows={4} />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button type="submit" disabled={isSubmitting} className="elegant-gradient text-white font-body text-lg px-8 py-4 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? <>
                          <Loader2 className="mr-2 animate-spin" size={20} />
                          Envoi en cours...
                        </> : <>
                          <Send className="mr-2" size={20} />
                          Envoyer ma confirmation
                        </>}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
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
export default RSVP;