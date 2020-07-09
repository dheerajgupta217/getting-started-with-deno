import { Router } from "https://deno.land/x/oak/mod.ts";
import employeeController from "../controllers/employeeController.ts";


const router = new Router();

router
  .get("/employee", employeeController.getAllEmployees)
  .post("/employee", employeeController.createEmployee)
  .get("/employee/:id", employeeController.getEmployeeById)
  .put("/employee/:id", employeeController.updateEmployeeById)
  .delete("/employee/:id", employeeController.deleteEmployeeById);

export default router;
