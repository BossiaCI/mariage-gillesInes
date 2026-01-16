import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Send, Plus, Edit, Trash2, Users, CheckCircle, Clock, X, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface WeddingInvitation {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  message_personnalise: string;
  statut: string;
  date_envoi: string;
  date_confirmation: string;
  nombre_personnes_prevues: number;
  notes: string;
  created_at: string;
}

const InvitationManager = () => {
  const { toast } = useToast();
  const [invitations, setInvitations] = useState<WeddingInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInvitation, setEditingInvitation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    message_personnalise: '',
    nombre_personnes_prevues: 1,
    notes: ''
  });

  // Message par défaut pour les invitations
  const defaultMessage = `🌺 *Invitation au Mariage de Kossonou Gilles Cédric & Joelle Inès* 🌺

Cher(e) {nom},

C'est avec une immense joie que nous vous invitons à célébrer notre union !

📅 *Date :* 14 Février 2026
🏖️ *Lieu :* Assinie, Côte d'Ivoire
⛪ *Cérémonies :* Mariage Civil & Religieux

Votre présence à nos côtés rendrait ce jour encore plus spécial.

👆 Découvrez tous les détails et confirmez votre présence sur notre site :
{lien_rsvp}

Avec tout notre amour,
Kossonou Gilles Cédric & Joelle Inès 💕`;

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_invitations_2026_01_13')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error) {
      console.error('Error loading invitations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les invitations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveInvitation = async () => {
    try {
      if (!formData.nom || !formData.telephone) {
        toast({
          title: "Champs requis",
          description: "Le nom et le téléphone sont obligatoires.",
          variant: "destructive",
        });
        return;
      }

      // Nettoyer le numéro de téléphone
      const cleanPhone = formData.telephone.replace(/\s+/g, '');
      
      const invitationData = {
        ...formData,
        telephone: cleanPhone,
        message_personnalise: formData.message_personnalise || defaultMessage
      };

      if (editingInvitation) {
        const { error } = await supabase
          .from('wedding_invitations_2026_01_13')
          .update(invitationData)
          .eq('id', editingInvitation);

        if (error) throw error;

        toast({
          title: "Invitation mise à jour",
          description: "L'invitation a été modifiée avec succès.",
        });
      } else {
        const { error } = await supabase
          .from('wedding_invitations_2026_01_13')
          .insert(invitationData);

        if (error) throw error;

        toast({
          title: "Invitation ajoutée",
          description: "La nouvelle invitation a été créée.",
        });
      }

      resetForm();
      loadInvitations();

    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'invitation.",
        variant: "destructive",
      });
    }
  };

  const deleteInvitation = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette invitation ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('wedding_invitations_2026_01_13')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Invitation supprimée",
        description: "L'invitation a été supprimée avec succès.",
      });

      loadInvitations();

    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'invitation.",
        variant: "destructive",
      });
    }
  };

  const sendWhatsAppInvitation = async (invitation: WeddingInvitation) => {
    try {
      // Générer le lien vers la page d'accueil
      const invitationLink = `${window.location.origin}/`;
      
      // Personnaliser le message
      let message = invitation.message_personnalise || defaultMessage;
      const nomComplet = invitation.prenom ? `${invitation.prenom} ${invitation.nom}` : invitation.nom;
      
      message = message
        .replace(/{nom}/g, nomComplet)
        .replace(/{lien_rsvp}/g, invitationLink);

      // Nettoyer le numéro de téléphone pour WhatsApp
      const cleanPhone = invitation.telephone.replace(/[^\d+]/g, '');
      
      // Créer l'URL WhatsApp
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      
      // Ouvrir WhatsApp
      window.open(whatsappUrl, '_blank');

      // Mettre à jour le statut de l'invitation
      const { error } = await supabase
        .from('wedding_invitations_2026_01_13')
        .update({
          statut: 'envoye',
          date_envoi: new Date().toISOString()
        })
        .eq('id', invitation.id);

      if (error) throw error;

      toast({
        title: "Invitation envoyée",
        description: `L'invitation a été envoyée à ${nomComplet} via WhatsApp.`,
      });

      loadInvitations();

    } catch (error) {
      console.error('Send error:', error);
      toast({
        title: "Erreur d'envoi",
        description: "Impossible d'envoyer l'invitation.",
        variant: "destructive",
      });
    }
  };

  const copyInvitationLink = () => {
    const siteLink = `${window.location.origin}/`;
    navigator.clipboard.writeText(siteLink);
    toast({
      title: "Lien copié",
      description: "Le lien du site a été copié dans le presse-papiers.",
    });
  };

  const editInvitation = (invitation: WeddingInvitation) => {
    setFormData({
      nom: invitation.nom,
      prenom: invitation.prenom || '',
      telephone: invitation.telephone,
      message_personnalise: invitation.message_personnalise || '',
      nombre_personnes_prevues: invitation.nombre_personnes_prevues,
      notes: invitation.notes || ''
    });
    setEditingInvitation(invitation.id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      telephone: '',
      message_personnalise: '',
      nombre_personnes_prevues: 1,
      notes: ''
    });
    setEditingInvitation(null);
    setShowAddForm(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'confirme': return 'bg-green-100 text-green-800';
      case 'envoye': return 'bg-blue-100 text-blue-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'decline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'confirme': return 'Confirmé';
      case 'envoye': return 'Envoyé';
      case 'en_attente': return 'En attente';
      case 'decline': return 'Décliné';
      default: return statut;
    }
  };

  // Statistiques
  const totalInvitations = invitations.length;
  const invitationsEnvoyees = invitations.filter(inv => inv.statut === 'envoye' || inv.statut === 'confirme').length;
  const confirmations = invitations.filter(inv => inv.statut === 'confirme').length;
  const totalPersonnesAttendues = invitations.reduce((sum, inv) => sum + inv.nombre_personnes_prevues, 0);

  return (
    <div className="space-y-8">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto mb-2 text-accent" size={24} />
            <h3 className="font-title text-lg text-primary">{totalInvitations}</h3>
            <p className="font-body text-xs text-muted-foreground">Total Invitations</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Send className="mx-auto mb-2 text-blue-600" size={24} />
            <h3 className="font-title text-lg text-primary">{invitationsEnvoyees}</h3>
            <p className="font-body text-xs text-muted-foreground">Envoyées</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto mb-2 text-green-600" size={24} />
            <h3 className="font-title text-lg text-primary">{confirmations}</h3>
            <p className="font-body text-xs text-muted-foreground">Confirmées</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto mb-2 text-purple-600" size={24} />
            <h3 className="font-title text-lg text-primary">{totalPersonnesAttendues}</h3>
            <p className="font-body text-xs text-muted-foreground">Personnes Attendues</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <h2 className="font-title text-xl text-primary">Gestion des Invitations</h2>
        <div className="flex space-x-2">
          <Button
            onClick={copyInvitationLink}
            variant="outline"
            size="sm"
          >
            <Copy className="mr-2" size={16} />
            Copier lien du site
          </Button>
          <Button
            onClick={() => setShowAddForm(true)}
            className="elegant-gradient text-white"
            size="sm"
          >
            <Plus className="mr-2" size={16} />
            Nouvelle Invitation
          </Button>
        </div>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-title text-lg text-primary">
              {editingInvitation ? 'Modifier l\'Invitation' : 'Nouvelle Invitation'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  placeholder="Nom de famille ou organisation"
                />
              </div>

              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  placeholder="Prénom (optionnel)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  placeholder="+225 07 12 34 56 78"
                />
              </div>

              <div>
                <Label htmlFor="nombre_personnes">Nombre de personnes</Label>
                <Input
                  id="nombre_personnes"
                  type="number"
                  min="1"
                  value={formData.nombre_personnes_prevues}
                  onChange={(e) => setFormData({...formData, nombre_personnes_prevues: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message personnalisé</Label>
              <Textarea
                id="message"
                value={formData.message_personnalise}
                onChange={(e) => setFormData({...formData, message_personnalise: e.target.value})}
                placeholder="Laissez vide pour utiliser le message par défaut"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Utilisez {"{nom}"} pour le nom et {"{lien_rsvp}"} pour le lien du site
              </p>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Notes internes (optionnel)"
                rows={2}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={saveInvitation} className="elegant-gradient text-white">
                {editingInvitation ? 'Mettre à jour' : 'Ajouter'}
              </Button>
              <Button onClick={resetForm} variant="outline">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des invitations */}
      <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-title text-lg text-primary flex items-center">
            <MessageCircle className="mr-2" size={20} />
            Invitations ({totalInvitations})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <Clock className="mx-auto mb-4 animate-spin" size={32} />
              <p>Chargement des invitations...</p>
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">Aucune invitation créée pour le moment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Personnes</TableHead>
                    <TableHead>Date Envoi</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {invitation.prenom ? `${invitation.prenom} ${invitation.nom}` : invitation.nom}
                          </div>
                          {invitation.notes && (
                            <div className="text-xs text-muted-foreground">{invitation.notes}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{invitation.telephone}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invitation.statut)}>
                          {getStatusLabel(invitation.statut)}
                        </Badge>
                      </TableCell>
                      <TableCell>{invitation.nombre_personnes_prevues}</TableCell>
                      <TableCell className="text-xs">
                        {invitation.date_envoi ? 
                          new Date(invitation.date_envoi).toLocaleDateString('fr-FR') : 
                          '-'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            onClick={() => sendWhatsAppInvitation(invitation)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <MessageCircle size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editInvitation(invitation)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteInvitation(invitation.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitationManager;