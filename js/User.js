class User {
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://62b2cde720cad3685c9424f1.mockapi.io';

    create() {
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        data = JSON.stringify(data);



        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                let session = new Session();
                session.user_id = data.id;
                session.startSession();

                window.location.href = 'hexa.html';
            })
    }

    async get(user_id) {
        let response = await fetch(this.api_url + '/users/' + user_id);
        let data = await response.json();

        return data;

    }

    edit() {
        let data = {
            username: this.username,
            email: this.email
        }
        data = JSON.stringify(data);
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = 'hexa.html';
            });
    }

    login() {
        fetch(this.api_url + '/users')
            .then(response => response.json())
            .then(data => {

                let login_succ = 0;
                data.forEach(element => {
                    if (element.email === this.email && element.password === this.password) {
                        let session = new Session();
                        session.user_id = element.id;
                        session.startSession();
                        login_succ = 1;
                        window.location.href = 'hexa.html';

                    }
                });

                if (login_succ === 0) {
                    alert("Pogresan email ili lozinka")
                }
            })
    }

    delete(){
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data =>{
            let session = new Session();
            session.destroySession();

            window.location.href = '/';
        });
    }
}