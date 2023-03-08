import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://treiwszmmdfwssmfuewu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZWl3c3ptbWRmd3NzbWZ1ZXd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzEwMDQ1MiwiZXhwIjoxOTkyNjc2NDUyfQ.1x500sNLaqgXkEAHHfZoRkmx0M9bQgGK8gkXT0jQDl8"
);
