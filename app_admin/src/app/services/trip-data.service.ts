import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBaseUrl);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip[]>(
      `${this.apiBaseUrl}/${encodeURIComponent(tripCode)}`
    ).pipe(
      map(trips => {
        if (!trips.length) {
          throw new Error('Trip not found');
        }
        return trips[0];
      })
    );
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBaseUrl, trip);
  }

  public updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBaseUrl}/${encodeURIComponent(tripCode)}`,
      trip
    );
  }
}