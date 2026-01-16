import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdminSignup = () => {
  const { toast } = useToast();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);

    try {
      if (!signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs.",
          variant: "destructive",
        });
        return;
      }

      if (signupForm.password !== signupForm.confirmPassword) {
        toast({
          title: "Erreur",
          description: "Les mots de passe ne correspondent pas.",
          variant: "destructive",
        });
        return;
      }

      if (signupForm.password.length < 6) {
        toast({
          title: "Erreur",
          description: "Le mot de passe doit contenir au moins 6 caractères.",
          variant: "destructive",
        });
        return;
      }

      // Vérifier si l'email est autorisé
      const allowedEmails = ['admin@mariage-gilles-joelle.com', 'gilles.admin@gmail.com', 'joelle.admin@gmail.com'];
      if (!allowedEmails.includes(signupForm.email)) {
        toast({
          title: "Accès refusé",
          description: "Cet email n'est pas autorisé pour l'administration.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          emailRedirectTo: `${window.location.origin}/#/admin`
        }
      });

      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Inscription réussie",
          description: "Vérifiez votre email pour confirmer votre compte, puis connectez-vous.",
        });
        
        // Réinitialiser le formulaire
        setSignupForm({
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-soft">
        <div className="wedding-container">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="font-title text-2xl text-primary">
              KGC & JIL
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  Se connecter
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2" size={16} />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Card className="shadow-elegant bg-white/80 backdrop-blur-sm max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="font-title text-2xl text-primary">
              Inscription Administrateur
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="wedding-text text-muted-foreground mb-6 text-center text-sm">
              Créez un compte administrateur pour gérer le site de mariage.
            </p>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-body text-primary">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="mt-2"
                  placeholder="admin@exemple.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Seuls certains emails sont autorisés pour l'administration.
                </p>
              </div>
              
              <div>
                <Label htmlFor="password" className="font-body text-primary">
                  Mot de passe *
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  className="mt-2"
                  placeholder="Minimum 6 caractères"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="font-body text-primary">
                  Confirmer le mot de passe *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                  className="mt-2"
                  placeholder="Répétez votre mot de passe"
                />
              </div>
              
              <div className="text-center pt-4">
                <Button 
                  type="submit"
                  disabled={isSigningUp}
                  className="elegant-gradient text-white font-body px-6 py-3 rounded-full w-full disabled:opacity-50"
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={16} />
                      Inscription...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2" size={16} />
                      S'inscrire
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Déjà un compte ?{' '}
                <Link to="/admin" className="text-accent hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSignup;