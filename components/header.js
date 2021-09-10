import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => (
  <>
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img alt="" src="/site-tile.png" width="30" height="30" className="d-inline-block align-top" />
            <span className="px-2">シャッフル1on1</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/shuffle">ゲスト</Nav.Link>
              <Nav.Link href="/rooms">ルーム</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  </>
)

export default Header
