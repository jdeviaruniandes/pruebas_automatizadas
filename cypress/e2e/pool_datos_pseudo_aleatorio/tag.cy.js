import { faker } from "@faker-js/faker";

var Mockaroo = require("mockaroo");

var amount = 10; // Cantidad de datos a generar
var apiClient = new Mockaroo.Client({ apiKey: "99a65b30" });

async function getDataApi() {
  return apiClient
    .generate({
      count: amount,
      schema: "tags",
    })
    .then(function (records) {
      return records;
    });
}

async function get_data(type) {
  let pseudoData = await getDataApi();
  const randomData = pseudoData[Math.floor(Math.random() * pseudoData.length)];
  return await randomData[type];
}

describe("Validacion de datos formularios de tags", () => {
  //5 test cases
  beforeEach(() => {
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
  });

  it("E116 Como usuario administrador creo un Tag con description datos menores a 255", async () => {
    const title = await get_data("title");
    const description = await get_data("description");
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

  it("E117 Como usuario administrador creo un Tag con titulo igual a 192 caracteres", async () => {
    let title = await get_data("long_text");
    title = title.slice(0, 192);
    const description = await get_data("description");

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

  it("E118 Como usuario administrador creo un Tag con titulo exactamente igual a 191 caracteres", async () => {
    let title = await get_data("long_text");
    title = title.slice(0, 191);
    const description = await get_data("description");

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

  it("E119 Como usuario administrador creo un Tag con una descripcion de 500 caracteres", async () => {
    const title = await get_data("title");
    let description = await get_data("long_text");
    description = description.slice(0, 500);

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

  it("E120 Como usuario administrador creo un Tag con un formato de color en Hexadecimal valido", async (feature = "tags") => {
    const title = await get_data("title");
    const description = await get_data("description");
    let color = await get_data("color");
    color = color.replaceAll("#", "");

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
});
