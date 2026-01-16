-- Mise à jour du système de photos pour ajouter des sous-catégories
-- Créé le 2026-01-13 16:00

-- Ajouter une colonne sous_categorie pour différencier les types d'images
ALTER TABLE public.wedding_photos_2026_01_13 
ADD COLUMN IF NOT EXISTS sous_categorie VARCHAR(100) DEFAULT 'general';

-- Mettre à jour les photos existantes avec des sous-catégories appropriées
UPDATE public.wedding_photos_2026_01_13 
SET sous_categorie = CASE 
    WHEN category = 'background' AND is_featured = true THEN 'accueil'
    WHEN category = 'background' AND is_featured = false THEN 'rsvp'
    WHEN category = 'illustration' AND description ILIKE '%couple%' THEN 'couple'
    WHEN category = 'illustration' AND description ILIKE '%contact%' THEN 'contact'
    WHEN category = 'galerie' THEN 'galerie'
    ELSE 'general'
END;

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_wedding_photos_sous_categorie ON public.wedding_photos_2026_01_13(sous_categorie);
CREATE INDEX IF NOT EXISTS idx_wedding_photos_category_sous_categorie ON public.wedding_photos_2026_01_13(category, sous_categorie);

-- Insérer quelques photos d'exemple avec les nouvelles sous-catégories (sans ON CONFLICT)
INSERT INTO public.wedding_photos_2026_01_13 (filename, original_name, file_path, category, sous_categorie, description, is_featured, display_order) 
SELECT 'hero-accueil-demo.jpg', 'Background Page Accueil', 'demo/hero-accueil-demo.jpg', 'background', 'accueil', 'Photo de fond pour la page d''accueil', true, 1
WHERE NOT EXISTS (SELECT 1 FROM public.wedding_photos_2026_01_13 WHERE filename = 'hero-accueil-demo.jpg');

INSERT INTO public.wedding_photos_2026_01_13 (filename, original_name, file_path, category, sous_categorie, description, is_featured, display_order) 
SELECT 'hero-rsvp-demo.jpg', 'Background Page RSVP', 'demo/hero-rsvp-demo.jpg', 'background', 'rsvp', 'Photo de fond pour la page RSVP', false, 2
WHERE NOT EXISTS (SELECT 1 FROM public.wedding_photos_2026_01_13 WHERE filename = 'hero-rsvp-demo.jpg');

-- Fonction pour obtenir une photo par catégorie et sous-catégorie
CREATE OR REPLACE FUNCTION public.get_photo_by_category(
    p_category TEXT,
    p_sous_categorie TEXT DEFAULT NULL,
    p_featured BOOLEAN DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    filename VARCHAR,
    original_name VARCHAR,
    file_path VARCHAR,
    category VARCHAR,
    sous_categorie VARCHAR,
    description TEXT,
    is_featured BOOLEAN,
    display_order INTEGER,
    photo_url TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wp.id,
        wp.filename,
        wp.original_name,
        wp.file_path,
        wp.category,
        wp.sous_categorie,
        wp.description,
        wp.is_featured,
        wp.display_order,
        public.get_photo_url(wp.file_path) as photo_url
    FROM public.wedding_photos_2026_01_13 wp
    WHERE 
        wp.category = p_category
        AND (p_sous_categorie IS NULL OR wp.sous_categorie = p_sous_categorie)
        AND (p_featured IS NULL OR wp.is_featured = p_featured)
    ORDER BY wp.is_featured DESC, wp.display_order ASC, wp.created_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

COMMENT ON COLUMN public.wedding_photos_2026_01_13.sous_categorie IS 'Sous-catégorie pour différencier les types d''images (accueil, rsvp, couple, contact, galerie, general)';
COMMENT ON FUNCTION public.get_photo_by_category(TEXT, TEXT, BOOLEAN) IS 'Récupère une photo par catégorie et sous-catégorie avec URL complète';