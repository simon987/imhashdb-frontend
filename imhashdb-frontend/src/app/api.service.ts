import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {from, from as fromPromise} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Base64Service} from "./base64.service";
import * as _ from "lodash";

@Injectable()
export class ApiService {

  // public url: string = window.location.protocol + "//" + window.location.host + "/api";
  public url: string = window.location.protocol + "//" + "192.168.1.57:8080" + "/api";

  private options: {
    withCredentials: true,
    responseType: "json"
  };

  constructor(private http: HttpClient, private b64: Base64Service) {
  }

  hash(data: string) {
    return from([JSON.parse('{"dhash8":{"size":8,"bytes":"1UOImJyelpY="},"dhash16":{"size":16,"bytes":"smB5M+MVSlZFZslmklOiU+Bj7GC4YW1naUNZ4yznWdc="},"dhash32":{"size":32,"bytes":"bV2VGElVixyjD48XxTSXB4ftshcdZpIT2XWeG0lomhtVNBSdNXS+HMfxtBiBoT0YReYlmZLAH7sQyy+7DJgOuQO4Dr2CeUudEHkoPHBdRDyE7kc8wq8mPuI+fT7ibDc6pWoLOlVUX3qXYU94zSKfuGlWNrqTnGW6k2VX+ZKTpnk="},"mhash8":{"size":8,"bytes":"v38/MzA4oIA="},"mhash16":{"size":16,"bytes":"/0f3d/53/1b/R78HPwcFD4AOgQ/gA8APAM4AzADKAMY="},"mhash32":{"size":32,"bytes":"+v+/cb79P3Be/j5+vv8/Pj7vLz/63Tcf//94f///fPv//3sw//9/Mf/vvxD/j3kw/w5/AP8PfgB/gH8AEIB/IACAeCAAwH4gA8B/AAfQHyAB+A8ABdxvAAR4fwAMwP4ADgB+AAgAfOAEANjwEFW08IIoZPAEIc/wBAA88AQAKOA="},"phash8":{"size":8,"bytes":"24MnOBjPszE="},"phash16":{"size":16,"bytes":"2yKDsCdsOE4Y/M+o8wkxZ0iG45+ePUDbJPmbzQd7BHw="},"phash32":{"size":32,"bytes":"2yLmAIOwBTknbGTpOE5r5hj8uffPKM3E8wm9TTEnCXZIhp02458RH549IwZA24Y4JPg9mZvNOcEHe2bPBPzPGDDgB+3w49nO4eM282/gZMLPRpK9wD4uwgaf2zXPJGzLL+CTLgjMP5i0BRm2bBIz/E2T7ID/JPg9vBnyzfwZMIg="},"whash8haar":{"size":8,"bytes":"v38/MzA4oIA="},"whash16haar":{"size":16,"bytes":"/8f3d/53/3b/R78HPwcFD4AOgQ/gA8APAM4AzADOAMY="},"whash32haar":{"size":32,"bytes":"+v+/cb79P3Be/j5+vv8/Pj7vLz/63Tcf//94f///fPv//3sw//9/Mf/vvxD/j3kw/w5/AP8PfgB/gH8AEIB/IACAeCAAwH4gA8B/AAfQHyAB+A8ABdxvAAR4fwAMwP4ADgB+AAgAfOAEANjwEFW08IIoZPAEIc/wBAA88AQAKOA="}}')])
    // return this.http.post(this.url + "/hash", {data: data}, this.options);
  }

  query(hashType: string, hash: string, distance: number, limit: number, offset: number) {
    return fromPromise(
      this.http.post(
        this.url + "/query",
        {type: hashType, hash: hash, distance: distance, limit: limit, offset: offset},
        this.options
      )
    ).pipe(
      map(data => {
        data["images"].forEach(im => {
          im["sha1"] = this.b64.toHex(im["sha1"])
          im["sha256"] = this.b64.toHex(im["sha256"])
          im["md5"] = this.b64.toHex(im["md5"])
          im["meta"].forEach(ihm => {
            ihm["url"] = "https://" + ihm["url"]
            ihm["meta"]["meta"] = JSON.parse(atob(ihm["meta"]["meta"]))
            ihm["meta"]["retrieved_at"] *= 1000;
          });
        });
        return data;
      })
    );
  }

  metaInfo() {
    //TODO: query server and cache

    return {
      "reddit": {
        "background": "#ff2e00",
        "foreground": "#EEEEEE",
        "description": "Reddit"
      },
      "imgur": {
        "background": "#1BB76E",
        "foreground": "#000000",
        "description": "imgur"
      }
    }
  }

  hashInfo() {
    //TODO: query server and cache
    return {
      hashes: [
        {
          name: "Dhash",
          description: "Difference hash",
          resolution: [
            {name: "8 B", id: "dhash8", max_distance: 10},
            {name: "32 B", id: "dhash16", max_distance: 40},
            {name: "128 B", id: "dhash32", max_distance: 80},
          ],
        },
        {
          name: "Phash",
          description: "Perceptual hash",
          resolution: [
            {name: "8 B", id: "phash8", max_distance: 10},
            {name: "32 B", id: "phash16", max_distance: 40},
            {name: "128 B", id: "phash32", max_distance: 80},
          ],
        },
        {
          name: "Mhash",
          description: "Median hash",
          resolution: [
            {name: "8 B", id: "mhash8", max_distance: 10},
            {name: "32 B", id: "mhash16", max_distance: 40},
            {name: "128 B", id: "mhash32", max_distance: 80},
          ],
        },
        {
          name: "Whash",
          description: "Wavelet hash",
          resolution: [
            {name: "8 B", id: "whash8", max_distance: 10},
            {name: "32 B", id: "whash16", max_distance: 40},
            {name: "128 B", id: "whash32", max_distance: 80},
          ],
        },
      ],
      presets: [
        {
          name: "16-bit",
          description: "TODO: description",
          queries: {
            phash16: {distance: 10},
            whash16: {distance: 10},
          },
        }
      ]
    }
  }
}
