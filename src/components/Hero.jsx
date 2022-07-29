import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import randomWebcam from "../utils/randomWebcam";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const [webcam, setWebcam] = useState({});

  // fetch webcam data from api
  // useEffect(() => {
  //   const fetchWebcam = async () => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://api.windy.com/api/webcams/v2/list/category=mountain/region=US.OR/?show=webcams:image",
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-windy-key": "fRBdejZXV9tukKAYkPngOtGOg0bYrvV9",
  //         },
  //       }
  //     ).then( async response => {
  //       const data = await response.json();
  //       setWebcam(randomWebcam(data.result.webcams));
  //       setIsLoading(false);
  //     });
  //   };

  //   fetchWebcam();
  // }, []);

  return (
    <Container>
      <Row>
        {/* <img src={webcam} /> */}
      </Row>
      <Row>
        <Col>
          <title>Katie Churchwell</title>
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
