import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Basic from 'containers/wizard/Basic';

/*
function sayHello() {
  alert('Hello!');
}
*/

const Second = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.second" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p>
          <IntlMessages id="menu.second" />
        </p>
      </Colxx>
    </Row>
    <div>
      <button type="button" onClick={Basic}>Click me!</button>
    </div>
  </>
);
export default Second;

/*
<h2>Clientes</h2>

<Link to=".\NuevoCliente" className="btn btn-verde nvo-cliente">
  <i className="fas fa-plus-circle" />
  Nuevo Cliente
</Link>
*/
