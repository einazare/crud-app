import { AfterViewInit, Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit {

  posts: Array<any> = [];
  connectionError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        this.connectionError = true;
        console.error(error);
      })
  }

}
