import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule, Jsonp, Response} from '@angular/http';
import { RouterModule } from '@angular/router';

import { SelectedHouseComponentComponent } from 'src/app/components/selected-house-component/selected-house-component.component';
import { SearchComponentComponent } from 'src/app/components/search-component/search-component.component';
import { FavesComponentComponent } from 'src/app/components/faves-component/faves-component.component';
import { HomeComponentComponent } from 'src/app/components/home-component/home-component.component';
import { AppComponent } from 'src/app/app.component';

import { DataFromServerService } from 'src/app/services/data-from-server-service/data-from-server.service';
import { SelectedHouseService } from 'src/app/services/selected-house-service/selected-house.service';
import { ListSearchesService } from 'src/app/services/list-searches-service/list-searches.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { RedirectionService } from 'src/app/services/redirection-service/redirection.service';
import { ListFavesService } from 'src/app/services/list-faves-service/list-faves.service';

import { appRoutes } from 'src/app/app.routes';
import { PricePipePipe } from 'src/app/pipes/price-pipe/price-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent,
    HomeComponentComponent,
    SelectedHouseComponentComponent,
    FavesComponentComponent,
    PricePipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    JsonpModule
  ],
  providers: [
      DataFromServerService,
      SelectedHouseService,
      ListFavesService,
      ListSearchesService,
      LocalStorageService,
      RedirectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
