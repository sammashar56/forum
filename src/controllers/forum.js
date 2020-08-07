import User from "../models/user"
import Forum from "../models/forum"

export const createForum = async (data) => {
    const user = await User.findById(data.user);

    if(user) {
        
        let forum_comment = data.forum_comment

        const Newforum = new Forum({name : forum_comment});
        await Newforum.save()
        return {
            message : "Forum created"
        }
       
        
    }
    else {
        throw {
            status: 404,
            message: "user not found"
        }
    }     
    
}
    
export const getOwnForums = async (userId, _query) => {
    const user = await User.findOne({User: userId});

    if (user) {
        const forum = await Forum.find({forum: userId}, null, {
         skip: _query.skip,
         limit:size   
        })
        .sort({
            createdAt: -1
        })
        return {
            forum
        }
    }
    else{
            throw {
                status: 404,
                message:" no user found"
            };
    }
    
};

export const getAllForums = async () => {
    const forums = Forum.find();
    return {
        forums
    };
};

export const updateForum = async (userId) => {
    const user = await user.findById(userId);

        if (user) {
            const updateforum = Forum.findOne({user: user_id});
            if (updateforum){
                Object.assign(forum, {
                forum_comment: data.forum_comment || forum.forum_comment
            });
            await forum.save();

            return {
                forum,
                message: "forum updated"
            };
        }
        else {
            throw {
                status: 404,
                message: "user not found"
            }
        }

    }
}

export const deleteForum = async (id, forum_id) => {
    const user = await User.findById(userId);

    if (user) {
        const forum = await Forum.findOne({
            forum_id: id,
        })
        await forum.remove();

        return {
            message:"forum deleted",
            forum
        }
    }
    else {
        throw {
            status: 403,
            message: "forum deleted"
        }
    }
}