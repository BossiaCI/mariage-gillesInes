-- Système de gestion des invitations WhatsApp
-- Créé le 2026-01-13 13:00

-- Table pour gérer les invitations
CREATE TABLE IF NOT EXISTS public.wedding_invitations_2026_01_13 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255),
    telephone VARCHAR(20) NOT NULL,
    message_personnalise TEXT,
    statut VARCHAR(50) DEFAULT 'en_attente', -- 'en_attente', 'envoye', 'confirme', 'decline'
    date_envoi TIMESTAMP WITH TIME ZONE,
    date_confirmation TIMESTAMP WITH TIME ZONE,
    nombre_personnes_prevues INTEGER DEFAULT 1,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_wedding_invitations_statut ON public.wedding_invitations_2026_01_13(statut);
CREATE INDEX IF NOT EXISTS idx_wedding_invitations_telephone ON public.wedding_invitations_2026_01_13(telephone);
CREATE INDEX IF NOT EXISTS idx_wedding_invitations_created_by ON public.wedding_invitations_2026_01_13(created_by);

-- RLS Policies pour la table des invitations
ALTER TABLE public.wedding_invitations_2026_01_13 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read invitations" ON public.wedding_invitations_2026_01_13
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow admin insert invitations" ON public.wedding_invitations_2026_01_13
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow admin update invitations" ON public.wedding_invitations_2026_01_13
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow admin delete invitations" ON public.wedding_invitations_2026_01_13
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users_2026_01_07_15_22 
            WHERE user_id = auth.uid()
        )
    );

-- Fonction pour mettre à jour le statut d'invitation basé sur les RSVP
CREATE OR REPLACE FUNCTION public.update_invitation_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Mettre à jour le statut de l'invitation si une confirmation RSVP correspond
    UPDATE public.wedding_invitations_2026_01_13 
    SET 
        statut = 'confirme',
        date_confirmation = NEW.created_at,
        updated_at = NOW()
    WHERE 
        LOWER(TRIM(nom)) = LOWER(TRIM(NEW.nom)) 
        AND statut = 'envoye';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement le statut des invitations
CREATE TRIGGER trigger_update_invitation_status
    AFTER INSERT ON public.rsvp_confirmations_2026_01_07_15_22
    FOR EACH ROW
    EXECUTE FUNCTION public.update_invitation_status();

-- Insérer quelques invitations d'exemple
INSERT INTO public.wedding_invitations_2026_01_13 (nom, prenom, telephone, nombre_personnes_prevues, notes) VALUES
('Famille Kouassi', 'Jean', '+225 07 12 34 56 78', 4, 'Famille proche - côté marié'),
('Mademoiselle Adjoua', 'Marie', '+225 05 98 76 54 32', 2, 'Amie de la mariée'),
('Monsieur Koffi', 'Paul', '+225 01 23 45 67 89', 1, 'Collègue de travail')
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.wedding_invitations_2026_01_13 IS 'Gestion des invitations WhatsApp pour le mariage';
COMMENT ON FUNCTION public.update_invitation_status() IS 'Met à jour automatiquement le statut des invitations basé sur les confirmations RSVP';