import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ToastsComponent } from '../toasts/toasts.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.scss']
})
export class DisplayBoardComponent implements OnInit {

  taskForm!: FormGroup;
  theme: string = 'Select a title';
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private service: ModalService,
    private snackbar: MatSnackBar
    ){}

    taskFormControl(){
      this.taskForm = new FormGroup({
        columnType: new FormControl('open', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        dueDate: new FormControl('', [Validators.required]),
      })
    }

    ngOnInit(): void {
      this.taskFormControl();
    }



  createTask(){
    this.service.setCreatedTask( this.taskForm.value);
    this.service.setSuccessMessage("Task has been created successfully!")
    this.snackbar.openFromComponent(ToastsComponent,{
      duration: 4000,
    })
    this.router.navigate(['/KanbanBoard/dashboard'],{relativeTo: this.route});
  }
}
