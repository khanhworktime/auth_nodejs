export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    created_at: string | null;
                    email: string;
                    id?: string;
                    password: string;
                    refreshToken: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    email: string;
                    id: string;
                    password: string;
                    refreshToken: string | null;
                };
                Update: {
                    created_at?: string | null;
                    email?: string;
                    id?: string;
                    password?: string;
                    refreshToken: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
