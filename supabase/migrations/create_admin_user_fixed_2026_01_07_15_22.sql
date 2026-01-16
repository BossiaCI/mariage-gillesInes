-- Création d'un utilisateur administrateur par défaut
-- Créé le 2026-01-07 15:22

-- Fonction pour créer un utilisateur admin après inscription
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger AS $$
BEGIN
  -- Vérifier si l'email est dans la liste des admins autorisés
  IF NEW.email IN ('admin@mariage-gilles-joelle.com', 'gilles.admin@gmail.com', 'joelle.admin@gmail.com') THEN
    INSERT INTO public.admin_users_2026_01_07_15_22 (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'admin');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un admin lors de l'inscription
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Mise à jour de la politique pour permettre l'insertion automatique
DROP POLICY IF EXISTS "Allow admin users insert" ON public.admin_users_2026_01_07_15_22;
CREATE POLICY "Allow admin users insert" ON public.admin_users_2026_01_07_15_22
    FOR INSERT WITH CHECK (true);

-- Fonction pour vérifier si un utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users_2026_01_07_15_22 
    WHERE admin_users_2026_01_07_15_22.user_id = is_admin.user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;