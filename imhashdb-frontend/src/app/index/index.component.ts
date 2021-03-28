import {Component, EventEmitter, Input, OnInit} from "@angular/core";
import {Base64Service} from "../base64.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  query = new EventEmitter<string>()
  progress: number = -2
  showResult: boolean = false;

  constructor(private b64: Base64Service) {
  }

  ngOnInit(): void {
  }

  onSettingsChanged() {

  }

  onUpload() {
    // this.query.emit("test")
    // this.showResult = true;
    // return;

    const uploadElem = document.getElementById("upload") as HTMLInputElement;
    uploadElem.click()

    uploadElem.onchange = () => {
      this.showResult = true;

      if (uploadElem.files.length === 0) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result as ArrayBuffer;
        const b64array = this.b64.encBuffer(data);
        this.query.emit(b64array);
      };

      reader.readAsArrayBuffer(uploadElem.files[0]);
    }
  }
}

