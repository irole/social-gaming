import CategoryController from "./CategoryController";
import shopCategoryService from "../../../services/category/ShopCategoryService";
import fileService from "../../../services/FileService";
import translate from "../../../helpers/translate";


class ShopCategoryController extends CategoryController {

    async index(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'shop Categories');
            // Get Sort Categories
            let shopSortedCategory = await shopCategoryService.getSortCategories();
            res.render('home/categories/shop', {title, shopSortedCategory});
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-create', 'New Shop Category');
            // Get Sort Categories
            let images = await fileService.find({type: [...Option['fileExt'].ext]});
            let categories = await shopCategoryService.getSortCategories();
            res.render("home/categories/shop/create", {title, categories, images});
        } catch (e) {
            next(e);
        }
    }

    async storeProcess(req, res, next) {
        await this.store(req, res, next, '/categories/shop', shopCategoryService)
    }

    async edit(req, res, next) {
        try {
            // Check Category Id
            //this.isMongoId(req.params.id);
            // Select Category by Category id
            let category = await shopCategoryService.findById(req.params.id, ['childs', {
                path: 'image',
                select: 'url'
            }]);
            // Check Category is Exist
            if (!category) this.error('چنین دسته ای وجود ندارد', 404);
            let childsName: any = [];
            // Push Main Category Name to childsName
            childsName.push(category.name);
            // Push Childs Category to childsName
            if (category.childs)
                category.childs.forEach((child: any) => childsName.push(child.name));

            // Get Sort Categories
            let sortCategories = await shopCategoryService.getSortCategories();
            // Filter Own & Childs Categories
            let categories = sortCategories.filter((item) => {
                if (!childsName.includes(item.name)) return item
            });
            // return  res.json(categories)
            let images = await fileService.find({type: [...Option['fileExt'].ext]});
            return res.render('home/categories/shop/edit', {category, categories, images});
        } catch (err) {
            next(err);
        }
    }

    async updateProcess(req, res, next) {
        await this.update(req, res, next, '/categories/shop', shopCategoryService)
    }

    async destroyProcess(req, res, next) {
        await this.destroy(req, res, next, shopCategoryService)
    }

}

export default new ShopCategoryController();
