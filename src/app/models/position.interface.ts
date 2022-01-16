export interface Response {
  data: Position[];
  meta?: { error: any };
}

export interface Position {
  id: number;
  name: string;
  technology: string;
  candidates: number;
  pdf: any;
  category: number;
}

export interface PositionDto {
  id: number;
  positionName: string;
  technology: string;
  jobDescriptionPDF: File;
}

export interface Meta {
  error: string;
}
