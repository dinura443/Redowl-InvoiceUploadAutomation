import { AiAdminLogin } from "../../page-objects-and-services/loginPageObjects";
import { NavbarPageObjects } from "../../page-objects-and-services/navbarPageObjects";
import { MyAgentPageObjects } from "../../page-objects-and-services/myAgentPageObjects";
import { payableAssistantsChatPageObjects } from "../../page-objects-and-services/pAAssistantChatPageObjects";
import { logToTerminal } from "../support/logger";

const aiAdminLogin = new AiAdminLogin();
const navbarPageObjects = new NavbarPageObjects();
const myAgentPageObjects = new MyAgentPageObjects();
const payableAssistantsChat = new payableAssistantsChatPageObjects();

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('File Operation', () => {
  it('configure the files inside the directory /fixtures/invoice', () => {
    cy.task('cleanInvoiceFolder').then(msg => {
      logToTerminal(msg);

      if (typeof msg === 'string' && (msg.startsWith('Error') || msg.includes('No PDF'))) {
        Cypress.env('fileSetupFailed', true);
        logToTerminal('file setup failed');
      } else {
        Cypress.env('fileSetupFailed', false);
        logToTerminal('File setup successful.');
      }
    });
  });
});

describe('Invoice operation', () => {
  beforeEach(function () {
    const failed = Cypress.env('fileSetupFailed');
    if (failed) {
      logToTerminal('Skipping test because file setup failed.');
      this.skip();
    }

    aiAdminLogin.createSession();
    cy.log('Logging in as AI Admin');
    logToTerminal('Logging in as Grace');
  });

  it('Upload the invoice to the Account Payable Assistant AI chat', () => {
    aiAdminLogin.visitDashboardPage();
    cy.wait(20000);
    logToTerminal('Navigating to the My Agent page');
    navbarPageObjects.clickMyAgentButton();
    cy.wait(15000);
    logToTerminal('Navigating to the Worker Agent submenu');
    myAgentPageObjects.navigateToWorkerAgentSubmenu();
    cy.wait(15000);
    logToTerminal('Searching for the Account Payable Assistant');
    myAgentPageObjects.enterMyAgentSubMenuSearchBarText('Account Payable Assistant');
    cy.wait(15000);
    logToTerminal('Clicking on the Account Payable Assistant');
    myAgentPageObjects.clickAPAssistantChatButton();
    cy.wait(15000);

    cy.task('getLatestInvoiceFileName').then((filename) => {
      logToTerminal('Clicking on the Attach File button');
      payableAssistantsChat.AttachFileButton(filename);
      cy.wait(30000);
    });

    });
});


