interface PrintHeaderProps {
  title: string;
  author: string;
  publishedAt: string;
}

export function PrintHeader({ title, author, publishedAt }: PrintHeaderProps) {
  return (
    <div className="print-only hidden">
      <div className="mb-6 pb-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Tác giả: {author}</p>
          <p>Ngày xuất bản: {publishedAt}</p>
          <p>In lúc: {new Date().toLocaleString("vi-VN")}</p>
        </div>
      </div>
    </div>
  );
}
