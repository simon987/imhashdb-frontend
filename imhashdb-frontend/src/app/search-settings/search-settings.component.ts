import {Component, Input, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs";
import {ApiService} from "../api.service";

@Component({
  selector: "app-search-settings",
  templateUrl: "./search-settings.component.html",
  styleUrls: ["./search-settings.component.css"]
})
export class SearchSettingsComponent implements OnInit {

  @Output() changed: Observable<void> = new Observable<void>();
  private settings;

  private selectedResolution = {};

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.settings = this.api.hashInfo();
  }

  // https://stackoverflow.com/questions/51282112/
  toggleChange(hash, event) {
    let toggle = event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if (event.value.some(item => item == toggle.value)) {
        group.value = [toggle.value];
        this.selectedResolution[hash] = this.settings.hashes
          .find(h => h.name == hash).resolution
          .find(r => r.id == toggle.value);
      }
    } else {
      this.selectedResolution[hash] = undefined;
    }
  }
}
