<template>
 <div style="width: 100%; height: 100%; position: relative">
   <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      accordion
      v-if="reload"
      node-key="id"
      :default-expanded-keys="expandedKeys">
    </el-tree>
    <div style="width: 100%; height: 100%; position:absolute; left:0; top: 0; bottom: 0; z-index: 999;cursor: not-allowed"></div>
 </div>
</template>

<script>
export default {
  props: {
    parentTreeAnimal: {
      type: String
    },
    parentTreeTitle: {
      type: String
    },
    defaultTitle: {
      type: String
    },
    defaultId: {
      type: String
    },
    titleMsg: {
      type: String
    }
  },
  data () {
    return {
      data: [],
      expandedKeys: [],
      reload: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  mounted () {
    this.data = JSON.parse(JSON.stringify(this.$store.state.user.roles))
    this.data[this.data.length] = {
      id: 10000,
      title: '',
      children: []
    }
    this.reload = false
    setTimeout(() => {
      this.reload = true
    }, 20)
  },
  watch: {
    parentTreeAnimal (newV) {
      this.data = JSON.parse(JSON.stringify(this.$store.state.user.roles))
      this.reload = false
      this.expandedKeys = []
      this.expandedKeys.push(newV)
      if (newV) {
        this.data.forEach(item => {
          // 首层增加空数组
          const findIndex = item.children.filter(i => i.id === this.defaultId)
          if (item.id === newV) {
            if (findIndex.length === 0) {
              item.children.push({
                id: '',
                title: this.defaultTitle,
                children: [{}]
              })
            }
          } else {
            this.checkTree(item)
          }
        })
      } else {
        const findIndex = this.data.filter(i => i.id === this.defaultId)
        if (findIndex.length === 0) {
          this.data[this.data.length] = {
            id: 10000,
            title: this.defaultTitle,
            children: []
          }
        } else {
          this.data = JSON.parse(JSON.stringify(this.$store.state.user.roles))
        }
      }
      setTimeout(() => {
        this.reload = true
      }, 20)
    },
    parentTreeTitle (newV) {
      if (this.titleMsg.indexOf('新增') > -1) {
        this.remarkTreeList(newV)
      } else {
        this.reCheckTreeList(newV)
      }
    }
  },
  methods: {
    // 新增
    remarkTreeList (name) {
      if (this.parentTreeAnimal) {
        const id = this.parentTreeAnimal
        const data = this.data
        this.treeAddTitle(id, name, data)
      } else {
        this.data[this.data.length - 1].title = name
        if (name === '') {
          this.data[this.data.length - 1].children = []
        } else {
          this.data[this.data.length - 1].children = [{}]
        }
      }
    },
    // 修改
    reCheckTreeList (name) {
      console.log(this.parentTreeAnimal)
      // if (item.id === this.defaultId) {
      //   item.title = name
      // } else {}
    },
    // 递归增加空数组
    checkTree (item) {
      const findIndex = item.children.filter(i => i.id === this.defaultId)
      item.children.forEach(k => {
        if (k.id === this.parentTreeAnimal) {
          if (findIndex.length === 0) {
            k.children.push({
              id: '',
              title: '',
              children: [{}]
            })
          }
        } else {
          this.checkTree(k)
        }
      })
    },
    // 递归修改空数组中的title
    treeAddTitle (id, name, data) {
      data.forEach(item => {
        // 首层增加
        if (item.id === id) {
          item.children[item.children.length - 1].title = name
        } else {
          this.treeAddTitle(id, name, item.children)
        }
      })
    }
  }
}
</script>

<style>
</style>
