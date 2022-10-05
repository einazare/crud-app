import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  comments: Array<any> = [];
  connectionError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(response => {
        this.comments = response.data;
      })
      .catch(error => {
        this.connectionError = true;
        console.error(error);
      })
  }

}
