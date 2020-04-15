import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-git-repo',
  templateUrl: './git-repo.component.html',
  styleUrls: ['./git-repo.component.css']
})
export class GitRepoComponent implements OnInit {

  @Input() name;
  @Input() path;

  constructor() { }

  ngOnInit(): void {
  }

}
