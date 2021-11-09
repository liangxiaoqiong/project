/*
底部导航JSON数据
 */
var bottom = {
  style: "0", // 导航样式 0-原始 1-自定义
  // 当导航样式为0时,这里的数据起作用
  checked_nav: ['shop_module', 'classify_module', 'guide_module', 'customer_service_module', 'cart_module', 'setting_module'],

  // 当导航样式为1时,这里的数据起作用
  text_color: "#000000", // 文字颜色
  background_color: "#FFFFFF", // 背景颜色
  content: {
    nav_list: [
      {
        id: '1',
        normal_img: '', // 普通图片
        selected_img: '', // 高亮图片
        name: '', // 按钮文字
        action: 'no_action', // 跳转方式
        action_data: '', // 跳转参数
        is_show: '1', // 是否显示
      },
      {
        id: '2',
        normal_img: '', // 普通图片
        selected_img: '', // 高亮图片
        name: '', // 按钮文字
        action: 'no_action', // 跳转方式
        action_data: '', // 跳转参数
        is_show: '1', // 是否显示
      },
      {
        id: '3',
        normal_img: '', // 普通图片
        selected_img: '', // 高亮图片
        name: '', // 按钮文字
        action: 'no_action', // 跳转方式
        action_data: '', // 跳转参数
        is_show: '1', // 是否显示
      },
      {
        id: '4',
        normal_img: '', // 普通图片
        selected_img: '', // 高亮图片
        name: '', // 按钮文字
        action: 'no_action', // 跳转方式
        action_data: '', // 跳转参数
        is_show: '1', // 是否显示
      },
      {
        id: '5',
        normal_img: '', // 普通图片
        selected_img: '', // 高亮图片
        name: '', // 按钮文字
        action: 'no_action', // 跳转方式
        action_data: '', // 跳转参数
        is_show: '1', // 是否显示
      }
    ]
  }
}


/*
会员首页JSON数据
 */
var user = {
  // 顶部设置
  top: {
    background: '', // 背景图片url
    member_name_ctrl: '1', // 会员帐号的显示开关 0-关 1-开
    member_level_ctrl: '1', // 会员等级的显示开关 0-关 1-开
    nickname_ctrl: '1', // 会员名(昵称)的显示开关 0-关 1-开
  },

  // 订单设置
  order: {
    content: [
      {
        id: 'wait_pay',
        icon: '', // 图标的图片路径
        class: 'oPlace', // 图标的类名
        name: '待付款',
        action: 'system', // 待付款订单
        action_data: 'wait_pay', // 对应action的数据
      },
      {
        id: 'wait_confirm',
        icon: '', // 图标的图片路径
        class: 'oWaitting', // 图标的类名
        name: '待接单',
        action: 'system', //待接单
        action_data: 'wait_confirm', // 对应action的数据
      },
      {
        id: 'wait_deliver',
        icon: '', // 图标的图片路径
        class: 'oDelivery', // 图标的类名
        name: '待发货',
        action: 'system', // 待发货
        action_data: 'wait_deliver', // 对应action的数据
      },
      {
        id: 'wait_receive',
        icon: '', // 图标的图片路径
        class: 'oCompleted', // 图标的类名
        name: '待收货',
        action: 'system', // 待收货
        action_data: 'wait_receive', // 对应action的数据
      },
      {
        id: 'complete_order',
        icon: '', // 图标的图片路径
        class: 'oClose', // 图标的类名
        name: '已成交',
        action: 'system', // 已成交
        action_data: 'complete_order', // 对应action的数据
      }
    ]
  },

  // 列表导航
  nav_list: {
    content: [
      {
        id: 'my_address',
        icon: '', // 图标的图片路径
        class: 'tAddress', // 图标的类名
        name: '我的地址',
        action: 'system', // 我的地址
        action_data: 'my_address', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'my_coupon',
        icon: '', // 图标的图片路径
        class: 'tCoupon', // 图标的类名
        name: '我的优惠券',
        action: 'system', // 我的优惠券
        action_data: 'my_coupon', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'my_prize_gift',
        icon: '', // 图标的图片路径
        class: 'tPresent', // 图标的类名
        name: '我的奖礼品',
        action: 'system', // 我的奖礼品
        action_data: 'my_prize_gift', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'my_balance',
        icon: '', // 图标的图片路径
        class: 'tBalance', // 图标的类名
        name: '我的余额',
        action: 'system', // 我的余额
        action_data: 'my_balance', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'my_collection',
        icon: '', // 图标的图片路径
        class: 'collection', // 图标的类名
        name: '我的收藏',
        action: 'system', // 我的收藏
        action_data: 'my_collection', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'store_notice_list',
        icon: '', // 图标的图片路径
        class: 'notice', // 图标的类名
        name: '活动公告',
        action: 'system', // 活动公告
        action_data: 'store_notice_list', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'my_form',
        icon: '', // 图标的图片路径
        class: 't-biaodan-red', // 图标的类名
        name: '我的预约',
        action: 'system', // 我的预约
        action_data: 'my_form', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'account_safe',
        icon: '', // 图标的图片路径
        class: 'tAccount', // 图标的类名
        name: '账号与安全',
        action: 'system', // 账号与安全
        action_data: 'account_safe', // 对应action的数据
        is_show: '1', // 是否显示
      },
      {
        id: 'download_app',
        icon: '', // 图标的图片路径
        class: 'tDownload', // 图标的类名
        name: '下载',
        action: 'system', // 下载
        action_data: 'download_app', // 对应action的数据
        is_show: '1', // 是否显示
      }
    ]
  }
}

/*
全店风格 这里面具体是啥你自己做的时候改
 */
var allStyle = {
  color: {}
}