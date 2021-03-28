import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {from, from as fromPromise} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Base64Service} from "./base64.service";
import * as _ from "lodash";

@Injectable()
export class ApiService {

  // public url: string = window.location.protocol + "//" + window.location.host + "/api";
  public url: string = window.location.protocol + "//" + "127.0.0.1:8080" + "/api";

  private options: {
    withCredentials: true,
    responseType: "json"
  };

  constructor(private http: HttpClient, private b64: Base64Service) {
  }

  hash(data: string) {
    return this.http.post(this.url + "/hash", {data: data}, this.options);
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
      "4chan": {
        "background": "#006500",
        "foreground": "#EEEEEE",
        "description": "4chan"
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
