describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('qaq')
    cy.get('#password').type('123456')
    cy.get('#login-button').click()

    cy.contains('qaq logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: "qaq",
        name: "qaq",
        password: "123456",
        blogs: [ ]
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)

      cy.login({ username: 'qaq', password: '123456' })
    })

    it('a new blog can be created by form', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('qwq')
      cy.get('#author-input').type('me')
      cy.get('#url-input').type('http://qwq')
      cy.contains('save').click()
      cy.contains('blog added!')
      cy.contains('qwq')
      cy.contains('me')
    })

    it('a new blog can be created by api', function() {
      cy.createBlog({
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com",
      })
      cy.contains('React patterns')
      cy.contains('Michael Chan')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "Michael Chan",
          url: "https://reactpatterns.com",
        })
        cy.contains('first blog')
        cy.contains('Michael Chan')
      })

      it('it can like a blog', function () {
        cy.contains('first blog').parent().get('#view').click()
        cy.contains('first blog').parent().get('#like').click()
        cy.contains('first blog').parent().contains('1')
      })

      it('it can remove a blog', function () {
        cy.contains('first blog').parent().get('#remove').click()
        cy.should('not.contain', 'first blog')
      })

    })
    describe('it can like a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "Michael Chan",
          url: "https://reactpatterns.com",
        })
        cy.createBlog({
          title: "second blog",
          author: "Michael Chan",
          url: "https://reactpatterns.com",
        })
      })

      it('blogs can sort by likes', function () {

        cy.contains('first blog').contains('view').click()
        cy.contains('first blog').get('#like').as('firstLike')
        cy.get('@firstLike').click()
        cy.wait(500)
        cy.get('@firstLike').click()
        cy.wait(500)
        cy.get('@firstLike').click()
        cy.contains('first blog').contains('view').click()
        cy.contains('second blog').contains('view').click()
        cy.contains('second blog').get('#like').as('secondLike')
        cy.get('@secondLike').click()
        cy.wait(500)
        cy.get('@secondLike').click()
        cy.wait(500)
        cy.get('@secondLike').click()
        cy.wait(500)
        cy.get('@secondLike').click()
        cy.wait(500)
        cy.get('@secondLike').click()
        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'first blog')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('qaq')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
    cy.get('.success').contains('Wrong credentials')
  })
})