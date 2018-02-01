import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  @Input() probId: string;
  @Input() numA: number;
  @Input() numB: number;
  @Input() operand: string;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
