-- Amélioration du système de photos avec sous-catégorie pour la page Cadeaux
-- Créé le 2026-01-16 08:00

-- Insérer une photo d'exemple pour la page Cadeaux
INSERT INTO public.wedding_photos_2026_01_13 (filename, original_name, file_path, category, sous_categorie, description, is_featured, display_order) 
SELECT 'cadeaux-demo.jpg', 'Photo Page Cadeaux', 'demo/cadeaux-demo.jpg', 'illustration', 'cadeaux', 'Photo pour la page Cadeaux/Liste de mariage', false, 6
WHERE NOT EXISTS (SELECT 1 FROM public.wedding_photos_2026_01_13 WHERE filename = 'cadeaux-demo.jpg');

-- Mettre à jour les photos existantes qui pourraient correspondre à la page Cadeaux
UPDATE public.wedding_photos_2026_01_13 
SET sous_categorie = 'cadeaux'
WHERE category = 'illustration' 
  AND (description ILIKE '%cadeau%' OR description ILIKE '%liste%' OR description ILIKE '%mariage%' OR description ILIKE '%gift%')
  AND sous_categorie = 'general';

-- Fonction pour obtenir les photos assignées à chaque page
CREATE OR REPLACE FUNCTION public.get_photos_by_page()
RETURNS TABLE (
    page_name TEXT,
    category VARCHAR,
    sous_categorie VARCHAR,
    photo_count BIGINT,
    latest_photo_url TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        CASE 
            WHEN wp.sous_categorie = 'accueil' THEN 'Page d''accueil'
            WHEN wp.sous_categorie = 'rsvp' THEN 'Page RSVP'
            WHEN wp.sous_categorie = 'couple' THEN 'Page Notre Histoire'
            WHEN wp.sous_categorie = 'lieux' THEN 'Page Lieux & Accès'
            WHEN wp.sous_categorie = 'cadeaux' THEN 'Page Cadeaux'
            WHEN wp.sous_categorie = 'contact' THEN 'Page Contact'
            WHEN wp.sous_categorie = 'galerie' THEN 'Galerie'
            ELSE 'Autres'
        END as page_name,
        wp.category,
        wp.sous_categorie,
        COUNT(*) as photo_count,
        public.get_photo_url(MAX(wp.file_path)) as latest_photo_url
    FROM public.wedding_photos_2026_01_13 wp
    WHERE wp.sous_categorie IN ('accueil', 'rsvp', 'couple', 'lieux', 'cadeaux', 'contact', 'galerie')
    GROUP BY wp.category, wp.sous_categorie
    ORDER BY wp.sous_categorie;
END;
$$ LANGUAGE plpgsql;

-- Vue pour faciliter la gestion des photos par page
CREATE OR REPLACE VIEW public.photos_by_page_view AS
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
    wp.created_at,
    CASE 
        WHEN wp.sous_categorie = 'accueil' THEN 'Page d''accueil (Background)'
        WHEN wp.sous_categorie = 'rsvp' THEN 'Page RSVP (Background)'
        WHEN wp.sous_categorie = 'couple' THEN 'Page Notre Histoire (Illustration)'
        WHEN wp.sous_categorie = 'lieux' THEN 'Page Lieux & Accès (Illustration)'
        WHEN wp.sous_categorie = 'cadeaux' THEN 'Page Cadeaux (Illustration)'
        WHEN wp.sous_categorie = 'contact' THEN 'Page Contact (Illustration)'
        WHEN wp.sous_categorie = 'galerie' THEN 'Galerie (Photos publiques)'
        ELSE CONCAT(wp.category, ' - ', wp.sous_categorie)
    END as page_usage,
    public.get_photo_url(wp.file_path) as photo_url
FROM public.wedding_photos_2026_01_13 wp
ORDER BY wp.sous_categorie, wp.display_order, wp.created_at DESC;

COMMENT ON TABLE public.wedding_photos_2026_01_13 IS 'Métadonnées des photos du mariage avec catégorisation (accueil, rsvp, couple, lieux, cadeaux, contact, galerie, general)';
COMMENT ON FUNCTION public.get_photos_by_page() IS 'Récupère un résumé des photos assignées à chaque page';
COMMENT ON VIEW public.photos_by_page_view IS 'Vue simplifiée des photos avec leur usage par page';