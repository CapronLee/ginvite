// App.js
import { Button, Card, Col, Input, Layout, Row, Space, Typography } from "antd";
import "antd/dist/reset.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const images = ["me1.jpg", "me2.jpg", "me3.jpg"];
const generateInvitation = (name) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = "/images/GraduationInvitation.png";

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    // Vẽ nền
    ctx.drawImage(image, 0, 0);

    // Font settings
    const maxWidth = canvas.width * 0.66;
    let fontSize = 100;
    const fontFamily = "Poppins";

    ctx.font = `${fontSize}px ${fontFamily}`;
    let textWidth = ctx.measureText(name).width;

    // Giảm cỡ chữ nếu quá rộng
    while (textWidth > maxWidth && fontSize > 20) {
      fontSize -= 2;
      ctx.font = `${fontSize}px ${fontFamily}`;
      textWidth = ctx.measureText(name).width;
    }

    ctx.fillStyle = "#545454"; // Màu chữ
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Welcome", canvas.width / 2, 50);
    // Tọa độ vẽ: chính giữa ngang, cách trên 200px
    ctx.fillText(name, canvas.width / 2, 200);

    // Xuất file
    const link = document.createElement("a");
    link.download = `ThiepMoi_${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
};

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const handleEnter = () => {
    if (name.trim()) {
      setJoined(true);
    }
  };

  useEffect(() => {
    if (joined) {
      window.scrollTo(0, 0);
    }
  }, [joined]);

  if (!joined) {
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
                <Button type="primary" onClick={handleEnter}>
                  Tham gia
                </Button>
              </Space>
            </div>
          </motion.div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="main-layout">
      <Header className="header">
        <Title level={4} style={{ color: "#fff", margin: 0 }}>
          🎓 Lễ Tốt Nghiệp
        </Title>
      </Header>

      <Content style={{ padding: "20px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Title level={3}>Chào {name}!</Title>
          <Paragraph>
            Rất vui được mời bạn đến dự lễ tốt nghiệp của mình 🎉
          </Paragraph>
          <Paragraph>
            <b>⏰ Thời gian:</b> 15:30, Chủ Nhật, 10/08/2025
            <br />
            <b>📍 Địa điểm:</b> Trung tâm hội nghị quốc gia, Phạm Hùng, Nam Từ
            Liêm, Hà Nội
          </Paragraph>
          <Button type="primary" onClick={() => generateInvitation(name)}>
            🎁 Tải thiệp mời
          </Button>

          <Title level={4}>📸 Một vài khoảnh khắc của mình</Title>
          <Row gutter={[16, 16]}>
            {images.map((img, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    hoverable
                    cover={
                      <div
                        className="image-container"
                        onClick={() => setPreviewImg(img)}
                      >
                        <img
                          alt={`Ảnh ${index + 1}`}
                          src={`/images/${img}`}
                          className="fixed-image"
                        />
                      </div>
                    }
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Content>
      {previewImg && (
        <div
          className="image-preview-overlay"
          onClick={() => setPreviewImg(null)} // click để tắt
        >
          <img
            src={`/images/${previewImg}`}
            alt="Preview"
            className="image-preview-full"
          />
        </div>
      )}

      {hovered && (
        <div className="image-preview-overlay">
          <img
            src={`/images/${hovered}`}
            alt="Preview"
            className="image-preview-full"
          />
        </div>
      )}

      <Footer style={{ textAlign: "center", fontSize: 12 }}>
        © {new Date().getFullYear()} – Hẹn gặp bạn tại buổi lễ! ❤️
      </Footer>
    </Layout>
  );
}

export default App;
