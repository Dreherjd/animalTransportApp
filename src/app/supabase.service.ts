import { Injectable } from '@angular/core'
import { LoadingController, ToastController } from '@ionic/angular'
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../environments/environment'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const dbName = 'AnimalTransportApp'

export interface Profile {
  username: string
  website: string
  avatar_url: string
}

export interface user{
  user_id: BigInteger;
  full_name: String;
  vehicle_type: String;
  makeModel: String;
  role: String;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  private _users: BehaviorSubject<user[]> = new BehaviorSubject([]);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get users(): Observable < user[]>{
    return this._users.asObservable();
  }

  async getUsers(){
    const query = await this.supabase.from('users').select('*');
    this._users.next(query.data);
  }
}