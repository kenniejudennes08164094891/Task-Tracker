import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(
    private service: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  | boolean {
      if (!this.service.userIsLoggedIn()){
        this.router.navigate(['/KanbanBoard/login'],{relativeTo: this.route});
        this.service.userLogout();
        return false
      }
      console.info("route props>>", route, state);
      return this.service.userIsLoggedIn();
  }
  
}
