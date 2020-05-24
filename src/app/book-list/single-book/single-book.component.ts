import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book:Book;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private bookService:BooksService) { }

  ngOnInit(): void {
   // We create empty book wating for the promise of service to avoid errors
   this.book = new Book('','');
   //We get the id of the book we are about to look at
   const id = this.route.snapshot.params['id'];
   this.bookService.getSingle(+id).then(
     (book:Book)=>{
       this.book = book;
     }
   );
  }

  onBack(){
    this.router.navigate(['/books']);
  }



}
