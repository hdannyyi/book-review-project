const db = require('./conn.js');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async save() {
        try {
            const response = await db.one(`
                insert into users
                    (first_name, last_name, email, password)
                values
                    ($1, $2, $3, $4)
                returning id
                `, [this.first_name, this.last_name, this.email, this.password]);
            console.log('user was created with id:', response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    async login() {
        try {
            const response = await db.one(`
                select if, first_name, last_name, password
                    from users
                where email = $1`, [this.email]);
                console.log('hash is', response.password);
                const isValid = await this.checkPassword(response.password);
                if (!!isValid) {
                    const { first_name, last_name, id } = response
                } else {
                    return { isValid }
                };
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = User;