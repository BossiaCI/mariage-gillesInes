import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Upload, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PagePhotoSummary {
  page_name: string;
  category: string;
  sous_categorie: string;
  photo_count: number;
  latest_photo_url: string;
}

const PagePhotosOverview = () => {
  const [pagePhotos, setPagePhotos] = useState<PagePhotoSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPagePhotos();
  }, []);

  const loadPagePhotos = async () => {
    try {
      const { data, error } = await supabase.rpc('get_photos_by_page');
      
      if (error) throw error;
      
      setPagePhotos(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des photos par page:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPageIcon = (sousCategorie: string) => {
    switch (sousCategorie) {
      case 'accueil': return '🏠';
      case 'rsvp': return '📝';
      case 'couple': return '💕';
      case 'lieux': return '🗺️';
      case 'cadeaux': return '🎁';
      case 'contact': return '📞';
      case 'galerie': return '📸';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'background': return 'bg-blue-100 text-blue-800';
      case 'illustration': return 'bg-green-100 text-green-800';
      case 'galerie': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="mr-2" size={20} />
            Aperçu des Photos par Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Chargement...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="mr-2" size={20} />
          Aperçu des Photos par Page
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Résumé des photos assignées à chaque page du site
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagePhotos.map((page) => (
            <Card key={page.sous_categorie} className="border-2 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{getPageIcon(page.sous_categorie)}</span>
                    <div>
                      <h3 className="font-medium text-sm">{page.page_name}</h3>
                      <Badge className={`text-xs ${getCategoryColor(page.category)}`}>
                        {page.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {page.photo_count} photo{page.photo_count > 1 ? 's' : ''}
                  </Badge>
                </div>
                
                {page.latest_photo_url && (
                  <div className="mb-3">
                    <img
                      src={page.latest_photo_url}
                      alt={`Aperçu ${page.page_name}`}
                      className="w-full h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Sous-catégorie: {page.sous_categorie}</span>
                  {page.photo_count === 0 && (
                    <Badge variant="destructive" className="text-xs">
                      Aucune photo
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {pagePhotos.length === 0 && (
          <div className="text-center py-8">
            <ImageIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucune photo assignée aux pages</p>
            <p className="text-sm text-muted-foreground mt-2">
              Uploadez des photos avec les bonnes sous-catégories pour les voir apparaître ici
            </p>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Guide des Sous-catégories :</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>Background :</strong> accueil, rsvp</div>
            <div><strong>Illustration :</strong> couple, lieux, cadeaux, contact</div>
            <div><strong>Galerie :</strong> galerie (photos publiques)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PagePhotosOverview;