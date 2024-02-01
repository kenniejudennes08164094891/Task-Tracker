import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/KanbanBoard/login', pathMatch: 'full'},
  { path: 'KanbanBoard', loadChildren: () => import('./kanban-board/kanban-board.module').then(m => m.KanbanBoardModule), 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
