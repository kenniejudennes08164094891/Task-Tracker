import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { TaskProfile,Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-pending-board',
  templateUrl: './pending-board.component.html',
  styleUrls: ['./pending-board.component.scss']
})
export class PendingBoardComponent {

  @Input() filterTasks: string = '';
  pendingTasks:Tasks[]|any = [
    {
      columnType: 'pending',
      title: 'Breakfast',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'pending',
      title: 'Lunch',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'pending',
      title: 'Dinner',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'pending',
      title: 'Supper',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
  ]
  totalLength:number = 0
  constructor(private router: Router, private route: ActivatedRoute, private service: ModalService){
    this.totalLength = this.pendingTasks.length;
  }


  editTask(item: TaskProfile){
    this.service.setTask(item)
    this.router.navigate(['/KanbanBoard/edit-task'], 
    {
      relativeTo: this.route,
      queryParams: {
        columnType: 'pending-tasks'
      }
    }
    );
  }

  deleteItem(item: TaskProfile, index: number){
    this.pendingTasks.forEach((row:any, id: number) => {
      if(row === item && id+1 === index){
         this.pendingTasks.splice(index-1, 1);
         this.totalLength = this.pendingTasks.length;
      }
    })
  }

}
