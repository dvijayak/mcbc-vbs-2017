import { Component, OnInit } from '@angular/core';

import { FaqItem } from './faqitem';
import { FAQITEMS } from './faqitems';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  faqItems: FaqItem[] = FAQITEMS;

}
