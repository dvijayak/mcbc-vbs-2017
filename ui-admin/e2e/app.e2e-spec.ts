import { UiAdminPage } from './app.po';

describe('ui-admin App', () => {
  let page: UiAdminPage;

  beforeEach(() => {
    page = new UiAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
