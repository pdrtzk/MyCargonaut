export class Hold {
  id?: number;
  length?: number;
  width?: number;
  height?: number;

  constructor(length: number, width: number, height: number) {
    this.length = length;
    this.width = width;
    this.height = height;
  }

  getSpace(): number {
    return this.length * this.width * this.height;
  }
}
