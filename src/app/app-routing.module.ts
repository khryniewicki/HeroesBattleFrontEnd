import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ServerComponent} from './server/server.component';
import {WebComponent} from './web/web.component';
import {LoggingComponent} from './logging/logging.component';
import {GameComponent} from './game/game.component';
import {DownloadComponent} from './download/download.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'server', component: ServerComponent},
  {path: 'web', component: WebComponent},
  {path: 'login', component: LoggingComponent},
  {path: 'download', component: DownloadComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponents = [HomeComponent, GameComponent, ServerComponent, WebComponent, LoggingComponent, DownloadComponent];
