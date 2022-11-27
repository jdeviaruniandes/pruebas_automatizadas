import {faker} from "@faker-js/faker";

describe('Admin add newsletter', () => {

  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it('E47 Como usuario administrador me logeo e intento agregar boletin, indicar nombre menor a 191 caracteres,, decripción y crear', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  })


  it('E48 Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn:not(.gh-btn-primary)").click();
  })


  it('E49 Como usuario administrador me logeo e intento agregar boletin, indicar nombre mayor a 191 caracteres, decripción y crear', () => {
    const title = faker.lorem.sentence(192);
    const description = faker.lorem.paragraph();
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  })


  it("E50 Como usuario administrador me logeo e intento editar un newsletter, indicar nombre menor a 191 caracteres y lo publico", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.goIntoSettings('newsletters')
    cy.wait(3000);
    cy.get("h3.gh-newsletter-card-name").first().click({ force: true });
    cy.wait(3000);
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-fullsettings-main-topbar-labs button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  });


  it("E51 Como usuario administrador me logeo e intento editar un newsletter, indicar nombre mayor a 191 caracteres y lo publico", () => {
    const title = faker.lorem.sentence(192);
    const description = faker.lorem.paragraph();
    cy.goIntoSettings('newsletters')
    cy.wait(3000);
    cy.get("h3.gh-newsletter-card-name").first().click({ force: true });
    cy.wait(3000);
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-fullsettings-main-topbar-labs button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  });


})