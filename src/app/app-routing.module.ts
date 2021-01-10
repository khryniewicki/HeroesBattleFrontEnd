import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ServerComponent} from './server/server.component';
import {WebComponent} from './web/web.component';
import {LoggingComponent} from './logging/logging.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'server', component: ServerComponent},
  {path: 'web', component: WebComponent},
  {path: 'login', component: LoggingComponent},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponents = [HomeComponent, GameComponent, ServerComponent, WebComponent, LoggingComponent];
