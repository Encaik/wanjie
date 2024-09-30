import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Res, ResStatus } from '../models/http.model';
import { BattleCharacter, Env, InitCharacter } from '@models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {
  private http = inject(HttpClient);

  getCharacterList(length: number): Observable<InitCharacter[]> {
    return this.http
      .get<Res<InitCharacter[]>>('/api/generate/character', {
        params: { length }
      })
      .pipe(
        map(res => {
          if (res.status === ResStatus.Success) {
            return res.data;
          } else {
            return [];
          }
        })
      );
  }

  getEnvList(length: number): Observable<{ envs: Env[]; galaxiesId: string }> {
    return this.http
      .get<Res<{ envs: Env[]; galaxiesId: string }>>('/api/generate/env', {
        params: { length }
      })
      .pipe(
        map(res => {
          if (res.status === ResStatus.Success) {
            return res.data;
          } else {
            return {
              envs: [],
              galaxiesId: ''
            };
          }
        })
      );
  }

  getEnemyList(length: number, level: number): Observable<BattleCharacter[]> {
    return this.http
      .get<Res<BattleCharacter[]>>('/api/generate/enemy', {
        params: { length, level }
      })
      .pipe(
        map(res => {
          if (res.status === ResStatus.Success) {
            return res.data;
          } else {
            return [];
          }
        })
      );
  }

  getStory(character: InitCharacter, env: Env): Observable<string> {
    if (!environment.aiEnable) return of('开发环境，跳过故事生成');
    return this.http.post<Res<string>>('/api/generate/story', { character, env }).pipe(
      map(res => {
        return res.status === ResStatus.Success ? res.data : '';
      })
    );
  }
}
