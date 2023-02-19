import Layout from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";

const MainLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header>header</Header>
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default MainLayout;
