import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public showSpinner: boolean;
  constructor(private _spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this._spinnerService.changeShow.subscribe(res => {
      this.showSpinner = res;
    });
  }

}
