export function generateInvitation(name) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = `${process.env.PUBLIC_URL}/images/GraduationInvitation.png`;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    // Vẽ nền
    ctx.drawImage(image, 0, 0);

    // Welcome
    ctx.fillStyle = "#545454";
    ctx.font = `bold 60px "Poppins", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Welcome", canvas.width / 2, 50);

    // Tên người dùng
    const maxWidth = canvas.width * 0.66;
    let fontSize = 100;
    ctx.font = `${fontSize}px "Poppins", sans-serif`;
    let textWidth = ctx.measureText(name).width;

    while (textWidth > maxWidth && fontSize > 20) {
      fontSize -= 2;
      ctx.font = `${fontSize}px "Poppins", sans-serif`;
      textWidth = ctx.measureText(name).width;
    }

    ctx.fillText(name, canvas.width / 2, 200);

    // Tải ảnh
    const link = document.createElement("a");
    link.download = `ThiepMoi_${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  image.onerror = () => {
    alert(
      "Không thể tải hình nền thiệp. Vui lòng kiểm tra lại ảnh trong thư mục /public/images/"
    );
  };
}

export function generateInvitationImageOnly(name) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/images/GraduationInvitation.png`;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Vẽ nền
      ctx.drawImage(image, 0, 0);

      // Welcome
      ctx.fillStyle = "#545454";
      ctx.font = `bold 60px "Poppins", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Welcome", canvas.width / 2, 50);

      // Tên người dùng
      const maxWidth = canvas.width * 0.66;
      let fontSize = 100;
      ctx.font = `${fontSize}px "Poppins", sans-serif`;
      let textWidth = ctx.measureText(name).width;

      while (textWidth > maxWidth && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `${fontSize}px "Poppins", sans-serif`;
        textWidth = ctx.measureText(name).width;
      }

      ctx.fillText(name, canvas.width / 2, 200);

      // Trả về ảnh (dùng trong animation)
      resolve(canvas.toDataURL("image/png"));
    };

    image.onerror = () => {
      alert(
        "Không thể tải hình nền thiệp. Vui lòng kiểm tra lại ảnh trong thư mục /public/images/"
      );
    };
  });
}
