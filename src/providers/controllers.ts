
import AdminController from "../adaptors/adminController";
import AdminRepository from "../infrastructure/repositories/adminRepository";
import AdminUseCase from "../use_cases/adminUseCase";



/* Repositories */

const adminRepository = new AdminRepository()


/* UseCases */

const adminUseCase = new AdminUseCase(adminRepository)


/* Controllers */

export const adminController = new AdminController(adminUseCase)