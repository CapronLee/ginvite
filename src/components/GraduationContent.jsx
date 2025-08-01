import { Button, Card, Col, Layout, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  generateInvitation,
  generateInvitationImageOnly,
} from "./InvitationUtils";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const imageGroups = {
  2021: [
    "me1.jpg",
    "2021me1.jpg",
    "2021me2.jpg",
    "2021me3.jpg",
    "2021me4.jpg",
    "2021me5.jpg",
    "2021me6.jpg",
    "2021me7.jpg",
  ],
  2022: [
    "2022me1.jpg",
    "2022me2.jpg",
    "2022me3.jpg",
    "2022me5.jpg",
    "2022me6.jpg",
  ],
  2023: [
    "2023me2.jpg",
    "2023me3.jpg",
    "2023me4.jpg",
    "2023me5.jpg",
    "2023me6.jpg",
    "2023me7.jpg",
    "2023me8.jpg",
  ],
  2024: [
    "2024me2.jpg",
    "2024me3.jpg",
    "2024me4.jpg",
    "2024mea.jpg",
    "2024meb.jpg",
  ],
  2025: [
    "me2.jpg",
    "me3.jpg",
    "2025me1.jpg",
    "2025me2.jpg",
    "2025me4.jpg",
    "2025mea.png",
    "2025meb.jpg",
    "2025mec.JPG",
    "2025med.jpg",
    "2025mee.jpg",
    "2025mez.jpg",
    "2025mex.jpg",
    "2025mev.jpg",
  ],
};

export default function GraduationContent({ name }) {
  const [hovered, setHovered] = useState(null);
  const [invitationURL, setInvitationURL] = useState(null);
  const [flyOut, setFlyOut] = useState(false);
  const [hideCard, setHideCard] = useState(false);

  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Tạo ảnh thành phẩm 1 lần duy nhất
  useEffect(() => {
    generateInvitationImageOnly(name).then((url) => setInvitationURL(url));
  }, [name]);

  // Tính toán vị trí di chuyển từ thiệp tới nút
  useEffect(() => {
    if (flyOut && cardRef.current && buttonRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const btnRect = buttonRef.current.getBoundingClientRect();
      setTranslate({
        x: btnRect.left - cardRect.left,
        y: btnRect.top - cardRect.top,
      });

      // Ẩn ảnh sau khi animation kết thúc
      setTimeout(() => {
        setHideCard(true);
      }, 1000);
    }
  }, [flyOut]);

  return (
    <Layout className="main-layout">
      <Header className="header">
        <Title level={4} style={{ color: "#fff", margin: 0 }}>
          🎓 Lễ Tốt Nghiệp
        </Title>
      </Header>

      <Content style={{ padding: "20px" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Title level={3}>Chào {name}!</Title>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Paragraph style={{ textAlign: "left" }}>
              Rất vui được mời bạn đến dự lễ tốt nghiệp của mình 🎉
            </Paragraph>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Paragraph style={{ textAlign: "left" }}>
              <b>⏰ Thời gian:</b> 15:30, Chủ Nhật, 10/08/2025
              <br />
              <b>📍 Địa điểm:</b> Trung tâm Hội nghị Quốc gia (NCC), Phạm Hùng,
              Nam Từ Liêm, Hà Nội
            </Paragraph>
          </motion.div>

          {/* Hiển thị ảnh thiệp đã được render sẵn */}
          {!hideCard && invitationURL && (
            <motion.img
              src={invitationURL}
              ref={cardRef}
              alt="Thiệp mời"
              style={{
                width: 400,
                height: "auto",
                display: "block",
                margin: "20px auto",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                flyOut
                  ? {
                      scale: 0.2,
                      x: translate.x,
                      y: translate.y,
                      opacity: 0,
                    }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 1 }}
            />
          )}

          {/* Nút tải */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <Button
              type="primary"
              ref={buttonRef}
              onClick={() => {
                setFlyOut(true);
                setTimeout(() => {
                  generateInvitation(name); // Tải ảnh về
                }, 800); // tải sau animation
              }}
              style={{ marginBottom: 20 }}
            >
              🎁 Tải thiệp mời
            </Button>
          </motion.div>

          <Title level={4}>📸 Qtrumlee qua từng năm</Title>

          {Object.entries(imageGroups).map(([year, imgs]) => (
            <div key={year} style={{ marginBottom: 32 }}>
              <Title level={5} style={{ marginTop: 16 }}>
                {year}
              </Title>
              <Row gutter={[16, 16]}>
                {imgs.map((img, index) => (
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
                            onClick={() => setHovered(img)}
                          >
                            <img
                              alt={`Ảnh ${year} - ${index + 1}`}
                              src={`${process.env.PUBLIC_URL}/images/${img}`}
                              className="fixed-image"
                            />
                          </div>
                        }
                      />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </motion.div>
      </Content>

      {hovered && (
        <div
          className="image-preview-overlay"
          onClick={(e) => {
            // Nếu click là vùng ngoài ảnh
            if (e.target.classList.contains("image-preview-overlay")) {
              setHovered(null);
            }
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/${hovered}`}
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
