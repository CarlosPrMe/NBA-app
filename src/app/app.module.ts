import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { LogoComponent } from './shared/logo/logo.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CardCarouselComponent } from './shared/card-carousel/card-carousel.component';
import { HttpClientModule }    from '@angular/common/http';
import { BgImageDirective } from './directives/bg-image.directive';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearcherPageComponent } from './pages/searcher-page/searcher-page.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { HeaderComponent } from './shared/header/header.component';
import { ColorDirective } from './directives/color.directive';
import { ResultBoxComponent } from './shared/result-box/result-box.component';
import { ResultDataComponent } from './shared/result-data/result-data.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ResultStatsComponent } from './shared/result-stats/result-stats.component';
import { StatsComponent } from './shared/stats/stats.component';
import { DatePipe } from './pipes/date.pipe';
import { StatsDetailComponent } from './shared/stats-detail/stats-detail.component';
import { HeightPipe } from './pipes/height.pipe';
import { WeightPipe } from './pipes/weight.pipe';
import { PositionPipe } from './pipes/position.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    LogoComponent,
    MenuComponent,
    CardCarouselComponent,
    BgImageDirective,
    TeamPageComponent,
    HomePageComponent,
    RegisterPageComponent,
    SearcherPageComponent,
    SpinnerComponent,
    TeamsComponent,
    HeaderComponent,
    ColorDirective,
    ResultBoxComponent,
    ResultDataComponent,
    StatsPageComponent,
    ResultStatsComponent,
    StatsComponent,
    DatePipe,
    StatsDetailComponent,
    HeightPipe,
    WeightPipe,
    PositionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
