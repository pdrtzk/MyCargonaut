export class VehicleType {
  id?: number;
  type?: VehicleTypeType;
  description?: string;
}

export enum VehicleTypeType {
  PKW = 'PKW',
  LKW = 'LKW',
  BUS = 'Transporter',
  PLANE = 'Flugzeug',
  BOAT = 'Schiff'
}
