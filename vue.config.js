const data = require('./data.json')

module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.goods
                    })
                })
                app.get('/api/ads', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.ads
                    })
                })
                app.get('/api/addresses', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.addresses
                    })
                })
                app.get('/api/attendanceList', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.attendanceList
                    })
                })
                app.get('/api/pointsMall', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.pointsMall
                    })
                })
                app.get('/api/giftCards', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.giftCards
                    })
                })
                app.get('/api/packages', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.packages
                    })
                })
                app.get('/api/rechargeCards', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.rechargeCards
                    })
                })
                app.get('/api/orders', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.orders
                    })
                })
                app.get('/api/customerCoupons', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.customerCoupons
                    })
                })
                app.get('/api/pointsFlow', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.pointsFlow
                    })
                })
                app.get('/api/store', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.store
                    })
                })
                app.get('/api/member', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.member
                    })
                })
                app.get('/api/levelBenefits', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.levelBenefits
                    })
                })
                app.get('/api/customerPoints', function(req, res) {
                    res.json({
                        code: 1,
                        data: data.customerPoints
                    })
                })
            }
        }
    }
}