export const navigations = {
    conversations: 'conversations',
    onlineFriends: 'onlineFriends'
}

// api server address in the "proxy" in the file package.json, seems like axios auto get the proxy.
// "proxy": "http://localhost:8800/api" 
// read more here: https://create-react-app.dev/docs/proxying-api-requests-in-development/

export const apiRoutes = {
    register: '/auth/register',
    login: '/auth/login',
    getAllUsers: '/users/getAll',
    getUser: (id) => { return `/users/?userId=${id}` },
    createNewConversation: `/conversations`, // co the ko can
    findAConversation: (firstUserId, secondUserId) => { return `/conversations/find/${firstUserId}/${secondUserId}` }, // of 2 users
    getConversations: (userId) => {return `/conversations/${userId}`},  // get conversations of a user
    createAMessage: () => { return `/messages`; },      // create a message
    getMessages: (conversationId) => { return `/messages/${conversationId}`}, // get messages of a conversation
} 

export const socketEvents = {
    getMessage: 'getMessage', // socket server sends message from others to current user
    addUser: 'addUser',  // add current user id to the socket server
    getUsers: 'getUsers', // get online users currently on socket server
    sendMessage: 'sendMessage', // current logged in user send message
}