import React, { useState, useRef } from "react";
import { Container, Row, Col, Popover, OverlayTrigger } from "react-bootstrap";
import { info } from "../data/info";
import LoadingSpinner from "./LoadingSpinner";
import PopoverDesc from "./PopoverDesc";

function Techstack() {
  // popover
  const [show, setShow] = useState(false);
  const target = useRef(null);

  // loading
  const [isLoading, setIsLoading] = useState();

  return (
    <Container>
      <Row className="m-3">
        <h2>Tech Stack</h2>
        <p>
          Click an icon to view my GitHub repositories built with that tool.
        </p>
      </Row>
      <Row xs={2} md={4} lg={6} className="m-1">
        {info.technologies.map((item, index) => (
          <>
            <Col className="d-flex justify-content-center" key={index}>
              <OverlayTrigger
                trigger="click"
                key={index}
                placement="right"
                overlay={
                  <Popover id={`popover-positioned-right`}>
                    <Popover.Header as="h3">{`${item.name}`}</Popover.Header>
                    <Popover.Body>
                      {isLoading === true ? (
                        <LoadingSpinner />
                      ) : (
                        <PopoverDesc
                          language={item.name}
                          info={info.projects}
                        />
                      )}
                    </Popover.Body>
                  </Popover>
                }
              >
                <div
                  ref={target}
                  className="tech-icon"
                  onClick={() => setShow(!show)}
                >
                  <i className={item.icon}></i>
                  <div>{item.name}</div>
                </div>
              </OverlayTrigger>
            </Col>
          </>
        ))}
      </Row>
    </Container>
  );
}

export default Techstack;