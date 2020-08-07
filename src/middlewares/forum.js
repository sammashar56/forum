import {
    getAllForums,
    updateForum,
    deleteForum, 
    createForum,
    getOwnForums
} from "../controllers/forum";

export const fetchSpecificforum = (req, res, next) => {
    getOwnForums(req.query, req.user._id).then(Response => {
        res.status(200).json({ ...Response});
    })
    .catch(err => { 
    console.log(err);
        res.status(err.status || 500).json({ message: err.message });
    }); 
}; 

export const fetchForums = (req,res, next) => { 
    getAllForums(req.query).then(Response => { 
        res.status(200).json({ ...Response}); 
    }) 
    .catch(err => {
      res.status(err.status || 500).json({message : err.message});
    });
};

export const removeForum = (req, res, next) => {
    deleteForum(req.params.forum_id, req.user._id)
      .then(Res => { 
        res.status(200).json(Res);
      })
      .catch(err => {
        res.status(err.status).json(err);
      });
};

export const editForum = (req, res, next) => {
    const data = {
      user: req.user._id,
      ...req.body
    };
    updateForum(data, req.params.forum_id)
      .then(Res => {
        res.status(201).json(Res);
      })
      .catch(err => {
        res.status(err.status || 400).json(err);
      });
  };

  export const addforum = (req, res, next) => {
    const data = {
      ...req.body,
      user: req.user._id,
        forum_id: req.params.forum_id
    };

  //check the parameters controller.
    createForum(data)
      .then(Res => {
        res.status(201).json(Res);
      })
      .catch(err => {
        console.log(err);
        
        res.status(err.status || 500).json({message : err.message});
      });
  };
  
