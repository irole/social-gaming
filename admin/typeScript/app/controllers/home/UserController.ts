import express from 'express';
import translate from '../../helpers/translate';

// Packages
const passport = require('passport');
const fs = require('fs');
// Controllers
import Controller from './Controller';

// Service
import userService from '../../services/UserService';
import roleService from '../../services/RoleService';
import usersReportService from "../../services/UsersReportService";

class UserController extends Controller {

    async index(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Users');
            // Paginate
            const page = req.query.page || 1;
            // Select All User
            const populate = [{
                path: 'role',
                select: 'name'
            }];
            const users = await userService.paginate({admin: false}, page, {createdAt: 1}, 20, populate);
            res.render('home/users', {users, title});
        } catch (e) {
            next(e);
        }
    }

    async bans(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-bans', 'Bans');
            // Paginate
            let page = req.query.page || 1;
            // Select All User
            let populate = [{path: 'role', select: 'name'}];
            let users = await userService.paginate({banStatus: true}, page, {createdAt: 1}, 20, populate);
            res.render("home/users/bans", {users, title});
        } catch (e) {
            next(e);
        }
    }

    async reports(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-reports', 'Reports');
            // Paginate
            let page = req.query.page || 1;
            // Select All report
            let populate = [{path: 'reporter'}, {path: 'reportedUser'}];
            let reports = await usersReportService.paginate({}, page, {createdAt: 1}, 20, populate);

            //let reports = await usersReportService.paginate({}, page, {createdAt: 1}, 20);
            res.render("home/users/reports", {reports, title});
        } catch (e) {
            next(e);
        }
    }

    async guests(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-guests', 'Guests');
            // Paginate
            let page = req.query.page || 1;
            // Select All User
            let populate = [{path: 'role', select: 'name'}];
            let users = await userService.paginate({isGuest: true}, page, {createdAt: 1}, 20, populate);
            res.render("home/users/guests", {users, title});
        } catch (e) {
            next(e);
        }
    }

    async admins(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-admin', 'Admins');
            // Paginate
            let page = req.query.page || 1;
            // Select All User
            const populate = [{
                path: 'role',
                select: 'name'
            }];
            const users = await userService.paginate({admin: true}, page, {createdAt: 1}, 20, populate);
            //return res.json(users);
            res.render('home/users/admins', {
                users,
                title
            });
        } catch (e) {
            next(e);
        }
    }

    async edit(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-edit', 'Edit');
            let user = await userService.findById(req.params.id);
            // Check User is Exist
            if (!user) this.error(translate(req, __filename, 'user-not-find', 'user not found'), 404);
            res.render("home/users/edit", {user, title});
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            await userService.findOneAndUpdate({email: req.body.email}, {...req.body});
            res.redirect("/users");
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-create', 'Create new User');
            res.render('home/users/create', {title});
        } catch (e) {
            next(e);
        }
    }

    async store(req, res, next) {
        try {
            passport.authenticate('local.register', {session: false}, (err, user): void => {
                // When res have Error
                if (err) return res.redirect('/users/create');
                return res.redirect('/users');

            })(req, res);

        } catch (e) {
            next(e);
        }
    }

    async toggleAdmin(req, res, next) {
        try {
            // Select User Where User Id
            const user = await userService.findById(req.params.id);
            // Check User is Exist
            if (!user) this.error(translate(req, __filename, 'not-found-toggle-admin', 'User not found !'), 404);
            // Select Role Where Name = Writer
            const role = await roleService.find({name: 'Writer'});
            // Set user admin & role as a Writer
            await userService.findOneAndUpdate({email: user.email}, {
                admin: !user.admin,
                role: role[0].id
            });
            return this.back(req, res);
        } catch (err) {
            next(err);
        }
    }

    async changeRole(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-change-role', 'Change user Role');
            // Select User by User id
            const user = await userService.findById(req.params.id);
            // Check User is Exist
            if (!user) this.error(translate(req, __filename, 'not-found-change-role', 'User not found !'), 404);
            // Select All Roles
            const roles = await roleService.findAll();
            res.render('home/users/changerole', {
                title,
                user,
                roles
            });
        } catch (err) {
            next(err);
        }
    }

    async storeRoleForUser(req, res, next) {
        try {
            // Select User by User id
            const user = await userService.findById(req.params.id);
            // Check User is Exist
            if (!user) this.error(translate(req, __filename, 'not-found-store-role-for-user', 'User not found !'), 404);
            // Get Input Value
            const role = req.body.roles;

            await userService.findOneAndUpdate({email: user.email}, {role});
            res.redirect('/users/admins');
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
