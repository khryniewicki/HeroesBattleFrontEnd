import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ServerComponent} from './server/server.component';
import {WebComponent} from './web/web.component';
import {GameComponent} from './game/game.component';
import {DownloadComponent} from './download/download.component';
import {AuthguardService} from './auth/authguard.service';
import {RedirectComponent} from './redirect/redirect.component';
import {GameSettingsPanelComponent} from './game-settings-panel/game-settings-panel.component';
import {DetailsComponent} from './details/details.component';
import {RoleguardService} from './auth/roleguard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'game-details', component: DetailsComponent, canActivate: [AuthguardService]},
  {path: 'server', component: ServerComponent},
  {path: 'web', component: WebComponent},
  {path: 'redirect', component: RedirectComponent},
  {path: 'download', component: DownloadComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always'},
  {
    path: 'game-settings-panel', component: GameSettingsPanelComponent, canActivate: [RoleguardService], runGuardsAndResolvers: 'always'
  },
  // {path: '**', redirectTo: 'home'},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [HomeComponent, GameComponent, ServerComponent, WebComponent, RedirectComponent,
  DownloadComponent];
