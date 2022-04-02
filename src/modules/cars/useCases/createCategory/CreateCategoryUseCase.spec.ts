import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const categoryObject = {
      name: 'New category',
      description: 'Category description',
    };

    await createCategoryUseCase.execute(categoryObject);

    const findCreatedCategory = await categoriesRepositoryInMemory.findByName(
      categoryObject.name
    );

    expect(findCreatedCategory).toMatchObject(categoryObject);
  });

  it('should not be able to create the same category', async () => {
    expect(async () => {
      const categoryObject = {
        name: 'New category',
        description: 'Category description',
      };

      await createCategoryUseCase.execute(categoryObject);
    }).rejects.toBeInstanceOf(AppError);
  });
});
