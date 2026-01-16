import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        // Appeler la fonction pour incrémenter les visites
        const { error } = await supabase.rpc('increment_page_visit', {
          page_name_param: pageName
        });

        if (error) {
          console.error('Erreur de tracking:', error);
        }
      } catch (error) {
        console.error('Erreur de tracking:', error);
      }
    };

    // Délai pour éviter les appels multiples rapides
    const timer = setTimeout(trackPageVisit, 1000);

    return () => clearTimeout(timer);
  }, [pageName]);
};