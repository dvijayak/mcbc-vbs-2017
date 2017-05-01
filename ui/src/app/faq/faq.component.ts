import { Component, OnInit } from '@angular/core';

class FaqItem {
   header: string; // HTML string
   body: string; // HTML string
};

const FAQITEMS: FaqItem[] = [
   { header: `Where do I drop-off my children?`, body: `All pre-registered kids will check in the Sanctuary which are zoned off for each grade level. Crew Leaders will have identifiable signs which represent which classroom your child has been assigned to from your confirmation email.`},
   { header: `When and where do I pick up my children?`, body: `With the exception of JK/SK kids, all other children will be picked up in the Sanctuary by parent or guardian, where they were dropped off in the morning. <b>Please come promptly for noon.</b><br/><br/><i>Note: For JK/SK kids, they will be picked up directly from their classroom on the main floor by parent or guardian at noon. Please ask a crew member for further details and directions.</i>`},
   { header: `What happens each day?`, body: `Kindergarten-Grade 6 children begin each morning in the Worship Center with the Opening Worship Rally. After morning worship, children will attend different rotations with classmates their own age including Bible Study, Crafts, Music, Recreation, and Snacks. The day ends with a Closing Worship Rally, and then children are dismissed at 12:00 pm.`},
   { header: `Late drop-off or early pick-up?`, body: `For safety and security reasons, we ask that you check in at the Front Office with children who arrive after 9:15 am <i>or</i> if you need to pick up a child before 12:00 pm.`},
   { header: `Is it important that I pre-register?`, body: `<b>Registration will be open until August 4, 2017. TODO - put this date in event details card</b> However, when we reach capacity for a particular age, we will close registration for that age group. Preregistration guarantees you a spot and will make the first day of VBS easier for your family. All children will receive their preassigned classroom information to their email address provided on the registration forms. Onsite registration will be available each day but there are no guarantees. Please ensure to register early as space is limited. All late registrations or registrations received where the classes are full, will be placed on a Waiting List.`},
   { header: ``, body: ``},
   { header: ``, body: ``},
   { header: ``, body: ``},
   { header: ``, body: ``},
   { header: ``, body: ``},
   { header: ``, body: ``},
   { header: ``, body: ``},
   { header: ``, body: ``},
];

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
