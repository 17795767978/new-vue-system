<template>
  <header class="header" :height="headerHeight">
    <div class="slide-bar" v-show="!sidebarState.isHidden" @click="slideSidebar">
      <div class="slider nocturne icon-slider" :class="{collapsed: !this.sidebarState.isOpen }" ></div>
    </div>
    <div class="center">
      <header-shortcut />
    </div>
    <div class="user">
      <!-- <span class="avatar">
                    <img :src="'static/' + avatar" />
      </span>-->
      <span class="name">{{ dayTime }}好,{{ userName }}</span>
    </div>
    <div class="settings">
      <ul>
        <li>
          <el-dropdown size="small">
            <span>
              <i class="nocturne icon-settings"></i>
              <span>设置</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="modifyPassword"><i class="nocturne icon-password"></i>修改密码</el-dropdown-item>
              <!-- 功能未完成, 暂时注释 -->
              <!-- <el-dropdown-item @click.native="settingPersonal"><i class="nocturne icon-personal"></i>个性化设置</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li @click="logout">
          <span>
            <i class="nocturne icon-logout"></i>
            <span>注销</span>
          </span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
// import {
//   Dropdown,
//   DropdownMenu,
//   DropdownItem
// }
//   from 'element-ui'
import { mapGetters } from 'vuex'
import HeaderShortcut from './HeaderShortcut'
import { getGreetingTime } from '@/utils/common'

export default {
  name: 'Headers',
  data () {
    return {
      dayTime: '',
      commonDialog: null
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'userName',
      'avatar',
      'headerHeight',
      'sidebarState'
    ])
  },
  mounted () {
    this.dayTime = getGreetingTime()
  },
  methods: {
    slideSidebar () {
      this.$store.dispatch('collapseSidebar', !this.sidebarState.isOpen)
    },
    settingPersonal () {
      this.$router.push({ name: 'PersonalSettings' })
    },
    modifyPassword () {
      this.$router.replace({ path: '/modify-password' })
    },
    logout () {
      this.$confirm('是否要退出系统?', '提醒', {
        lockScroll: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.$store.dispatch('userLogout', {
            userAccount: '',
            userId: ''
          }).then(() => {
            location.reload()
          })
        })
        .catch(() => {})
    }
  },
  components: {
    HeaderShortcut
    // 'el-dropdown': Dropdown,
    // 'el-dropdown-menu': DropdownMenu,
    // 'el-dropdown-item': DropdownItem
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  display: flex;
  flex: none;
  height: 35px;
  padding: 0;
  // color: lighten($base-light-color, 100%);
  background-color: darken($base-light-color, 5%);
  border-bottom: 1px solid darken($base-light-color, 10%);

  .center {
    position: relative;
    // padding-left:5px;
    flex: 1;
  }

  .slide-bar {
    width:45px;
    height:100%;
    display: inherit;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size:1.3rem;

    .slider {
      transition: all .3s ease 0s;

      &.collapsed {
        transform: rotateZ(90deg);
      }
    }

    &:hover {
      background-color: darken($base-light-color, 12%);
    }
  }

  .user {
    display: inherit;
    @include flexCenter();

    span {
      display: inline-block;

      &.avatar {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 20px;
        background-color: lighten($base-dark-color, 15%);
        overflow: hidden;

        > img {
          width: 20px;
          height: 20px;
        }
      }
      // &.name { }
    }
  }

  .settings {
    ul {
      display: flex;
      flex-direction: row;
      height: 100%;

      li {
        font-size: 1rem;
        display: inherit;
        flex: 1 auto;
        padding: 0 15px;
        cursor: pointer;

        span {
          display: inherit;
          @include flexCenter;

        }

        span:before {
          margin-right: 5px;
        }

        > div {
          display: inherit;
          @include flexCenter;
          font-size: 1rem;
          font-weight: 400;
          color: $base-dark-color;
        }
      }

      .nocturne:before {
        margin-right: 5px;
      }
    }
  }
}

// fixes dropmenu icon
.el-dropdown-menu {
   i {
    margin-right:5px;
  }
}
</style>
