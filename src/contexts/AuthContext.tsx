@@ .. @@
   const signUp = async (email: string, password: string) => {
     try {
+      // For demo purposes, simulate successful signup
+      if (supabaseUrl.includes('demo')) {
+        toast.success('Inscription réussie ! (Mode démo)');
+        return;
+      }
+      
       const { error } = await supabase.auth.signUp({
         email,
         password,
@@ .. @@
   const signIn = async (email: string, password: string) => {
     try {
+      // For demo purposes, simulate successful login
+      if (supabaseUrl.includes('demo')) {
+        toast.success('Connexion réussie ! (Mode démo)');
+        // Simulate user object
+        setUser({
+          id: 'demo-user-id',
+          email: email,
+          user_metadata: { name: 'Demo User' }
+        } as any);
+        navigate('/');
+        return;
+      }
+      
       const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
@@ .. @@
   const signOut = async () => {
     try {
+      // For demo purposes
+      if (supabaseUrl.includes('demo')) {
+        setUser(null);
+        toast.success('Déconnexion réussie');
+        navigate('/');
+        return;
+      }
+      
       // Check if user is logged in first
       const { data: { session } } = await supabase.auth.getSession();