import User from "../models/user"
import Forum from "../models/forum"

export const createForum = async (data) => {
    const user = await User.findById(data.user);
        if(user) {
            const Newforum = new Forum({ forum_comment: data.forum_comment, user: data.user })
            await Newforum.save()
        return {
            message : "Forum created",
            Newforum
        }
    }
    else {
        throw {
            status: 404,
            message: "user not found"
        }
    }        
}

// forums created by a single seller
export const getOwnForums = async (userId) => {
     const forums = await Forum.find({ user: userId}, {})
    //  console.log(forums);
     return {
         forums
     }
    
};

export const getAllForums = async () => {
    const forums = await Forum.find();
    return { 
        forums
    };    
}

export const updateForum = async (data , forum_id) => {
    const user = await User.findOne(data.user);
    
        if (user) {
            const forum = await Forum.findOne({ _id: forum_id,  });
            console.log(forum);
            if (forum){
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
                message: "forum not found"
            }
        }
    } else {
        throw {
            status: 404,
            message: "user not found"
        }
    }
}

export const deleteForum = async (forum_id, _id) => {
    const forum = await Forum.findOne({_id: forum_id})
    if (forum) {
        await forum.remove();
        return {
            message:"forum deleted",
            forum
        }
    }
    else {
        throw {
            status: 403,
            message: "forum not found"
        }
    }
}

//get single forum by id
export const getSingleforum = async(forum_id) => {
    const forum = await Forum.findOne({_id: forum_id})
    return {
        forum : {...forum._doc}
    } 
}