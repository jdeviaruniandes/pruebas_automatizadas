import {faker} from "@faker-js/faker";

describe('Admin add newsletter', () => {

  it('Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y crear', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin()
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();

  })

  it('Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin()
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn:not(.gh-btn-primary)").click();

  })

})