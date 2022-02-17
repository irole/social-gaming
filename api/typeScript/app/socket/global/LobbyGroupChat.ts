// 
//
// //let GlobalSocket = require('./GlobalSocket');
// let groupUsers = require('@helpers/GroupUsers');
//
// class LobbyGroupChat {
//
//     joinRoom(io, namespace, socket, joinLobbyData) {
//         socket.join(joinLobbyData.groupName);
//     }
//
//     updateUsersList(io, namespace, socket, joinLobbyData) {
//         groupUsers.addUserInList(socket.id, joinLobbyData.username, joinLobbyData.groupName, joinLobbyData.guest);
//         io.of(namespace).to(joinLobbyData.groupName).emit('groupUsersList', groupUsers.getUsernameInGroup(joinLobbyData.groupName));
//     }
//
//     createMessage(io, nameSpace, data) {
//         io.of(nameSpace).to(data.groupName).emit('newMessageFromServer', data);
//     }
//
//     onDisconnect(io, namespace, socket) {
//         let user = groupUsers.removeUserFromList(socket.id);
//         if (user) {
//             io.of(namespace).to(user.groupName).emit('groupUsersList', groupUsers.getUsernameInGroup(user.groupName));
//         }
//     }
// }
//
// export default new LobbyGroupChat();
