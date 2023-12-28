<template>
    <div>
        <el-page-header content="首页" icon="" title="vue3后台管理系统" />
        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="70" :src="avatarUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 70px;">欢迎{{ store.state.userInfo.username }}回来,{{ welcomeText }}</h3>
                </el-col>

            </el-row>
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>产品</span>
                </div>
            </template>

            <!-- 走马灯 -->
            <el-carousel v-if="loopList.length" :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in loopList" :key="item._id">
                    <div :style="{
                        backgroundImage: `url(http://localhost:3000/${item.cover})`,
                        backgroundSize: 'cover',
                    }">
                        <h3>{{ item.title }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const loopList = ref([])
const store = useStore()
// console.log(store.state ,"-store-")

// 计算属性
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
const welcomeText = computed(() => new Date().getHours() < 12 ? '早上好，开心每一天！' : '下午好，如果累了，就休息一会吧！')

onMounted(() => {
    getData()
});

const getData = async () => {
    const res = await axios.get("/adminapi/product/list");
    // console.log(res.data.data, "NEWS res.data ")
    loopList.value = res.data.data
    console.log(loopList.value)
};
</script>
<style lang="scss" scoped>
.box-card {
    margin-top: 30px;
}

// 走马灯
.el-carousel__item h3 {
    color: #fff;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>