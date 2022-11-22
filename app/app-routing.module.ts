import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "src/environments/environment";
import { HomeComponent } from "./home/home.component";
import { PraticheViewComponent } from "./pratiche-view/pratiche-view.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { TreeViewComponent } from "./tree-view/tree-view.component";
import { ExternalRouteGuard } from "./utils/guards/external-route.guard";

const appRoutes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        pathMatch: 'full' 
    },
    {
      path: 'pratiche/:praticaTipoCode/:statoId/:entityId/:applicative/:executive',
      component: TreeViewComponent,
      children: [
        {
          path: ':codice/:anagId/:immobileId/:praticaRelazioneId/:atlPeriziaId/:atlRelazioneId',
          component: PraticheViewComponent
        }
      ]
    },
    {
        path: 'external',
        canActivateChild: [ExternalRouteGuard],
        children: [
        {
            path: 'hostApp',
            data: {
              url: environment.hostAppUrl
            },
            component: RedirectComponent
        },
        {
          path: 'outside',
          component: RedirectComponent
        }
      ]
    }
]

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AppRoutingModule {

}
