const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
        books.push(book);
        } 
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function generateId(){
    return +new Date();
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function addBook(){

    const generateiID = generateId();
    const textTitle = document.getElementById('inputBookTitle').value;
    const textauthor = document.getElementById('inputBookAuthor').value;
    const textYear = document.getElementById('inputBookYear').value;
    const textStatus = document.getElementById('inputBookIsComplete');

    const bookObject = generateBookObject( generateiID, textTitle, textauthor, textYear, false)
    books.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

document.addEventListener('DOMContentLoaded', function(){
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook()
    });
    if (isStorageExist()) {
        loadDataFromStorage();
      }
});

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
        return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
    return -1;
  }

  function searchBook(bookTitle) {
    for (const search in books) {
      if (books[search].title === bookTitle) {
        
        console.log(bookTitle);
        return search;
      }
    }
}

const searchBookSubmit = document.getElementById('searchSubmit');
searchBookSubmit.addEventListener('click',function(bookTitle) {
    const searchBookButton = document.getElementById('searchBookTitle');
    console.log(searchBookButton);
    event.preventDefault();
    for (const search in books) {
        if (books[search].title === bookTitle) {
          
          console.log(bookTitle);
          return search;
        }
      }
    
  });

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    const incompletedBook= document.getElementById('incompleteBookshelfList');
    const completedBook = document.getElementById('completeBookshelfList');

    // clearing list item
    incompletedBook.innerHTML = '';
    completedBook.innerHTML = '';

    
    

    for (const bookItem of books) {

    const bookElement = makeBook(bookItem);
    console.log("book elem",bookElement);
        if (bookItem.isCompleted ==false) {
            incompletedBook.append(bookElement);
        } else{
            completedBook.append(bookElement);
        }
    }
    console.log(incompletedBook,completedBook);
});



function addTaskToCompleted (bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeTaskFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoTaskFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function makeBook(bookObject) {

    const {id, title, author, year, isCompleted} = bookObject;

    const textTitle = document.createElement('h2');
    textTitle.innerText = title;

    const textauthor = document.createElement('p');
    textauthor.innerText = author;
    
    const textYear = document.createElement('p');
    textYear.innerText = year;
    
    //menambah garis tepi tiap buku
    const textBox = document.createElement('div');
    textBox.classList.add('action');
    textBox.append(textTitle,textauthor, textYear);
    
    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(textBox);
    container.setAttribute('id', `book-${id}`);

    const bookCompleteCheck = document.getElementById('inputBookIsComplete'); 
//membuat chechlist untuk mengganti tujuan 
    bookCompleteCheck.addEventListener('click', function(){
        const inputButton = document.getElementsByTagName('span')[0];
        console.log(inputButton);
        const bookStatus = document.getElementById('inputBookIsComplete').checked;
        console.log(bookStatus);
        if(bookStatus == true){
        inputButton.innerText = 'Selesai dibaca';
        bookObject.isCompleted = true;
        
        }else if(bookStatus == false){
        inputButton.innerText = 'Belum Selesai dibaca';
        bookObject.isCompleted = false;
        
        }
    });


    if (bookObject.isCompleted == true) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerText = "belum selesai dibaca";

        undoButton.addEventListener('click', function () {
        undoTaskFromCompleted(bookObject.id);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'buku belum selesai dibaca',
            showConfirmButton: false,
            timer: 1500
            })
        })

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = "hapus buku";

        trashButton.addEventListener('click', function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  removeTaskFromCompleted(bookObject.id)
                }
              })
        
        
        });

        textBox.append(undoButton, trashButton);
        } else{
        const checkButton = document.createElement('button');
        checkButton.classList.add('green');
        checkButton.innerText = "sudah selesai";
        
        checkButton.addEventListener('click', function () {
        addTaskToCompleted(bookObject.id);
        Swal.fire({
            position:'center',
            icon: 'success',
            title: 'buku selesai dibaca',
            showConfirmButton: false,
            timer: 1500
            })
        });
        
        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'hapus buku';

        trashButton.addEventListener('click', function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  removeTaskFromCompleted(bookObject.id)
                }
              })
        });

        textBox.append(checkButton);
        textBox.append(trashButton);
        }


    return container;
}

