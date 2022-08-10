class WireFrame:
    def __init__(self, screendetails,projecttitle):
        self.screendetails = screendetails
        self.title =   projecttitle


        self.header = """<!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Wireframe</title>
            <link href="../style.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
            """
        self.footer = """\n </div>\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
         </body>
         </html>"""

    def main(self):
        print(self.screendetails)
        for screen in self.screendetails:
            content = ''
            for controls in self.screendetails[screen]:
                print(controls)
                if(controls == "title"):
                    content = content + '<h1 class="text-center">' + \
                        self.screendetails[screen][controls]+'</h1>\n'

                if(controls == "textboxes"):
                    content = content+'<div id="textboxes" class="row">'
                    for j in self.screendetails[screen][controls]:
                        content = content + '<input class="form-control" type="text"  placeholder="'+j+'"> <br>\n'
                    content = content + '</div>'

                if(controls == 'radiobuttons'):
                    content = content+'<div id="radio" class="row">'
                    for j in self.screendetails[screen][controls]:
                        if(type(j) == dict):
                            print(j)
                            for k in j:
                                content = content + '<label>'+k+'</label>\n'
                                for l in j[k]:
                                    content = content + '<input class="form-check-input" type="radio" name="'+l + \
                                        '" id="'+l+'">\n<label class="form-check-label" for="'+l+'">"'+l+'"</label>\n'
                        else:
                            content = content + '<input class="form-check-input" type="radio" name=' + \
                                j+' id='+j+'> <label class="form-check-label">'+j+'</label>\n '
                    content = content + '</div>'
                if(controls == 'ComboBoxes'):
                    content = content+'<div id="combo" class="row">'
                    for j in dic[i]:
                        if(type(j) == dict):
                            for k in j:
                                content = content + '\n<select class="form-select">'
                                for l in j[k]:
                                    content = content + '<option value="'+l+'">'+l+'</option>\n'
                                content = content + '</select>\n'
                            else:
                                content = content + """<label class="form-label">"""+j+"""</label><select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>"""
                    content = content + '</div>'

                if(controls == 'checkboxes'):
                    content = content+'<div id="combo" class="row">'
                    for j in self.screendetails[screen][controls]:
                        content = content + '<input class="form-control" type="select" placeholder="'+j+'"> <br>\n'
                    content = content + '</div>'

                print(content)

            if(self.screendetails[screen]['buttons'] != None):
                content = content+'<div id="buttons" class="row">'
                for j in self.screendetails[screen]['buttons']:
                    content = content + '<button class="btn btn-primary">'+j+'</button>'
                content = content + '</div>\n'
            content = content + """\n </div>\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        </body>
        </html>"""
            save_path = 'C:/Users/HAMDAN/Downloads/FYP-363b3b8661c97c1d93dc4163a03030e10e024d88/FYP-363b3b8661c97c1d93dc4163a03030e10e024d88/wireframes'
            path = os.path.join(save_path, self.title)
            if(os.path.exists(path) == False):
                os.mkdir(path)
            print(screen)
            print(type(screen))
            completeName = os.path.join(path, screen+".html")

            file1 = open(completeName, "w")

            file1.write(self.start+content)

            file1.close()

        return True


a = WireFrame({'Screen1': {'title': 'add customer', 'textboxes': ['name', 'ID ', 'contact manage record orders gives details Parcel ID ', 'Parcel ', 'Price ', 'Qty ', 'Date ',
                                                                  'Customer ID ', 'Customer ', 'Customer Address '], 'buttons': ['add', 'update']}, 'Screen2': {'title': 'Product Manager', 'textboxes': ['Name', 'Date ', 'Quantity ', 'Vendor ID ', 'Vendor ', 'Qty ', 'Price '], 'buttons': ['perform', 'CRUD', 'operation', 'perform']}, 'Screen3': {'title': 'Order Manager', 'textboxes': ['ID ', 'Customer ID ', 'Customer ', 'Quantity ', 'Piece ', 'Address '], 'buttons': ['perform', 'CRUD', 'operation', 'perform'], 'radiobuttons': ['male']}})
a.main()
