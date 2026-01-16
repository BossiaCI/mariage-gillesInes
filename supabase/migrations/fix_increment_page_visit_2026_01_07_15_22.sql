-- Correction de la fonction de tracking des pages
-- Créé le 2026-01-07 15:22

-- Supprimer l'ancienne fonction si elle existe
DROP FUNCTION IF EXISTS public.increment_page_visit(VARCHAR);

-- Recréer la fonction avec la bonne logique
CREATE OR REPLACE FUNCTION public.increment_page_visit(page_name_param VARCHAR(100))
RETURNS void AS $$
BEGIN
    -- Essayer de mettre à jour le compteur existant
    UPDATE public.page_visits_2026_01_07_15_22 
    SET 
        visit_count = visit_count + 1,
        last_visited = NOW()
    WHERE page_name = page_name_param;
    
    -- Si aucune ligne n'a été mise à jour, insérer une nouvelle ligne
    IF NOT FOUND THEN
        INSERT INTO public.page_visits_2026_01_07_15_22 (page_name, visit_count, last_visited)
        VALUES (page_name_param, 1, NOW());
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Donner les permissions d'exécution à tous les utilisateurs authentifiés
GRANT EXECUTE ON FUNCTION public.increment_page_visit(VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_page_visit(VARCHAR) TO anon;