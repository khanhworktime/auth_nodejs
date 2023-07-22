import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../models/database.model';

export default class DBO {
    constructor() {}

    static getInstance(): SupabaseClient {
        return createClient<Database>(
            process.env.DATABASE_URL ?? '',
            process.env.DATABASE_KEY ?? '',
            {
                auth: {
                    persistSession: false,
                },
            }
        );
    }
}
