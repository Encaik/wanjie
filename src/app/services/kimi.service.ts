import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KimiService {
  private http = inject(HttpClient);

  getCharacterList(length: number) {
    return this.http.get('/api/generate/character', {
      params: { length }
    });
  }
}
