// STEP 5 : kita buat variabel books isinya array kosong buat namoung object newBookObject
const books = [];


// STEP 1 : kita inisiasikan dulu yg bakal diinput sama user kedalam variabel GLOBAL
const inputBookTitle = document.getElementById('inputBookTitle');
const inputBookAuthor = document.getElementById('inputBookAuthor');
const inputBookYear = document.getElementById('inputBookYear');
const inputBookIsComplete = document.getElementById('inputBookIsComplete');

// kita iniasikan juga button biar variabelnya bisa kita pakai
const bookSubmit = document.getElementById('bookSubmit');

// STEP 2 : kita ambil value inputan user ketika dia tekan button submit
bookSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const id = +new Date();
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = inputBookYear.value;
    const isComplete = inputBookIsComplete.checked;

    // kita cek dulu uda masuk apa belum di console log
    // console.log(id);

    // STEP 4 : kita panggil function blueprint itu dan tampung ke variabel yg bakal kita pakai teru terusan
    const newBookObject = generateBookObject(id.toString(), title, author, year, isComplete);

    // STEP 5: habis kita buat variabel global diatas, kita masukin newbook
    books.push(newBookObject);
    console.log(books);
});

// STEP 3 : kita buat blueprint object buat nampung inputan user pakai function
const generateBookObject = (id, title, author, year, isComplete) => {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}