import Controller from "../Controller";


export default class CategoryController extends Controller {

    async store(req, res, next, redirectAddress, model) {
        try {
            // Get Input Value
            let {name, parent, lang, image, description} = req.body;
            if (parent == 'none') {
                // Create New Category
                await model.insert({
                    name,
                    lang,
                    image,
                    description
                })
            } else { //  When Category Have Parent
                // Find Parent From Categories
                let parentCategory = await model.findById(parent);
                // If Parent Not Exist
                if (!parentCategory) this.error(req.__('typeScript.app.http.controllers.web.admin.category.category-controller.add-to-db.not-found'), 404);
                // All Parent Categories Push to Current Categories
                let categories = parentCategory.categories;
                // Push Parent to Current Categories
                categories.push(parent);
                // Create New Category
                await model.insert({
                    name,
                    parent,
                    categories,
                    lang,
                    image,
                    description
                })
            }
            return res.redirect(redirectAddress);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next, redirectAddress, model) {
        try {
            // Get Input Value
            let {name, parent, lang, image, description} = req.body;
            let parentCategories: any;
            // Main Category
            if (parent == 'none') {
                await model.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name,
                        parent: null,
                        lang,
                        image,
                        description,
                        categories: []
                    }
                });
            } else {// Category Have Parent
                // Select Parent Category
                let parentCategory = await model.findById(parent);
                // Parent not Exist
                if (!parentCategory) this.error(req.__("typeScript.app.http.controllers.web.admin.category.category-controller.update.not-found"), 404);
                // All Parent Categories Push to parentCategories
                parentCategories = parentCategory.categories;
                // Push Parent to parentCategories
                parentCategories.push(parent);
                // Find and Update with Category Id
                await model.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name,
                        parent,
                        image,
                        description,
                        lang,
                        categories: parentCategories
                    }
                });
            }
            //--------------Update Childs ------------------
            // Select Category with Category Id via Childs
            let category = await model.findById(req.params.id, 'childs');
            // Category not Exist
            if (!category) this.error(req.__("typeScript.app.http.controllers.web.admin.category.category-controller.update.not-found"), 404);
            // Category Have Childs
            if (category.childs.length > 0) {
                // Get Each Childs of Category
                for (const child of category.childs) {

                    let childCategories: any;
                    // Select Category Where Parent's Child
                    let newParent = await model.findById(child.parent);
                    // All Childs Parent Categories Push to childCategories
                    childCategories = newParent.categories;
                    // Push Childs Parent to childCategories
                    childCategories.push(child.parent);
                    // Find and Update with Child Id
                    await model.findByIdAndUpdate(child.id, {
                        $set: {
                            categories: childCategories
                        }
                    });
                }
            }
            //-------------------------------------------

            return res.redirect(redirectAddress);
        } catch
            (e) {
            next(e);
        }
    }

    async destroy(req, res, next, model) {
        try {
            // Get Delete Confirm from Ajax
            if (req.body.deleteConfirm) {
                // Check Category Id
                //this.isMongoId(req.params.id);
                // Select Category by Category id
                let category = await model.findById(req.params.id, 'childs');
                // Check Category is Exist
                if (!category) this.error(req.__('typeScript.app.http.controllers.web.admin.category.category-controller.destroy.not-found'), 404);

                // Delete Childs
                if (category.childs)
                    await category.childs.forEach((category: any) => category.remove());

                // Delete Category
                await category.remove();
                // Response to Ajax
                res.json({delete: true});
            } else { // Show Sweet Alert
                return this.alertDelete(req, res, {
                    text: req.__('typeScript.app.http.controllers.web.admin.category.category-controller.destroy.alert')
                });
            }
        } catch (err) {
            next(err);
        }
    }


}
