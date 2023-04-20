const {
    sessions,
    currencies,
    schools,
    sections, classrooms, classes, subjects, users, smtp_settings, settings, parents,
    departments, teachers, students, vehicles, bus_routes, drop_offs, students_routes, salaries, routines, noticeboard, menus, exams, expenses_categories, expenses, frontend_events, frontend_gallery, frontend_settings, grades, invoices, enrols, teachers_permissions, marks, syllabuses, daily_attendances, books, book_issues, deductions, stockOuts, invoice_stockOuts
} = require('../../../database/models/module_exporter');
const { spawnJwtPayload } = require('../services/handlers');
const { passwordHash, generateUniqueIdentifier } = require('../services/service');

class deletes {
    constructor(session) {
        this._instance = session;
    }
    async session(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await sessions.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async user(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await users.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
}
module.exports = deletes;
