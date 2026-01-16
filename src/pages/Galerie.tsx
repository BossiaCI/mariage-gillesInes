import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, ArrowLeft, Heart, Download, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SimpleNavigation from "@/components/SimpleNavigation";

interface WeddingPhoto {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  category: string;
  description: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

const Galerie = () => {
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<WeddingPhoto | null>(null);

  useEffect(() => {
    loadGalleryPhotos();
  }, []);

  const loadGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_photos_2026_01_13')
        .select('*')
        .eq('category', 'galerie')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error loading gallery photos:', error);
      // Fallback vers les photos par défaut si erreur
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (filePath: string) => {
    return `https://birnescmuqfminlprmbl.supabase.co/storage/v1/object/public/wedding-photos-2026-01-13/${filePath}`;
  };

  // Photos par défaut si aucune photo n'est disponible
  const defaultPhotos = [
    "https://images.unsplash.com/photo-1732508026936-9f226a6461c1?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1732508026891-88d02bca45e9?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1765292783735-9ec7213b1df1?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1765292783732-ca81c5b69e25?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1765292783377-e2b769632228?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611540497578-4cb17aa00718?w=400&auto=format&fit=crop&q=80"
  ];

  const openLightbox = (photo: WeddingPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const downloadPhoto = (photo: WeddingPhoto) => {
    const link = document.createElement('a');
    link.href = getPhotoUrl(photo.file_path);
    link.download = photo.original_name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sand to-primary-light">
      {/* Navigation */}
      <SimpleNavigation currentPage="/galerie" />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h1 className="wedding-title text-primary mb-8">
              Galerie
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-accent flex-1 max-w-32"></div>
              <Camera className="mx-4 text-accent" size={24} />
              <div className="h-px bg-accent flex-1 max-w-32"></div>
            </div>
            <p className="wedding-text text-muted-foreground max-w-3xl mx-auto">
              Découvrez nos plus beaux moments capturés en images. 
              Chaque photo raconte une partie de notre histoire d'amour.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-16">
        <div className="wedding-container">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="mx-auto mb-4 animate-spin text-accent" size={48} />
              <p className="wedding-text text-muted-foreground">Chargement de la galerie...</p>
            </div>
          ) : (
            <>
              {photos.length > 0 ? (
                <>
                  {/* Photos mises en avant */}
                  {photos.filter(photo => photo.is_featured).length > 0 && (
                    <div className="mb-12">
                      <h2 className="wedding-subtitle text-primary text-center mb-8">
                        Photos Mises en Avant
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {photos
                          .filter(photo => photo.is_featured)
                          .map((photo) => (
                            <Card 
                              key={photo.id} 
                              className="shadow-elegant bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
                              onClick={() => openLightbox(photo)}
                            >
                              <div className="aspect-square relative overflow-hidden">
                                <img
                                  src={getPhotoUrl(photo.file_path)}
                                  alt={photo.description || photo.original_name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    e.currentTarget.src = defaultPhotos[0];
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                  <Heart className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                                </div>
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Star className="mr-1" size={12} />
                                    Mise en avant
                                  </Badge>
                                </div>
                              </div>
                              {photo.description && (
                                <CardContent className="p-4">
                                  <p className="font-body text-sm text-muted-foreground text-center">
                                    {photo.description}
                                  </p>
                                </CardContent>
                              )}
                            </Card>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Toutes les photos */}
                  <div>
                    <h2 className="wedding-subtitle text-primary text-center mb-8">
                      Toutes nos Photos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {photos.map((photo) => (
                        <Card 
                          key={photo.id} 
                          className="shadow-elegant bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
                          onClick={() => openLightbox(photo)}
                        >
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={getPhotoUrl(photo.file_path)}
                              alt={photo.description || photo.original_name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = defaultPhotos[Math.floor(Math.random() * defaultPhotos.length)];
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <Heart className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                            </div>
                          </div>
                          {photo.description && (
                            <CardContent className="p-3">
                              <p className="font-body text-xs text-muted-foreground text-center line-clamp-2">
                                {photo.description}
                              </p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Galerie par défaut si aucune photo uploadée */
                <div>
                  <div className="text-center mb-8">
                    <p className="wedding-text text-muted-foreground">
                      Galerie temporaire - Les photos seront bientôt ajoutées par les administrateurs
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {defaultPhotos.map((photo, index) => (
                      <Card key={index} className="shadow-elegant bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={photo}
                            alt={`Photo de mariage ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Heart className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={getPhotoUrl(selectedPhoto.file_path)}
              alt={selectedPhoto.description || selectedPhoto.original_name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPhoto(selectedPhoto);
                }}
              >
                <Download size={16} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={closeLightbox}
              >
                ✕
              </Button>
            </div>

            {/* Photo Info */}
            {selectedPhoto.description && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                <p className="font-body text-sm">{selectedPhoto.description}</p>
                {selectedPhoto.is_featured && (
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                    <Star className="mr-1" size={12} />
                    Photo mise en avant
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="pb-16">
        <div className="wedding-container">
          <Card className="shadow-elegant bg-white/80 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <h3 className="wedding-subtitle text-primary mb-4">
                Partagez ce moment avec nous
              </h3>
              <p className="wedding-text text-muted-foreground mb-6">
                Confirmez votre présence pour vivre ces moments magiques à nos côtés
              </p>
              <Link to="/rsvp">
                <Button className="elegant-gradient text-white font-body px-8 py-3 rounded-full shadow-elegant">
                  Confirmer ma présence
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-8">
        <div className="wedding-container text-center">
          <p className="font-body text-sm text-muted-foreground">
            © 2026 Gilles Cédric & Joelle Inès - Mariage à Assinie
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Galerie;