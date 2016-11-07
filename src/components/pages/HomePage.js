import React from 'react';
import { Grid, Row, Col, Panel, Well, ButtonToolbar, Button, MenuItem, Nav, Navbar, NavDropdown, NavItem, FieldGroup } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
import MathProblem from '../widgets/MathProblem';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      noOfProbs: 50
    };
  }

  render() {

    return(
      <Grid className="main">
        <Row>
          <AutoAffix affixClassName="nav-fixed" container={this} affixStyle={{'zIndex':1000}}>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>Math Practice</Navbar.Brand>
              </Navbar.Header>
              <Nav pullRight>
                <NavItem eventKey={1}>Settings</NavItem>
              </Nav>
            </Navbar>
          </AutoAffix>

          <Well>
            <ButtonToolbar>
              <Button>Check My Answers</Button>
              <Button>Clear My Answers</Button>

            </ButtonToolbar>
          </Well>

          <Col sm={12} md={12} lg={12}>
            {/* questions go here. */}
            <MathProblem id="1" operation="add" numeratorA={1} numeratorB={2}/>
            <MathProblem id="2" operation="add" numeratorA={4} numeratorB={5}/>
            <MathProblem id="3" operation="add" numeratorA={1} numeratorB={2}/>
            <MathProblem id="4" operation="add" numeratorA={1} numeratorB={2}/>
            <MathProblem id="5" operation="add" numeratorA={1} numeratorB={2}/>
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default HomePage;
