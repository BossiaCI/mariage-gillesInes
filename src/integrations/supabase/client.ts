import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://birnescmuqfminlprmbl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpcm5lc2NtdXFmbWlubHBybWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3OTg1MDEsImV4cCI6MjA4MzM3NDUwMX0.WzNZWJCLOC5qhgBpF4A6dBkkPtg66Kpruoq70JiNkdg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
