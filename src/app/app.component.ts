import { Component } from '@angular/core';
import { appService } from './app.service';
import { user } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [appService]
})

export class AppComponent {
  todo_text: String;
  model: String;
  bool: number = -1;
  name : String;
  id: number;  
  allTodos:any = [];
  allDone:any = [];
  ShowEditList:boolean = false;
  EditListID: any = '';


  constructor(private _appService: appService) { } 
 
  ngOnInit(): void { 
      this.getTodo(); 
      this.getDone();
  }

  addTodo(): void {
    if (this.todo_text != '') {
      //console.log("clicked");
      var todo = this._appService.addTodo(this.todo_text);  
      this.allTodos.push(todo);
    }else{
      
    }
  }

  removeTodo(id: number): void{
    var self = this;
    this.bool = id;

    setTimeout(function(){
      self.allTodos = self.allTodos.filter((todo) => todo.id != id);
      self._appService.removeTodo(id);
      self.allDone = self._appService.getDone();
      console.log(self.allDone);
      self.bool = -1; 
    }, 1000);
    
  }

  getTodo(){
      this.allTodos = this._appService.getTodos();
      //console.log(this.allTodos);
  }

  getDone(){
    this.allDone = this._appService.getDone();
    //console.log(this.allTodos);
}

  Edit(val: number){
    this.EditListID = val;
  }

  update($event,val:number){

    this._appService.updateTodo(val,$event.target.value);
    this.getTodo();
    this.EditListID = '';
  }
  
}
