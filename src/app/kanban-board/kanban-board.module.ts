import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanBoardRoutingModule } from './kanban-board-routing.module';
import { KanbanBoardComponent } from './kanban-board.component';
import { DisplayBoardComponent } from './components/display-board/display-board.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';
import { OpenBoardComponent } from './components/open-board/open-board.component';
import { PendingBoardComponent } from './components/pending-board/pending-board.component';
import { InProgressBoardComponent } from './components/in-progress-board/in-progress-board.component';
import { CompletedBoardComponent } from './components/completed-board/completed-board.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { FilterPipe } from './pipes/filter.pipe';


const materialModules = [
  MatIconModule,MatButtonModule,MatDialogModule, MatSelectModule
]

@NgModule({
  declarations: [
    KanbanBoardComponent,
    DisplayBoardComponent,
    EditBoardComponent,
    OpenBoardComponent,
    PendingBoardComponent,
    InProgressBoardComponent,
    CompletedBoardComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    KanbanBoardRoutingModule,
    materialModules,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class KanbanBoardModule { }
