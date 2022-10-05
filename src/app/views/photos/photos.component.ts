import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, AfterViewInit {

  photos: Array<any> = [];
  connectionError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(pR => {
        this.photos = pR.data;
      })
      .catch(error => {
        this.connectionError = true;
        console.error(error);
      })
  }

}
