import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearcherPageComponent } from './pages/searcher-page/searcher-page.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamResolver } from './resolvers/team.resolver';
import { StatsResolver } from './resolvers/stats.resolver';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

const routes: Routes = [
  {
    path:'home',
    component: HomePageComponent
  },
  {
    path:'register',
    component: RegisterPageComponent
  },
  {
    path:'searcher',
    component: SearcherPageComponent
  },
  {
    path:'teams',
    component: TeamsComponent
  },
  {
    path:'team/:id',
    component:TeamPageComponent,
    resolve:{
      team: TeamResolver
    }
  },
  {
    path:'stats/:id',
    component:StatsPageComponent,
    resolve:{
      stats: StatsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
