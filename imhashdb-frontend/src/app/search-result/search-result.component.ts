import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {ApiService} from "../api.service";
import _ from "lodash"


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  @Input() query: EventEmitter<string>;
  sub: Subscription;

  @Input() show: boolean;
  @Input() progress: number;

  queryResult = []

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.sub = this.query.subscribe(str => {

      this.api.hash(str).subscribe(data => {
        this.progress = 0

        const hashTypes = Object.keys(data)
        hashTypes.forEach(h => {
          this.api.query(h, data[h]["bytes"], 10, 10, 0).subscribe(res => {
            res["images"].forEach(im => {
              if (!this.queryResult.some(x => x["sha1"] == im["sha1"])) {
                this.queryResult.push(im)
              }
            })
            this.progress += (Object.keys(this.queryResult).length / hashTypes.length) * 100
          })
        })
      })
    })
  }

  panelState = {};

  onPanelOpen(im) {
    this.panelState[im["sha1"]] = true
  }

  onPanelClose(im) {
    this.panelState[im["sha1"]] = false
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  barType(progress: number) {
    if (progress == -2) {
      return "indeterminate";
    } else if (progress == -1) {
      return "query";
    } else {
      return "determinate"
    }
  }

  //debug
  barColor(progress: number) {
    if (progress == -1) {
      return "primary";
    } else if (progress == 0) {
      return "accent";
    } else {
      return "warn"
    }
  }

  imageUrls(im) {
    return _.uniq(im["meta"].map(m => m["url"]))
  }

  metaProject(meta) {
    const tokens = meta["meta"]["id"].split(".");
    if (tokens.length === 5) {
      return tokens[1];
    } else {
      return tokens[0];
    }
  }

  metaColor(meta) {
    return this.api.metaInfo()[this.metaProject(meta)]["foreground"]
  }

  metaBackgroundColor(meta) {
    return this.api.metaInfo()[this.metaProject(meta)]["background"]
  }

  metaDescription(meta) {
    return this.api.metaInfo()[this.metaProject(meta)]["description"]
  }

  shortMetaName(meta) {
    const tokens = meta["meta"]["id"].split(".");
    if (tokens.length === 5) {
      return tokens.slice(1, -1).join(".");
    } else {
      return tokens.slice(0, -1).join(".");
    }
  }

  metaChipList(im) {
    return _.uniqBy(im["meta"], m => this.shortMetaName(m));
  }

  formatSize(im) {
    return bytes_to_readable(im.size)
  }
}

function bytes_to_readable(bytes) {
  const scale = ["B", "KB", "MB"];
  for (let i = scale.length - 1; i >= 0; i--) {
    const cur = Math.pow(1024, i);
    if (cur < bytes) {
      return (bytes / cur).toFixed(i == 0 ? 0 : 1) + scale[i];
    }
  }
  return "?";
}

