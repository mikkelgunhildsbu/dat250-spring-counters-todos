import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Define the interface outside the Component
export interface Todo {
  id: number;
  description: string;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  todos: Todo[] = [];
  newTodo: Todo = { id: 0, description: '', summary: '' };  // Here, I added an id property to newTodo just for initialization. You might want to adjust this based on your backend API.
  private url = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.http.get<Todo[]>(this.url).subscribe(data => {
      this.todos = data;
    });
  }

  deleteTodo(id: number): void {
    this.http.delete(this.url + '/' + id).subscribe(() => {
      this.loadTodos();
    });
  }

  addTodo() {
    this.http.post(this.url, this.newTodo).subscribe(() => {
      this.loadTodos();
      this.newTodo = {id: 0, description: '', summary: '' };
    });
  }
}
