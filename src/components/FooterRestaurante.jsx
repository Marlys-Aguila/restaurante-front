import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import github from "../assets/img/github.png";
import linkedin from "../assets/img/linkedin.png";
import "../assets/styles/footer.css";

export function FooterRestaurante() {
  return (
    <Container className="footer-row py-1 mt-2 sticky-footer" fluid>
      <Row>
        <Col className="text-center text-light d-flex justify-content-center align-items-center flex-column-pe-5">
          <p className="mb-0">
            Sitio Web creado con{" "}
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "red" }}
              className="px-1"
            />{" "}
            por Marlys A. &copy; 2023
          </p>
          <div className="d-flex justify-content-center align-items-center ms-2">
            <div>
              <a
                href="https://github.com/Marlys-Aguila"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={github}
                  style={{ width: "30px" }}
                  alt="Github"
                  title="Github"
                />
              </a>
            </div>

            <div>
              <a
                href="https://www.linkedin.com/in/marlysaguila/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  style={{ width: "30px" }}
                  alt="LinkedIn"
                  title="LinkedIn"
                />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
