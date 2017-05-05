import { UiLoginPage } from './app.po';

describe('ui-login App', () => {
  let page: UiLoginPage;

  beforeEach(() => {
    page = new UiLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
