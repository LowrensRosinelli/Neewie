const supabaseUrl = "https://scrvroepexbsimjpcgni.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcnZyb2VwZXhic2ltanBjZ25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTk4NDMsImV4cCI6MjA5MDE5NTg0M30.gho7LHMGDB5yIgMZvgvnJ_9ceprrmcKLGINUEGUq7nI";

const supabaseReady = typeof window.supabase !== "undefined";
const supabaseClient = supabaseReady ? window.supabase.createClient(supabaseUrl, supabaseAnonKey) : null;

window.neewieSupabase = {
  client: supabaseClient,
  isReady: supabaseReady,
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
};
