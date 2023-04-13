<template>
  <v-container class="fill-height" fluid>

    
    <var-form ref="form" align="center" justify="center">
      <var-image width="85px" height="85px" src="/logo.svg" align="center" justify="center" />
      <var-space direction="column" :size="[20, 10]" justify="center">
        <var-input placeholder="请输入用户名" :rules="[v => !!v || '用户名不能为空']" v-model="username" label="Username"
          required></var-input>
        <var-input placeholder="请输入密码" :rules="[v => !!v || '密码不能为空']" v-model="password" type="password" label="Password"
          required></var-input>
      </var-space>
      <var-space :size="[10, 10]" justify="center">
        <var-button type="primary" class="ripple-example-block var-elevation--2" v-ripple="{ color: '#2979ff' }"
          @click.prevent="handleLogin">登陆</var-button>
        <var-button type="danger" class="ripple-example-block var-elevation--2" v-ripple="{ color: '#2979ff' }"
          @click.prevent="resetForm">重置</var-button>
      </var-space>
    </var-form>
  </v-container>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Snackbar } from '@varlet/ui'

export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const rules = {
      required: (value: string) => !!value || "Required.",
    };

    function handleLogin() {
      axios.post("https://sg.wb0.tech/api/login",
        {},
        {
          params: {
            username: username.value,
            password: password.value,
          }
        })
        .then((response) => {
          if (response.status === 200) {
            Snackbar.success('login Success')
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("access_token", response.data.access_token);
            const access_token = sessionStorage.getItem("access_token")
            // 登录成功后再发送add_rule请求
            axios.post("https://sg.wb0.tech/api/add_rule",
              {},
              { headers: { 'Authorization': `Bearer ${access_token}` } },
            ).then((response) => {
              sessionStorage.setItem("userIp", response.data.YourIP)
              console.log(sessionStorage.getItem("userIp"))
              router.push({ name: "Welcome" });
            });
          } else if (response.status === 401) {
            Snackbar.error('Login fail, incorrect username or password')
          } else {
            Snackbar.error('Login fail')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function resetForm() {
      username.value = "";
      password.value = "";
    }

    return {
      username,
      password,
      rules,
      handleLogin,
      resetForm,
    };
  },
});
</script>
