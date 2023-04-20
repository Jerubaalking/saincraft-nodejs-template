const { sessions,
    currencies, stores, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols,
} = require('../../../database/models/module_exporter');
const { Op } = require('../../../database/mysql');
class FindCountBy {
    constructor(session) {
        this._session = session;
    }
    async session(opt) {
        return JSON.parse(JSON.stringify(await sessions.findAndCountAll(opt)));
    }
}
module.exports = FindCountBy;
