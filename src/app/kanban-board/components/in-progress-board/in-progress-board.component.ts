import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { TaskProfile, Tasks } from 'src/app/models/tasks';
import { ToastsComponent } from '../toasts/toasts.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-in-progress-board',
  templateUrl: './in-progress-board.component.html',
  styleUrls: ['./in-progress-board.component.scss']
})
export class InProgressBoardComponent {

  @Input() filterTasks: string = '';
  inProgressTasks: Tasks[] | any = [
    {
      columnType: 'in-progress',
      title: 'Breakfast',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'in-progress',
      title: 'Lunch',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'in-progress',
      title: 'Dinner',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
    {
      columnType: 'in-progress',
      title: 'Supper',
      description: 'Lorem Ipsum...',
      dueDate: '2024-01-01'
    },
  ]
  totalLength: number = 0
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ModalService,
    private snackbar: MatSnackBar
  ) {
    this.totalLength = this.inProgressTasks.length;
  }
  editTask(item: TaskProfile) {
    this.service.setTask(item)
    this.router.navigate(['/KanbanBoard/edit-task'],
      {
        relativeTo: this.route,
        queryParams: {
          columnType: 'tasks-in-progress'
        }
      }
    );
  }

  deleteItem(item: TaskProfile, index: number) {
    this.inProgressTasks.forEach((row: any, id: number) => {
      if (row === item && id + 1 === index) {
        this.inProgressTasks.splice(index - 1, 1);
        this.totalLength = this.inProgressTasks.length;
        this.service.setSuccessMessage("Task has been deleted successfully!")
        this.snackbar.openFromComponent(ToastsComponent, {
          duration: 4000,
        })
      }
    })
  }

}
