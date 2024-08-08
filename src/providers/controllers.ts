
import AdminController from "../adaptors/adminController";
import AdminRepository from "../infrastructure/repositories/adminRepository";
import AdminUseCase from "../use_cases/adminUseCase";
import Jwt from "./jwt";

/* Provider */
const jwt = new Jwt()


/* Repositories */

const adminRepository = new AdminRepository()


/* UseCases */

const adminUseCase = new AdminUseCase(adminRepository,jwt)


/* Controllers */

export const adminController = new AdminController(adminUseCase)