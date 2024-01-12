import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const login = async () => {
  const ddd = await supabase.auth.signUp({
    email: 'ale@ldn.com',
    password: '321321',
  });

  console.log(ddd);
};

login();
