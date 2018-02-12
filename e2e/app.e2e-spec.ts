import { MedWebPage } from './app.po';

describe('med-web App', () => {
  let page: MedWebPage;

  beforeEach(() => {
    page = new MedWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
