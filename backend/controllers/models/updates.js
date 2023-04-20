const {
    sessions,
    currencies, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items, stores,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols,
} = require('../../../database/models/module_exporter');
const { passwordHashVerify, passwordHash } = require('../services/service');
class Update {
    constructor(session) {
        this._session = session;
    }
    async session(id, data) {
        return await sessions.update(data, { where: { id: id } })
    }
    async user(id, data) {
        try {
            if (data.password != undefined) {
                console.log('am here!!!!!!!!!', data.password);
                let dbUser = JSON.parse(JSON.stringify(await users.findOne({ where: { id: id } })));
                if (passwordHashVerify(data.password, dbUser.salt, dbUser.hash)) {
                    let hash = await passwordHash(data.new_password);
                    data['hash'] = hash.hashHex;
                    data['salt'] = hash.salt;
                    data['iterations'] = hash.iterations;
                    return await users.update(data, { where: { id: id } });
                } else {
                    let hash = await passwordHash(data.password);
                    data['hash'] = hash.hashHex;
                    data['salt'] = hash.salt;
                    data['iterations'] = hash.iterations;
                    return await users.update(data, { where: { id: id } });
                    // let us = await users.build(data);
                    // return await users.update({ name: us.name, email: us.email, phone: us.phone, birthday: us.birthday, gender: us.gender, blood_group: us.blood_group, address: us.address }, { where: { id: id } });
                }
            } else {
                console.log('am here!!!!!!!!!2');
                let us = await users.build(data);
                return await users.update({ name: us.name, email: us.email, phone: us.phone, birthday: us.birthday, gender: us.gender, schoolId: us.schoolId, blood_group: us.blood_group, address: us.address }, { where: { id: id } });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }


    }
}
module.exports = Update;
