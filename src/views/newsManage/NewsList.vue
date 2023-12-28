<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理" />

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />

                <el-table-column prop="category" label="分类">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>

                </el-table-column>

                <el-table-column prop="isPublish" label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)" />
                    </template>

                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="success" :icon="Star" circle @click="handlePreview(scope.row)" />
                        <el-button :icon="Edit" circle @click="handleEdit(scope.row)" />

                        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="你确定要删除吗"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" circle />
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <!-- 预览对话题 -->
        <el-dialog v-model="dialogVisible" title="新闻预览">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size: 12px;color: gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
            </div>

            <div v-html="previewData.content" class="htmlcontent"></div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime'
import { Delete, Edit, Star, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
// 注册回调函数
onMounted(() => {
    getTableData()
});

const getTableData = async () => {
    const res = await axios.get("/adminapi/news/list");
    // console.log(res.data.data, "NEWS res.data ")
    tableData.value = res.data.data
};

// 列表分类数字显示对应内容处理
const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"];
    return arr[category - 1]
}

// switch 开关回调
const handleSwitchChange = async (item) => {
    // console.log(isPublish)
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })
    await getTableData()
}

// 预览回调
const handlePreview = (data) => {
    // console.log(data)
    previewData.value = data
    dialogVisible.value = true
}

// 删除
const handleDelete = async (item) => {
    // console.log(item)
    try {
        await axios.delete(`/adminapi/news/list/${item._id}`)
        getTableData()
    } catch (error) {
        // 打印错误信息 
        // console.error(error); 
    }
}
// 编辑
const router = useRouter();
const handleEdit = (item) => {
    console.log(item)
    // 跳转到 /newsManage/editnews/:id
    router.push(`/newsManage/editnews/${item._id}`)

}

</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

:deep(.htmlcontent) {
    img {
        max-width: 100%;
    }
}
</style>