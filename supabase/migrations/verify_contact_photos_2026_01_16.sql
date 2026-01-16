-- Vérification et test des photos pour la page Contact
-- Créé le 2026-01-16 08:00

-- Vérifier les photos existantes pour la sous-catégorie 'contact'
SELECT 
    id,
    filename,
    original_name,
    category,
    sous_categorie,
    description,
    is_featured,
    display_order,
    created_at
FROM public.wedding_photos_2026_01_13 
WHERE sous_categorie = 'contact'
ORDER BY display_order, created_at DESC;

-- Insérer une photo d'exemple pour la page Contact si aucune n'existe
INSERT INTO public.wedding_photos_2026_01_13 (filename, original_name, file_path, category, sous_categorie, description, is_featured, display_order) 
SELECT 'contact-demo.jpg', 'Photo Page Contact', 'demo/contact-demo.jpg', 'illustration', 'contact', 'Photo pour la page Contact - Contactez-nous', false, 7
WHERE NOT EXISTS (SELECT 1 FROM public.wedding_photos_2026_01_13 WHERE sous_categorie = 'contact');

-- Mettre à jour les photos existantes qui pourraient correspondre à la page Contact
UPDATE public.wedding_photos_2026_01_13 
SET sous_categorie = 'contact'
WHERE category = 'illustration' 
  AND (description ILIKE '%contact%' OR description ILIKE '%téléphone%' OR description ILIKE '%appel%')
  AND sous_categorie = 'general';

-- Vérifier le résultat final
SELECT 
    COUNT(*) as total_photos_contact,
    string_agg(description, ', ') as descriptions
FROM public.wedding_photos_2026_01_13 
WHERE sous_categorie = 'contact';