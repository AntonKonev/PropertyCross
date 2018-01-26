import { SearchComponentComponent } from 'src/app/components/search-component/search-component.component';
import { HomeComponentComponent } from 'src/app/components/home-component/home-component.component';
import { SelectedHouseComponentComponent } from 'src/app/components/selected-house-component/selected-house-component.component';
import { FavesComponentComponent } from 'src/app/components/faves-component/faves-component.component';
import { ROUTER_PATHS } from 'src/app/config/routers.config'
import { Routes } from '@angular/router';

export const appRoutes: Routes =[
    {path: ROUTER_PATHS.SEARCH, component: SearchComponentComponent},
    {path: ROUTER_PATHS.SELECTED_HOUSE, component: SelectedHouseComponentComponent},
    {path: ROUTER_PATHS.FAVES, component: FavesComponentComponent},
    {path: ROUTER_PATHS.HOME, component: HomeComponentComponent},
    {path: '', component: HomeComponentComponent}
];
