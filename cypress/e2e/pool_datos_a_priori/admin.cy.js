const companies = require("/datastore/companies.json")
const users = require("/datastore/users.json")

describe('Admin create and delete elements in configuration', () => {

    it('E01 Como usuario administrador cambio el titulo y lo verifico en la página', () => {
        const company = companies[Math.floor(Math.random() * companies.length)];
        const profile_name = "title";
        const newTitle = company.name
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('general', profile_name)
        cy.get('.gh-expandable-block').contains('Title').parents('.gh-expandable-block').find('button.gh-btn').click()
        cy.get('.gh-expandable-content input').eq(0).clear().type(newTitle)
        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)

        cy.title().should('eq', newTitle)

    })


    it('E06 Como usuario administrador cambio el titulo por uno vacio y lo verifico en la página', () => {
        const company = companies[Math.floor(Math.random() * companies.length)];
        const profile_name = "title";
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('general', profile_name)
        cy.get('.gh-expandable-block').contains('Title').parents('.gh-expandable-block').find('button.gh-btn').click()
        cy.get('.gh-expandable-content input').eq(0).clear()
        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)

        cy.title().should('eq', '')

    })

    it('E07 Como usuario administrador cambio el titulo por uno de al menos 500 caracteres y lo verifico en la página', () => {
        const company = companies[Math.floor(Math.random() * companies.length)];
        const profile_name = "title";
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('general', profile_name)
        cy.get('.gh-expandable-block').contains('Title').parents('.gh-expandable-block').find('button.gh-btn').click()
        cy.get('.gh-expandable-content input').eq(0).clear().invoke('val', company.description).type('.')

        cy.get('.response').contains('Title is too long').should('be.visible')

    })


    it('E02 Como usuario administrador crea un elemento del menu en la navegacion principal', () => {
        const profile_name = "menu_create";
        const company = companies[Math.floor(Math.random() * companies.length)];
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear().type(company.name)
        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(company.url)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)
        cy.get('#gh-head .nav a[href="' + company.url + '"]').should(($nav) => {
            expect($nav).to.have.length(1)
            expect($nav.first()).to.contain(company.name)
        })

    })

    it('E03 Como usuario administrador elimino un elemento del menu en la navegacion principal', () => {
        const profile_name = "menu_delete";
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        let lastHref = {};
        let previewLength = 0;

        cy.goWebsite(profile_name)

        cy.get('#gh-head .nav a').then(($aElement) => {
            $aElement.each(($innerEl) => {
                lastHref['el-' + $innerEl] = $aElement.eq($innerEl).attr('href')
            })
            previewLength = $aElement.length
        })
        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.wait(1000)
        cy.get('#settings-navigation .sortable-objects .draggable-object:last-child button.gh-blognav-delete').click()
        cy.wait(1000)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)
        cy.get('#gh-head .nav a').should(($aElement) => {
            expect($aElement).to.have.length(previewLength - 1)

            $aElement.each(($innerEl) => {
                expect(lastHref['el-' + $innerEl]).to.eq($aElement.eq($innerEl).attr('href'))
            })
        })
    })

    it('E04 Como usuario administrador crea un elemento del menu en la navegacion principal sin label y no me debe dejar el sistema', () => {
        const profile_name = "menu_create";
        const company = companies[Math.floor(Math.random() * companies.length)];
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)
        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear()
        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(company.url)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.get('.response').contains('You must specify a label').should('be.visible')
    })

    it('E05 Como usuario administrador crea un elemento del menu en la navegacion principal con un nombre y un correo y debe guardar el enlace "mailto"', () => {
        const profile_name = "menu_create";

        const user = users[Math.floor(Math.random() * users.length)];
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear().type(user.first_name + ' ' + user.last_name)
        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(user.email)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)
        cy.get('#gh-head .nav a[href="mailto:' + user.email + '"]').should(($nav) => {
            expect($nav).to.have.length(1)
            expect($nav.first()).to.contain(user.first_name + ' ' + user.last_name)
        })
    })

    it('E03 Como usuario administrador elimino un elemento del menu en la navegacion principal', () => {
        const profile_name = "menu_delete";
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        let lastHref = {};
        let previewLength = 0;

        cy.goWebsite(profile_name)

        cy.get('#gh-head .nav a').then(($aElement) => {
            $aElement.each(($innerEl) => {
                lastHref['el-' + $innerEl] = $aElement.eq($innerEl).attr('href')
            })
            previewLength = $aElement.length
        })
        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.wait(1000)
        cy.get('#settings-navigation .sortable-objects .draggable-object:last-child button.gh-blognav-delete').click()
        cy.wait(1000)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)
        cy.get('#gh-head .nav a').should(($aElement) => {
            expect($aElement).to.have.length(previewLength - 1)

            $aElement.each(($innerEl) => {
                expect(lastHref['el-' + $innerEl]).to.eq($aElement.eq($innerEl).attr('href'))
            })
        })
    })

    it('E08 Como usuario administrador crea un elemento del menu en la navegacion con información muy larga', () => {
        const profile_name = "menu_create";
        const company = companies[Math.floor(Math.random() * companies.length)];
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })


        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear().invoke('val', company.description).type('.')
        cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(company.url)

        cy.saveSettings()

        cy.wait('@saveSettings').its('response.statusCode').should('eq', 422)

        cy.get('.gh-alert.gh-alert-red').contains('Validation error').should('be.visible')

    })

    it('E09 Como usuario administrador crea un elemento del menu en la navegacion secundaria', () => {
        const profile_name = "menu_secondary_create";
        const company = companies[Math.floor(Math.random() * companies.length)];
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.get('#secondary-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear().type(company.name)
        cy.get('#secondary-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(company.url)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)
        cy.get('footer .nav a[href="' + company.url + '"]').should(($nav) => {
            expect($nav).to.have.length(1)
            expect($nav.first()).to.contain(company.name)
        })

    })


    it('E10 Como usuario administrador elimino un elemento del menu en la navegacion principal', () => {
        const profile_name = "menu_secondary_delete";
        cy.intercept('/ghost/api/admin/settings').as('saveSettings')

        let lastHref = {};
        let previewLength = 0;

        cy.goWebsite(profile_name)

        cy.get('footer .nav a').then(($aElement) => {
            $aElement.each(($innerEl) => {
                lastHref['el-' + $innerEl] = $aElement.eq($innerEl).attr('href')
            })
            previewLength = $aElement.length
        })
        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('navigation', profile_name)

        cy.wait(1000)
        cy.get('#secondary-navigation .sortable-objects .draggable-object:last-child button.gh-blognav-delete').click()
        cy.wait(1000)

        cy.saveSettings()
        cy.wait('@saveSettings')
        cy.goWebsite(profile_name)
        cy.get('footer .nav a').should(($aElement) => {
            expect($aElement).to.have.length(previewLength - 1)

            $aElement.each(($innerEl) => {
                expect(lastHref['el-' + $innerEl]).to.eq($aElement.eq($innerEl).attr('href'))
            })
        })
    })

})