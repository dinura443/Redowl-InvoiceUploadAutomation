// cypress/support/logger.ts
export const logToTerminal = (msg: string) => {
    cy.task('log', msg);
  };
  