const Mockaroo = require('mockaroo');


const amount = 10; // Cantidad de datos a generar
const apiClient = new Mockaroo.Client({apiKey: "f5d8a610"});

async function getDataApi() {
    return apiClient.generate({
        count: amount,
        schema: 'page_newsletter'
    }).then(function (records) {
        return records;
    });
}

async function get_data(type) {
    let pseudoData = await getDataApi();
    const randomData = pseudoData[Math.floor(Math.random() * pseudoData.length)];
    return await randomData[type];
}


describe('Admin add newsletter', () => {

  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it('E96 Como usuario administrador me logeo e intento agregar boletin, indicar nombre menor a 191 caracteres,, decripción y crear', async () => {
    const title_short = await get_data("title_short")
    const description = await get_data("description")
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title_short);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  })


  it('E97 Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar', async () => {
    const title_short = await get_data("title_short")
    const description = await get_data("description")
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title_short);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn:not(.gh-btn-primary)").click();
  })


  it('E98 Como usuario administrador me logeo e intento agregar boletin, indicar nombre mayor a 191 caracteres, decripción y crear', async () => {
    const title_large = await get_data("title_large")
    const description = await get_data("description")
    cy.goIntoSettings('newsletters')
    cy.get('a[href*="#/settings/newsletters/new/"]').click()
    cy.get('#newsletter-title').type(title_large);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-footer button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  })


  it("E99 Como usuario administrador me logeo e intento editar un newsletter, indicar nombre menor a 191 caracteres y lo publico", async () => {
    const title_short = await get_data("title_short")
    const description = await get_data("description")
    cy.goIntoSettings('newsletters')
    cy.wait(3000);
    cy.get("h3.gh-newsletter-card-name").first().click({ force: true });
    cy.wait(3000);
    cy.get('#newsletter-title').type(title_short);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-fullsettings-main-topbar-labs button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  });


  it("E100 Como usuario administrador me logeo e intento editar un newsletter, indicar nombre mayor a 191 caracteres y lo publico", async () => {
    const title_large = await get_data("title_large")
    const description = await get_data("description")
    cy.goIntoSettings('newsletters')
    cy.wait(3000);
    cy.get("h3.gh-newsletter-card-name").first().click({ force: true });
    cy.wait(3000);
    cy.get('#newsletter-title').type(title_large);
    cy.get("textarea.gh-input").type(description);
    cy.get(".modal-fullsettings-main-topbar-labs button.gh-btn.gh-btn-icon.gh-btn-primary.ember-view").click();
  });


})