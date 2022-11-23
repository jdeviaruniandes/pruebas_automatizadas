import {faker} from "@faker-js/faker";
import { expect } from "chai";

const profile_name = "profile";
const endpoint = "http://uniandes.ingenio.com.co:2367/ghost/";
describe('Admin create and delete elements in configuration', () => {

  it('Como usuario administrador voy perfil e intento cambiar el nombre, guardo cambios y verifico que se haya guardado', () => {

    const newName = faker.lorem.word()

    cy.goAdminAndLogin(profile_name)
    cy.visit(`${endpoint}#/staff/johnatan/`)
    cy.screenshot(`images/cypress/profile/go_to_my_profile`)
    cy.get("#user-name").clear().type(newName,{force: true})
    cy.screenshot(`images/cypress/profile/fill_profile_with_faker`)
    cy.get('button.gh-btn-blue').click()
    cy.screenshot(`images/cypress/profile/save_profile_changes`)
    cy.get("h2.gh-canvas-title").contains(newName);
    cy.screenshot(`images/cypress/profile/check_bio_updated`)
  })

  it('Como usuario administrador voy perfil e intento cambiar el nombre, actualizo sin guardar cambios', () => {

    const newName = faker.lorem.word()

    cy.goAdminAndLogin(profile_name)
    cy.visit(`${endpoint}#/staff/johnatan/`)
    cy.get("#user-name").clear().type("johnattan devia", {force:true})
    cy.get('button.gh-btn-blue').click()
    cy.screenshot(`images/cypress/profile/change_user_name_no_save`)
    cy.get("#user-name").clear().type(newName, {force:true})
    cy.reload()
    cy.wait(5000)
    cy.screenshot(`images/cypress/profile/refresh_profile`)
    cy.get("h2.gh-canvas-title").contains("johnattan devia");
    cy.screenshot(`images/cypress/profile/full_name_changed_no_save`)
  })

  it('Como usuario administrador me logeo e intento agregar una bio de menos de 200 caracteres', () => {

    const newBio = faker.lorem.words()

    cy.goAdminAndLogin(profile_name)
    cy.visit(`${endpoint}#/staff/johnatan/`)
    cy.get("#user-bio").clear().type(newBio,{force:true})
    cy.screenshot(`images/cypress/profile/bio_less_200_characters`)
    cy.get('button.gh-btn-blue').click()
    cy.screenshot(`images/cypress/profile/save_change_bio`)
    cy.reload()
    cy.wait(5000)
    cy.screenshot(`images/cypress/profile/refresh_profile`)
    cy.get("span.word-count").contains(200 - newBio.length);
    cy.screenshot(`images/cypress/profile/check_new_bio`)

  })

  it('Como usuario administrador me logeo e intento agregar una bio de más de 200 caracteres', () => {

    const newBio = faker.lorem.words(30)

    cy.goAdminAndLogin(profile_name)
    cy.visit(`${endpoint}#/staff/johnatan/`)
    cy.get("#user-bio").clear().type(newBio, {force:true})
    cy.screenshot(`images/cypress/profile/bio_more_200_characters`)
    cy.get('button.gh-btn-blue').click()
    cy.screenshot(`images/cypress/profile/save_change_bio_error`)
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Bio is too long")
        expect(ele.text()).equals("Bio is too long")
    })
    cy.screenshot(`images/cypress/profile/error_bio_too_long`)

  })
  it('Como usuario administrador me logeo e intento cambiar la contraseña ingresando una inferior a 10 digitos', () => {

    const shortPass = "1234"
    cy.goAdminAndLogin(profile_name)
    cy.visit(`${endpoint}#/staff/johnatan/`)
    cy.get("#user-password-old").clear().type(shortPass,{force:true})
    cy.screenshot(`images/cypress/profile/password_old_short`)

    cy.get("#user-password-new").clear().type(shortPass,{force:true})
    cy.screenshot(`images/cypress/profile/password_new_short`)

    cy.get("#user-new-password-verification").clear().type(shortPass,{force:true})
    cy.screenshot(`images/cypress/profile/password_verification_short`)

    cy.get('button.button-change-password').click()
    cy.screenshot(`images/cypress/profile/save_password`)

    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Password must be at least 10 characters long."){
        expect(ele.text()).equals("Password must be at least 10 characters long.")
      }
    })
    cy.screenshot(`images/cypress/profile/error_save_password`)

  })
})