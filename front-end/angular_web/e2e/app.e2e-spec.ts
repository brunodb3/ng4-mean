import { Ng4MeanAngularWebPage } from './app.po';

describe('ng4-mean-angular-web App', () => {
  let page: Ng4MeanAngularWebPage;

  beforeEach(() => {
    page = new Ng4MeanAngularWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
