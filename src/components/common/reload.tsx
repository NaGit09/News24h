
const Reload = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-destructive mb-4">
          Không thể tải tin tức. Vui lòng thử lại sau.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Tải lại
        </button>
      </div>
    </div>
  );
}

export default Reload