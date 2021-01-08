import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Vehicle} from '../../shared/vehicle.model';
import {Rating} from '../../shared/rating.model';
import {Cargonaut} from '../../shared/cargonaut.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {
  }

  getRatingsForUser(cargonautId: number): Promise<any> {
    const http = this.http;
    return new Promise<Vehicle[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/bewertungen/' + cargonautId.toString(), {}).toPromise().then((res: any) => {
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

  async addRating(rating: Rating): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        await this.http.post('http://localhost:4200/api/bewertung/' + rating.author.id.toString(), {
          fahrt: rating.trip.id, // todo remove 0
          punktzahl: rating.ratingStars,
          kommentar: rating.comment,
        })
          .toPromise()
          .then((res: any) => {
            console.log('Success: ' + res.message);
            resolve();
          })
          .catch(error => {
            console.log('Error: ' + error);
            reject(error);
          });
      }
    );
  }

}
