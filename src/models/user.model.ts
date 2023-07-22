import { Database } from './database.model';

export type User = Partial<Database['public']['Tables']['users']['Row']>;
