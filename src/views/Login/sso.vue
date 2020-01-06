<template>
  <div></div>
</template>
<script>

export default {
  name: 'LoginForm',
  props: ['systemTitle'],
  data () {
    return {
      isLoading: false,
      loginForm: {
        userAccount: '',
        userPassword: '',
        ssoToken: ''
      }
    }
  },
  created () {
    var tokensss = this.getQueryParamValue('REDIRECT_TOKEN')
    // alert(tokensss)
    this.loginForm.ssoToken = tokensss
    this.login(this.loginForm)
  },
  methods: {

    /**
     * 获取请求链接参数
     */
    getQueryParamValue: function (queryName) {
      var reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
      var search = window.location.href.substr(window.location.href.indexOf('?'))
      var r = search.substr(1).match(reg)
      if (r != null) {
        return decodeURI(r[2])
      } else {
        return null
      }
    },
    login () {
      this.$store.dispatch('userLogin', { ...this.loginForm })
        .then((res) => {
          // this.isLoading = false
          this.$router.push('/')
        })
    }
  }
}
</script>
