import { Component, OnInit } from '@angular/core';
import { CodeAreaService } from './validator-phone/codeArea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'phone';

  constructor(private service: CodeAreaService) {}

  ngOnInit() {
  }
}
