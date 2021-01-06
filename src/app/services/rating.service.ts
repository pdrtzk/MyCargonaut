import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Vehicle} from '../../shared/vehicle.model';
import {Rating} from '../../shared/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatingsForUser(cargonautId: number): Promise<any>{
    const http = this.http;
    return new Promise<Vehicle[]>(async (resolve, reject) => {
      await http.get('http://localhost:8080/bewertungen/' + cargonautId.toString(), {
      }).toPromise().then((res: any) => {
        res.bewertungen.forEach(elem => {
          const r: Rating = new Rating();
          r.author.id = elem.verfasser;
          r.comment = elem.kommentar;
          r.ratingStars = parseFloat(elem.punktzahl);
          });
        console.log(res);
        resolve(res.bewertungen);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }
}
