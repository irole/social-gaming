
// Interface
import CategoryController from "./CategoryController";
import gameCategoryService from "../../../services/category/GameCategoryService";
import fileService from "../../../services/FileService";


class gameCategoryController extends CategoryController  {

    async index(req, res, next) {
        try {
            const title: string = req.__("typeScript.app.http.controllers.web.admin.category.game-category-controller.index.title");
            // Get Sort Categories
            let gameSortedCategory = await gameCategoryService.getSortCategories();
            res.render('admin/categories/game', {title, gameSortedCategory});
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const title: string = req.__('typeScript.app.http.controllers.web.admin.category.game-category-controller.create.title');
            // Get Sort Categories
            let images = await fileService.find({type: [...Option['fileExt'].ext]});
            let categories = await gameCategoryService.getSortCategories();
            res.render("admin/categories/game/create", {title, categories, images});
        } catch (e) {
            next(e);
        }
    }

    async storeProcess(req, res, next) {
        await this.store(req, res, next, '/admin/game-category', gameCategoryService)
    }

    async edit(req, res, next) {
        try {
            // Check Category Id
            //this.isMongoId(req.params.id);
            // Select Category by Category id
            let category = await gameCategoryService.findById(req.params.id, ['childs', {
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
            let sortCategories = await gameCategoryService.getSortCategories();
            // Filter Own & Childs Categories
            let categories = sortCategories.filter((item) => {
                if (!childsName.includes(item.name)) return item
            });
            // return  res.json(categories)
            let images = await fileService.find({type: [...Option['fileExt'].ext]});
            return res.render('admin/categories/game/edit', {category, categories, images});
        } catch (err) {
            next(err);
        }
    }

    async updateProcess(req, res, next) {
        await this.update(req, res, next, '/admin/game-category', gameCategoryService)
    }

    async destroyProcess(req, res, next) {
        await this.destroy(req, res, next, gameCategoryService)
    }
}

export default new gameCategoryController();
