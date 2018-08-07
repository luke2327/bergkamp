import { Component, OnInit } from '@angular/core';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-withdraw-note',
  templateUrl: './withdraw-note.component.html',
  styleUrls: ['./withdraw-note.component.sass']
})
export class WithdrawNoteComponent extends CommonSubComponent implements OnInit {

  constructor(public compStateService: CompStateService) {
    super(compStateService);
  }

  ngOnInit() {
  }

}
