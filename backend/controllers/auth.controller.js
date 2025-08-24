import { validate } from 'uuid';
import  AuthService from '../services/auth.service.js'

class AuthController {
    async login(req, res) {
        try {

            const { email, password } = req.body;
            if (!email || typeof email != "string" || !password || typeof password != "string")
                return res.status(401).send({ success: false, msg: "invalid email or password" });



            const { error: err = null, token, user } =await  AuthService.login({ email, password });
         
            if (err) {
                return res.status(401).send({ success: false, msg: err });
            }

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });

            return res.status(200).send({ message: "login successfully", user })

        }
        catch (err) {
            console.log("error during user login ",err);
            return res.status(501).send({success:false,msg:"server error"});
        }
    }

    async register(req, res) {
        try {
           
             const {email,password,firstName,lastName}=req.body;
               if(!email ||!password||!firstName||!lastName)
                return res.status(401).send({success:false,msg:"please enter valid data"});
              
               const {error=null}=await AuthService.register(req.body);
               if(error)
                return res.status(401).send({success:false,msg:error});
            return res.status(200).send({msg:"successFully registered!"});

        } catch (err) {

            console.log("error during user register!",err)
            return res.status(501).send({success:false,msg:"server error"});


        }
    }
}

export default new AuthController();