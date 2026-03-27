function getAuthClient() {
  return window.neewieSupabase ? window.neewieSupabase.client : null;
}

function authConfigured() {
  return window.neewieSupabase && window.neewieSupabase.isReady;
}

function getLoginRedirectUrl() {
  return new URL("login.html", window.location.href).href;
}

async function registerUser(name, email, password) {
  if (!authConfigured()) {
    return { error: { message: "Add your Supabase project URL and anon key in js/supabase.js first." } };
  }

  const client = getAuthClient();

  return client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getLoginRedirectUrl(),
      data: {
        display_name: name,
      },
    },
  });
}

async function loginUser(email, password) {
  if (!authConfigured()) {
    return { error: { message: "Add your Supabase project URL and anon key in js/supabase.js first." } };
  }

  return getAuthClient().auth.signInWithPassword({
    email,
    password,
  });
}

async function logoutUser() {
  if (!authConfigured()) {
    return { error: { message: "Supabase is not set up yet." } };
  }

  return getAuthClient().auth.signOut();
}

async function getSession() {
  if (!authConfigured()) {
    return { session: null };
  }

  const { data, error } = await getAuthClient().auth.getSession();

  if (error) {
    return { session: null, error };
  }

  return { session: data.session };
}

async function getCurrentUser() {
  if (!authConfigured()) {
    return { user: null };
  }

  const { data, error } = await getAuthClient().auth.getUser();

  if (error) {
    return { user: null, error };
  }

  return { user: data.user };
}

function onAuthChange(callback) {
  if (!authConfigured()) {
    return null;
  }

  return getAuthClient().auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}

function getDisplayName(user) {
  if (!user) {
    return "";
  }

  return user.user_metadata?.display_name || user.email || "Neewie writer";
}

window.neewieAuth = {
  registerUser,
  loginUser,
  logoutUser,
  getSession,
  getCurrentUser,
  onAuthChange,
  getDisplayName,
  authConfigured,
};
