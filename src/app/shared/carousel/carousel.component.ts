import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamModel } from '../../models/team.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentChecked {
  public teamsWithLogo: Array<TeamModel>;
  @ViewChild('list') list: ElementRef;
  private listLong: any;
  public positionCarousel: number;
  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.listLong = false;
    this.positionCarousel = 0;
    this.teamService.getLogos().subscribe(res => {
      this.teamsWithLogo = res.sort(() => Math.random() - 0.5);
    })
  }

  ngAfterContentChecked() {
    if (this.list && !this.listLong) {
      this.listLong = this.list.nativeElement.clientWidth;
    }
  }

  public moveCarousel(event): void {
    let direction = event.currentTarget.dataset.direction;
    direction === 'right' ? this.positionCarousel++ : this.positionCarousel--;
    let currentPosition = this.listLong * this.positionCarousel;
    this.list.nativeElement.style.transform = `translateX(-${currentPosition}px)`;
  }
}
