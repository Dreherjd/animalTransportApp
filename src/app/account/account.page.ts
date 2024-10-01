import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, SupabaseService, user } from '../supabase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public listOfUsers: user[];


  constructor(
    private readonly supabase: SupabaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.supabase.getUsers.subscribe(res =>{
      this.listOfUsers = res;
    });
  }

  async getUser(): Promise<void>{
    
  }


}
