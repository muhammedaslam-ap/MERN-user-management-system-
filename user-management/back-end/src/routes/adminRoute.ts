import { AdminController } from "../controller/adminController";
import { Request, Response, Router } from "express";

export class AdminRoute{
    private adminController: AdminController;
    public router: Router;
    constructor() {
      this.router = Router();
      this.adminController = new AdminController();
      this.initializeRouters();
    }
  
    initializeRouters(){
       this.router.post("/login", (req: Request, res: Response) =>
        this.adminController.authAdmin(req, res)
      );

      this.router.get("/usersList", (req: Request, res: Response) =>
        this.adminController.getUsers(req, res)
      );
      this.router.post("/update/:id", (req: Request, res: Response) =>
        this.adminController.updateUser(req, res, req.params.id)
      );
      this.router.get("/userById/:id", (req: Request, res: Response) =>
        this.adminController.updateUser(req, res, req.params.id)
      );
      
     this.router.post("/deleteUser/:id", (req: Request, res: Response) =>
      this.adminController.deleteUser(req, res, req.params.id)
    );
    
    this.router.post("/logout", (req:Request,res:Response) =>
      this.adminController.logoutAdmin(req,res)
    );
   
}

}