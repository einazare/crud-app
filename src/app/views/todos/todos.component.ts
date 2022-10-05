import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, AfterViewInit {

  todos: Array<any> = [];
  connectionError: boolean = false;
  closeResult: String = '';

  postingNewTodo: boolean = false;
  postNewTodoError: boolean = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        setTimeout(() => {
          this.todos = response.data;
        }, 1000);
      })
      .catch(error => {
        this.connectionError = true;
        console.error(error);
      })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === "Create click") {
        let config = {
          headers: {
            "Content-type": "application/json",
          }
        }

        this.postingNewTodo = true;
        this.postNewTodoError = false;

        axios
          .post("https://jsonplaceholder.typicode.com/todos", {
            userId: parseInt((<HTMLInputElement>document.getElementById("new-todo-user-id")).value),
            title: (<HTMLInputElement>document.getElementById("new-todo-title")).value,
            completed: (<HTMLInputElement>document.getElementById("new-todo-completed")).checked
          },
            config 
          )
          .then(response => {
            // this.todos.push(response.data);
            // this.todos = [...this.todos, response.data];
            this.todos = [response.data, ...this.todos];
            this.postingNewTodo = false;
          })
          .catch(error => {
            this.postingNewTodo = false;
            this.postNewTodoError = true;

            setTimeout(() => {
              this.postNewTodoError = false;
            }, 4000)

            console.error(error);
          })

      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  switchCompleted(event: any, todoId: number) {
    // console.log(event.target.checked);
    // console.log(todoId);

    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
    // console.log(todoIndex);

    // this.todos[todoIndex] === { "userId": <number>, "id": <number>, "title": <string>, "completed": <boolean> }

    // x = { ...this.todos[todoIndex] } -> asta inseamna ca in X vreau sa il copiez pe this.todos[todoIndex]
    // x si this.todos[todoIndex] sunt doua obiecte care seamana, dar sunt total diferite
    // adica x nu afecteaza pe this.todos[todoIndex] si nici invers
    
    // x = this.todos[todoIndex] -> asta inseamna ca X in memorie este acelasi cu this.todos[todoIndex]
    // x il afecteaza pe this.todos[todoIndex] si this.todos[todoIndex] pe x astfel:
    // adica daca in x modificam ceva, modificare se face automat si pe this.todos[todoIndex]
    // sau daca in this.todos[todoIndex] modificam ceva, modificare se face automat si pe x
    if (todoIndex !== -1) {
      this.todos[todoIndex] = {
        ...this.todos[todoIndex],
        loading: true
      };
    }

    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    // pentru todoId === 1
    // `https://jsonplaceholder.typicode.com/todos/${todoId}`
    //    => "https://jsonplaceholder.typicode.com/todos/1"
    axios
      .patch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        {
          completed: event.target.checked,
          // aici pe langa completed: event.target.checked,
          // mai putem pune si altceva
          // spre exemplu:
          // title: "My new title",
          // id: 203,
          // userId: 19,
        },
        config
      )
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          this.todos[todoIndex] = {
            ...response.data,
          };
        }
      })
      .catch(error => {
        console.error(error);
      })

  }

  deleteTodo(todoId: number) {
    // console.log(todoId);
    
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      this.todos[todoIndex] = {
        ...this.todos[todoIndex],
        deleting: true
      };
    }

    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then(response => {
        if (response.status === 200) {
          this.todos = this.todos.filter(todo => todo.id !== todoId)
        }
      })
      .catch(error => {
        console.error(error);
      })

  }

}
