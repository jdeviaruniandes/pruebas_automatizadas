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


describe("Admin create/cancel/edit page", () => {

  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it("E101 Como usuario administrador me logeo e intento crear una pagina, insertar titulo menor a 255 caracteres, descripcion, publicar ahora mismo", async () => {
    const title_short = await get_data("title_short")
    const description = await get_data("description")
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/pages/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New page")
      .click();
      cy.wait(3000);
    cy.get("textarea.gh-editor-title").type(title_short);
    cy.get("article.koenig-editor").type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);

    let titleUrl = title_short.replaceAll(" ", "-").toLowerCase();
    cy.visit(`http://uniandes.ingenio.com.co:2368/${titleUrl}/`);
    cy.wait(3000);

    cy.get("h1.single-title").should("have.text", title_short);
    cy.get("div.single-content p").should("have.text", description);
  });


  it("E102 Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion y cancelar", async () => {
    const title_short = await get_data("title_short")
    const description = await get_data("description")
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/pages/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New page")
      .click();
      cy.wait(3000);
    cy.get("textarea.gh-editor-title").type(title_short);
    cy.get("article.koenig-editor").type(description);
    cy.wait(5000)
    cy.reload()
    cy.wait(1000)
    cy.get("div.koenig-editor__editor p").should("have.text", description);
  });


  it("E103 Como usuario administrador me logeo e intento crear una pagina, insertar titulo mayor a 255 caracteres, descripcion, publicar ahora mismo", async () => {
    const title_large = await get_data("title_large")
    const description = await get_data("description")
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/pages/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New page")
      .click();
      cy.wait(3000);
    cy.get("article.koenig-editor").type(description);
    cy.get("textarea.gh-editor-title").type(title_large);
    cy.get("button.gh-publish-trigger").click();
  
  });


  it("E104 Como usuario administrador me logeo e intento editar una pagina, insertar titulo menor a 255 caracteres y la publico", async () => {
    const title_short = await get_data("title_short")
    const description = await get_data("description")
    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/pages/"
    );
    cy.wait(3000);
    cy.get("h3.gh-content-entry-title").first().click({ force: true });
    cy.wait(3000);

    cy.get("textarea.gh-editor-title").clear().type(title_short);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
  });


  it("E105 Como usuario administrador me logeo e intento editar una pagina, insertar titulo mayor a 255 caracteres y la publico", async () => {
    const title_large = await get_data("title_large")
    const description = await get_data("description")
    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/pages/"
    );
    cy.wait(3000);
    cy.get("h3.gh-content-entry-title").first().click({ force: true });
    cy.wait(3000);

    cy.get("article.koenig-editor").type(description);
    cy.get("textarea.gh-editor-title").clear().type(title_large);
    cy.get("button.gh-publish-trigger").click();
  });   



});
