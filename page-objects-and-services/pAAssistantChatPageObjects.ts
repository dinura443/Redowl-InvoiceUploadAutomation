import 'cypress-file-upload';
import { logToTerminal } from '../cypress/support/logger';


export class payableAssistantsChatPageObjects {
    private attachFileBtn = "(//button[contains(@class,'absolute inset-y-0 left-0 flex items-center px-2 cursor-pointer text-gray80')])[1]"
    private sendBtn = "(//button[contains(@class,'w-[42px] h-[42px] flex items-center justify-center rounded-[8px] bg-gray10')])[1]"
    private textField = "(//input[@placeholder='What you want to ask?'])[1]"
    private stepsDisplay = "(//p[normalize-space()='Processing attachments..'])[1]"

    public clickSendButton() {
        cy.xpath(this.sendBtn)
            .should('not.have.class', 'cursor-not-allowed')
            .click();

        return this;
    }

    public AttachFileButton(fileName: string) {
        cy.xpath(this.attachFileBtn).click();
    
        cy.get('input[type="file"]', { timeout: 15000 })
            .attachFile(
                {
                    filePath: `invoice/${fileName}`,
                    encoding: 'binary',
                    mimeType: 'application/pdf',
                },
                { force: true }
            );
    
        cy.wait(15000); // Wait for file processing
        this.clickSendButton();
    
        return this;
    }
    

    public clickTextFieldAndPressEnter() {
        cy.xpath(this.textField)
            .should('exist')
            .and('be.visible')
            .click()
            .type('{enter}');

        return this;
    }
    public displayProcess(){
        cy.xpath(this.stepsDisplay)
            .should('exist')
            .and('be.visible')
            .invoke('text')
            .then((text) => {
                console.log('Process Steps:', text);
                logToTerminal(` ${text}`);
            });

        return this;

    }
}