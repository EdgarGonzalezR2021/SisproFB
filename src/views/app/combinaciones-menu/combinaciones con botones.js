/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';

import Breadcrumb from 'containers/navs/Breadcrumb';


// import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import StateButton from 'components/StateButton';

const Combinaciones = ({ match }) => {
  const handleSuccessButtonClick = () => {
    return new Promise((success, fail) => {
      setTimeout(() => {
        <h1>hola</h1>
        success('Everything went right!');
      }, 2000);
    });
  };

  const handleFailButtonClick = () => {
    return new Promise((success, fail) => {
      setTimeout(() => {
        fail('Something is wrong!');
      }, 2000);
    });
  };

  return (
    <>
      <Colxx xxs="12" className="mb-4">
        <Card>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="Combinaciones" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" className="mb-4">
              <p>
                <IntlMessages id="Combinaciones" />
              </p>
            </Colxx>
          </Row>

          <CardBody>
            <CardTitle>
              <IntlMessages id="button.states TITULO" />
            </CardTitle>
            <p className="mb-1">
              <IntlMessages id="button.states-text" />
            </p>
            <StateButton
              id="successButton"
              color="primary"
              className="mb-3"
              onClick={handleSuccessButtonClick}
            >
              <IntlMessages id="button.click-here" />
            </StateButton>
            <p className="mb-1">
              <IntlMessages id="button.states-text-alternate" />
            </p>
            <StateButton
              id="failButton"
              color="secondary"
              className="mb-3"
              onClick={handleFailButtonClick}
            >
              <IntlMessages id="button.click-here" />
            </StateButton>
          </CardBody>
        </Card>
      </Colxx>
    </>
  );
};
export default Combinaciones;
