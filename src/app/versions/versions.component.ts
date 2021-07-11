import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.sass']
})
export class VersionsComponent {

  isChecked: boolean = false ;
  isCheckedName: any;

  @Input() versions: any;
  @Input() change: any;

  @Output() showDiffVersion = new EventEmitter();
  @Output() resetToCurrentVersion = new EventEmitter();
  @Output() applyOldVersion = new EventEmitter();

  constructor() { }

  applyVersion(version: any): void{
    this.applyOldVersion.emit(version);
    this.isCheckedName = "";
    this.isChecked = false;
  }

  onChangeDiffSelection(e: any): void {

      this.isChecked = !this.isChecked;
      this.isCheckedName = e.target.name;
  
      if ( this.isChecked) {
        for(let i = 0; i< this.versions.length;i++) {
          if (this.versions[i].vnum == Number(e.target.name)) {
            this.showDiffVersion.emit(this.versions[i]);    
            break;
          }
        }
      } else {
        this.resetToCurrentVersion.emit();
      }
  }

}
