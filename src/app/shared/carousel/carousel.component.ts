import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked, HostListener } from '@angular/core';
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
  private _listLong: boolean | number | any;
  public positionCarousel: number;
  public scrolling: boolean;
  public finish: boolean;
  constructor(private _teamService: TeamService) {
  }

  ngOnInit(): void {
    this.scrolling = false;
    this._listLong = false;
    this.positionCarousel = 0;
    this._teamService.getLogos().subscribe(res => {
      this.teamsWithLogo = res.sort(() => Math.random() - 0.5);
    })
  }

  ngAfterContentChecked() {
    if (this.list && !this._listLong) {
      this._listLong = this.list.nativeElement.clientWidth;
    }
  }

  public moveCarousel(event): void {
    let direction = event.currentTarget.dataset.direction;
    direction === 'right' ? this.positionCarousel++ : this.positionCarousel--;
    let currentPosition = this._listLong * this.positionCarousel;
    this.list.nativeElement.style.transform = `translateX(-${currentPosition}px)`;
  }

  @HostListener("scroll", ['$event'])
  onScrolling(e) {
    let carouselSize = e.srcElement.clientWidth;
    let carouselWidth = e.srcElement.scrollWidth;
    let carouselOffset = e.srcElement.scrollLeft;
    carouselOffset > 10 ? this.scrolling = true : this.scrolling = false;
    carouselOffset > carouselWidth - carouselSize - 10 ? this.finish = true : this.finish = false;
  }
}
