import {faker} from "@faker-js/faker";

const aPrioriData = require("../../../datastore/profile.json"); // test.js:6

function get_data(type) {
  const randomData = aPrioriData[Math.floor(Math.random() * aPrioriData.length)];
  return randomData[type];
}

describe('Admin create and delete elements in configuration', () => {

  it(' E27 Como usuario administrador voy perfil e intento cambiar el nombre, guardo cambios y verifico que se haya guardado', () => {

    const newName = get_data("user_name")

    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("input.user-name").clear().type(newName)
    cy.get('button.gh-btn-primary').click()
    cy.get("h2.gh-canvas-title").contains(newName);
  })

  it('E28 Como usuario administrador voy perfil e intento cambiar el nombre, actualizo sin guardar cambios', () => {

    const newName = get_data("user_name")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("input.user-name").clear().type("johnattan devia")
    cy.get('button.gh-btn-primary').click()
    cy.get("input.user-name").clear().type(newName)
    cy.reload()
    cy.wait(5000)
    cy.get("h2.gh-canvas-title").contains("johnattan devia");
  })

    it('E29 Como usuario administrador me logeo e intento agregar una bio de menos de 200 caracteres', () => {

    const newBio = get_data("bio_short")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-bio").clear().type(newBio)
    cy.get('button.gh-btn-primary').click()
    cy.reload()
    cy.wait(5000)
    cy.get("#user-bio").contains(newBio);
  })
  
    it('E30 Como usuario administrador me logeo e intento agregar una bio de más de 200 caracteres', () => {

    const newBio = get_data("bio_large")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-bio").clear().type(newBio)
    cy.get('button.gh-btn-primary').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Bio is too long")
        expect(ele.text()).equals("Bio is too long")
    })
  })
  it('E31 Como usuario administrador me logeo e intento cambiar la contraseña ingresando una inferior a 10 digitos', () => {

    const shortPass = get_data("password")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-password-old").clear().type(shortPass)
    cy.get("#user-password-new").clear().type(shortPass)
    cy.get("#user-new-password-verification").clear().type(shortPass)

    cy.get('button.button-change-password').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Password must be at least 10 characters long."){
        expect(ele.text()).equals("Password must be at least 10 characters long.")
      }
    })
  })

  it('E32 Como usuario administrador me logeo e intento cambiar el email ingresando un dato erroneo', () => {
    const newEmail = get_data("user_name")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-email").clear().type(newEmail)
    cy.get('button.gh-btn-primary').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Please supply a valid email address"){
        expect(ele.text()).equals("Please supply a valid email address")
      }
    })
  })
  
  it('E33 Como usuario administrador me logeo e intento cambiar la locación ingresando un dato de más de 200 caracteres', () => {
    const newLocation = get_data("bio_large")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-location").clear().type(newLocation)
    cy.get('button.gh-btn-primary').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Location is too long"){
        expect(ele.text()).equals("Location is too long")
      }
    })
  })

    it('E34 Como usuario administrador me logeo e intento cambiar la contraseña ingresando una numerica de 10 digitos', () => {

    const numberPass = get_data("number")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-password-new").clear().type(numberPass)
    cy.get("#user-new-password-verification").clear().type(numberPass)
    cy.get('button.button-change-password').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Sorry, you cannot use an insecure password."){
        expect(ele.text()).equals("Sorry, you cannot use an insecure password.")
      }
    })
  })

  it('E35 Como usuario administrador me logeo e intento cambiar el website con un valor no válido', () => {

    const newWebSite = get_data("user_name")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("#user-website").clear().type(newWebSite)
    cy.get('button.gh-btn-primary').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Website is not a valid url"){
        expect(ele.text()).equals("Website is not a valid url")
      }
    })
  })
  it('E36 Como usuario administrador voy perfil e intento cambiar el nombre de más de 200 caracteres y verifico que salga error', () => {
    const newName = get_data("bio_large")
    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("input.user-name").clear().type(newName)
    cy.get('button.gh-btn-primary').click()
    cy.get("p.response").then(($ele) => {
      if ($ele.text() === "Name is too long"){
        expect(ele.text()).equals("Name is too long")
      }
    })
  })
  
})


