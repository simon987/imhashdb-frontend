import { Component } from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private translate: TranslateService, public router: Router) {

    translate.addLangs([
      'en',
      'fr',
      'ru'
    ]);

    translate.setDefaultLang('en');
  }

  langList: any[] = [
    {lang: 'en', display: 'English'},
    {lang: 'fr', display: 'Français'},
    {lang: 'ru', display: 'Русский'},
  ];

  langChange(lang: any) {
    this.translate.use(lang.lang);
    moment.locale(lang.lang);
  }
}

