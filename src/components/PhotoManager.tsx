import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Trash2, Image, Star, Eye, Loader2, Edit, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface WeddingPhoto {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  category: string;
  sous_categorie: string;
  description: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

const PhotoManager = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState({
    category: 'galerie',
    sous_categorie: 'general',
    description: '',
    is_featured: false,
    display_order: 0
  });
  
  // Fonction pour obtenir les sous-catégories selon la catégorie
  const getSousCategories = (category: string) => {
    switch (category) {
      case 'background':
        return [
          { value: 'accueil', label: 'Page d\'accueil' },
          { value: 'rsvp', label: 'Page RSVP' },
          { value: 'general', label: 'Général' }
        ];
      case 'illustration':
        return [
          { value: 'couple', label: 'Page Notre Histoire' },
          { value: 'contact', label: 'Page Contact' },
          { value: 'lieux', label: 'Page Lieux & Accès' },
          { value: 'cadeaux', label: 'Page Cadeaux' },
          { value: 'general', label: 'Général' }
        ];
      case 'galerie':
        return [
          { value: 'galerie', label: 'Galerie principale' },
          { value: 'general', label: 'Général' }
        ];
      default:
        return [{ value: 'general', label: 'Général' }];
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_photos_2026_01_13')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les photos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 10MB.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner une image.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('wedding-photos-2026-01-13')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Enregistrer les métadonnées dans la base de données
      const { error: dbError } = await supabase
        .from('wedding_photos_2026_01_13')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          category: uploadForm.category,
          sous_categorie: uploadForm.sous_categorie,
          description: uploadForm.description,
          is_featured: uploadForm.is_featured,
          display_order: uploadForm.display_order
        });

      if (dbError) throw dbError;

      toast({
        title: "Photo uploadée",
        description: "La photo a été ajoutée avec succès.",
      });

      // Réinitialiser le formulaire
      setUploadForm({
        category: 'galerie',
        sous_categorie: 'general',
        description: '',
        is_featured: false,
        display_order: 0
      });

      // Recharger les photos
      loadPhotos();
      
      // Déclencher un événement personnalisé pour notifier les autres composants
      window.dispatchEvent(new CustomEvent('photosUpdated', { detail: { category: uploadForm.category } }));

      // Réinitialiser l'input file
      event.target.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader la photo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photo: WeddingPhoto) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${photo.original_name}" ?`)) {
      return;
    }

    try {
      // Supprimer le fichier du storage
      const { error: storageError } = await supabase.storage
        .from('wedding-photos-2026-01-13')
        .remove([photo.file_path]);

      if (storageError) throw storageError;

      // Supprimer l'enregistrement de la base de données
      const { error: dbError } = await supabase
        .from('wedding_photos_2026_01_13')
        .delete()
        .eq('id', photo.id);

      if (dbError) throw dbError;

      toast({
        title: "Photo supprimée",
        description: "La photo a été supprimée avec succès.",
      });

      loadPhotos();
      
      // Notifier les autres composants
      window.dispatchEvent(new CustomEvent('photosUpdated', { detail: { category: photo.category } }));

    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Erreur de suppression",
        description: "Impossible de supprimer la photo.",
        variant: "destructive",
      });
    }
  };

  const updatePhoto = async (photoId: string, updates: Partial<WeddingPhoto>) => {
    try {
      const { error } = await supabase
        .from('wedding_photos_2026_01_13')
        .update(updates)
        .eq('id', photoId);

      if (error) throw error;

      toast({
        title: "Photo mise à jour",
        description: "Les informations ont été sauvegardées.",
      });

      setEditingPhoto(null);
      loadPhotos();

    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Erreur de mise à jour",
        description: "Impossible de mettre à jour la photo.",
        variant: "destructive",
      });
    }
  };

  const getPhotoUrl = (filePath: string) => {
    return `https://birnescmuqfminlprmbl.supabase.co/storage/v1/object/public/wedding-photos-2026-01-13/${filePath}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'galerie': return 'bg-blue-100 text-blue-800';
      case 'background': return 'bg-green-100 text-green-800';
      case 'illustration': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="mx-auto mb-4 animate-spin" size={32} />
        <p>Chargement des photos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-title text-xl text-primary flex items-center">
            <Upload className="mr-2" size={20} />
            Ajouter une Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select 
                value={uploadForm.category} 
                onValueChange={(value) => setUploadForm({...uploadForm, category: value, sous_categorie: 'general'})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="galerie">Galerie</SelectItem>
                  <SelectItem value="background">Arrière-plan</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sous_categorie">Sous-catégorie</Label>
              <Select 
                value={uploadForm.sous_categorie} 
                onValueChange={(value) => setUploadForm({...uploadForm, sous_categorie: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getSousCategories(uploadForm.category).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="display_order">Ordre d'affichage</Label>
              <Input
                type="number"
                value={uploadForm.display_order}
                onChange={(e) => setUploadForm({...uploadForm, display_order: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={uploadForm.description}
              onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
              placeholder="Description de la photo..."
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={uploadForm.is_featured}
              onChange={(e) => setUploadForm({...uploadForm, is_featured: e.target.checked})}
              className="rounded"
            />
            <Label htmlFor="is_featured">Photo mise en avant</Label>
          </div>

          <div>
            <Label htmlFor="photo-upload">Sélectionner une photo</Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Formats acceptés: JPG, PNG, WebP, GIF. Taille max: 10MB
            </p>
          </div>

          {uploading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin mr-2" size={20} />
              <span>Upload en cours...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photos Grid */}
      <Card className="shadow-elegant bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-title text-xl text-primary flex items-center">
            <Image className="mr-2" size={20} />
            Photos ({photos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <div className="text-center py-8">
              <Image className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">Aucune photo uploadée pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="aspect-video relative">
                    <img
                      src={getPhotoUrl(photo.file_path)}
                      alt={photo.original_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    {photo.is_featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="mr-1" size={12} />
                          Mise en avant
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <Badge className={getCategoryColor(photo.category)}>
                          {photo.category}
                        </Badge>
                        {photo.sous_categorie && photo.sous_categorie !== 'general' && (
                          <Badge variant="outline" className="text-xs">
                            {getSousCategories(photo.category).find(sc => sc.value === photo.sous_categorie)?.label || photo.sous_categorie}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Ordre: {photo.display_order}
                      </span>
                    </div>

                    {editingPhoto === photo.id ? (
                      <EditPhotoForm
                        photo={photo}
                        onSave={(updates) => updatePhoto(photo.id, updates)}
                        onCancel={() => setEditingPhoto(null)}
                      />
                    ) : (
                      <>
                        <div>
                          <h4 className="font-medium text-sm">{photo.original_name}</h4>
                          {photo.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {photo.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingPhoto(photo.id)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(getPhotoUrl(photo.file_path), '_blank')}
                            >
                              <Eye size={14} />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePhoto(photo)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Composant pour éditer une photo
const EditPhotoForm = ({ 
  photo, 
  onSave, 
  onCancel 
}: { 
  photo: WeddingPhoto; 
  onSave: (updates: Partial<WeddingPhoto>) => void; 
  onCancel: () => void; 
}) => {
  const [formData, setFormData] = useState({
    category: photo.category,
    sous_categorie: photo.sous_categorie || 'general',
    description: photo.description,
    is_featured: photo.is_featured,
    display_order: photo.display_order
  });

  // Fonction pour obtenir les sous-catégories selon la catégorie
  const getSousCategories = (category: string) => {
    switch (category) {
      case 'background':
        return [
          { value: 'accueil', label: 'Page d\'accueil' },
          { value: 'rsvp', label: 'Page RSVP' },
          { value: 'general', label: 'Général' }
        ];
      case 'illustration':
        return [
          { value: 'couple', label: 'Page Notre Histoire' },
          { value: 'contact', label: 'Page Contact' },
          { value: 'lieux', label: 'Page Lieux & Accès' },
          { value: 'cadeaux', label: 'Page Cadeaux' },
          { value: 'general', label: 'Général' }
        ];
      case 'galerie':
        return [
          { value: 'galerie', label: 'Galerie principale' },
          { value: 'general', label: 'Général' }
        ];
      default:
        return [{ value: 'general', label: 'Général' }];
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-3">
      <Select 
        value={formData.category} 
        onValueChange={(value) => setFormData({...formData, category: value, sous_categorie: 'general'})}
      >
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="galerie">Galerie</SelectItem>
          <SelectItem value="background">Arrière-plan</SelectItem>
          <SelectItem value="illustration">Illustration</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={formData.sous_categorie} 
        onValueChange={(value) => setFormData({...formData, sous_categorie: value})}
      >
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {getSousCategories(formData.category).map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        placeholder="Description..."
        rows={2}
        className="text-xs"
      />

      <div className="flex items-center justify-between">
        <Input
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
          className="w-20 h-8"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.is_featured}
            onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
            className="rounded"
          />
          <span className="text-xs">Mise en avant</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save size={12} className="mr-1" />
          Sauver
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          <X size={12} className="mr-1" />
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default PhotoManager;