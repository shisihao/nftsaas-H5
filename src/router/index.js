import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const special = ['dashboard', 'user']

export const constantRoutes = [

  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: '登录',
      noCache: true,
    },
  },

  {
    path: "/register",
    name: "register",
    hidden: true,
    component: () => import("@/views/login/register.vue"),
    meta: {
      title: '注册',
      noCache: true,
    },
  },

  {
    path: "/forgot",
    name: "forgot",
    hidden: true,
    component: () => import("@/views/login/forgot.vue"),
    meta: {
      title: '忘记密码',
      noCache: true,
    },
  },

  {
    path: "/public-agreement",
    name: "public-agreement",
    component: () => import('@/views/components/common/agreement.vue'),
    meta: {
      title: '协议'
    }
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
]


export const asyncRoutes = [

  {
    path: "/",
    name: "dashboard",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: '首页',
          icon: "dashboard",
          noCache: true,
          roles: ['admin', 'user'],
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '我的'
        }
      },
      {
        path: "/invitation",
        name: "invitation",
        component: () => import('@/views/user/Invitation.vue'),
        meta: {
          title: '邀请好友'
        }
      },
      {
        path: "/good-details",
        name: "good-details",
        component: () => import('@/views/good-details/index.vue'),
        meta: {
          title: '藏品详情'
        }
      },
      {
        path: "/box-details",
        name: "box-details",
        component: () => import('@/views/box-details/index.vue'),
        meta: {
          title: '盲盒详情'
        }
      },
      {
        path: "/good-my",
        name: "good-my",
        component: () => import('@/views/good-my/index.vue'),
        meta: {
          title: '我的藏品'
        }
      },
      {
        path: "/box-list",
        name: "box-list",
        component: () => import('@/views/box-list/index.vue'),
        meta: {
          title: '我的盲盒'
        }
      },
      {
        path: "/box-my",
        name: "box-my",
        component: () => import('@/views/box-my/index.vue'),
        meta: {
          title: '我的盲盒'
        }
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import('@/views/setting/index.vue'),
        meta: {
          title: '设置'
        }
      },
      {
        path: "/change-password",
        name: "change-password",
        component: () => import('@/views/setting/ChangePassword.vue'),
        meta: {
          title: '修改登录密码'
        }
      },
      {
        path: "/verify-account",
        name: "verify-account",
        component: () => import('@/views/setting/VerifyAccount.vue'),
        meta: {
          title: '账号验证'
        }
      },
      {
        path: "/set-paypass",
        name: "set-paypass",
        component: () => import('@/views/setting/SetPaypass.vue'),
        meta: {
          title: '设置支付密码'
        }
      },
      {
        path: "/about",
        name: "about",
        component: () => import('@/views/setting/about.vue'),
        meta: {
          title: '关于我们'
        }
      },
      {
        path: "/authentication",
        name: "authentication",
        component: () => import('@/views/setting/Authentication.vue'),
        meta: {
          title: '实名认证'
        }
      },
      {
        path: "/authentication-result",
        name: "authentication-result",
        component: () => import('@/views/setting/AuthenticationResult.vue'),
        meta: {
          title: '实名认证'
        }
      },
      {
        path: "/agreement",
        name: "agreement",
        component: () => import('@/views/setting/agreement.vue'),
        meta: {
          title: '协议'
        }
      },
      {
        path: "/message",
        name: "message",
        component: () => import('@/views/setting/message.vue'),
        meta: {
          title: '公告中心'
        }
      },
      {
        path: "/messageDetail",
        name: "messageDetail",
        component: () => import('@/views/setting/messageDetail.vue'),
        meta: {
          title: '详情'
        }
      },
      {
        path: "/help",
        name: "help",
        component: () => import('@/views/setting/help.vue'),
        meta: {
          title: '常见问题'
        }
      },
      {
        path: "/helpDetail",
        name: "helpDetail",
        component: () => import('@/views/setting/helpDetail.vue'),
        meta: {
          title: '详情'
        }
      },
      {
        path: "/replacePhone",
        name: "replacePhone",
        component: () => import('@/views/setting/replacePhone.vue'),
        meta: {
          title: '更换手机号'
        }
      },
      {
        path: "/integral",
        name: "integral",
        component: () => import('@/views/setting/integral.vue'),
        meta: {
          title: '我的积分'
        }
      },
      {
        path: "/order",
        name: "order",
        component: () => import('@/views/order/index.vue'),
        meta: {
          title: '我的订单'
        }
      },
      {
        path: "/ordering",
        name: "ordering",
        component: () => import('@/views/order/ordering.vue'),
        meta: {
          title: '订单详情'
        }
      },
      {
        path: "/order-result",
        name: "order-result",
        component: () => import('@/views/order/orderResult.vue'),
        meta: {
          title: '订单结果'
        }
      },
      {
        path: "/synthesis-list",
        name: "synthesis-list",
        component: () => import('@/views/synthesis/synthesis-list.vue'),
        meta: {
          title: '合成列表'
        }
      },
      {
        path: "/synthesis",
        name: "synthesis",
        component: () => import('@/views/synthesis/index.vue'),
        meta: {
          title: '合成'
        }
      },
      {
        path: "/synthesis-record",
        name: "synthesis-record",
        component: () => import('@/views/synthesis/synthesis-record.vue'),
        meta: {
          title: '合成记录'
        }
      },
      {
        path: "/transfer-record",
        name: "transfer-record",
        component: () => import('@/views/user/TransferRecord.vue'),
        meta: {
          title: '转赠记录'
        }
      },
      {
        path: "/goods-zs",
        name: "goods-zs",
        component: () => import('@/views/goods-zs/index.vue'),
        meta: {
          title: '藏品证书'
        }
      },
      {
        path: "/interest",
        name: "interest",
        component: () => import('@/views/interest/index.vue'),
        meta: {
          title: '权益中心'
        }
      },
      {
        path: "/interest-details",
        name: "interest-details",
        component: () => import('@/views/interest/interest-details.vue'),
        meta: {
          title: '权益详情'
        }
      },
      {
        path: "/interest-logs",
        name: "interest-logs",
        component: () => import('@/views/interest/interest-logs.vue'),
        meta: {
          title: '权益使用记录'
        }
      },
      {
        path: "/my-goods-list",
        name: "my-goods-list",
        component: () => import('@/views/user/MyGoodsList.vue'),
        meta: {
          title: '我的藏品'
        }
      },
      {
        path: "/blank-iframe",
        name: "blank-iframe",
        component: () => import('@/views/blank-iframe/index.vue'),
        meta: {
          title: '活动'
        }
      },
    ]
  },


  /* {
    path: '/user',
    component: () => import('@/views/user/index.vue'),
    hidden: true,
    meta: {
      title : '个人中心',
      icon: "user",
      noCache : true,
      roles : ['admin', 'user'],
    },
  }, */

  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const createRouters = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes.concat(asyncRoutes),
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const router = createRouters

export function resetRouter() {
  const WHITE_NAME_LIST = [
    'Login',
  ]
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  })
}

export default router

