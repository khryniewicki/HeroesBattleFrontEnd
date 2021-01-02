import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game/game.component';
import {ServerComponent} from './server/server.component';
import {WebComponent} from './web/web.component';
import {LoggingComponent} from './logging/logging.component';

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'server', component: ServerComponent},
  {path: 'web', component: WebComponent},
  {path: 'log-in', component: LoggingComponent},

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponents = [GameComponent, ServerComponent, WebComponent, LoggingComponent];
