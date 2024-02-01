import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {


  taskForm!: FormGroup;
  dueDates: string = '2024-01-23'
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private service: ModalService,
    ){}

    taskFormControl(){
      this.taskForm = new FormGroup({
        columnType: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        dueDate: new FormControl('', [Validators.required]),
      })
    }

    ngOnInit(): void {
    this.taskFormControl();
    this.taskForm.patchValue(this.service.getTask());
    this.dueDates = this.service.getTask()?.dueDate;
    
    }

  editTask(){
    // console.log("payload>>>", this.taskForm.value);
    this.router.navigate(['/KanbanBoard/dashboard'],{relativeTo: this.route});
  }

  

}
