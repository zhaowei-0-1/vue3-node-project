// 动态路由
import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import UserAdd from '../views/userManage/UserAdd.vue'
import UserList from '../views/userManage/UserList.vue'
import NewsAdd from '../views/newsManage/NewsAdd.vue'
import NewsList from '../views/newsManage/NewsList.vue'
import NewsEdit from '../views/newsManage/NewsEdit.vue'

import ProductAdd from '../views/productManage/ProductAdd.vue'
import ProductList from '../views/productManage/ProductList.vue'
import ProductEdit from '../views/productManage/ProductEdit.vue'
import NotFound from '../views/notFound/NotFound.vue'
const RoutesConfig = [
    {
        path: '/index',
        component: Home,
    },

    {
        path: '/center',
        component: Center,
    },
    {
        path: '/userManage/adduser',
        component: UserAdd,
        requireAdmin: true
    },
    {
        path: '/userManage/userlist',
        component: UserList,
        requireAdmin: true
    },
    {
        path: '/newsManage/addnews',
        component: NewsAdd,
    },
    {
        path: '/newsManage/newslist',
        component: NewsList,
    },
    {
        path: '/newsManage/editnews/:id',
        component: NewsEdit,
    },
    {
        path: '/productManage/addproduct',
        component: ProductAdd,
    },
    {
        path: '/productManage/productlist',
        component: ProductList,
    },
    {
        path: '/productManage/editproduct/:id',
        component: ProductEdit,
    },
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Notfound',
        component: NotFound
    }
]
// 导出
export default RoutesConfig