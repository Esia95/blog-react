import { Button, Col, Result, Row } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorResult = ({ errorMessage }) => {
  const navigate = useNavigate();

  const handleBackHome = () => navigate("/posts");

  return (
    <Row
      justify="center"
      align="center"
      style={{ height: "100vh", margin: "auto" }}
    >
      <Col>
        <Result
          status="500"
          title={errorMessage}
          extra={
            <Button type="primary" onClick={handleBackHome}>
              Back Home
            </Button>
          }
        />
      </Col>
    </Row>
  );
};

export default ErrorResult;
