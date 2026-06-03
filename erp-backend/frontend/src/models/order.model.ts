export interface Order{
  id: number;
  name: string;
  status: string;
  product:string;
  quantity: number;
  createdAt: string;
  conveyorId: number;
  conveyName: string;
}
