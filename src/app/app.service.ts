import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from './user';

@Injectable()
export class appService 
{
    private id: number;
    private done_id: number;

    private getUser_url ='https://node-server-valuefy.herokuapp.com/api/retrieve';

    constructor() {
        let todos = this.getTodos();
        if(todos.length == 0){
            this.id = 0;
        }else{
            let maxId = todos[todos.length-1].id;
            this.id = maxId + 1;
        }

        let done = this.getDone();
        if(done.length == 0){
            this.done_id = 0;
        }else{
            let max_done_id = done[done.length-1].id;
            this.done_id = max_done_id + 1;
        }      
    }

    public addTodo(text: String): user{
        let todo = new user("sample user",this.id,text);
        let todos = this.getTodos();
        todos.push(todo);

        this.setLocalStorageTodos(todos);
        this.id++;
        return todo;
    }

    public addDone(text: String): user{

        let done = new user("sample user",this.done_id,text);
        let dones = this.getDone();
        dones.push(done);

        this.setLocalStorageDones(dones);
        this.done_id++;
        return done;
    }


    public getTodos(): user[]{
        let LocalStorageItem = JSON.parse(localStorage.getItem('todos'));
        return LocalStorageItem == null ? [] : LocalStorageItem.todos;
    }

    public getDone(): user[]{
        let LocalStorageItem = JSON.parse(localStorage.getItem('dones'));
        return LocalStorageItem == null ? [] : LocalStorageItem.dones;
    }

    public removeTodo(id: number): void{
        let todos = this.getTodos();

        for(var i=0;i< todos.length ;i++){
            if(todos[i].id == id){
              this.addDone(todos[i].todo);
              todos = todos.filter((todo) => todo.id != id);
              this.id--;
              this.setLocalStorageTodos(todos);
              break;
            }
        }

    }

    public updateTodo(id: number,text: String): void{
        let todos = this.getTodos();

        for(var i=0;i< todos.length ;i++){
            if(todos[i].id == id){
              todos[i].todo = text;
              this.setLocalStorageTodos(todos);
              break;
            }
        }

    } 

    private setLocalStorageTodos(todos: user[]): void{
        localStorage.setItem('todos', JSON.stringify({todos: todos}));
    }

    private setLocalStorageDones(dones: user[]): void{
        localStorage.setItem('dones', JSON.stringify({dones: dones}));
    }
}