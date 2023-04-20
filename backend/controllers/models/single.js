const {
    sessions,
    currencies, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items, stores,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols,
} = require('../../../database/models/module_exporter');
const { Op } = require('../../../database/mysql');
class Single {
    constructor(session) {
        this._session = session;
    }
    async userOpt(opt) {
        return JSON.parse(JSON.stringify(await users.findOne(opt)))
    }
    async session(id) {
        return JSON.parse(JSON.stringify(await sessions.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async user(id) {
        return JSON.parse(JSON.stringify(await users.findOne({ where: { id: id, businessId: this._session.businessId } })));
    }
}
module.exports = Single;
