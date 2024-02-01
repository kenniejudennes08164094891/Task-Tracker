import { Component , OnInit} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit{
  errorMessage: string = "";
  successMessage: string = "";
  showErrorMessage: boolean = false;
  showSucessMessage: boolean = false

  constructor(private service: ModalService){}


  getErrorMessage(){
    this.showErrorMessage = true;
    this.errorMessage = this.service.getErrorMessage();
  }

  getSuccessMessage(){
    this.showSucessMessage = true;
    this.successMessage = this.service.getSuccessMessage();
  }

  ngOnInit(): void {
    this.getErrorMessage();
    this.getSuccessMessage();
  }


}
