const Mockaroo = require('mockaroo');


const amount = 10; // Cantidad de datos a generar
const apiClient = new Mockaroo.Client({apiKey: "d6b9fa10"});

async function getDataApi() {
    return apiClient.generate({
        count: amount,
        schema: 'profile'
    }).then(function (records) {
        return records;
    });
}

async function get_data(type) {
    let pseudoData = await getDataApi();
    const randomData = pseudoData[Math.floor(Math.random() * pseudoData.length)];
    return await randomData[type];
}

describe('Admin create and delete elements in configuration', () => {

    it('E106 Como usuario administrador voy perfil e intento cambiar el nombre, guardo cambios y verifico que se haya guardado', async () => {

        const newName = await get_data("user_name")
        cy.log(newName)
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("input.user-name").clear().type(newName)
        cy.get('button.gh-btn-primary').click()
        cy.get("h2.gh-canvas-title").contains(newName);
    })


    it('E107 Como usuario administrador voy perfil e intento cambiar el nombre, actualizo sin guardar cambios', async () => {

        const newName = await get_data("user_name")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("input.user-name").clear().type("johnattan devia")
        cy.get('button.gh-btn-primary').click()
        cy.get("input.user-name").clear().type(newName)
        cy.reload()
        cy.wait(8000)
        cy.get("h2.gh-canvas-title").contains("johnattan devia");
    })

    it('E108 Como usuario administrador me logeo e intento agregar una bio de menos de 200 caracteres', async () => {

        const newBio = await get_data("bio_short")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("#user-bio").clear().type(newBio)
        cy.get('button.gh-btn-primary').click()
        cy.reload()
        cy.wait(5000)
        cy.get("#user-bio").contains(newBio);
    })

    it('E109 Como usuario administrador me logeo e intento agregar una bio de más de 200 caracteres', async () => {

        const newBio = await get_data("bio_large")
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
    it('E110 Como usuario administrador me logeo e intento cambiar la contraseña ingresando una inferior a 10 digitos', async () => {
        let shortPass = await get_data("password")
        shortPass = shortPass.substring(1, 3)
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("#user-password-old").clear().type(shortPass)
        cy.get("#user-password-new").clear().type(shortPass)
        cy.get("#user-new-password-verification").clear().type(shortPass)

        cy.get('button.button-change-password').click()
        cy.get("p.response").then(($ele) => {
            if ($ele.text() === "Password must be at least 10 characters long.") {
                expect(ele.text()).equals("Password must be at least 10 characters long.")
            }
        })
    })

    it('E111 Como usuario administrador me logeo e intento cambiar el email ingresando un dato erroneo', async () => {
        const newEmail = await get_data("user_name")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("#user-email").clear().type(newEmail)
        cy.get('button.gh-btn-primary').click()
        cy.get("p.response").then(($ele) => {
            if ($ele.text() === "Please supply a valid email address") {
                expect(ele.text()).equals("Please supply a valid email address")
            }
        })
    })
    it('E112 Como usuario administrador me logeo e intento cambiar la locación ingresando un dato de más de 200 caracteres', async () => {
        const newLocation = await get_data("bio_large")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("#user-location").clear().type(newLocation)
        cy.get('button.gh-btn-primary').click()
        cy.get("p.response").then(($ele) => {
            if ($ele.text() === "Location is too long") {
                expect(ele.text()).equals("Location is too long")
            }
        })
    })

    it('E113 Como usuario administrador me logeo e intento cambiar la contraseña ingresando una numerica de 10 digitos', async () => {

        const numberPass = await get_data("number")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("#user-password-new").clear().type(numberPass)
        cy.get("#user-new-password-verification").clear().type(numberPass)
        cy.get('button.button-change-password').click()
        cy.get("p.response").then(($ele) => {
            if ($ele.text() === "Sorry, you cannot use an insecure password.") {
                expect(ele.text()).equals("Sorry, you cannot use an insecure password.")
            }
        })
    })

    it('E114 Como usuario administrador me logeo e intento cambiar el website con un valor no válido', async () => {

        const newWebSite = await get_data("user_name")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("#user-website").clear().type(newWebSite)
        cy.get('button.gh-btn-primary').click()
        cy.get("p.response").then(($ele) => {
            if ($ele.text() === "Website is not a valid url") {
                expect(ele.text()).equals("Website is not a valid url")
            }
        })
    })
    it('E115 Como usuario administrador voy perfil e intento cambiar el nombre de más de 200 caracteres y verifico que salga error', async () => {
        const newName = await get_data("bio_large")
        cy.goAdminAndLogin()
        cy.get('div.gh-user-avatar').click()
        cy.get('li a[href="#/settings/staff/johnattan/"]').click()
        cy.get("input.user-name").clear().type(newName)
        cy.get('button.gh-btn-primary').click()
        cy.get("p.response").then(($ele) => {
            if ($ele.text() === "Name is too long") {
                expect(ele.text()).equals("Name is too long")
            }
        })
    })
})


