import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {MapPopupService} from "./map-popup.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})


export class MapMarkerService {

  // capitals: string = '/assets/data/usa-capitals.geojson';
  constructor(private http: HttpClient,
              private mapPopupService: MapPopupService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  makeCapitalMarkers(map: L.map, points): void {
    for (const point of points) {
      const lon = point[0]
      const lat = point[1]
      const content = point[2]
      const showUri = point[3]
      const marker = L.marker([lat, lon]);
      marker.bindPopup(this.mapPopupService.makeCapitalPopup(lat, lon, content, showUri));
      marker.addTo(map);
    }

    // const marker = L.marker([71.0, 11.10])
    // marker.bindPopup(this.mapPopupService.makeCapitalPopup("hello world"));

    // marker.addTo(map);
  }


  // }
  // }
}
