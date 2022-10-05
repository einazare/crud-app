import { Component, OnInit, AfterViewInit } from '@angular/core';
import axios from 'axios';
import { timeInterval, timeout } from 'rxjs';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, AfterViewInit {

  albums: Array<any>;
  connectionError: boolean = false;

  constructor() {
    console.log("constructor - se cheama primul");
    this.albums = [];

  }

  ngOnInit(): void {
    console.log("ngOnInit - imediat dupa constructor");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit - in momentul in care HTML-ul din .component.html este pus in browser");

    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        console.log(response);
        this.albums = response.data;
      })
      .catch(error => {
        this.connectionError = true;
        console.error(error);
      });

    console.log("mesaj dupa axios.get");
    
    
  }

  updateAlbum(albumId: number): void {
    // console.log(albumId);

    // console.log(parseInt((<HTMLInputElement>document.getElementById("user-id")).value));
    // console.log((<HTMLInputElement>document.getElementById("album-title")).value);

    let config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    this.albums = this.albums.map(album => {
      if (album.id === albumId) {
        return {
          ...album,
          userId: parseInt((<HTMLInputElement>document.getElementById("user-id")).value),
          title: (<HTMLInputElement>document.getElementById("album-title")).value,
          loading: true
        }
      } else {
        return album;
      }
    })

    axios
      .put(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`,
        {
          "userId": parseInt((<HTMLInputElement>document.getElementById("user-id")).value),
          "title": (<HTMLInputElement>document.getElementById("album-title")).value
        },
        config
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.albums = this.albums.map(album => {
            if (album.id === response.data.id) {
              return response.data;
            } else {
              return album;
            }
          })
        }
      })
      .catch(error => {
        this.albums = this.albums.map(album => {
          if (album.id === albumId) {
            return {
              ...album,
              loading: false,
              error: true
            };
          } else {
            return album;
          }
        })

        setTimeout(() => {
          this.albums = this.albums.map(album => {
            if (album.id === albumId) {
              return {
                ...album,
                error: false
              };
            } else {
              return album;
            }
          })
        }, 4000);

        console.error(error);
      })

  }

}
