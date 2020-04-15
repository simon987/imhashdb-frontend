import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: 'meta-dialog',
  templateUrl: './meta-dialog.component.html',
  styleUrls: ['./meta-dialog.component.css']
})
export class MetaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MetaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public meta) {
  }

  ngOnInit() {

  }

  formatTs(ts: number) {
    return moment(ts).fromNow()
  }
}
