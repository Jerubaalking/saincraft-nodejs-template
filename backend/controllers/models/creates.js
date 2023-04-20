const {
    sessions,
    currencies, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items, stores,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols, authorizers, roles,
} = require('../../../database/models/module_exporter');
const user_roles = require('../../../database/models/user_roles');
const { spawnJwtPayload } = require('../services/handlers');
const { passwordHash, generateUniqueIdentifier } = require('../services/service');

class Creates {
    constructor(session) {
        this._instance = session;
    }

    async session(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let session = await sessions.build(data);
            return await session.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
  
    async user(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let usrPass = data.password;
            let hash = await passwordHash(usrPass);
            let nUser = await users.build(data);
            nUser.hash = hash.hashHex;
            nUser.salt = hash.salt;
            nUser.iterations = hash.iterations;
            nUser.businessId = await this._instance.businessId;
            nUser.sessionId = await this._instance.sessionId;
            return await nUser.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async signup(data) {
        // if (this._instance.businessId, this._instance.sessionId) {
        let usrPass = data.password;
        let hash = await passwordHash(usrPass);
        let nUser = await users.build(data);
        nUser.hash = hash.hashHex;
        nUser.salt = hash.salt;
        nUser.iterations = hash.iterations;
        nUser.businessId = data.businessId;
        console.log('data in db:::', data);
        return await nUser.save()
        // } else {
        //     throw new Error('user not authenticated!');
        // }
    }
    
}
module.exports = Creates;
