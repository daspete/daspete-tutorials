import pages from '~/config/pages'

class Site {
    constructor(settings){
        this.data = {
            pages: pages
        };

        this.params = settings.params;
    }

    GetMainChilds(){
        return this.data.pages[0].children;
    }

    GetPage(){
        // TODO: make it recursive

        if(typeof this.params.category === 'undefined') return this.data.pages[0]; // return home children

        let category = this.data.pages[0].children.find((page) => {
            return page.href == this.params.category;
        });

        if(typeof category === 'undefined'){
            return false;
        }

        console.log(category);

        if(typeof this.params.subcategory === 'undefined') return category || null;  // return category children

        let subcategory = category.children.find((page) => {
            return page.href == this.params.subcategory;
        });

        if(typeof subcategory === 'undefined'){
            return false;
        }

        if(typeof this.params.content === 'undefined') return subcategory || null; // return subcategory children

        let content = subcategory.children.find((page) => {
            return page.href == this.params.content;
        });

        if(typeof content === 'undefined'){
            return false;
        }

        return content || null; // return content children
    }

    GetChilds(){
        let page = this.GetPage();

        if(page == null || page == false) return page;// TODO: redirect to 404

        return page.children;
    }

}

export default Site;