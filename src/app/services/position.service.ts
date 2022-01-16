import {
  Position,
  PositionDto,
  Response,
} from './../models/position.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  GATEWAY = environment.gateway;
  API = environment.api_positions;
  POSITIONS = '/positions';

  selectedPosition$ = new Subject<Position>();
  selectedPosition: any;

  constructor(protected http: HttpClient) {}

  // API
  // Nota: Si el servicio es demasiado grande se separarían en 2 servicios uno API y otro datos a manejar como Subjects etc.

  /**
   * Get Positions List
   */
  getAllPositions(): Observable<Position[]> {
    return this.http.get<Response>('/assets/data.json').pipe(
      map((res) => {
        return res.data;
      }),
      catchError((err) => throwError(err)),
      shareReplay(1)
    );
  }

  /**
   * Edit Position
   * @param PositionDto positionDto
   */
  updatePosition(positionDto: PositionDto): Observable<PositionDto> {
    return this.http
      .put<PositionDto>(this.GATEWAY + this.API + this.POSITIONS, positionDto)
      .pipe(
        catchError((err) => throwError(err)),
        shareReplay(1)
      );
  }

  // OBSERVABLES

  /**
   * Observable selected position
   */
  getSelectedPosition(): Observable<Position> {
    return this.selectedPosition$.asObservable();
  }

  /**
   * Set selected position
   */
  setSelectedPosition(position: Position): void {
    this.selectedPosition = position;
    this.selectedPosition$.next(position);
  }
}
