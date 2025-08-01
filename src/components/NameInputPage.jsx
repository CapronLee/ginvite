// components/NameInputPage.jsx
import { Button, Input, Layout, Space, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function NameInputPage({ name, setName, onSubmit }) {
  return (
    <Layout
      className="input-layout"
      style={{
        backgroundImage: 'url("/images/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="overlay" />
      <Content className="centered-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="form-box">
            <Space direction="vertical" align="center">
              <Title level={2} style={{ color: "#fff", textAlign: "center" }}>
                🎓 Mời bạn đến dự lễ tốt nghiệp
              </Title>
              <Paragraph style={{ color: "#fff", textAlign: "center" }}>
                Nhập tên bạn để tham gia cùng mình nhé!
              </Paragraph>
              <Input
                placeholder="Tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "80%", maxWidth: 300 }}
              />
              <Button type="primary" onClick={onSubmit}>
                Tham gia
              </Button>
            </Space>
          </div>
        </motion.div>
      </Content>
    </Layout>
  );
}
