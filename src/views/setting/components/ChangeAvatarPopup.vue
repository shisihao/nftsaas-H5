<template>
	<div>
		<van-action-sheet
			v-model:show="state.show"
			title="修改头像"
			cancel-text="取消"
			:closeable="false"
			:actions="avatarActions"
			@select="onSelect"
		/>
		<upload-avatar
			@handleBeforeUpload="handleBeforeUpload"
			@handleSuccess="handleSuccess"
		/>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import uploadAvatar from './uploadAvatar.vue'
import { putUser } from '@/api/user'
import { avatarActions } from '@/utils/explain'
import { showToast, showLoadingToast } from 'vant'
import store from '@/store/index'

const state = reactive({
	show: false,
	form: {
		name: '',
		avatar: ''
	}
})

const init = () => {
	state.show = true
}

const onSelect = item => {
	if (item.name === '相册') {
		document.querySelector('.van-uploader__input').click()
	}
	state.show = false
}

const handleBeforeUpload = (file, cb, refName) => {
	cb(true)
}

const handleSuccess = res => {
	const toastCustom = showLoadingToast({
		message: '更新中...',
		forbidClick: true,
		duration: 0
	})
	state.form.avatar = res.name
	putUser(state.form)
		.then(() => {
			store.dispatch('user/getInfo')
				.then(() => {
					showToast('更新成功')
				})
		})
		.finally(() => {
			toastCustom.close()
		})
}

defineExpose({ init })
</script>

<style lang="scss" scoped>
:deep(.van-action-sheet__description) {
	font-size: 16px;
}
</style>
