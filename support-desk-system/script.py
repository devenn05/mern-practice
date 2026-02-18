import os

def gather_js_ejs_context(output_filename="web_project_context.txt"):
    # Only capture these extensions
    valid_extensions = ('.js', '.ejs')
    # Strictly ignore these
    ignored_folders = {'node_modules', '.git', '.idea', 'bin', 'dist'}

    with open(output_filename, 'w', encoding='utf-8') as output:
        # 1. Generate Folder Structure
        output.write("================================================\n")
        output.write("DIRECTORY STRUCTURE\n")
        output.write("================================================\n")
        
        for root, dirs, files in os.walk('.'):
            # Prune ignored directories
            dirs[:] = [d for d in dirs if d not in ignored_folders]
            
            level = root.replace('.', '').count(os.sep)
            indent = ' ' * 4 * level
            output.write(f"{indent}{os.path.basename(root) or './'}/\n")
            
            sub_indent = ' ' * 4 * (level + 1)
            for f in files:
                # Skip JSON files and hidden files
                if not f.endswith('.json') and not f.startswith('.'):
                    output.write(f"{sub_indent}{f}\n")
        
        output.write("\n\n")

        # 2. Extract Code Content
        output.write("================================================\n")
        output.write("SOURCE CODE (JS & EJS)\n")
        output.write("================================================\n\n")

        for root, dirs, files in os.walk('.'):
            dirs[:] = [d for d in dirs if d not in ignored_folders]
            
            for file in files:
                if file.endswith(valid_extensions):
                    file_path = os.path.join(root, file)
                    output.write(f"--- START OF FILE: {file_path} ---\n")
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            output.write(f.read())
                    except Exception as e:
                        output.write(f"Error reading file: {e}")
                    
                    output.write(f"\n--- END OF FILE: {file_path} ---\n\n")

    print(f"✅ Context gathered! Check your folder for: {output_filename}")

if __name__ == "__main__":
    gather_js_ejs_context()