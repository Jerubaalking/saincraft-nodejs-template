const {
    sessions,
    currencies, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items, stores,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols,
} = require('../../../database/models/module_exporter');
const { Op } = require('../../../database/mysql');
const { spawnJwtPayload } = require('../services/handlers');
class Finds {
    constructor(session) {
        this._session = session;
    }
    async users() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await users.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
}
module.exports = Finds;
