import { faker } from "@faker-js/faker";

describe("Admin create new post", () => {
  //8 test cases
  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it("E78 Como usuario administrador creo un Tag con description datos menores a 255", (feature = "tags") => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.wait(3000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("E79 Como usuario administrador edito un tag con description datos menores a 255", (feature = "tags") => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("h3.gh-tag-list-name").first().click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.wait(1500);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("E80 Como usuario administrador creo un tag con description con datos numericos y luego se elimina", (feature = "tags") => {
    const title = faker.random.numeric(15);
    const description = faker.random.numeric(15);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);
    cy.wait(3000);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.wait(3000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("h3.gh-tag-list-name").contains(title).click({ force: true });
    cy.wait(3000);

    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon").click({ force: true });
    cy.wait(1000);

    cy.once("uncaught:exception", () => false);
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.ember-view").click({
      force: true,
    });

    cy.wait(3000);
    cy.log(title);

    cy.get("h3.gh-tag-list-name").contains(title).should("not.exist");
  });

  it("E81 Como usuario administrador creo un Tag con titulo igual a 192 caracteres", (feature = "tags") => {
    const title = faker.random.alphaNumeric(192);
    const description = faker.lorem.paragraph();
    const mesageError = "Tag names cannot be longer than 191 characters";
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("p.response").should("include.text", mesageError);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get(".modal-footer > .gh-btn-red > span").click({
      force: true,
    });
    cy.wait(3000);

    cy.get("h3.gh-tag-list-name").contains(title).should("not.exist");
  });

  it("E82 Como usuario administrador creo un Tag con titulo exactamente igual a 191 caracteres", (feature = "tags") => {
    //Isue El titulo no se puede ver completo ni recortar en otra linea ni aparecen puntos indicando que continua
    const title = faker.random.alphaNumeric(191);
    const description = faker.lorem.paragraph();

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.wait(3000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("E83 Como usuario administrador creo un Tag con una descripcion de 500 caracteres", (feature = "tags") => {
    const title = faker.lorem.sentence();
    const description = faker.random.alphaNumeric(500);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.wait(3000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("E84 Como usuario administrador creo un Tag con un formato de color en Hexadecimal valido", (feature = "tags") => {
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const color = faker.color.rgb({ prefix: "" });

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);
    cy.get(".input-color > .gh-input").clear().type(color);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });
    cy.wait(3000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("E85 Como usuario administrador creo un Tag con un formato de color en un formato no valido", (feature = "tags") => {
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const color = "/" + faker.color.human();
    const mesageError = "The colour should be in valid hex format";

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);

    cy.get("a.ember-view.gh-btn.gh-btn-primary")
      .contains("New tag")
      .click({ force: true });
    cy.wait(3000);

    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);
    cy.get(".input-color > .gh-input").clear().type(`${color}`);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click({
      force: true,
    });

    cy.get("p.response").should("include.text", mesageError);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get(".modal-footer > .gh-btn-red > span").click({
      force: true,
    });
    cy.wait(3000);

    cy.get("h3.gh-tag-list-name").contains(title).should("not.exist");
  });
});
