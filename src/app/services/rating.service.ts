import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Vehicle} from '../../shared/vehicle.model';
import {Rating} from '../../shared/rating.model';
import {Cargonaut} from '../../shared/cargonaut.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatingsForUser(cargonautId: number): Promise<any>{
    const http = this.http;
    return new Promise<Rating[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/bewertungen/' + cargonautId.toString(), {
      }).toPromise().then((res: any) => {
        const tempRatings: Rating[] =  [];
        res.ratings.forEach(elem => {
          const r: Rating = {
            id: elem.id,
            author: {
              id: elem.author
            },
            ratingStars: parseFloat(elem.ratingStars),
            comment: elem.comment
          };
          tempRatings.push(r);
          });
        resolve(tempRatings);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }
}
