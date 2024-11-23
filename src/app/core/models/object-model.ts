export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public mobNumber: string,
    public gender: string,
    public role: string,
    public age: string,
    public id?: number
  ) {}
}

export class Product {
  constructor(
    public name: string,
    public categoryName: string,
    public categoryId: number,
    public price: string,
    public prodPhoto: string,
    public rating: string,
    public description:string,
    public id?: number
  ) {}
}

export interface CartProduct extends Product {
  qty: number;
}

export class Category {
  constructor(public name: string, public id?: number) {}
}

export class Order {
  public constructor(
    public userId: number,
    public address: string,
    public city: string,
    public state: string,
    public zipCode: number,
    public contact: Number,
    public orderDateTime: string,
    public totalPrice?: number,
    public name?: string,
    public paymentMethod?: string,
    public id?: number
  ) {}


}
