@@ .. @@
         <video
           autoPlay
           loop
           muted
           playsInline
+          poster="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
           className="absolute inset-0 w-full h-full object-cover"
         >
-          <source src="https://videos.pexels.com/video-files/33063525/14092471_1920_1080_30fps.mp4" type="video/mp4" />
-          <source src="https://videos.pexels.com/video-files/33063525/14092471_1920_1080_30fps.mp4" type="video/mp4" />
-          {/* Fallback image if video doesn't load */}
-          <img 
-            src="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
-            alt="Logistics background"
-            className="w-full h-full object-cover"
-          />
         </video>
+        {/* Fallback image if video doesn't load */}
+        <div 
+          className="absolute inset-0 bg-cover bg-center"
+          style={{ 
+            backgroundImage: 'url(https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)'
+          }}
+        />
         {/* Subtle overlay for text readability */}
         <div className="absolute inset-0 bg-black/30"></div>
       </div>