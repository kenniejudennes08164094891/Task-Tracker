import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';
import { TaskProfile } from '../models/tasks';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  task!: TaskProfile;
  tasks: Tasks[] = [];
  createTask$: ReplaySubject<any> = new ReplaySubject<any>();
  errorMessage: string = "";
  successMessage: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  public setSuccessMessage(message: string){
    this.successMessage = message;
  }

  public getSuccessMessage(){
    return this.successMessage;
  }

  public setErrorMessage(message: string){
    this.errorMessage = message;
  }

  public getErrorMessage(){
    return this.errorMessage;
  }


  public setTask(profile: TaskProfile) {
    this.task = profile;
  }

  public getTask() {
    return this.task;
  }

  public setCreatedTask(task: TaskProfile): Observable<any> | any {
    this.tasks.push(task)
    return this.createTask$.next(this.tasks);
  }

  public getCreatedTask(): Observable<any> {
    return this.createTask$.asObservable();
  }



  merchantLoginMockData({ email, password, token}: any): Observable<any> {
    if (email !== null && password !== null && token !== null) {
      return of(
        {
          userDetails: {
            name: `${email?.split("@")[0]}`,
            email: email,
            JWT: btoa(email?.split("@")[0]),
            role: "super_admin"
          },
          description: "User has been logged in successfully!"
        }
      )
      
    }
    return throwError(new Error('Failed to Login'));
  }


  setUserData(data: string) {
    localStorage.setItem('user', data);
  }

  getUserData(): string | null {
    return localStorage.getItem('user');
  }
  
  userIsLoggedIn(){
    return this.getUserData() !== null;
  }

  userLogout():void{
    localStorage.clear();
    this.router.navigate(['/KanbanBoard/login'], {relativeTo: this.route});
  }

}
