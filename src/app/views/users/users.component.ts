import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: Array<any> = [];
  connectionError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        this.connectionError = true;

        console.error(error);
      })
  }
    
}
