describe('drag and drop', () => {
  beforeEach(function () {
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
    cy.wait(6000)
  })

  it('should drag and drop ingredient', () => {

    cy.get(`[data-cy="bun1"]`).trigger('dragstart')
    cy.get(`[data-cy="constructor"]`).trigger('drop')
    cy.contains(`(верх)`)
    cy.contains(`(низ)`)

    cy.get(`[data-cy="main2"]`).trigger('dragstart')
    cy.get(`[data-cy="constructor"]`).trigger('drop')

    cy.get(`[data-cy="main3"]`).trigger('dragstart')
    cy.get(`[data-cy="constructor"]`).trigger('drop')

    cy.get(`[data-cy="sauce3"]`).trigger('dragstart')
    cy.get(`[data-cy="constructor"]`).trigger('drop')
    
    cy.get(`[data-cy="sauce2"]`).trigger('dragstart')
    cy.get(`[data-cy="constructor"]`).trigger('drop')

    // cy.get(`[data-cy="conIng3"]`).trigger('dragstart')
    // cy.get(`[data-cy="constructor"]`).trigger('drop')

    // я честно пытался, но mousemove не работает, а дискуссии на github у библиотеки живут с 2017 года.

    //   cy.get(`[data-cy="conIng1"]`)
    //     .trigger('mousedown', { which: 1 })
    //     .trigger('mousemove', { pageX: 500, pageY: 500 })
    //     .trigger('mouseup', { force: true })

    // cy.get(`[data-cy="conIng1"]`)
    //   .trigger('mousedown', { which: 1, clientX: 600, clientY: 100 })
    //   .trigger('mousemove', { which: 1, clientX: 600, clientY: 600 })
    //   .trigger('mouseup')
  })
})
