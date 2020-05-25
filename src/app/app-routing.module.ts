import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamResolver } from './resolvers/team.resolver';
import { TeamsResolver } from './resolvers/teams.resolver';
import { StatsResolver } from './resolvers/stats.resolver';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { GamesResolver } from './resolvers/games.resolver';
import { PlayerResolver } from './resolvers/player.resolver';
import { StatsByPlayerResolver } from './resolvers/statsByPlayer.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'teams',
    component: TeamsComponent,
    resolve: {
      teams : TeamsResolver
    }
  },
  {
    path: 'team/:id',
    component: TeamPageComponent,
    resolve: {
      team: TeamResolver,
      games: GamesResolver
    }
  },
  {
    path: 'stats/:id',
    component: StatsPageComponent,
    resolve: {
      stats: StatsResolver
    }
  },
  {
    path: 'player/:id',
    component: PlayerPageComponent,
    resolve:{
      player: PlayerResolver,
      stats : StatsByPlayerResolver
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
