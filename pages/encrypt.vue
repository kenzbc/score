<template>
  <div>
    <Input v-model="text" placeholder="输入要加密的内容..." clearable style="width:500px" />
    <Button type="primary" @click="encrypt()">加密</Button>

    <br><br>
    加密结果：<br>
    <Input v-model="enres" type="textarea" :rows="10" placeholder="输入要解密的密文..." style="width:500px"/>
    <Button type="success" @click="decode()">解密</Button>
    <br><br>
    解密结果：<br>
    <Input v-model="deres" type="textarea" :rows="10" placeholder="这里是解密结果..." style="width:500px"/>



  </div>
</template>

<script>
  export default {
    name: "encrypt",
    components: {},
    data() {
      return {
        //publicKey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDc6WnkPesXcIJnDRnbTJP9sGMoRi83mscYx3dR7gH7MqKoBePIG4zT4M2Uheyiu3onDrabwau/4MjpmZ4Pf6WEXxRC9xPd+fHYdChaWm/79l/0eqrKKSYddbHicdl+E3lLqzNv4rGaV49s9vW+Rz/bwSKYLi1c4qNYya4EoxwihQIDAQAB',
        //privateKey:'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBANzpaeQ96xdwgmcNGdtMk/2wYyhGLzeaxxjHd1HuAfsyoqgF48gbjNPgzZSF7KK7eicOtpvBq7/gyOmZng9/pYRfFEL3E9358dh0KFpab/v2X/R6qsopJh11seJx2X4TeUurM2/isZpXj2z29b5HP9vBIpguLVzio1jJrgSjHCKFAgMBAAECgYAhXFpybmtXQdVfjJnwBTOAJygCR/8PbZ9NfanmRIQmFDJ+H02TxZ1Rzewd1s+yj49V4KHxCaFPO7n7lQhKnOM4v2xGFWimW4I6+cjoZ0VPKkXdH5kfAjobHa34POIIaxY/xON780GWfFA7BecJW6NxxEDCYWFWSZo5P35NQDREQQJBAPSTuiXIk6rALaVtSnyUAP5dKZAcecozKTvoOFBL0lQUp/nGbVXybpI17kWd+xZMZmPZ+srI+2L/sQuteFMD8HUCQQDnOrvVmEZZAg96sZcKOkcunTsWQ4tWW8GB2XH6l3DLgdip+EDKhxlohbfAKalpKfLTCjVm0FR9Ra+3ZFjt1yfRAkEA5sbJ+8LyS0kBCTpB8aD5+wnPIRMtfDSgMM3i7SlOMlY3VcD9A/84hC/tP7Vc6eJ3LrrNITFZu0VHOpyZj8OEzQJBAKNlTqxeIX/uQ8/4xHm2uuxGsSVHb6QDzNccOD3TXCKCy/837VjwZNUGgNVq20r0GKJm+VuA5eNsJgJbB7hyLLECQQCjh5FqLZQIUEjqT7+8/rEg3wJP8x0JrXeWVGaqd3qyXeNG47Dr4ZbYVwAVNADhbduH6eQu2NHBhc7twRCmYtAQ',

        publicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8EvZsLfxbybgSPqL/frOw82EpNx3AIKax37of7SZMTG5L2WwkLLQ2RaEE9Hd9s4BooFJuEBqTwDF34Nmsx+Tp/ZnKMOzuiTmueFQnWHnE5A3hOXiGnlgORffX3bLcuTr3lgjJKT3BCEUTjF1CtyamZG/ehhidrrzVys6M0i+tCRPRUv5DBoAYhRrSKzyiWfF3l8cbHsOYaJPnECBm0D6zXEulOKIQW0bKVzxoTB3C33XXrcKH5MYu6jzEuAHOHP3zbFLn/+JKZm3/TkMl3S3y3uDhO+xAgQl7hHggGhPn4nlMLO4tWIOPZW+fdJDf5TIMgRAm+Gnc3wRSofBsLVQVwIDAQAB',
        privateKey:'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDwS9mwt/FvJuBI+ov9+s7DzYSk3HcAgprHfuh/tJkxMbkvZbCQstDZFoQT0d32zgGigUm4QGpPAMXfg2azH5On9mcow7O6JOa54VCdYecTkDeE5eIaeWA5F99fdsty5OveWCMkpPcEIRROMXUK3JqZkb96GGJ2uvNXKzozSL60JE9FS/kMGgBiFGtIrPKJZ8XeXxxsew5hok+cQIGbQPrNcS6U4ohBbRspXPGhMHcLfddetwofkxi7qPMS4Ac4c/fNsUuf/4kpmbf9OQyXdLfLe4OE77ECBCXuEeCAaE+fieUws7i1Yg49lb590kN/lMgyBECb4adzfBFKh8GwtVBXAgMBAAECggEATictRxecU51eRv4N9+3Rv8chBAmcPrM7qfSxo49WX7SfWTYGphkyadiz3kpcmb/IslTAaEezC7zhnl97UHjNqkwuowh7dOg5jm0krftAj5FRLU0jK58cV5VXFhJp+xVPTYJ2850fpd0oYIIfYgf71ESd9RTnOVx2dnxdsn5PYADp2bxqSlMiDnT6DxlAO+nBGR7jXPziCWiYaGLnQlnxc+TFcUtFgRhKZXX3kzxBOl50N0nWqzRyE2G/Dx800gZhDTMMS3CUxpU2PMQ9bfPsRauksM2mKWoCp1F6rQXRUJGxugDzuhrq8XyLb8J107DDcUHkDPRqi2ALg7o7+fyM6QKBgQD7Zj4oH7JkY8fnnzyTgqRbvfUHcK0IsH0rvgNAohWWYwo8hJHScv9/sUVgIvAlxBCFuAKnOvD8cKpxomHrUoaLSZDRwHcZhVJkDlSsExmT8BwyhmlEL6ajl3bk+NAr7dCGE8akK91OxAgwIOQ63hO3VF5LjzupwaiovmnrPzYtowKBgQD0sZd6ZGgiGwPhtrsMIRP93fk0Afy0wDwFoFiqZZij9tYMi7Njr/jx9Vr4RmrUFoNHX5pWICevmgMf0jSVHZSz5gWUOt946WXurKZB3Ua1Mt5YYA6M7LCYgWJzNNx8ciQwEnshKMqr5KSkD99yNjiLxGYI2zVUA+vZyIsimR/VvQKBgQDjCnRqIi4m8eJQ8YNwqNSssgI/hOgQZ+uzfHhNf9RFLA7LluJnEEpk1QEVkJgXU1mkmglzZAzNvyZ/V6pdLvupgXfTpqEpIDnHeRXJDbrU201r5+3bkblKFvleUsMWWUEwRV3pWGAWyX2nkZzs+TEPKZe7X5D/f5FFTCo2NbFFRwKBgAIhxfsYAtxBNgByciDB7QWqOHCej9AXWK6H3h3l8rWDAgxr7y0wLFAXXiqJmoash4pIp/SWJSJfiiVt1G10K4aBu4y2EppgFjZFJNGwFtyfS9ajR50stsEtZ2kvjbg72lrc3lvEmjdzL4gKZ1z8YfO9y1HKbyWDPzvPhn7PrLpVAoGAZqOncWpoe3iwKVPPndimdAGrxtGcxWNypsgpJFRshd2ea0t6Y/FvJ83sgmiOFMc9N1VvENdhQdtF76oP3aPwhDHibL9rsDVelZt8sNKMbPegJ7HuS9TPWKqKpFQquDXVNEMiuB6si6n8SMRKIzsH+2/rtnJKuOuTh6S4+R/w9lU=',



        text:'hello world 我是数据文本',
        enres:'',
        deres:'',

      }
    },
    async asyncData({app, route}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      /*
    let res = await ({
      method: 'get',
      url: `/apiUrl.do?id=parameters`
    })
    return {
      dataList:res.data.list,
    }
    */
    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head: {
      // 配置当前页面的 Meta 标签
      title: 'RSA 加密解密',
      meta: [
        {hid:'keywords', name: 'keywords', content: `RSA 加密解密`},
        {hid:'description', name: 'description', content: `RSA 加密解密`},
      ],
      script: [
        { src: 'https://cdn.bootcss.com/jsencrypt/3.0.0-rc.1/jsencrypt.min.js' },
      ],
    },
    mounted() {

    },
    methods: {
      encrypt(){
        this.enres = this.cmdRSAEncrypt(this.text);
      },
      decode(){
        this.deres = this.cmdRSADecrypt(this.enres);
      },


      /**
       * RSA加密
       * @param str
       * @returns {*}
       */
      cmdRSAEncrypt (str){
        let key = this.publicKey
          ,Encrypt = new JSEncrypt();

        Encrypt.setPublicKey(key);
        return Encrypt.encrypt(str);
      },
      /**
       * RSA解密
       * @param str
       * @returns {*}
       */
      cmdRSADecrypt (str){
        let key = this.privateKey
          ,Encrypt = new JSEncrypt();

        Encrypt.setPrivateKey(key);
        return Encrypt.decrypt(str);
      },
    },
    destroyed() {
    }
  }
</script>

<style scoped>

</style>
