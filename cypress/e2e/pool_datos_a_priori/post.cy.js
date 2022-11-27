import { faker } from "@faker-js/faker";
const aPrioriData = require("../../../datastore/post.json");
const seed = 2021;

function get_data(type) {
  faker.seed(seed);
  const randNumber = faker.datatype.number({
    min: 0,
    max: aPrioriData.length - 1,
  });
  const randomData = aPrioriData[randNumber];
  return randomData[type];
}

describe("Validacion de datos formularios de post", (feature = "post") => {
  //6 test cases
  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it("E21 Como usuario administrador creo un post con un titulo y descripción con titulo menor a 255 caracteres", () => {
    const title = get_data("title");
    const description = get_data("description");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.wait(3000);
    cy.get("textarea.gh-editor-title").clear().type(title);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);

    let titleUrl = title.replaceAll(" ", "-").toLowerCase();
    cy.visit(`http://uniandes.ingenio.com.co:2368/${titleUrl}/`);
    cy.wait(3000);

    cy.get("h1.single-title").should("have.text", title);
  });

  it("E22 Como usuario administrador creo un post con un titulo mayor a 255 caracteres", () => {
    let title = get_data("long_text");
    title = title.slice(0, 256);
    const description = get_data("description");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.wait(3000);
    cy.get("textarea.gh-editor-title").clear().type(title);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").should("not.exist");
  });

  it("E23 Como usuario administrador ingreso un titulo en formato con caracteres 'naughty' e intento publicar post", () => {
    const title = get_data("naughty");
    const description = get_data("description");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.wait(3000);
    cy.get("textarea.gh-editor-title")
      .clear()
      .type(title, { parseSpecialCharSequences: false });
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);
  });

  it("E24 Como usuario administrador ingreso un titulo vacio y una description 10 lineas e intento publicar post", () => {
    const description = get_data("description");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.wait(3000);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);
    //cy.get("article.gh-alert.gh-alert-red").should("exist");
  });

  it("E25 Como usuario administrador filtro los post por publicacados por publicos y cambio nombre a la vista por uno mayor a 255 caracteres ", () => {
    let name = get_data("long_text");
    name = name.slice(0, 256);

    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/posts?visibility=public"
    );
    cy.wait(3000);
    cy.get("button.gh-btn-save-view").first().click({ force: true });
    cy.wait(3000);

    cy.get("input#view-name").clear().type(name);
    cy.get("button.gh-btn-black").click();

    cy.get("h2.gh-canvas-title.gh-post-title").should("include.text", name);
  });

  it("E26 Como usuario administrador filtro los post por publicacados por publicos y cambio nombre a la vista por un palabra menor a 255 caracteres ", () => {
    const name = get_data("title");

    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/posts?visibility=public"
    );
    cy.wait(3000);
    cy.get("button.gh-btn-save-view").first().click({ force: true });
    cy.wait(3000);

    cy.get("input#view-name").clear().type(name);
    cy.get("button.gh-btn-black").click();

    cy.get("h2.gh-canvas-title.gh-post-title").should("include.text", name);
  });
});
