
const NotFound = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-destructive mb-4">
          Không tìm thấy bài viết. Vui lòng thử lại sau.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded inline-block"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFound;
