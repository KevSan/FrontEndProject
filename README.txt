Note: This code was written and tested in Ubuntu OS. Running code on other OSes may lead
to unforseen complications.

1) Make sure that npm, node, and postgresql are installed. 
    a) In the terminal, type in "sudo apt install npm"
    b) In the terminal, type in "sudo apt install nodejs-legacy"
    c) In the terminal, type in "sudo apt-get install postgresql postgresql-contrib"

2) Set up the postgresql database:
    a) Type "su - postgres" in the terminal. 
    b) Next, change the password by typing in
    psql -d template1 -c "ALTER USER postgres WITH PASSWORD 'newpassword';"
    Replace newpassword with anything you'd like.
    c) Now type in 'createdb dbName'. Replace dbName with anything you'd like.
    d) Now create a user role by typing 'createuser userName --pwprompt', replace
    userName with anything you'd like.
    e) Type in the word exit, then type in psql. You should be within your user role,
    within the postgres enviornment.
    f) Under the server folder, there's a file titled 'createTable.sql'. Copy and
    paste it into the psql terminal. 

3)  
