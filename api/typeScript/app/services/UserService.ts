// Packages
import uniqueString from 'unique-string';
import Service from "./Service";
import User from "../models/user";
import notificationSettingService from "./NotificationSettingService";
import privacySettingService from "./PrivacySettingService";
import userRelationshipService from "./UserRelationshipService";
import billingInformationService from "./BillingInformationService";

const bcrypt = require('bcrypt');

class UserService extends Service {

    constructor() {
        super(User);
    }

    defineUsername() {
        let string = this.builder();
        this.findOne({username: string}).then((result) => {
            if (result) this.defineUsername();
        });
        return string;
    }

    builder() {
        return uniqueString();
    }

    bcryptPassword(password: any): any {
        // Bcrypt with 15 salt
        let salt = bcrypt.genSaltSync(15);
        // Bcrypt Password with Salt
        return bcrypt.hashSync(password, salt);
    }

    guestUsernameGenerator() {
        let username = `Guest-${this.guestBuilder()}`;
        this.findOne({username}).then((result) => {
            if (result) this.guestUsernameGenerator();
        });
        return username;
    }

    guestBuilder() {
        return Math.floor(Math.random() * 1000000000);
    }

    guestPasswordGenerator() {
        return uniqueString();
    }

    async checkUsernameExist(username) {
        let user = await this.findOne({username});
        return !!user;

    }

    async checkLastUpdateUsername(email) {
        let user = await this.findOne({email});
        return new Date() >= user.whenUserCanUpdateUsername;
    }

    async findIdWithUsername(username) {
        let user = await this.findOne({username});
        if (!user) return 404;
        return user.id;
    }

    async isGuest(userId) {
        let user = await this.findById(userId);
        return user.isGuest;
    }

    async findUsernameWithId(userId) {
        let user = await this.findById(userId);
        return user.username;
    }

    async updateGeneralLevel(userId) {
        let user = await this.findById(userId);
        if (!user) return Option['httpStatus'].s400;
        let generalXp = user.generalXP;
        let neededXP = user.neededXP;
        if (generalXp >= neededXP) {
            user.generalLevel++;
            user.neededXP = neededXP * 1.5;
            await user.save();
            await this.updateGeneralLevel(userId);
        }
    }

    async changeUsername(userId, username) {
        let user = await this.findById(userId);
        // Set whenUserCanUpdateUsername in User for one month later
        let now = new Date();
        let newDate = new Date(now.setMonth(now.getMonth() + 1));
        // Check if new username same with old username
        if (user.username !== username) user.whenUserCanUpdateUsername = newDate;
        // define new username
        user.username = username;
        let result = await user.save();
        if (result) return 200;
        return 500;
    }

    async updateInformation(userId, body: any) {
        let user = await this.findById(userId);
        user.biography = body.biography;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.gender = body.gender;
        let result = await user.save();
        if (result) return 200;
        return 500;
    }

    async registerProcess(email, password) {
        // Create new user
        let newUser = await new this.model({
            email,
            password: this.bcryptPassword(password),
            username: this.defineUsername()
        });
        if (newUser) {
            // create billing information
            await billingInformationService.insert({user: newUser.id});
            // create notification setting
            await notificationSettingService.insert({user: newUser.id});
            // create privacy setting
            await privacySettingService.insert({user: newUser.id});
            // create user relation ship
            await userRelationshipService.insert({user: newUser.id});
            // when all process done we save new user in database
            return await newUser.save();
        }
        // when user not created send 500
        return 500;
    }

    async guestRegisterProcess() {
        // create guest username like Guest-10220545154
        let username = this.guestUsernameGenerator();
        // Create new user with simple email and password and username and guest is true
        let newUser = await this.insert({
            email: username,
            password: this.bcryptPassword(this.guestPasswordGenerator()),
            username,
            isGuest: true
        });
        // check new user created send new user
        if (newUser) return newUser;
        // when user not created send 500
        return 500;
    }

    async convertGuestToUser(userId, email, password) {
        // find guest user
        let guest = await this.findById(userId);
        console.log(guest);
        // send 400 when user not found
        if (!guest) return 404;
        // set new email address
        guest.email = email;
        // set new password
        guest.password = this.bcryptPassword(password);
        // set new username
        guest.username = this.defineUsername();
        // create billing information
        await billingInformationService.insert({user: guest.id});
        // create notification setting
        await notificationSettingService.insert({user: guest.id});
        // create privacy setting
        await privacySettingService.insert({user: guest.id});
        // create user relation ship
        await userRelationshipService.insert({user: guest.id});
        // convert guest to user
        guest.isGuest = false;
        // saves changes
        let result = await guest.save();
        if (result) return 200;
        return 500;
    }

    async checkUserExistWithEmail(email) {
        let result = await this.findOne({email});
        return !!result;
    }

}

export default new UserService();
