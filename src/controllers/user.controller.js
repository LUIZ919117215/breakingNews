//código não entendido
//tentando//
//código entendido
import userService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

const create = async (req, res) => {
    try{
        const { name, username, email, password, avatar, background } = req.body;

        if( !name || !username || !email || !password || !avatar || !background ) {
            res.status(400).send({message:"Submit all fields for registration"})
        }

        const user = await userService.createService(req.body)

        if (!user) {
            return res.status(400).send({ message: "Error creating User" })
        }

        const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, { expiresIn: 86400 })

        const token = generateToken(user._id)

        res.status(201).send({
            message: "User created successfully",
            data: {
                token,
               user: {
                  id: user._id,
                  name,
                  username,
                  email,
                  avatar,
                  background,
              }
            }
        });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findAll = async (req, res) => {
   try{    
      const users = await userService.findAllService()
      
      if (users.length === 0) {
         return res.status(400).send({ message: "There are no registered users" });
      }

      res.send(users)

   } catch (err) {
      res.status(500).send({ message: err.message })
   }
};

const findById = async (req, res) => {
    try {
      //   const id = req.userId
        const user = req.uSer

        res.send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if( !name && !username && !email && !password && !avatar && !background ) {
            res.status(400).send({ message:"Submit at least one field for update" })
        }
    
        const { id, user } = req
    
        await userService.updateService(
          id,  
          name,
          username,
          email,
          password,
          avatar,
          background
        )
    
        res.send({ message: "User sucessfully update!" })
    
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

export default { 
    create, 
    findAll, 
    findById,
    update 
};