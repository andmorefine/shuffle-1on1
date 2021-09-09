import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => (
  <>
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">シャッフル</Navbar.Brand>
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
