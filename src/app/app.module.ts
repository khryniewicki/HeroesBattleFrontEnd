import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {GameComponent} from './game/game.component';
import {MatCardModule} from '@angular/material/card';
import {AnimationComponent} from './home/tiles/animation/animation.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {DownloadComponent} from './download/download.component';
import {SafePipe} from './utils/SafePipeIframe';
import {RedirectComponent} from './redirect/redirect.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GameSettingsPanelComponent } from './game-settings-panel/game-settings-panel.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DEFAULT_TIMEOUT, TimeoutInterceptor} from './utils/timeout/timeout-interceptor.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

export const materialComponents = [MatListModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatSlideToggleModule,
  FormsModule, MatGridListModule, MatButtonToggleModule, MatCardModule];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    GameComponent, AnimationComponent, DownloadComponent, SafePipe, RedirectComponent, GameSettingsPanelComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    materialComponents,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatExpansionModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,

  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }]
  ],
  bootstrap: [AppComponent],
  entryComponents: [AnimationComponent]
})
export class AppModule {
}

// tslint:disable-next-line:typedef
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
