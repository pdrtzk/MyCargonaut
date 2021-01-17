export class Hold {
  id?: number;
  length?: number;
  width?: number;
  height?: number;
 // all dimensions are in cm

  constructor(length: number, width: number, height: number) {
    this.length = length;
    this.width = width;
    this.height = height;
  }

  public getSpace(): number {
    const temp = (this.length / 100) * (this.width / 100) * (this.height / 100);
    return  parseFloat((Math.round(temp * 100) / 100).toFixed(2));
  }
}
