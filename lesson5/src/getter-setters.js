const bookStore = {
    name: 'The best book store ever',
    _books: [
        {  title: 'Тіні забутих предків', author: 'Михайло Коцюбинський', price: 250, isAvailable: true },
        {  title: 'Лісова пісня', author: 'Леся Українка', price: 200, isAvailable: false }
    ],
    _address: {
        city: 'Kyiv',
        street: 'Vasylkivska'
    },
    set book(book) {
        this._books.push(book);
    },
    set address(address) {
        this._address = address;
    },
    get address() {
        return this._address;
    },
    getAvailableBooks() {
        return this._books.filter(book => book.isAvailable).map(book => ({
            bookTitle: book.title,
            bookAuthor: book.author
        }));
    },
    getBookStoreInfo() {
        return {
            name: this.name,
            city: this._address.city,
            street: this._address.street,
            availableBooks: this.getAvailableBooks()
        };
    }

};

console.log('Book store address:', bookStore.address);
bookStore.address = { city: 'Kyiv', street:'Khreschatyk' };
bookStore.book = { title: 'Кайдашева сім’я', author: 'Іван Нечуй-Левицький', price: 230, isAvailable: true };
console.log('Book store info', bookStore.getBookStoreInfo());


