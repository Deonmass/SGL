@@ .. @@
   useEffect(() => {
     document.title = 'SHIPPING GL - Solutions Logistiques & Agence en Douane';
     
     // Simulate loading
     const loadingTimer = setTimeout(() => {
       setLoading(false);
-      setShowAnniversary(true);
+      // Only show anniversary modal on first visit
+      const hasSeenAnniversary = localStorage.getItem('hasSeenAnniversary');
+      if (!hasSeenAnniversary) {
+        setShowAnniversary(true);
+        localStorage.setItem('hasSeenAnniversary', 'true');
+      }
-    }, 3000);
+    }, 2000);

     return () => {
       clearTimeout(loadingTimer);