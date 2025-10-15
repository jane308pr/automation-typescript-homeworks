export class Rating {
    public constructor(
        public rate: number,
        public count: number
    ) {}
}

export class Product {
    public constructor(
        public id: number,
        public title: string,
        public price: number,
        public description: string,
        public category: string,
        public image: string,
        public rating: Rating
    ) {}
}

export class ProductInfo {
    public title: string;
    public price: number;
    public rate: number;
    public constructor(product: Product) {
        this.title = product.title;
        this.price = product.price;
        this.rate = product.rating.rate;
    }
}

