
import AdminController from "../adaptors/adminController";
import EmployeController from "../adaptors/employeeController";
import HeadController from "../adaptors/headController";
import AdminRepository from "../infrastructure/repositories/adminRepository";
import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import HeadRepository from "../infrastructure/repositories/headRepository";
import AdminUseCase from "../use_cases/adminUseCase";
import EmployeeUseCase from "../use_cases/employeeUseCase";
import HeadUseCase from "../use_cases/headUseCase";
import GenerateCredential from "./generateCredential";
import Jwt from "./jwt";
import ManagePassword from "./managePassword";

/* Provider */
const jwt = new Jwt()
const managePassword = new ManagePassword()
const generateCredential = new GenerateCredential()


/* Repositories */
const adminRepository = new AdminRepository()
const headRepository = new HeadRepository()
const employeeRepository = new EmployeeRepository()



/* UseCases */
const adminUseCase = new AdminUseCase(adminRepository,employeeRepository,headRepository,jwt,generateCredential,managePassword)
const headUseCase = new HeadUseCase(headRepository,jwt,managePassword)
const employeUsecase = new EmployeeUseCase(employeeRepository,jwt,managePassword)


/* Controllers */
export const adminController = new AdminController(adminUseCase)
export const headController = new HeadController(headUseCase)
export const employeController = new EmployeController(employeUsecase)