import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListProductsService {
  public async execute(): Promise<Product[]> {

    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find()

    return products

  }
}

export default ListProductsService