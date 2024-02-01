import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { TaskProfile, Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-completed-board',
  templateUrl: './completed-board.component.html',
  styleUrls: ['./completed-board.component.scss']
})
export class CompletedBoardComponent {

 @Input() filterTasks: string = '';
  completedTasks:Tasks[]|any = [
    {
      columnType: 'completed',
      title: 'Breakfast',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'completed',
      title: 'Lunch',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'completed',
      title: 'Dinner',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'completed',
      title: 'Supper',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
  ]
  totalLength:number = 0
  constructor(private router: Router, private route: ActivatedRoute, private service: ModalService){
    this.totalLength = this.completedTasks.length;
  }

  editTask(item:TaskProfile){
    this.service.setTask(item);
    this.router.navigate(['/KanbanBoard/edit-task'], 
    {
      relativeTo: this.route,
      queryParams: {
        columnType: 'completed-tasks'
      }
    }
    );
  }

  deleteItem(item: TaskProfile, index: number){
    this.completedTasks.forEach((row:any, id: number) => {
      if(row === item && id+1 === index){
         this.completedTasks.splice(index-1, 1);
         this.totalLength = this.completedTasks.length;
      }
    })
  }


}
