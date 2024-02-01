import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';
import { TaskProfile } from '../models/tasks';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  task!: TaskProfile;
  tasks: Tasks[] = [];
  createTask$: ReplaySubject<any> = new ReplaySubject<any>();
 constructor() {}

 public setTask(profile: TaskProfile){
  this.task = profile;
 }

 public getTask(){
  return this.task;
 }

 public setCreatedTask(task: TaskProfile): Observable<any> | any{
  this.tasks.push(task)
 // console.log('Tasks>>>', this.tasks);
  return this.createTask$.next(this.tasks);
 }

 public getCreatedTask():Observable<any>{
  return this.createTask$.asObservable();
 }

}
