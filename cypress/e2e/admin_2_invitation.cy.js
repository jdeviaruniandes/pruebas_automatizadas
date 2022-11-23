import {faker} from "@faker-js/faker";

describe('Admin create elements in configuration', () => {

  it('Como usuario administrador envio una invitación y la elimino a un nuevo usuario', () => {
    const profile_name = "invitation";
    const email = faker.lorem.words(1) + (Date.now()) + '@' + faker.internet.domainName()

    cy.intercept('/ghost/api/admin/invites/*').as('saveSettings')


    cy.goAdminAndLogin(profile_name)
    cy.goIntoSettings('staff',profile_name)

    let previewLength = 0
    cy.wait(2000).then(() => {
        if (Cypress.$('.apps-configured a[href="#revoke"]').length > 0) {
            cy.get('.apps-configured a[href="#revoke"]').then(($aElement) => {
                previewLength = $aElement.length
            })
        }
    })

    cy.get(".view-actions button.gh-btn-primary").click()
    cy.wait(1000)
    cy.get('#new-user-email').clear().type(email)
    cy.get('.gh-roles-container .gh-radio .gh-radio-label').contains(faker.helpers.arrayElement(['Author','Editor','Administrator'])).click()

    cy.screenshot(`images/cypress/${profile_name}/invitation_filled`)

    cy.get('.modal-footer button').click()
    cy.wait('@saveSettings')
    cy.reload()

    cy.get('.apps-configured a[href="#revoke"]').should(($aElement) => {
      expect($aElement).to.have.length(previewLength + 1)
    })
    cy.screenshot(`images/cypress/${profile_name}/invitation_list`)
    cy.get('.apps-configured a[href="#revoke"]').first().click()
    cy.wait('@saveSettings')
    cy.reload()

    cy.get('.apps-configured a[href="#revoke"]').should(($aElement) => {
      expect($aElement).to.have.length(previewLength)
    })

  })


    it('Como usuario administrador invito a un usuario ya existente', () => {
        const profile_name = "invitation_repeated";
        cy.intercept('/ghost/api/admin/invites/*').as('saveSettings')
        cy.goAdminAndLogin(profile_name)
        cy.goIntoSettings('staff',profile_name)

        cy.get(".view-actions button.gh-btn-primary").click()
        cy.wait(1000)
        cy.get('#new-user-email').clear().type('jfdeviar@gmail.com')
        cy.get('.gh-roles-container .gh-radio .gh-radio-label').contains(faker.helpers.arrayElement(['Author','Editor','Administrator'])).click()
        cy.get('.modal-footer button').click()
        cy.wait('@saveSettings')

        cy.screenshot(`images/cypress/${profile_name}/invitation_error`)
        cy.get('.response').contains('A user with that email address already exists').should('be.visible')


    })
})