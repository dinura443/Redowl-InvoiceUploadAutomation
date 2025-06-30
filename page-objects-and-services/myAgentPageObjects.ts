export class MyAgentPageObjects {

    private workerAgentSubmenu = "(//button[normalize-space()='Worker Agents'])[1]"
    private myAgentSubMenuSearchBar = "(//div[@class='flex flex-col w-full bg-white px-[12px] py-2.5 text-sm font-normal shadow-sm transition-colors border rounded focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-gray40 text-gray140 placeholder:text-gray80 hover:border-gray60 focus-within:border-gray100 pl-10 pr-3 min-h-[42px]'])[1]"
    private APAssistantChatBtn = "(//button[normalize-space()='Chat'])[1]"

    public navigateToWorkerAgentSubmenu() {
        cy.xpath(this.workerAgentSubmenu)
            .click();

        return this;
    }

    public enterMyAgentSubMenuSearchBarText(text: string) {
        cy.xpath(this.myAgentSubMenuSearchBar)
            .type(text);

        return this;
    }

    public clickAPAssistantChatButton() {
        cy.xpath(this.APAssistantChatBtn)
            .click();

        return this;
    }


    
}