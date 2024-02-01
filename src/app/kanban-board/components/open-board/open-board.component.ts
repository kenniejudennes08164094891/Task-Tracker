import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskProfile, Tasks } from 'src/app/models/tasks';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-open-board',
  templateUrl: './open-board.component.html',
  styleUrls: ['./open-board.component.scss']
})
export class OpenBoardComponent implements OnInit{

  @Input() filterTasks: string = '';
  taskSubscription$!: Subscription;
  openedTasks:Tasks[] = [
    {
      columnType: 'open',
      title: 'Breakfast',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    // {
    //   columnType: 'open',
    //   title: 'Lauch',
    //   description: 'Lorem Ipsum...',
    //   dueDate: '2024-01-01'
    // },
    // {
    //   columnType: 'open',
    //   title: 'Dinner',
    //   description: 'Lorem Ipsum...',
    //   dueDate: '2024-01-01'
    // },
    // {
    //   columnType: 'open',
    //   title: 'Supper',
    //   description: 'Lorem Ipsum...',
    //   dueDate: '2024-01-01'
    // },
  ]

   totalLength:number = 0
  constructor(private router: Router, private route: ActivatedRoute, private service: ModalService){
      this.totalLength = this.openedTasks.length;
  }

  ngOnInit(): void {
    this.taskSubscription$ = this.service.getCreatedTask().subscribe({
      next: (res: any) => {
       // console.log('res>>>', res);
        this.openedTasks = res;
        this.totalLength = this.openedTasks.length;
      },
      error: (err: any) => {
        console.error('errr>>', err);
      }
    })
  }

  addTask(){
    this.router.navigate(['/KanbanBoard/add-task'], {relativeTo: this.route});
  }

  editTask(item:TaskProfile){
    this.service.setTask(item);
    this.router.navigate(['/KanbanBoard/edit-task'], 
    {
      relativeTo: this.route,
      queryParams: {
        columnType: 'open-tasks'
      }
    }
    );
  }

  deleteItem(item: TaskProfile, index: number){
    this.openedTasks.forEach((row:any, id: number) => {
      if(row === item && id+1 === index){
         this.openedTasks.splice(index-1, 1);
         this.totalLength = this.openedTasks.length;
      }
    })
  }
}
