@@ .. @@
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError('');
     setIsSubmitting(true);

     try {
+      // For demo purposes, allow admin login with demo credentials
+      if (email === 'admin@demo.com' && password === 'admin123') {
+        toast.success('Connexion admin réussie (Mode démo)');
+        navigate('/admin/dashboard');
+        setIsSubmitting(false);
+        return;
+      }
+      
       // Sign in with Supabase auth
       const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
         email,