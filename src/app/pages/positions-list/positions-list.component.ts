import { Observable } from 'rxjs';
import { PositionService } from './../../services/position.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PositionFormDialogComponent } from '../position-form-dialog/position-form-dialog.component';
import { Position } from 'src/app/models/position.interface';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.scss'],
})
export class PositionsListComponent implements OnInit {
  positionList$: Observable<Position[]>;
  newPositionList: Position[];
  activePositionList: Position[];
  inactivePositionList: Position[];

  selectOptions = [
    { name: 'Nombre asc', value: 'name', order: 'asc' },
    { name: 'Nombre desc', value: 'name', order: 'desc' },
    { name: 'Tecnología asc', value: 'technology', order: 'asc' },
    { name: 'Tecnología desc', value: 'technology', order: 'desc' },
    { name: 'Número de candidatos asc', value: 'candidates', order: 'asc' },
    { name: 'Número de candidatos desc', value: 'candidates', order: 'desc' },
  ];

  cols = [
    { field: 'id', header: 'id' },
    { field: 'name', header: 'Nombre' },
    { field: 'technology', header: 'Tecnologia' },
    { field: 'candidates', header: 'Candidatos' },
  ];

  selectedOption1: string;
  selectedOption2: string;
  selectedOption3: string;

  constructor(
    private positionService: PositionService,
    public dialogService: DialogService
  ) {
    this.positionList$ = this.positionService.getAllPositions();
  }

  ngOnInit(): void {
    this.getAllPositions();
  }

  getAllPositions(): void {
    this.newPositionList = [];
    this.activePositionList = [];
    this.inactivePositionList = [];

    this.positionList$
      .pipe(
        map((res) => {
          if (res) {
            res.forEach((position) => {
              switch (position.category) {
                case 1:
                  this.newPositionList.push(position);
                  break;
                case 2:
                  this.activePositionList.push(position);
                  break;
                case 3:
                  this.inactivePositionList.push(position);
                  break;
              }
            });
          }
        })
      )
      .subscribe();
  }

  /**
   * Open a dynamic dialog
   */
  editPosition(rowData: Position): void {
    this.positionService.setSelectedPosition(rowData);

    const ref = this.dialogService.open(PositionFormDialogComponent, {
      header: 'Detalles de la posición',
      width: '60%',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      dismissableMask: true,
    });
    ref.onClose.subscribe(() => {
      this.getAllPositions();
    });
  }

  sortArrayByColumn(event: string, array: Position[]): void {
    const option = this.selectOptions.find((o) => o.name === event);

    if (option.order === 'asc') {
      array.sort((a, b) => {
        if (a[option.value] < b[option.value]) {
          return -1;
        }
        if (a[option.value] > b[option.value]) {
          return 1;
        }
        return 0;
      });
    } else {
      array.sort((a, b) => {
        if (a[option.value] < b[option.value]) {
          return 1;
        }
        if (a[option.value] > b[option.value]) {
          return -1;
        }
        return 0;
      });
    }
  }
}
