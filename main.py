f = open("template.html", "r")
html_template = f.read()

from os import listdir
from os.path import isfile, join

search_path = "images"
file_list = [f for f in listdir(search_path) if isfile(join(search_path, f))]
for k in range(len(file_list)):
    file_list[k] = search_path + "/" + file_list[k]
print(file_list)

str_map = {
    "{{n}}": str(len(file_list)),
    "{{pic_url}}": '"' + '","'.join(file_list) + '"'
}
for k in str_map:
    html_template = html_template.replace(k, str_map[k])

for rows in range(3):
    html = html_template.replace("{{rows}}", str(rows+1))
    with open("index"+str(rows+1)+".html", "w") as text_file:
        text_file.write(html)
