import { Component, OnInit } from '@angular/core';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-deposit-note',
  templateUrl: './deposit-note.component.html',
  styleUrls: ['./deposit-note.component.sass']
})
export class DepositNoteComponent extends CommonSubComponent implements OnInit {

  constructor(public compStateService: CompStateService) {
    super(compStateService);
  }

  ngOnInit() {
  }

}
