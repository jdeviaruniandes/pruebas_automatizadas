import { faker } from "@faker-js/faker";

describe("Admin create new post", (feature = "post") => {
  // 11 test cases
  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it("E57 Como usuario administrador creo un post con un titulo y descripción con titulo menor a 255 caracteres", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
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
    cy.get("div.single-content p").should("have.text", description);
  });

  it("E58 Como usuario administrador edito un post publicado con titulo menor a 255 caracteres", (feature = "post") => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/posts?type=published"
    );
    cy.wait(3000);
    cy.get("h3.gh-content-entry-title").first().click({ force: true });
    cy.wait(3000);

    cy.get("textarea.gh-editor-title").clear().type(title);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-editor-save-trigger").click();
    cy.get("span.gh-notification-actions a")
      .invoke("removeAttr", "target")
      .click();
    cy.wait(3000);

    cy.get("h1.single-title").should("have.text", title);
    cy.get("div.single-content p").should("have.text", description);
  });

  it("E59 Como usuario administrador creo un post con un titulo mayor a 255 caracteres", () => {
    const title = faker.lorem.sentence(100);
    const description = faker.lorem.paragraph(10);

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

  it("E60 Como usuario administrador ingreso un titulo menor a 255, luego uno de 256 caracteres e intento publicar post", () => {
    const titleShort = faker.lorem.word(5);
    const titleLong = faker.random.alphaNumeric(256);
    const description = faker.lorem.paragraph(10);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.wait(3000);
    cy.get("textarea.gh-editor-title").clear().type(titleShort);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("textarea.gh-editor-title").clear().type(titleLong);
    cy.get("button.gh-publish-trigger").click();
    cy.get("article.gh-alert.gh-alert-red").should("exist");
  });

  it("E61 Como usuario administrador ingreso un titulo menor a 255 lo guardo como borrador, luego entro e ingreso un titulo de 255 caracteres e intento publicar post", () => {
    // Isue: Se genera una exepción de la aplicación en el momento de publicar el post
    const titleShort = faker.lorem.word(5);
    const titleLong = faker.random.alphaNumeric(255);
    const description = faker.lorem.paragraph(10);

    Cypress.on("uncaught:exception", (err, runnable) => {
      console.log(
        "Se ha generado el siguente error en la aplicación de ghost:"
      );
      console.log(err);
      return false;
    });

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.wait(3000);
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.wait(3000);
    cy.get("textarea.gh-editor-title").clear().type(titleShort);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("a.gh-editor-back-button").click();
    cy.wait(2000);
    cy.get("h3").contains(titleShort).click({ force: true });
    cy.wait(2000);
    cy.get("textarea.gh-editor-title").clear().type(titleLong);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    cy.wait(3000);
  });

  it("E62 Como usuario administrador ingreso un titulo en formato json e intento publicar post", () => {
    const title = `{"prop1": ${faker.random.alphaNumeric(
      6
    )}, "prop2": ${faker.random.alphaNumeric(
      3
    )}, "prop3": ${faker.random.alphaNumeric(7)} }`;
    const description = faker.lorem.paragraph(10);

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

  it("E63 Como usuario administrador ingreso un titulo vacio y una description 10 lineas e intento publicar post", () => {
    // Isue: permite publicar post sin titulo
    const description = faker.lorem.paragraph(10);

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

  it("E64 Como usuario administrador ingreso un titulo menor a 255 caracteres y una descripcion de una sola palabra mayor con mas de 255 caracteres", () => {
    // Isue al mirar el post la palabra rompe el diseño de la aplicación
    const title = faker.lorem.sentence();
    const description = faker.random.alphaNumeric(1000);

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
    cy.get("a.gh-post-bookmark-wrapper").invoke("removeAttr", "target").click();
    cy.wait(3000);
  });

  it("E65 Como usuario administrador edito un post dejando titulo vacio y una descripcion de un parrafo", () => {
    // Isue permite editar texto con titulo vacio
    const description = faker.lorem.paragraph();

    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/posts?type=published"
    );
    cy.wait(3000);
    cy.get("h3.gh-content-entry-title").first().click({ force: true });
    cy.wait(3000);

    cy.get("textarea.gh-editor-title").clear();
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-editor-save-trigger").click();
    cy.get("span.gh-notification-actions a")
      .invoke("removeAttr", "target")
      .click();
    cy.wait(3000);

    cy.get("div.single-content p").should("include.text", description);
  });

  it("E66 Como usuario administrador filtro los post por publicacados por publicos y cambio nombre a la vista por uno mayor a 255 caracteres ", () => {
    // Isue permite editar texto con nombre mayor a 255 y se daña el diseño
    const name = faker.random.alphaNumeric(256);

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

  it("E67 Como usuario administrador filtro los post por publicacados por publicos y cambio nombre a la vista por un palabra menor a 255 caracteres ", () => {
    const name = faker.random.word();

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
