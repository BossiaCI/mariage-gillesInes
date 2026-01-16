-- Tables pour le site de mariage Gilles & Joelle
-- Créé le 2026-01-07 15:22

-- Table pour les confirmations RSVP
CREATE TABLE IF NOT EXISTS public.rsvp_confirmations_2026_01_07_15_22 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    nombre_personnes INTEGER NOT NULL CHECK (nombre_personnes > 0),
    mariage_civil BOOLEAN DEFAULT false,
    mariage_religieux BOOLEAN DEFAULT false,
    reception BOOLEAN DEFAULT false,
    message TEXT,
    email VARCHAR(255),
    telephone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les statistiques de pages
CREATE TABLE IF NOT EXISTS public.page_visits_2026_01_07_15_22 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_name VARCHAR(100) NOT NULL,
    visit_count INTEGER DEFAULT 1,
    last_visited TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les utilisateurs admin
CREATE TABLE IF NOT EXISTS public.admin_users_2026_01_07_15_22 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion des données initiales pour les pages
INSERT INTO public.page_visits_2026_01_07_15_22 (page_name, visit_count) VALUES
('accueil', 0),
('histoire', 0),
('programme', 0),
('lieux', 0),
('hebergement', 0),
('rsvp', 0),
('infos', 0),
('galerie', 0),
('cadeaux', 0),
('contact', 0)
ON CONFLICT DO NOTHING;

-- Fonction pour mettre à jour les statistiques de visite
CREATE OR REPLACE FUNCTION increment_page_visit(page_name_param VARCHAR(100))
RETURNS void AS $$
BEGIN
    INSERT INTO public.page_visits_2026_01_07_15_22 (page_name, visit_count, last_visited)
    VALUES (page_name_param, 1, NOW())
    ON CONFLICT (page_name) 
    DO UPDATE SET 
        visit_count = page_visits_2026_01_07_15_22.visit_count + 1,
        last_visited = NOW();
END;
$$ LANGUAGE plpgsql;

-- RLS Policies
ALTER TABLE public.rsvp_confirmations_2026_01_07_15_22 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_visits_2026_01_07_15_22 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users_2026_01_07_15_22 ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion des RSVP (public)
CREATE POLICY "Allow public RSVP insert" ON public.rsvp_confirmations_2026_01_07_15_22
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture des RSVP aux admins seulement
CREATE POLICY "Allow admin RSVP read" ON public.rsvp_confirmations_2026_01_07_15_22
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

-- Politique pour permettre l'insertion des statistiques de pages (public)
CREATE POLICY "Allow public page visits insert" ON public.page_visits_2026_01_07_15_22
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la mise à jour des statistiques de pages (public)
CREATE POLICY "Allow public page visits update" ON public.page_visits_2026_01_07_15_22
    FOR UPDATE USING (true);

-- Politique pour permettre la lecture des statistiques aux admins seulement
CREATE POLICY "Allow admin page visits read" ON public.page_visits_2026_01_07_15_22
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

-- Politique pour les utilisateurs admin
CREATE POLICY "Allow admin users read own" ON public.admin_users_2026_01_07_15_22
    FOR SELECT USING (user_id = auth.uid());

-- Créer un utilisateur admin par défaut (à remplacer par l'email réel)
-- INSERT INTO public.admin_users_2026_01_07_15_22 (email) VALUES ('admin@mariage-gilles-joelle.com');

COMMENT ON TABLE public.rsvp_confirmations_2026_01_07_15_22 IS 'Confirmations de présence pour le mariage de Gilles et Joelle';
COMMENT ON TABLE public.page_visits_2026_01_07_15_22 IS 'Statistiques de visites des pages du site';
COMMENT ON TABLE public.admin_users_2026_01_07_15_22 IS 'Utilisateurs administrateurs du site';