# After completing browser login, run these commands:

# Link to remote project
npx supabase link --project-ref rwwubiimzkxmeqpwtsjn

# Check what migrations need to be applied
npx supabase db diff

# Push local migrations to remote
npx supabase db push

# Verify the remote database structure
npx supabase db remote list