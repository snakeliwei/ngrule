<template>
  <var-space justify="center">
    <var-card title="你已经成功登陆" description="你的ip已经加入白名单，你可以访问如下网站，有效时间8小时。">
      <template #extra>
        <var-space direction="column" size="large">
          <var-link type="primary">https://adminxjb955fuck3.yiban.io/login</var-link>
          <var-link type="primary">https://metabase.yiban.io</var-link>
          <var-link type="primary">https://metabase.weibanzhushou.com</var-link>
          <var-link type="primary">http://admin.weibanzhushou.com</var-link>
        </var-space>
      </template>
    </var-card>
  </var-space>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Welcome",
  beforeRouteEnter(to, from, next) {
    // 验证是否登录
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      next();
    } else {
      next({ name: "Login" });
    }
  },
});
</script>
