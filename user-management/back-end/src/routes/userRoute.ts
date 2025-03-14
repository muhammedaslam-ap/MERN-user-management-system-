import { Request,Response,Router } from "express";
import { UserController } from "../controller/userController";
import { authMiddleWare } from "../middleware/auth";

export class UserRoutes {
    private userController: UserController;
    public router: Router;
    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
      }
      initializeRoutes() {
        this.router.post("/register", (req: Request, res: Response) =>
            this.userController.createUser(req, res)
        );
        this.router.post("/login", (req: Request, res: Response) =>
          this.userController.authUser(req, res)
       );
       this.router.post("/update", (req: Request, res: Response) =>
        this.userController.updateUser(req, res)
       );
       this.router.post(
        "/user/logout",
        authMiddleWare,
        (req: Request, res: Response) => {
          this.userController.logoutUser(req, res);
        }
      );

      this.router.get("/user/profile",authMiddleWare,(req:Request,res:Response)=>{
        this.userController.getUser(req,res)
      });
       
      }

}