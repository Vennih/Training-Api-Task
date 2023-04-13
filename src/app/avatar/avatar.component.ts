import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ViewPopupComponent } from '../view-popup/view-popup.component';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnChanges {
  
  @Input() gender: string= "";
  image: any;

  ngOnChanges(): void {
    
    if (this.gender == 'male'){
      this.image = "/assets/male.png"
    }else{
      this.image = "/assets/female.png"
    }

  }

}
