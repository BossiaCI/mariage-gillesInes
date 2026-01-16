import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WeddingPhoto {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  category: string;
  sous_categorie: string;
  description: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export const useWeddingPhotos = (category?: string, sousCategorie?: string, featured?: boolean) => {
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
    
    // Écouter les mises à jour de photos
    const handlePhotosUpdate = (event: CustomEvent) => {
      const updatedCategory = event.detail?.category;
      // Recharger si pas de catégorie spécifique ou si la catégorie correspond
      if (!category || !updatedCategory || category === updatedCategory) {
        loadPhotos();
      }
    };
    
    window.addEventListener('photosUpdated', handlePhotosUpdate as EventListener);
    
    return () => {
      window.removeEventListener('photosUpdated', handlePhotosUpdate as EventListener);
    };
  }, [category, sousCategorie, featured]);

  const loadPhotos = async () => {
    try {
      let query = supabase
        .from('wedding_photos_2026_01_13')
        .select('*')
        .order('display_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      if (sousCategorie) {
        query = query.eq('sous_categorie', sousCategorie);
      }

      if (featured !== undefined) {
        query = query.eq('is_featured', featured);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error loading photos:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (filePath: string) => {
    return `https://birnescmuqfminlprmbl.supabase.co/storage/v1/object/public/wedding-photos-2026-01-13/${filePath}`;
  };

  const getPhotoByCategory = (cat: string, featured = false) => {
    return photos.find(photo => 
      photo.category === cat && 
      (featured ? photo.is_featured : true)
    );
  };

  const refreshPhotos = () => {
    loadPhotos();
  };

  return {
    photos,
    loading,
    getPhotoUrl,
    getPhotoByCategory,
    refreshPhotos
  };
};

// Hook spécialisé pour les photos de background de la page d'accueil
export const useAccueilBackgroundPhotos = () => {
  return useWeddingPhotos('background', 'accueil');
};

// Hook spécialisé pour les photos de background de la page RSVP
export const useRSVPBackgroundPhotos = () => {
  return useWeddingPhotos('background', 'rsvp');
};

// Hook spécialisé pour les photos de background (toutes)
export const useBackgroundPhotos = () => {
  return useWeddingPhotos('background');
};

// Hook spécialisé pour les photos d'illustration
export const useIllustrationPhotos = () => {
  return useWeddingPhotos('illustration');
};  

// Hook spécialisé pour les photos de la page Notre Histoire (couple)
export const useCouplePhotos = () => {
  return useWeddingPhotos('illustration', 'couple');
};

// Hook spécialisé pour les photos de la page Contact
export const useContactPhotos = () => {
  return useWeddingPhotos('illustration', 'contact');
};

// Hook spécialisé pour les photos de la page Lieux & Accès
export const useLieuxPhotos = () => {
  return useWeddingPhotos('illustration', 'lieux');
};

// Hook spécialisé pour les photos de la page Cadeaux
export const useCadeauxPhotos = () => {
  return useWeddingPhotos('illustration', 'cadeaux');
};

// Hook spécialisé pour la galerie
export const useGalleryPhotos = () => {
  return useWeddingPhotos('galerie');
};