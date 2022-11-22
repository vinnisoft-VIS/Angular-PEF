import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from "@angular/router";

@Injectable()
export class ExternalRouteGuard implements CanActivate, CanActivateChild {
    constructor(private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let url: string = route.data['url'] || route.params['url'];

        // append dynamic query params
        if (route.queryParams) {
            const queryString = Object.entries(route.queryParams)
                .map(entry => entry.join('='))
                .join('&');
            if (queryString) {
                url += `?${queryString}`;
            }
        }

        // evaluate and replace dynamic route parameters (:param)
        const replacements = this.router.getCurrentNavigation()?.extras.state || {};
        if (replacements) {
            const replaceRegex = /:(.*?)(\/|\?|$)/g;
            let replaceMatch = replaceRegex.exec(url);
            while (replaceMatch != null) {
                const replaceParam = replaceMatch[1];
                const replacement = replacements[replaceParam];
                if (replacement) {
                    url = url.replace(`:${replaceParam}`, replacement);
                }
                replaceMatch = replaceRegex.exec(url);
            }
        }

        // navigate to constructed URL
        const windowTarget: string = route.data['target'] || '_self';
        window.open(url, windowTarget);

        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot): boolean {
        return this.canActivate(route);
    }
}