import {
    getAllForums,
    updateForum,
    deleteForum, 
    createForum,
    getOwnForums,
    getSingleforum,
    
} from "../controllers/forum";


export const fetchSpecificforum = (req, res, next) => {
    getOwnForums( req.user._id)
    // console.log(req.forum._id);  
    .then(Response => { //req.query,
      console.log(req.user._id);
        res.status(200).json({ ...Response});
        
    })
    .catch(err => { 
    console.log(err);
        res.status(err.status || 500).json({ message: err.message });
    }); 
}; 

export const fetchForums = (req,res, next) => {  
    getAllForums()
    .then(Response => { 
        res.status(200).json({ ...Response});
        //console.log(req.query) 
    }) 
    .catch(err => {
      res.status(err.status || 500).json({message : err.message});
    });
};

export const removeForum = (req, res, next) => {
    deleteForum(req.params.forum_id)
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
    // console.log(req.params.forum_id);
    updateForum(data, req.params.forum_id)
      .then(Res => {
        res.status(201).json(Res);
      })
      .catch(err => {
        res.status(err.status || 400).json({
          message: err.message,
        });
      });
  };

  export const addforum = (req, res, next) => {
    const data = {
      ...req.body,
      user: req.user._id,
      
    };
  //check the parameters controller.
    createForum(data)
      .then(Res => {
        res.status(201).json(Res);
      })
      .catch(err => {
        //console.log(err);
        res.status(err.status || 500).json({message : err.message});
      });
  };
  
  //fetch specific forum by id
export const fetchSingleforum = (req, res, next) => {
  getSingleforum(req.params.seller_id)
  .then(Response => {
    res.status(200).json({ ...Response})
  })
  .catch(err => {
    res.status(err.status || 500).json({ message: err.message})
  })
}

// 603b2eaf6a631b61bc7fdb45 user 1