import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {

 filterTaskValue:string = '';
 username: string ='';
  profile: string = "/assets/images/kenny.JPEG";
  constructor(private router: Router, private route: ActivatedRoute){
    this.route.queryParams.subscribe((param: Partial<Observer<Params>> | any) => {
     const paramValue:any = param;
      this.username =  paramValue?.username?.split("@")[0]
    })
  }

  taskProp(prop:any): void{
    this.filterTaskValue = prop?.target?.value;
  }


  logout(){
    this.router.navigate(['/KanbanBoard/login'], {relativeTo: this.route});
  }

  
}
