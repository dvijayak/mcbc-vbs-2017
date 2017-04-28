import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'logout',
  templateUrl: 'logout.component.html',
  // styleUrls: ['logout.component.css'] // TODO
})
export class LogoutComponent {
   onClick (): void {
      window.location.href = '/logout';
      return;
   }
}
