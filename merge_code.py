import os

# Cấu hình các thư mục và loại file muốn gộp
EXTENSIONS = ('.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.mjs')
EXCLUDE_DIRS = {'node_all', 'node_modules', '.next', '.git', 'public'}

def merge_files(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(root_dir):
            # Loại bỏ các thư mục không cần thiết
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            for file in files:
                if file.endswith(EXTENSIONS) and file != 'merge_code.py':
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, root_dir)

                    outfile.write(f"\n{'='*50}\n")
                    outfile.write(f"FILE: {relative_path}\n")
                    outfile.write(f"{'='*50}\n\n")

                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"Error reading file: {e}")
                    outfile.write("\n")

if __name__ == "__main__":
    merge_files('./src/components', 'full_project_code.txt')
    print("Đã gộp xong! Hãy gửi file full_project_code.txt cho tôi.")