import {get, post } from './http'


// 请求商品数据
export const apiGoods = p => get('/goods', p)
    // 请求商品数据
export const apiAds = p => get('/ads', p)
    // 请求签到列表数据

export const apiAttendanceList = p => get('/attendanceList', p)
    // 请求地址数据

export const apiAddresses = p => get('/addresses', p)
    // 请求积分兑换商品数据

export const apiPointsMall = p => get('/pointsMall', p)
    // 请求礼品卡数据

export const apiGiftCards = p => get('/giftCards', p)
    // 请求购物卷数据

export const apiPackages = p => get('/packages', p)
    // 请求充值卡数据

export const apiRechargeCards = p => get('/rechargeCards', p)
    // 请求订单数据

export const apiOrders = p => get('/orders', p)
    // 请求个人购物券数据

export const apiCustomerCoupons = p => get('/customerCoupons', p)
    // 请求积分流水数据

export const apiPointsFlow = p => get('/pointsFlow', p)
    // 请求店家数据
export const apiStore = p => get('/store', p)
    // 请求会员数据
export const apiMember = p => get('/member', p)
    // 获取会员权益数据
export const apiLevelBenefits = p => get('/levelBenefits', p)
    // 获取会员积分数据
export const apiCustomerPoints = p => get('/customerPoints', p)