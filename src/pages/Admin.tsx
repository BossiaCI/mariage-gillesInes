import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Calendar, BarChart3, Eye, CheckCircle, Clock, LogIn, Loader2, RefreshCw, Image, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import PhotoManager from "@/components/PhotoManager";
import InvitationManager from "@/components/InvitationManager";
import PagePhotosOverview from "@/components/PagePhotosOverview";

interface RSVPConfirmation {
  id: string;
  nom: string;
  nombre_personnes: number;
  mariage_civil: boolean;
  mariage_religieux: boolean;
  reception: boolean;
  message: string | null;
  email: string | null;
  telephone: string | null;
  created_at: string;
}

interface PageVisit {
  id: string;
  page_name: string;
  visit_count: number;
  last_visited: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [rsvpData, setRsvpData] = useState<RSVPConfirmation[]>([]);
  const [pageStats, setPageStats] = useState<PageVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Timeout pour éviter le chargement infini
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Auth timeout, showing login form');
        setLoading(false);
        setIsAuthenticated(false);
      }
    }, 5000);

    initAuth();

    return () => clearTimeout(timeout);
  }, []);

  const initAuth = async () => {
    try {
      console.log('Checking authentication...');
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session error:', error);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (session?.user) {
        console.log('User found:', session.user.email);
        setIsAuthenticated(true);
        
        // Charger les données en arrière-plan
        loadData();
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${session.user.email}`,
        });
      } else {
        console.log('No session found');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth init error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    setDataLoading(true);
    try {
      console.log('Loading admin data...');
      
      // Charger les données en parallèle avec timeout
      const [rsvpResult, pageResult] = await Promise.allSettled([
        Promise.race([
          supabase
            .from('rsvp_confirmations_2026_01_07_15_22')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50), // Limiter pour améliorer les performances
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('RSVP query timeout')), 10000)
          )
        ]),
        Promise.race([
          supabase
            .from('page_visits_2026_01_07_15_22')
            .select('*')
            .order('visit_count', { ascending: false }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Page stats query timeout')), 10000)
          )
        ])
      ]);

      // Traiter les résultats RSVP
      if (rsvpResult.status === 'fulfilled' && rsvpResult.value.data) {
        setRsvpData(rsvpResult.value.data);
        console.log('RSVP data loaded:', rsvpResult.value.data.length, 'records');
      } else {
        console.error('RSVP load failed:', rsvpResult.status === 'rejected' ? rsvpResult.reason : 'No data');
        setRsvpData([]);
      }

      // Traiter les résultats des statistiques de pages
      if (pageResult.status === 'fulfilled' && pageResult.value.data) {
        setPageStats(pageResult.value.data);
        console.log('Page stats loaded:', pageResult.value.data.length, 'records');
      } else {
        console.error('Page stats load failed:', pageResult.status === 'rejected' ? pageResult.reason : 'No data');
        setPageStats([]);
      }

    } catch (error) {
      console.error('Load data error:', error);
      toast({
        title: "Erreur de chargement",
        description: "Certaines données n'ont pas pu être chargées.",
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      if (!loginForm.email || !loginForm.password) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs.",
          variant: "destructive",
        });
        return;
      }

      console.log('Attempting sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        console.log('Sign in successful');
        setLoginForm({ email: '', password: '' });
        setIsAuthenticated(true);
        loadData();
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${data.user.email}`,
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setRsvpData([]);
    setPageStats([]);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  const refreshData = () => {
    if (isAuthenticated) {
      loadData();
    }
  };

  // Calculs des statistiques
  const totalRSVP = rsvpData.length;
  const totalPersonnes = rsvpData.reduce((sum, rsvp) => sum + rsvp.nombre_personnes, 0);
  const civilCount = rsvpData.filter(rsvp => rsvp.mariage_civil).length;
  const religiousCount = rsvpData.filter(rsvp => rsvp.mariage_religieux).length;
  const receptionCount = rsvpData.filter(rsvp => rsvp.reception).length;
  const totalVisits = pageStats.reduce((sum, page) => sum + page.visit_count, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light flex items-center justify-center">
        <div className="text-center">
          <Clock className="mx-auto mb-4 text-accent animate-spin" size={48} />
          <p className="wedding-text mb-4">Vérification de l'authentification...</p>
          <p className="text-sm text-muted-foreground">Si cela prend trop de temps, actualisez la page</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-soft">
          <div className="wedding-container">
            <div className="flex items-center justify-between py-4">
              <Link to="/" className="font-title text-2xl text-primary">
                KGC & JIL
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2" size={16} />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-24 min-h-screen flex items-center justify-center">
          <Card className="shadow-elegant bg-white/80 backdrop-blur-sm max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="font-title text-2xl text-primary">
                Administration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="wedding-text text-muted-foreground mb-6 text-center">
                Connectez-vous pour accéder au tableau de bord administrateur.
              </p>
              
              <form onSubmit={signIn} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="font-body text-primary">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="mt-2"
                    placeholder="admin@exemple.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="font-body text-primary">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="mt-2"
                    placeholder="Votre mot de passe"
                  />
                </div>
                
                <div className="text-center pt-4">
                  <Button 
                    type="submit"
                    disabled={isSigningIn}
                    className="elegant-gradient text-white font-body px-6 py-3 rounded-full w-full disabled:opacity-50"
                  >
                    {isSigningIn ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={16} />
                        Connexion...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2" size={16} />
                        Se connecter
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Pas encore de compte ?{' '}
                  <Link to="/admin/signup" className="text-accent hover:underline">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-soft">
        <div className="wedding-container">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="font-title text-2xl text-primary">
              KGC & JIL Admin
            </Link>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={refreshData} 
                variant="ghost" 
                size="sm"
                disabled={dataLoading}
              >
                <RefreshCw className={`mr-2 ${dataLoading ? 'animate-spin' : ''}`} size={16} />
                Actualiser
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2" size={16} />
                  Retour au site
                </Button>
              </Link>
              <Button onClick={signOut} variant="outline" size="sm">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Tableau de Bord
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <BarChart3 className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            {dataLoading && (
              <p className="text-sm text-muted-foreground">
                <Loader2 className="inline mr-2 animate-spin" size={16} />
                Chargement des données...
              </p>
            )}
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="font-title text-2xl text-primary">{totalRSVP}</h3>
                <p className="font-body text-sm text-muted-foreground">Confirmations RSVP</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calendar className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="font-title text-2xl text-primary">{totalPersonnes}</h3>
                <p className="font-body text-sm text-muted-foreground">Total Invités</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Eye className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="font-title text-2xl text-primary">{totalVisits}</h3>
                <p className="font-body text-sm text-muted-foreground">Visites Totales</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="font-title text-2xl text-primary">{receptionCount}</h3>
                <p className="font-body text-sm text-muted-foreground">Présents Réception</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="rsvp" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="rsvp">Confirmations RSVP ({totalRSVP})</TabsTrigger>
              <TabsTrigger value="stats">Statistiques Pages</TabsTrigger>
              <TabsTrigger value="overview">Aperçu Photos</TabsTrigger>
              <TabsTrigger value="photos">Gestion Photos</TabsTrigger>
              <TabsTrigger value="invitations">Invitations WhatsApp</TabsTrigger>
            </TabsList>

            {/* RSVP Tab */}
            <TabsContent value="rsvp">
              <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-title text-xl text-primary">
                    Confirmations de Présence
                  </CardTitle>
                  <div className="flex space-x-4 text-sm">
                    <span>Civil: {civilCount}</span>
                    <span>Religieux: {religiousCount}</span>
                    <span>Réception: {receptionCount}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {rsvpData.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Aucune confirmation RSVP pour le moment.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Personnes</TableHead>
                            <TableHead>Événements</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rsvpData.map((rsvp) => (
                            <TableRow key={rsvp.id}>
                              <TableCell className="font-medium">{rsvp.nom}</TableCell>
                              <TableCell>{rsvp.nombre_personnes}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {rsvp.mariage_civil && <Badge variant="secondary">Civil</Badge>}
                                  {rsvp.mariage_religieux && <Badge variant="secondary">Religieux</Badge>}
                                  {rsvp.reception && <Badge variant="secondary">Réception</Badge>}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-xs">
                                  {rsvp.email && <div>{rsvp.email}</div>}
                                  {rsvp.telephone && <div>{rsvp.telephone}</div>}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs">
                                {new Date(rsvp.created_at).toLocaleDateString('fr-FR')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats">
              <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-title text-xl text-primary">
                    Statistiques des Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pageStats.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Aucune statistique de page disponible.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead>Visites</TableHead>
                            <TableHead>Dernière Visite</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pageStats.map((page) => (
                            <TableRow key={page.id}>
                              <TableCell className="font-medium capitalize">{page.page_name}</TableCell>
                              <TableCell>{page.visit_count}</TableCell>
                              <TableCell className="text-xs">
                                {new Date(page.last_visited).toLocaleDateString('fr-FR')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Overview Photos Tab */}
            <TabsContent value="overview">
              <PagePhotosOverview />
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <PhotoManager />
            </TabsContent>

            {/* Invitations Tab */}
            <TabsContent value="invitations">
              <InvitationManager />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;