import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  constructor() { }

  emitBooks(){
    this.booksSubject.next(this.books);
  }
  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }
  getBooks(){
    firebase.database().ref('/books')
      .on('value',(data)=>{
        this.books = data.val()?data.val():[];
        this.emitBooks();
      })
  }
  getSingle(id){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/books/'+1).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewBook(newbook: Book) {
    this.books.push(newbook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
      (bookEl)=>{
        if(bookEl==book){
          return true;
        }
      }
    )
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file:File){
    return new Promise(
      (resolve,reject)=>{
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('images/'+almostUniqueFileName+file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log('chargement en cours...')
          },
          (error)=>{
            console.log('Erreur de chargement' + error);
            reject(error)
          },
          ()=>{
            resolve(upload.snapshot.ref.getDownloadURL());
          }
          )
      }
    )
  }

}
