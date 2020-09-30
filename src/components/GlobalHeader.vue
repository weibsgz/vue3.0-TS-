<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand" href="#">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" href="#" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" href="#" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item>
            <router-link to="/create" class="dropdown-item">新建文章</router-link>
          </dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item">退出登陆</a></dropdown-item>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script>
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export default {
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object
    }
  },
  components: {
    Dropdown, DropdownItem
  }
}
</script>
