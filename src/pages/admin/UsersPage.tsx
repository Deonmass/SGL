@@ .. @@
   const fetchUsers = async () => {
     try {
       setLoading(true);
+      
+      // For demo purposes, use mock data
+      if (import.meta.env.VITE_SUPABASE_URL?.includes('demo')) {
+        const mockUsers = [
+          {
+            id: '1',
+            email: 'user1@example.com',
+            created_at: '2024-01-15T10:00:00Z',
+            last_sign_in_at: '2024-03-15T14:30:00Z',
+            email_confirmed_at: '2024-01-15T10:05:00Z',
+            user_metadata: { name: 'Jean Dupont' },
+            profile: {
+              name: 'Jean Dupont',
+              email: 'user1@example.com',
+              phone_number: '+243123456789',
+              societe: 'Entreprise ABC'
+            }
+          },
+          {
+            id: '2',
+            email: 'user2@example.com',
+            created_at: '2024-02-01T09:00:00Z',
+            last_sign_in_at: null,
+            email_confirmed_at: null,
+            user_metadata: { name: 'Marie Martin' },
+            profile: {
+              name: 'Marie Martin',
+              email: 'user2@example.com',
+              phone_number: '+243987654321',
+              societe: 'Société XYZ'
+            }
+          }
+        ];
+        
+        setUsers(mockUsers);
+        
+        const stats: UserStats = {
+          total: mockUsers.length,
+          active: mockUsers.filter(u => u.email_confirmed_at).length,
+          pending: mockUsers.filter(u => !u.email_confirmed_at).length,
+          recent: 1
+        };
+        
+        setStats(stats);
+        setLoading(false);
+        return;
+      }
+      
       const { data: session } = await supabase.auth.getSession();