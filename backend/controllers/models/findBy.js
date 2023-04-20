const {
    sessions,
    currencies, stores, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols, permissions,
} = require('../../../database/models/module_exporter');
const roles = require('../../../database/models/roles');
const user_roles = require('../../../database/models/user_roles');
const user_role_permissions = require('../../../database/models/user_role_permissions');
const { Op } = require('../../../database/mysql');
class FindBy {
    constructor(session) {
        this._session = session;
        if (this._session) {
            console.log('session', this._session);
        }
    }
    async session(opt) {
        return JSON.parse(JSON.stringify(await sessions.findAll(opt)));
    }
    async user(opt) {
        try {
            // opt.where['businessId'] = this._session.businessId.toString();
            console.log(opt);
            opt.where['sessionId'] = this._session.sessionId.toString();
            let user = await users.findAndCountAll(opt);
            return { status: true, data: JSON.parse(JSON.stringify(user.rows)), count: user.count, notification: null }
        } catch (err) {
            return { status: false, data: [], count: 0, notification: 'access denied! Operation unauthorized' }
        }
    }
    async signin(opt) {
        try {
            let userRoles = JSON.parse(JSON.stringify(await user_roles.findAll()));
            opt['include'] = { model: roles };
            var user = JSON.parse(JSON.stringify(await users.findOne(opt)));
            // console.log('userroles>>>>', userRoles, user);
            for (const userRole of userRoles) {
                for (const role of user.roles) {
                    if (userRole.userId == user.id && userRole.roleId == role.id) {
                        user['role'] = JSON.parse(JSON.stringify(await roles.findOne({ where: { id: role.id }, include: { model: permissions } })));
                        user['business'] = JSON.parse(JSON.stringify(await businesses.findOne({ where: { id: userRole.businessId } })));
                    }
                }
            }
            return await user;
        } catch (err) {
            return new Error(err);
        }
    }
}
module.exports = FindBy;
