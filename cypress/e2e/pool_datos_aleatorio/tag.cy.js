import { faker } from "@faker-js/faker";

describe("Admin create new post", () => {
  it("Como usuario administrador creo un Tag con description", (feature = "tags") => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/navigate_tags`);
    cy.get("a.ember-view.gh-btn.gh-btn-primary").contains("New tag").click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/create_tag`);
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/created_tag`);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("Como usuario administrador edito un tag", (feature = "tags") => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("h3.gh-tag-list-name").first().click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/edit_tag`);
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
    cy.wait(1500);
    cy.screenshot(`images/cypress/${feature}/edited_tag`);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/edited_tag_list`);

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("Como usuario administrador creo y borro un tag", (feature = "tags") => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();

    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.wait(3000);
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("a.ember-view.gh-btn.gh-btn-primary").contains("New tag").click();
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/create_tag_to_delete`);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
    cy.wait(3000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("h3.gh-tag-list-name").contains(title).click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/tag_to_delete`);

    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon").click();
    cy.wait(1000);
    cy.screenshot(`images/cypress/${feature}/tag_delete_modal`);
    cy.once("uncaught:exception", () => false);
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.ember-view").click();
    cy.wait(3000);
    cy.screenshot(`images/cypress/${feature}/tag_deleted`);
    cy.wait(3000);
    cy.log(title);

    cy.get("h3.gh-tag-list-name").contains(title).should("not.exist");
  });
});
