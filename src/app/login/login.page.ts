import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
  }
  email = '';

  async handleLogin(event: any){
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()
    try{
      const { error } = await this.supabase.signIn(this.email)
      if(error){
        throw error
      }
      await loader.dismiss()
      await this.supabase.createNotice('Check your email for a login link')
    } catch(error: any){
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }
}
