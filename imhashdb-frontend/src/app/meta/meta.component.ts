import {Component, Inject, Input, OnInit} from "@angular/core";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MetaDialogComponent} from "../meta-dialog/meta-dialog.component";


@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {

  @Input() meta;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(MetaDialogComponent, {data: this.meta})
  }

  formatTs(ts: number) {
    return moment(ts).fromNow()
  }

  formatTsTitle(ts: number) {
    return moment(ts).format()
  }
}


