import { createClient } from 'npm:@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }

  try {
    // Initialize Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Verify the request is authenticated
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    // Verify the user has admin access
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    
    if (userError || !user) {
      throw new Error('Unauthorized - Invalid user token')
    }

    // Check if user is an admin
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admins')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (adminError) {
      throw new Error(`Admin verification failed: ${adminError.message}`)
    }

    if (!adminData) {
      throw new Error('Unauthorized - Admin access required')
    }

    // Handle different operations based on the request method
    switch (req.method) {
      case 'GET': {
        // Get all users with their metadata and profiles
        const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers()
        if (usersError) {
          throw new Error(`Failed to fetch users: ${usersError.message}`)
        }

        // Get user profiles for each user
        const enrichedUsers = await Promise.all(
          users.map(async (user) => {
            const { data: profile, error: profileError } = await supabaseAdmin
              .from('user_profiles')
              .select('*')
              .eq('id', user.id)
              .single()

            if (profileError && profileError.code !== 'PGRST116') {
              console.error(`Error fetching profile for user ${user.id}:`, profileError)
            }

            return {
              ...user,
              profile: profile || null
            }
          })
        )

        return new Response(
          JSON.stringify({ users: enrichedUsers }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'DELETE': {
        const url = new URL(req.url)
        const userId = url.searchParams.get('userId')
        if (!userId) {
          throw new Error('User ID is required')
        }

        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)
        if (deleteError) {
          throw new Error(`Failed to delete user: ${deleteError.message}`)
        }

        return new Response(
          JSON.stringify({ success: true }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'PATCH': {
        const { userId, email_confirmed_at, resetPassword } = await req.json()
        if (!userId) {
          throw new Error('User ID is required')
        }

        if (resetPassword) {
          const { error: resetError } = await supabaseAdmin.auth.admin.updateUserById(
            userId,
            { password: 'sgladmin' }
          )
          if (resetError) {
            throw new Error(`Failed to reset password: ${resetError.message}`)
          }
        } else if (email_confirmed_at !== undefined) {
          const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            userId,
            { email_confirmed_at }
          )
          if (updateError) {
            throw new Error(`Failed to update email confirmation: ${updateError.message}`)
          }
        }

        return new Response(
          JSON.stringify({ success: true }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 405,
          }
        )
    }
  } catch (error) {
    console.error('Edge function error:', error)
    
    const status = error.message.includes('Unauthorized') ? 403 : 500
    const errorMessage = error.message || 'Internal server error'
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.details || null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status,
      }
    )
  }
})