import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';
import { DisplayBoardComponent } from './components/display-board/display-board.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: KanbanBoardComponent },
  { path: 'edit-task', component: EditBoardComponent },
  { path: 'add-task', component: DisplayBoardComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanBoardRoutingModule { }
