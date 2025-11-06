class Random {
  private x :number ;
  private y :number ;
  private z :number ;
  private w :number ;
  public readonly seed :number ;
  constructor(seed = Date.now()) {
    this.seed = seed ;
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }
  
  // XorShift
  public next() : number{
    let t : number;
 
    t = this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    // 32bit 演算の結果を符号なしにし、0..2^32-1 の整数を得る
    this.w = ((this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8))) >>> 0;
    // 0 <= result < 1 を返す（2^32 で割ることで 1 は含まれない）
    return this.w / 0x100000000;
  }
  public nextInt(size:number) : number {
    return Math.floor(this.next()*size) ;
  }
}

export const random = new Random(Date.now()) ;