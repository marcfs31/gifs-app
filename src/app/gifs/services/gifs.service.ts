import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'KRfYIwZbGnjS1985DW03w4oswD8TYgAe';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public results: Gif[] = []
  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  // async searchGifs(query: string) {
  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    
    if(!this.history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=KRfYIwZbGnjS1985DW03w4oswD8TYgAe&q=test&limit=10')
    //   .then(response => {
    //     response.json().then(data => {
    //       console.log(data);
    //     });
    //   });
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=KRfYIwZbGnjS1985DW03w4oswD8TYgAe&q=test&limit=10');
    // const data = await resp.json();
    // console.log(data);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    
    this.http.get<SearchGifsResponse>(`${this.serviceURL}/search`, { params })
      .subscribe(resp => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
