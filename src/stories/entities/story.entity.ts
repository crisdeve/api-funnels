export interface Clip {
  id: number;
  file: string;
  comment?: string;
}

export class Story {
  id: number;
  clips: Clip[];
}
