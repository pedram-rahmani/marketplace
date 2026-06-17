export interface DBMenuItem {
  id: string;
  name: string;
  level: number;
  parent_id: string | null;
}
