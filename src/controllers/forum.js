export const createForum = async (data, userId) => {
    const user = await User.findById(data.user);

    if(user) {
        const forum = new Forum({
            forum_id: forum._id,
            forum_comment: forum_comment  
        });
        await forum.save();
    }
    else {
        throw {
            status: 404,
            message: "user not found"
        }
    }
        
}
    
export const getOwnForums = async (userId, _query) => {
    const user = await User.finOne({User: userId});

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
            const updateforum =Forum.findOne({user: user_id});
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