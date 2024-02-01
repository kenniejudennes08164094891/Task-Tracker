import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observer } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { ToastsComponent } from './components/toasts/toasts.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  filterTaskValue: string = '';
  username: string = '';
  profile: string = "/assets/images/kenny.JPEG";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ModalService,
    private snackbar: MatSnackBar
  ) {
    this.route.queryParams.subscribe((param: Partial<Observer<Params>> | any) => {
      const paramValue: any = param;
      this.username = paramValue?.email?.split("@")[0]
    })
  }

  taskProp(prop: any): void {
    this.filterTaskValue = prop?.target?.value;
  }


  decodeUserDetails() {
    try {
      const getUserData: any = this.service.getUserData();
      let parseData = JSON.parse(getUserData);
      const decodeJwt = atob(parseData?.JWT);
      this.username = decodeJwt;
    } catch (err: any) {
      if (err) {
        this.service.userLogout();   // user automatically logs out if JWT doesn't exist in local storage
        this.service.setErrorMessage("Oops!...Jwt is expired, please login properly!")
        this.snackbar.openFromComponent(ToastsComponent, {
          duration: 4000,
        })
      }
    }
  }

  ngOnInit(): void {
    this.decodeUserDetails();
  }



  logout() {
    this.service.userLogout();
    this.service.setSuccessMessage("User has been logged out succesfully")
    this.snackbar.openFromComponent(ToastsComponent, {
      duration: 4000,
    })
  }




}
