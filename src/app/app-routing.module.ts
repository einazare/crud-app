import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// layouts
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PresentationComponent } from './layouts/presentation/presentation.component';
// views
import { AlbumsComponent } from './views/albums/albums.component';
import { CommentsComponent } from './views/comments/comments.component';
import { IndexComponent } from './views/index/index.component';
import { PhotosComponent } from './views/photos/photos.component';
import { PostsComponent } from './views/posts/posts.component';
import { TodosComponent } from './views/todos/todos.component';
import { UsersComponent } from './views/users/users.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "albums",
        component: AlbumsComponent,
      },
      {
        path: "comments",
        component: CommentsComponent
      },
      {
        path: "photos",
        component: PhotosComponent
      },
      {
        path: "posts",
        component: PostsComponent
      },
      {
        path: "todos",
        component: TodosComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        // /dashboard/p* -> /dashboard/todos
        // /dashboard/photos -> /dashboard/todos
        // /dashboard/posts -> /dashboard/todos
        // path: "p", redirectTo: "todos", pathMatch: "prefix"

        path: "**", redirectTo: "todos", pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    component: PresentationComponent,
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "**", redirectTo: "", pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
