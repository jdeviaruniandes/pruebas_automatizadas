var Mockaroo = require('mockaroo');


var amount = 10; // Cantidad de datos a generar
var apiClient = new Mockaroo.Client({ apiKey: "d6b9fa10" });

async function getDataApi() {
	return apiClient.generate({
		count: amount,
		schema: 'profile'
	}).then(function(records) {
    var record = records[i];
    console.log(record)
		return records;
	});
 };
 
 async function get_data(type) {
  pseudoData = await getDataApi();
  const randomData = pseudoData[Math.floor(Math.random() * pseudoData.length)];
  return await randomData[type];
}

describe('Admin create and delete elements in configuration', () => {

  it('Como usuario administrador voy perfil e intento cambiar el nombre, guardo cambios y verifico que se haya guardado', () => {

    const newName = get_data("user_name")

    cy.goAdminAndLogin()
    cy.get('div.gh-user-avatar').click()
    cy.get('li a[href="#/settings/staff/johnattan/"]').click()
    cy.get("input.user-name").clear().type(newName)
    cy.get('button.gh-btn-primary').click()
    cy.get("h2.gh-canvas-title").contains(newName);
  })

  it('Como usuario administrador voy perfil e intento cambiar el nombre, actualizo sin guardar cambios', () => {

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

    it('Como usuario administrador me logeo e intento agregar una bio de menos de 200 caracteres', () => {

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
  
    it('Como usuario administrador me logeo e intento agregar una bio de más de 200 caracteres', () => {

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
  it('Como usuario administrador me logeo e intento cambiar la contraseña ingresando una inferior a 10 digitos', () => {
8
    const shortPass = get_data("password").slice(0,5)
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
})


