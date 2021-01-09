import {Injectable} from '@angular/core';
import {DriveStatus, Post} from '../../shared/post.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  // todo query data for 1 specific cargonaut

  getInboxBookings(cargonautId: number): Promise<Post[]> {
    const http = this.http;
    return new Promise<Post[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/buchungen/' + cargonautId.toString(), {}).toPromise().then((res: any) => {
        const bookings: Post[] = [];
        console.log('bookings:');
        console.log(res.buchungen);
        res.buchungen.forEach(booking => bookings.push({
          id: booking.id,
          description: booking.description,
          startlocation: booking.standort,
          endlocation: booking.zielort,
          start_time: booking.startzeit,
          end_time: booking.zeit,
          payment: booking.bezahlungsart,
          vehicle: {
            id: booking.fahrzeug
          },
          bookedBy: [{id: booking.gebucht_von}],
          seats: booking.anzahl_sitzplätze,
          type: booking.typ,
          author: {
            id: booking.verfasser
          },
          price: booking.preis,
          closed: booking.gebucht === 1,
          status: booking.status === 'abgeschlossen' ? DriveStatus.ABGESCHLOSSEN : DriveStatus.UNTERWEGS
        }));
        console.log(bookings);
        resolve(bookings);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  getOutboxBookings( /*cargonaut: Cargonaut */): Post[] {
    return [];
  }

}
