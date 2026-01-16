-- Ajout de la sous-catégorie pour la page Lieux & Accès
-- Créé le 2026-01-13 17:00

-- Insérer une photo d'exemple pour la page Lieux & Accès
INSERT INTO public.wedding_photos_2026_01_13 (filename, original_name, file_path, category, sous_categorie, description, is_featured, display_order) 
SELECT 'lieux-acces-demo.jpg', 'Background Page Lieux & Accès', 'demo/lieux-acces-demo.jpg', 'illustration', 'lieux', 'Photo pour la page Lieux & Accès', false, 5
WHERE NOT EXISTS (SELECT 1 FROM public.wedding_photos_2026_01_13 WHERE filename = 'lieux-acces-demo.jpg');

-- Mettre à jour les photos existantes qui pourraient correspondre à la page Lieux
UPDATE public.wedding_photos_2026_01_13 
SET sous_categorie = 'lieux'
WHERE category = 'illustration' 
  AND (description ILIKE '%lieux%' OR description ILIKE '%lieu%' OR description ILIKE '%accès%' OR description ILIKE '%acces%')
  AND sous_categorie = 'general';

COMMENT ON TABLE public.wedding_photos_2026_01_13 IS 'Métadonnées des photos du mariage avec catégorisation (accueil, rsvp, couple, contact, lieux, galerie, general)';