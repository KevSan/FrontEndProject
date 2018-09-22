Note: This code was written and tested in Ubuntu OS. Running code on other OSes may lead
to unforseen complications.

1) Make sure that npm, node, and postgresql are installed. 
    a) In the terminal, type in "sudo apt install npm"
    b) In the terminal, type in "curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -",
    then type in "sudo apt-get install -y nodejs"
    c) In the terminal, type in "sudo apt-get install postgresql postgresql-contrib"

2) Set up the postgresql database:
    a) Type "su - postgres" in the terminal. 
    b) Next, change the password by typing in
    psql -d template1 -c "ALTER USER postgres WITH PASSWORD '123';"
    Replace 123 with anything you'd like.
    c) Now type in 'createdb kevin'. Replace kevin with any name you'd like.
    d) Now create a user role by typing 'createuser kevin --pwprompt', replace
    kevin with any user name you'd like.
    e) Type in the word 'exit', then type in 'psql'. You should be within your user role,
    within the postgres enviornment.
    f) Please rememebr your password, db name, and user name if you changed them.
    g) Under the server folder of the FrontEnd project, there's a file 
    titled 'createTable.sql'. Copy and paste it into the psql terminal to create the table. 

3) In the Ubuntu terminal, change directories to the root of FrontEnd Project. Type
in "npm install" to install of the project's dependencies.   

4) Now change directories to the server folder.
    a) Open the index.js file. If you changed the user, password, or database name, 
    you'll need to update line 11: 
    'var connectionString = "postgres://kevin:123@localhost:5432/kevin";'
    
    The syntax for the connectionString is as follows:
    'postgresql://dbuser:secretpassword@localhost:5432/mydb'

    Replace the first 'kevin' with your user name, replace '123' with your password,
    then replace the last 'kevin' with the database name. 
    
    b)Back in the terminal, while in the server folder type in "node index.js" 
    to start the server.

5) In a seperate terminal, change directories to the src folder. Type in "npm start" 
and a tab for the web application should appear. 