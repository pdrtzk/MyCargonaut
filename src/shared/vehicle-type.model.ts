export class VehicleType {
  id?: number;
  type?: VehicleTypeType;
  description?: string;

  getVehicleType(type: string): VehicleTypeType {
    switch (type) {
      case('PKW') : return VehicleTypeType.PKW;
      case('LKW') : return VehicleTypeType.LKW;
      case('Transporter') : return VehicleTypeType.BUS;
      case('Flugzeug') : return VehicleTypeType.PLANE;
      case('Schiff') : return VehicleTypeType.BOAT;
    }
  }
}

export enum VehicleTypeType {
  PKW = 'PKW',
  LKW = 'LKW',
  BUS = 'Transporter',
  PLANE = 'Flugzeug',
  BOAT = 'Schiff'
}
