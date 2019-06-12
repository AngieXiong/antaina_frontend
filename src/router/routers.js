import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: 'Antaina',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/pages/home')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      icon: 'md-menu',
      title: '管理员管理',
      access: ['admin']
    },
    component: Main,
    children: [
      {
        path: 'admin_add',
        name: 'admin_add',
        meta: {
          icon: 'md-funnel',
          title: '新增管理员',
          access: ['admin_add']
        },
        component: () => import('@/view/pages/admin/admin_add.vue')
      },
      {
        path: 'admin_query',
        name: 'admin_query',
        meta: {
          icon: 'md-funnel',
          title: '管理员查询',
          access: ['admin_query']
        },
        component: () => import('@/view/pages/admin/admin_query.vue')
      },
      {
        path: 'admin_update/:id',
        name: 'admin_update',
        meta: {
          icon: 'md-funnel',
          title: '管理员更新',
          hideInMenu: true,
          beforeCloseName: 'before_close_normal',
          notCache: true,
          access: ['admin_update']
        },
        component: () => import('@/view/pages/admin/admin_update.vue')
      }
    ]
  },
  {
    path: '/customer',
    name: 'customer',
    meta: {
      icon: 'md-menu',
      title: '客户管理',
      access: ['customer']
    },
    component: Main,
    children: [
      {
        path: 'customer_info',
        name: 'customer_info',
        meta: {
          icon: 'md-funnel',
          title: '客户信息查询',
          access: ['customer_info']
        },
        component: () => import('@/view/pages/customer/customer_info.vue')
      },
      {
        path: 'customer_add',
        name: 'customer_add',
        meta: {
          icon: 'md-funnel',
          title: '新增客户',
          access: ['customer_add']
        },
        component: () => import('@/view/pages/customer/customer_add.vue')
      },
      {
        path: 'customer_update',
        name: 'customer_update',
        meta: {
          icon: 'md-funnel',
          title: '更新客户',
          access: ['customer_add']
        },
        component: () => import('@/view/pages/customer/customer_update.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'md-menu',
      title: '订单管理',
      access: ['order']
    },
    component: Main,
    children: [
      {
        path: 'order_info',
        name: 'order_info',
        meta: {
          icon: 'md-funnel',
          title: '订单查询',
          access: ['customer_info']
        },
        component: () => import('@/view/pages/order/order_info.vue')
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      icon: 'md-menu',
      title: '物料管理',
      access: ['product']
    },
    component: Main,
    children: [
      {
        path: 'product_query',
        name: 'product_query',
        meta: {
          icon: 'md-funnel',
          title: '物料查询',
          access: ['product_query']
        },
        component: () => import('@/view/pages/product/product_query.vue')
      },
      {
        path: 'product_add',
        name: 'product_add',
        meta: {
          icon: 'md-funnel',
          title: '新增物料',
          access: ['product_add']
        },
        component: () => import('@/view/pages/product/product_add.vue')
      },
      {
        path: 'product_update',
        name: 'product_update',
        meta: {
          icon: 'md-funnel',
          title: '更新物料',
          access: ['product_update']
        },
        component: () => import('@/view/pages/product/product_update.vue')
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      icon: 'md-menu',
      title: '库存管理',
      access: ['account']
    },
    component: Main,
    children: [
      {
        path: 'account_asset',
        name: 'account_asset',
        meta: {
          icon: 'md-funnel',
          title: '库存查询',
          access: ['account_asset']
        },
        component: () => import('@/view/pages/account/account_first.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      icon: 'md-menu',
      title: 'AAA管理',
      access: ['report']
    },
    component: Main,
    children: [
      {
        path: 'report_user',
        name: 'report_user',
        meta: {
          icon: 'md-funnel',
          title: '用户数据统计',
          access: ['report_user']
        },
        component: () => import('@/view/pages/report/report_user.vue')
      },
      {
        path: 'report_transaction',
        name: 'report_transaction',
        meta: {
          icon: 'md-funnel',
          title: '交易数据统计',
          access: ['report_transaction']
        },
        component: () => import('@/view/pages/report/report_transaction.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-menu',
      title: 'BBB管理',
      access: ['system']
    },
    component: Main,
    children: [
      {
        path: 'platform_add',
        name: 'platform_add',
        meta: {
          icon: 'md-funnel',
          title: '接入平台新增',
          access: ['platform_add']
        },
        component: () => import('@/view/pages/system/platform_add.vue')
      },
      {
        path: 'platform_query',
        name: 'platform_query',
        meta: {
          icon: 'md-funnel',
          title: '接入平台配置',
          access: ['platform_query']
        },
        component: () => import('@/view/pages/system/platform_query.vue')
      },
      {
        path: 'platform_update/:id',
        name: 'platform_update',
        meta: {
          icon: 'md-funnel',
          title: '接入平台更新',
          hideInMenu: true,
          beforeCloseName: 'before_close_normal',
          notCache: true,
          access: ['platform_update']
        },
        component: () => import('@/view/pages/system/platform_update.vue')
      },
      {
        path: 'schedule',
        name: 'schedule',
        meta: {
          icon: 'md-funnel',
          title: '异常信息',
          access: ['schedule']
        },
        component: () => import('@/view/pages/system/schedule.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
