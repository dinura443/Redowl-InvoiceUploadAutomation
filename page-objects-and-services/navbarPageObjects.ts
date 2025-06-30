export class NavbarPageObjects {

    private myAgentBtn = "(//a[@data-cy='primarySideMenuItem-myagent'])[1]"

    public clickMyAgentButton() {

        cy.xpath(this.myAgentBtn)
            .click();

        return this;
    }


}