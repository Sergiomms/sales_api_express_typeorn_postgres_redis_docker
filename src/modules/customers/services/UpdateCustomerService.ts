import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomerRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateProfileService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {

    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const CustomerUpdateEmail = await customersRepository.findByEmail(email);

    if (CustomerUpdateEmail && CustomerUpdateEmail.id !== id) {
      throw new AppError('There is already one customer with this email.');
    }


    customer.name = name;
    customer.email = email

    await customersRepository.save(customer);

    return customer

  }
}

export default UpdateProfileService;