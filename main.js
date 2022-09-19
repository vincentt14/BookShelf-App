const lemari = [];
const RENDER_EVENT = 'render-all-books';

const inputBookTitle = document.getElementById('inputBookTitle');
const inputBookAuthor = document.getElementById('inputBookAuthor');
const inputBookYear = document.getElementById('inputBookYear');
const inputBookIsComplete = document.getElementById('inputBookIsComplete');

const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
const completeBookshelfList = document.getElementById('completeBookshelfList');

const searchBookTitle = document.getElementById('searchBookTitle');
const searchSubmit = document.getElementById('searchSubmit');

const bookSubmit = document.getElementById('bookSubmit');

bookSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const id = +new Date();
    const judul = inputBookTitle.value;
    const penulis = inputBookAuthor.value;
    const tahun = inputBookYear.value;
    const selesaiDibaca = inputBookIsComplete.checked;

    const bukuBaru = objectBlueprint(id.toString(), judul, penulis, tahun, selesaiDibaca);

    lemari.push(bukuBaru);
    document.dispatchEvent(new Event(RENDER_EVENT));
});

const objectBlueprint = (id, judul, penulis, tahun, selesaiDibaca) => {
    return {
        id,
        judul,
        penulis,
        tahun,
        selesaiDibaca
    }
}

document.addEventListener(RENDER_EVENT, () => {
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    lemari.forEach((lemari) => {
        if (lemari.selesaiDibaca === true) {
            completeBookshelfList.innerHTML += buatKartuBuku(lemari);
        } else {
            incompleteBookshelfList.innerHTML += buatKartuBuku(lemari);
        }
    })
})

const buatKartuBuku = (lemari) => {
    const template = `
        <article class="book_item">
            <h3>${lemari.judul}</h3>
            <p>Penulis: ${lemari.penulis}</p>
            <p>Tahun: ${lemari.tahun}</p>

            <div class="action">
                <button class="green" onClick="pindahPindah(${lemari.id})">${lemari.selesaiDibaca === true ? `belum` : ''} Selesai di Baca</button>
                <button class="red" onClick="hapusBuku(${lemari.id})">Hapus buku</button>
            </div>
        </article>
    `;
    return template;
}

const renderFilteredLemari = (filteredLemari) => {
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    lemari.forEach((lemari) => {
        if (lemari.selesaiDibaca === true) {
            completeBookshelfList.innerHTML += buatKartuBuku(lemari);
        } else {
            incompleteBookshelfList.innerHTML += buatKartuBuku(lemari);
        }
    });
}

const cariId = (id) => {
    for (let i = 0; i < lemari.length; i++)
        if (lemari[i].id === id.toString())
            return i;
    return -1;
}

const pindahPindah = (id) => {
    const cariIndex = cariId(id);
    if (cariIndex === -1) return;
    lemari[cariIndex].selesaiDibaca = !lemari[cariIndex].selesaiDibaca;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

const hapusBuku = (id) => {
    const cariIndex = cariId(id);
    lemari.splice(cariIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const judul = searchBookTitle.value;

    const tokens = judul.toLowerCase().split(' ').filter((tokens) => tokens.trim() !== '');

    if (tokens.length) {
        let searchTermRegex = new RegExp(tokens.join('|'), 'gim');
        const filteredLemari = lemari.filter((lemari) => {
            let lemariString = '';
            lemariString += lemari.judul.toString().toLowerCase().trim() + ' ';
            return lemariString.match(searchTermRegex);
        });
        renderFilteredLemari(filteredLemari);
    } else {
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
})