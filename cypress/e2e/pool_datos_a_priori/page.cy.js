
const aPrioriData = require("../../../datastore/page_newsletter.json"); 

function get_data(type) {
  const randomData = aPrioriData[Math.floor(Math.random() * aPrioriData.length)];
  return randomData[type];
}


describe("Admin create/cancel/edit page", () => {

  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it("E16 Como usuario administrador me logeo e intento crear una pagina, insertar titulo menor a 255 caracteres, descripcion, publicar ahora mismo", () => {
    const title_short = get_data("title_short")
    const description = get_data("description")
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


  it("E17 Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion y cancelar", () => {
    const title_short = get_data("title_short")
    const description = get_data("description")
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


  it("E18 Como usuario administrador me logeo e intento crear una pagina, insertar titulo mayor a 255 caracteres, descripcion, publicar ahora mismo", () => {
    const title_large = get_data("title_large")
    const description = get_data("description")
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


  it("E19 Como usuario administrador me logeo e intento editar una pagina, insertar titulo menor a 255 caracteres y la publico", () => {
    const title_short = get_data("title_short")
    const description = get_data("description")
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


  it("E20 Como usuario administrador me logeo e intento editar una pagina, insertar titulo mayor a 255 caracteres y la publico", () => {
    const title_large = get_data("title_large")
    const description = get_data("description")
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
