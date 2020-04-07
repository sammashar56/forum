export const validateForumField = data => {
    if (
        data.comment
    ){
        return true;
    }
    else {
        return false;
    }        
};
