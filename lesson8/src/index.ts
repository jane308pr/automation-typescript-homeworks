import { Product, ProductInfo, Rating } from './models/api-objects.dto';
import { IAnimal } from './abstraction/animal';
import { Bird } from './implementation/bird';
import { Dog, FrenchBulldog } from './implementation/dog';

export * from './models/api-objects.dto';

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await response.json();
    return data.map(item => new Product(
        item.id,
        item.title,
        item.price,
        item.description,
        item.category,
        item.image,
        new Rating(item.rating.rate, item.rating.count)
    ));
}

function getProductInfo(products: Product[]): ProductInfo[] {
    return products.map(info => new ProductInfo(info));
}

(async () => {
    const products = await fetchProducts();
    const productsInfo = getProductInfo(products);
    console.log('----Products info----');
    console.log(JSON.stringify(productsInfo, null, 2));
})();

const myDog = new Dog('Rex');
const myBird = new Bird('Tweety');
const myFrenchie = new FrenchBulldog('Luna');

const animals: IAnimal[] = [myDog, myBird, myFrenchie];

animals.forEach(animal => {
    animal.makeSound();
});

myDog.name = 'Max';
myDog.makeSound();
myFrenchie.makeSnoring();


