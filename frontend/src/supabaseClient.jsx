import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://uhdwywcjhzlmwpsotulg.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoZHd5d2NqaHpsbXdwc290dWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5Njc5NDAsImV4cCI6MjA2MDU0Mzk0MH0.VAmt0VckSeitTbokEpzPrFcFJUud0aNsNoITb8TW_Ts'
)
export default supabase