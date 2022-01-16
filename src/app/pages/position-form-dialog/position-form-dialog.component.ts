import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Position, PositionDto } from 'src/app/models/position.interface';
import { PositionService } from 'src/app/services/position.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-position-form-dialog',
  templateUrl: './position-form-dialog.component.html',
  styleUrls: ['./position-form-dialog.component.scss'],
})
export class PositionFormDialogComponent implements OnInit {
  position: Position;
  form: FormGroup;

  constructor(
    protected positionService: PositionService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.getSelectedPosition();
  }

  // Register Form Controls
  createFormGroup(): void {
    this.form = new FormGroup({
      positionName: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      jobDescriptionPDF: new FormControl(null),
    });
  }

  /**
   * Update Position
   */
  updatePosition(): void {
    // positionDto podría ser una clase y setear los valores del form.
    const positionDto: PositionDto = {
      id: this.position.id,
      positionName: this.form.controls.positionName.value,
      technology: this.form.controls.technology.value,
      jobDescriptionPDF: this.form.controls.jobDescriptionPDF.value,
    };

    if (this.form.valid) {
      this.positionService.updatePosition(positionDto).subscribe((res) => {
        if (res) {
          this.ref.close(true);
          this.positionService.setSelectedPosition(null);
          // FIXME: substituir por un success o error toast
          console.log('Posición guardada correctamente');
        } else {
          console.log('Error interno, no se pudo realizar la acción');
        }
      });
    } else {
      console.log('Revise el formulario');
    }
  }

  /**
   * Get position
   */
  getSelectedPosition(): void {
    this.position = this.positionService.selectedPosition;
    this.setDefaultValue();
  }

  /**
   * Set initial values
   */
  setDefaultValue(): void {
    this.form.controls.positionName.setValue(this.position.name);
    this.form.controls.technology.setValue(this.position.technology);
    this.form.controls.jobDescriptionPDF.setValue(this.position.pdf);
  }
}
