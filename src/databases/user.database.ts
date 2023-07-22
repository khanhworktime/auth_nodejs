import DBO from './dbo.database';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { User } from '../models/user.model';

export default class UserDBO extends DBO {
    constructor() {
        super();
    }

    static async getUsers(): Promise<User[]> {
        const { data, error }: PostgrestSingleResponse<User[]> =
            await DBO.getInstance().from('users').select();
        if (data !== null) return data;
        console.log(error);
        return [];
    }
    static async getUserById(userId: string): Promise<User | null> {
        const { data, error }: PostgrestSingleResponse<User> =
            await DBO.getInstance()
                .from('users')
                .select()
                .eq('id', userId)
                .single();
        if (data !== null) return data;
        console.log(error);
        return null;
    }
    static async getUserByEmail(email: string): Promise<User | null> {
        const { data, error }: PostgrestSingleResponse<User> =
            await DBO.getInstance()
                .from('users')
                .select('id, email, password')
                .eq('email', email)
                .single();
        if (data !== null) return data;
        console.log(error);
        return null;
    }
    static async getUserByRefreshToken(
        refreshToken: string
    ): Promise<User | null> {
        const { data, error }: PostgrestSingleResponse<User> =
            await DBO.getInstance()
                .from('users')
                .select('id, email, refreshToken')
                .eq('refreshToken', refreshToken)
                .single();
        if (data !== null) return data;
        console.log(error);
        return null;
    }
    static async createUser(
        email: string,
        password: string
    ): Promise<User | null> {
        const { data, error }: PostgrestSingleResponse<User> =
            await DBO.getInstance()
                .from('users')
                .insert({ email, password })
                .select('id, email, created_at')
                .single();
        if (data !== null) return data;
        console.log(error);
        return null;
    }
    static async updateUser({
        id,
        email,
        password,
        refreshToken,
    }: User): Promise<User | null> {
        const { data, error }: PostgrestSingleResponse<User> =
            await DBO.getInstance()
                .from('users')
                .update({ email, password, refreshToken })
                .eq('id', id)
                .select()
                .single();
        if (data !== null) return data;
        console.log(error);
        return null;
    }
}
