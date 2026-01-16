-- Système de gestion des photos pour le mariage
-- Créé le 2026-01-13 13:00

-- Créer le bucket pour les photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wedding-photos-2026-01-13',
  'wedding-photos-2026-01-13',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Table pour gérer les métadonnées des photos
CREATE TABLE IF NOT EXISTS public.wedding_photos_2026_01_13 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    category VARCHAR(100) DEFAULT 'galerie', -- 'galerie', 'background', 'illustration'
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_wedding_photos_category ON public.wedding_photos_2026_01_13(category);
CREATE INDEX IF NOT EXISTS idx_wedding_photos_featured ON public.wedding_photos_2026_01_13(is_featured);
CREATE INDEX IF NOT EXISTS idx_wedding_photos_order ON public.wedding_photos_2026_01_13(display_order);

-- RLS Policies pour le bucket
CREATE POLICY "Allow public read access" ON storage.objects
    FOR SELECT USING (bucket_id = 'wedding-photos-2026-01-13');

CREATE POLICY "Allow admin upload" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'wedding-photos-2026-01-13' AND
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow admin delete" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'wedding-photos-2026-01-13' AND
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

-- RLS Policies pour la table des photos
ALTER TABLE public.wedding_photos_2026_01_13 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read photos" ON public.wedding_photos_2026_01_13
    FOR SELECT USING (true);

CREATE POLICY "Allow admin insert photos" ON public.wedding_photos_2026_01_13
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow admin update photos" ON public.wedding_photos_2026_01_13
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow admin delete photos" ON public.wedding_photos_2026_01_13
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

-- Fonction pour obtenir l'URL publique d'une photo
CREATE OR REPLACE FUNCTION public.get_photo_url(file_path TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN 'https://birnescmuqfminlprmbl.supabase.co/storage/v1/object/public/wedding-photos-2026-01-13/' || file_path;
END;
$$ LANGUAGE plpgsql;

-- Insérer quelques photos par défaut pour la démonstration
INSERT INTO public.wedding_photos_2026_01_13 (filename, original_name, file_path, category, description, is_featured, display_order) VALUES
('hero-beach.jpg', 'Beach Wedding Hero', 'demo/hero-beach.jpg', 'background', 'Photo principale pour la page d''accueil', true, 1),
('couple-portrait.jpg', 'Portrait du Couple', 'demo/couple-portrait.jpg', 'galerie', 'Portrait élégant de Gilles et Joelle', true, 2),
('wedding-rings.jpg', 'Alliances', 'demo/wedding-rings.jpg', 'illustration', 'Photo des alliances pour les pages', false, 3)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.wedding_photos_2026_01_13 IS 'Métadonnées des photos du mariage avec catégorisation';
COMMENT ON FUNCTION public.get_photo_url(TEXT) IS 'Génère l''URL publique complète d''une photo stockée';