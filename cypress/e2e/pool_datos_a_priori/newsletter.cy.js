
const aPrioriData = require("../../../datastore/page_newsletter.json"); 

function get_data(type) {
  const randomData = aPrioriData[Math.floor(Math.random() * aPrioriData.length)];
  return randomData[type];
}


describe('Admin add newsletter', () => {

  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it('E11 Como usuario administrador me logeo e intento agregar boletin, indicar nombre menor a 191 caracteres,, decripción y crear', () => {
    const title_short = get_data("title_short")
    const description = get_data("description")
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title_short);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  })


  it('E12 Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar', () => {
    const title_short = get_data("title_short")
    const description = get_data("description")
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title_short);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn:not(.gh-btn-primary)").click();
  })


  it('E13 Como usuario administrador me logeo e intento agregar boletin, indicar nombre mayor a 191 caracteres, decripción y crear', () => {
    const title_large = get_data("title_large")
    const description = get_data("description")
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title_large);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  })


  it("E14 Como usuario administrador me logeo e intento editar un newsletter, indicar nombre menor a 191 caracteres y lo publico", () => {
    const title_short = get_data("title_short")
    const description = get_data("description")
    cy.goIntoSettings('newsletters')
    cy.wait(3000);
    cy.get("h3.gh-newsletter-card-name").first().click({ force: true });
    cy.wait(3000);
    cy.get('#newsletter-title').type(title_short);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-fullsettings-main-topbar-labs button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  });


  it("E15 Como usuario administrador me logeo e intento editar un newsletter, indicar nombre mayor a 191 caracteres y lo publico", () => {
    const title_large = get_data("title_large")
    const description = get_data("description")
    cy.goIntoSettings('newsletters')
    cy.wait(3000);
    cy.get("h3.gh-newsletter-card-name").first().click({ force: true });
    cy.wait(3000);
    cy.get('#newsletter-title').type(title_large);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-fullsettings-main-topbar-labs button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  });


})