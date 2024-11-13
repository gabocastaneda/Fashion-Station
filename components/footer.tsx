// Footer.js
import React from "react";
import { Container, Text, Link, Row, Col } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#6a0dad", color: "white", padding: "20px 0" }}
    >
      <Container>
        <Row justify="center">
          <Col>
            <Text h2>Moda Elegante</Text>
            <Text>Tu destino para las últimas tendencias en moda.</Text>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col>
            <Link href="https://www.facebook.com" target="_blank" color="white">
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              color="white"
              style={{ margin: "0 10px" }}
            >
              Instagram
            </Link>
            <Link href="https://www.twitter.com" target="_blank" color="white">
              Twitter
            </Link>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col>
            <Text>
              &copy; {new Date().getFullYear()} Moda Elegante. Todos los
              derechos reservados.
            </Text>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
