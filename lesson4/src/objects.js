const bookStore = {
    name: 'The best book store ever',
    books: [
        {  title: 'Тіні забутих предків', author: 'Михайло Коцюбинський', price: 250, isAvailable: true },
        {  title: 'Лісова пісня', author: 'Леся Українка', price: 200, isAvailable: false },
        {  title: 'Кайдашева сім’я', author: 'Іван Нечуй-Левицький', price: 230, isAvailable: true },
        {  title: 'Енеїда', author: 'Іван Котляревський', price: 280, isAvailable: true },
        {  title: 'Valse mélancholique', author: 'Ольга Кобилянська', price: 220, isAvailable: false }
    ],
    address: {
        city: 'Kyiv',
        street: 'Vasylkivska'
    },
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).map(book => ({
            bookTitle: book.title,
            bookAuthor: book.author
        }));
    },
    getBooksChipperThen(price) {
        return this.books.filter(book => book.price < price);
    }
};

console.log('Available books', bookStore.getAvailableBooks());
console.log('Books chipper then 250', bookStore.getBooksChipperThen(250));
