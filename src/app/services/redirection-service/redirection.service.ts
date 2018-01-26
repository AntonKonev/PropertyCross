import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from 'src/app/config/routers.config';

@Injectable()
export class RedirectionService {
    constructor(
        private router: Router
    ) {}

    public redirectToFaves(): void {
        this.router.navigate([ROUTER_PATHS.FAVES]);
    }

    public redirectToHome(): void {
        this.router.navigate([ROUTER_PATHS.HOME]);
    }

    public redirectToSearch(): void {
        this.router.navigate([ROUTER_PATHS.SEARCH]);
    }

    public redirectToSelectedHouse(): void {
        this.router.navigate([ROUTER_PATHS.SELECTED_HOUSE]);
    }
}
