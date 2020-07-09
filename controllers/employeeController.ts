import Employee from "../interfaces/Employee.ts";
import EmployeeService from "../services/employeeService.ts";


export default {

  /**
   * @description Get all Employee List
   */
  getAllEmployees: async ({ response }: { response: any }) => {
    try {
      const data = await EmployeeService.getAll();
      response.status = 200;
      response.body = {
        success: true,
        data,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Add a new Employee
   */
  createEmployee: async ({ request, response }: { request: any; response: any },) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }
    try {
      await EmployeeService.add(
        { name: body.value.name,
          department:body.value.department,   
          isActive: true },
      );
      response.body = {
        success: true,
        message: "The record was added successfully",
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Get Employee by id
   */
  getEmployeeById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const isAvailable = await EmployeeService.doesExistById(
        { id: Number(params.id) },
      );

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No Employee found",
        };
        return;
      }

      const employee: Employee = await EmployeeService.getById({ id: Number(params.id) });
      response.status = 200;
      response.body = {
        success: true,
        data: employee,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Update Employee by id
   */
  updateEmployeeById: async ({ params, request, response }: {params: { id: string };
    request: any;
    response: any;
  },) => {
    try {
      const isAvailable = await EmployeeService.doesExistById(
        { id: Number(params.id) },
      );
      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No Employee found",
        };
        return;
      }
      const body = await request.body();
      const updatedRows = await EmployeeService.updateById({
        id: Number(params.id),
        ...body.value,
      });
      response.status = 200;
      response.body = {
        success: true,
        message: `Successfully updated ${updatedRows} row(s)`,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description Delete Employee by id
   */
  deleteEmployeeById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const updatedRows = await EmployeeService.deleteById({
        id: Number(params.id),
      });
      response.status = 200;
      response.body = {
        success: true,
        message: `Successfully updated ${updatedRows} row(s)`,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },
};