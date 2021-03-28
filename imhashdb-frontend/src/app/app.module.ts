import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IndexComponent} from './index/index.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {SearchResultComponent} from './search-result/search-result.component';
import {ApiService} from "./api.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {Base64Service} from "./base64.service";
import {MetaComponent} from './meta/meta.component';
import {MetaDialogComponent} from "./meta-dialog/meta-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import { SearchSettingsComponent } from './search-settings/search-settings.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import { AboutComponent } from './about/about.component';
import { GitRepoComponent } from './git-repo/git-repo.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchResultComponent,
    MetaComponent,
    MetaDialogComponent,
    SearchSettingsComponent,
    AboutComponent,
    GitRepoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }
    ),
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatProgressBarModule,
    MatListModule,
    MatTreeModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSliderModule,
  ],
  providers: [
    ApiService,
    Base64Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

