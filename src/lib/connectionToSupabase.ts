import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const login = async () => {
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    await supabase.auth.signUp({
      email: 'ale@ldn.com',
      password: '321321',
    });
  }
};
