import ApiController from "../ApiController";
import privacySettingService from "../../services/PrivacySettingService";


export default class Controller extends ApiController {

    async filterPublicUser(user, req) {

        let receiverUserId = user.id;
        let requesterUserId;
        if (req.user) requesterUserId = req.user.id;
        else requesterUserId = "000000000000000000010000";

        let filteredObject: any = {
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            birthDay: user.birthDay,
            generalLevel: user.generalLevel,
            generalXP: user.generalXP,
            username: user.username,
        };
        if (user.profilePictureVerify) filteredObject.profilePicture = user.profilePicture;
        let biographyAccess = await privacySettingService.userCanSeeBiography(receiverUserId, requesterUserId);
        if (biographyAccess) filteredObject.biography = user.biography;
        let friendsAccess = await privacySettingService.userCanSeeFriends(receiverUserId, requesterUserId);
        if (friendsAccess) filteredObject.friendsList = user.userRelationship[0].friendsList;
        return filteredObject;
    }

    filterPublicUsers(users, req) {

        users.forEach(user => {
            let filteredObject: any = {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                birthDay: user.birthDay,
                generalLevel: user.generalLevel,
                generalXP: user.generalXP,
                username: user.username,
            };
        });


        //console.log(users);

        // let receiverUserId = user.id;
        // let requesterUserId;
        // if (req.user) requesterUserId = req.user.id;
        // else requesterUserId = "000000000000000000010000";
        //
        // let filteredObject: any = {
        //     firstName : user.firstName,
        //     lastName : user.lastName,
        //     gender : user.gender,
        //     birthDay : user.birthDay,
        //     generalLevel : user.generalLevel,
        //     generalXP : user.generalXP,
        //     username : user.username,
        // };
        // if (user.profilePictureVerify) filteredObject.profilePicture = user.profilePicture;
        // let biographyAccess = await privacySettingService.userCanSeeBiography(receiverUserId, requesterUserId);
        // if (biographyAccess) filteredObject.biography = user.biography;
        // let friendsAccess = await privacySettingService.userCanSeeFriends(receiverUserId, requesterUserId);
        // if (friendsAccess) filteredObject.friendsList = user.userRelationship[0].friendsList;
        // return filteredObject;
    }

    async filterProfile(user) {
        return {
            emailVerify: user.emailVerify,
            whenUserCanUpdateUsername: user.whenUserCanUpdateUsername,
            CountryCode: user.CountryCode,
            phoneNumber: user.phoneNumber,
            phoneNumberVerify: user.phoneNumberVerify,
            biography: user.biography,
            profilePicture: user.profilePicture,
            profilePictureVerify: user.profilePictureVerify,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            birthDay: user.birthDay,
            generalLevel: user.generalLevel,
            generalXP: user.generalXP,
            neededXP: user.neededXP,
            banStatus: user.banStatus,
            banTime: user.banTime,
            banModel: user.banModel,
            email: user.email,
            username: user.username,
        }

    }


    // async filterRequestList(userRelationShip) {
    //     return {
    //         emailVerify: user.emailVerify,
    //         whenUserCanUpdateUsername: user.whenUserCanUpdateUsername,
    //         CountryCode: user.CountryCode,
    //         phoneNumber: user.phoneNumber,
    //         phoneNumberVerify: user.phoneNumberVerify,
    //         biography: user.biography,
    //         profilePicture: user.profilePicture,
    //         profilePictureVerify: user.profilePictureVerify,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         gender: user.gender,
    //         birthDay: user.birthDay,
    //         generalLevel: user.generalLevel,
    //         generalXP: user.generalXP,
    //         neededXP: user.neededXP,
    //         banStatus: user.banStatus,
    //         banTime: user.banTime,
    //         banModel: user.banModel,
    //         email: user.email,
    //         username: user.username,
    //     }
    //
    // }
};
