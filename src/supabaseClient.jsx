import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://gcoudrcusjneiagkmefk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjb3VkcmN1c2puZWlhZ2ttZWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNzkwOTUsImV4cCI6MjAxMzY1NTA5NX0.ct_CvDCH9MWHRsrqJOQETR_DL8PGePm4e96YPNKfq3Q"

export const supabase = createClient(supabaseURL, supabaseAnonKey)