const Nightmare = require('nightmare')
const assert = require('assert')

describe('UI Flow Tests', function () {
  console.log(this);
  this.timeout('60s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({show: true})
  })

  describe('Public Pages', function () {
    describe('/ (Home Page)', () => {
      it('should load without error', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        nightmare
          .goto('')
          .end()
          .then(function (result) {
            done()
          })
          .catch(done)
      })
    })
    describe('/auth (Login Page)', () => {
      it('should load without error', done => {
        nightmare
          .goto('https://gethoodie.com/auth')
          .end()
          .then(result => {
            done()
          })
          .catch(done)
      })
    })
  })

  describe('Login Page', function () {
    describe('given bad data', () => {
      it('should fail', done => {
        nightmare
          .goto('https://gethoodie.com/auth')
          .on('page', (type, message) => {
            if (type == 'alert') 
              done()
          })
          .type('.login-email-input', 'notgonnawork')
          .type('.login-password-input', 'invalid password')
          .click('.login-submit')
          .wait(2000)
          .end()
          .then()
          .catch(done)
      })
    })
  })

  describe('Using the App', function () {
    describe('signing up and finishing setup', () => {
      it('should work without timing out', done => {
        nightmare
          .goto('https://gethoodie.com/auth')
          .type('.signup-email-input', 'test+' + Math.round(Math.random() * 1000000) + '@test.com')
          .type('.signup-password-input', 'valid password')
          .type('.signup-password-confirm-input', 'valid password')
          .click('.signup-submit')
          .wait(2000)
          .select('.sizes-jeans-select', '30W x 30L')
          .select('.sizes-shoes-select', '9.5')
          .click('.sizes-submit')
          .wait('.shipit') // this selector only appears on the catalog page
          .end()
          .then(result => {
            done()
          })
          .catch(done)
      })
    })
  })
})