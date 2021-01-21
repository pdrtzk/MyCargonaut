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
    return new Promise<Rating[]>(async (resolve, reject) => {
      await http.get(' https://mycargonaut.herokuapp.com/api/bewertungen/' + cargonautId.toString(), {}).toPromise().then((res: any) => {
        const tempRatings: Rating[] = [];
        res.ratings.forEach(elem => {
          const r: Rating = new Rating();
          r.author = {id: elem.author};
          r.comment = elem.comment;
          r.ratingStars = parseFloat(elem.ratingStars);
          tempRatings.push(r);
        });
        resolve(tempRatings);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  async addRating(rating: Rating): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        await this.http.post(' https://mycargonaut.herokuapp.com/api/bewertung/' + rating.author.id.toString(), {
          fahrt: rating.trip.id, // todo remove 0
          punktzahl: rating.ratingStars,
          kommentar: rating.comment,
        })
          .toPromise()
          .then((res: any) => {
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
