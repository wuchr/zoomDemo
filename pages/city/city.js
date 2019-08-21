// pages/city/city.js
import {citys} from '../../datas/citydata.js';
import amapFile from '../../lib/amap-wx.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityData: [],
    welcomeCity:[],
    curCity:"",
    curCityDesc:"",
    toView: 'A',
    scrollTop: 100,
    scrollLeft: 0,
    scrollHeight:0
  },
  /**
   * 获取所在地址
   */
  loadAddr: function (longitude, latitude) {
     let that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '88090753c7dfa42128aa90d24460ac7b' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        let type = data[0].regeocodeData.addressComponent.city instanceof Array;
        let curCity= "";
        if (type){
          curCity= data[0].regeocodeData.addressComponent.province;
        }else{
          curCity = data[0].regeocodeData.addressComponent.city;
        }
        console.log(data);
        that.setData({
          curCity: curCity,
          curCityDesc: data[0].desc,
      })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },

  /**
   * 获取经纬度
   */
  
  loadInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        that.loadAddr(longitude, latitude);
      }
    })
  },
  
  add:function(){
    this.loadInfo();
  },
  /**
   * 字母点击时间
   */
  linkCity:function(e){
    var viewId = e.currentTarget.dataset.opt;
    this.setData({ toView: viewId});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.loadInfo();
    this.setData({
      cityData: citys.city,
      welcomeCity: citys.welcomeCity
    });
    wx.getSystemInfo(function(res){
        that.setData({
          scrollHeight: res.windowHeight
        })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})