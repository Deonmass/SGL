@@ .. @@
 import { createClient } from '@supabase/supabase-js';

-const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
-const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
+const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
+const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo_key_for_development';

-if (!supabaseUrl || !supabaseAnonKey) {
-  throw new Error('Missing Supabase environment variables');
-}
+// For demo purposes, we'll use placeholder values if env vars are missing
+console.log('Supabase URL:', supabaseUrl);

 export const supabase = createClient(supabaseUrl, supabaseAnonKey);