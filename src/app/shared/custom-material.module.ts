import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressBarModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatStepperModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule
} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';


const modules=[
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule
]

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class CustomMaterialModule {}