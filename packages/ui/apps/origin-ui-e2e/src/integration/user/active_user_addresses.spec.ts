/// <reference types="cypress" />

import { generateNewUser } from '../../utils/generateMockData';

describe('Active user profile page blockchain addresses interactions', () => {
  const testUser = generateNewUser();

  before(() => {
    cy.apiRegisterAndApproveUser(testUser);
  });

  beforeEach(() => {
    cy.apiLoginUser(testUser);
    cy.visit('/account/profile');
  });

  it('should show pop-up for blockchain address fields', () => {
    cy.dataCy('exchange-address-info-icon').trigger('mouseover');
    cy.contains('You need it to trade certificates on the exchange');

    // cy.dataCy('blockchain-address-info-icon').trigger('mouseover');
    // cy.contains('A connected user blockchain address is required to withdraw');
  });

  // it('should not allow user to create exchange address until he is a part of organization', () => {
  //   cy.dataCy('exchange-address-create-button').click();
  //   cy.notification(
  //     'Only members of active organization can perform this action'
  //   );
  //   cy.dataCy('exchange-address-create-button').should('not.be.disabled');
  // });
});
