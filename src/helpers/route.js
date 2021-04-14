export default {
    root:"/forum", 
    auth: {
        signin: "/in",  
        signup: "/join",
    },
    forum: {
        all: "/forums",
        delete:"/forum/:forum_id",
        own_forums:"/user/forums",
        update: "/forum/:forum_id",
        add: "/add-forum/:user_id"
    } 
}   
 