import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>; // ! non-null operator

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  search() {
    const value = this.txtSearch.nativeElement.value;
    if(value.trim().length === 0) {return;}
    this.gifsService.searchGifs(value);
  }
}
